import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RightDrawerState {
  header: string;
  isOpen: boolean;
  bodyType: string;
  extraObject: Record<string, any>;
}

interface OpenRightDrawerPayload {
  header: string;
  bodyType: string;
  extraObject: Record<string, any>;
}

export const rightDrawerSlice = createSlice({
  name: "rightDrawer",
  initialState: {
    header: "",
    isOpen: false,
    bodyType: "",
    extraObject: {},
  } as RightDrawerState,
  reducers: {
    openRightDrawer: (state, action: PayloadAction<OpenRightDrawerPayload>) => {
      const { header, bodyType, extraObject } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.header = header;
      state.extraObject = extraObject;
    },

    closeRightDrawer: (state) => {
      state.isOpen = false;
      state.bodyType = "";
      state.header = "";
      state.extraObject = {};
    },
  },
});

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
