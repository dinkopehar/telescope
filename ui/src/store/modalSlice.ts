import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  title: string;
  isOpen: boolean;
  bodyType: string;
  size: string;
  extraObject: Record<string, any>;
}

interface OpenModalPayload {
  title: string;
  bodyType: string;
  extraObject: Record<string, any>;
  size?: string;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    title: "",
    isOpen: false,
    bodyType: "",
    size: "",
    extraObject: {},
  } as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      const { title, bodyType, extraObject, size } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.size = size || "md";
      state.extraObject = extraObject;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.bodyType = "";
      state.title = "";
      state.extraObject = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
