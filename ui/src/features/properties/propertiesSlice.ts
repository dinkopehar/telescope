import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getProperties as getPropertiesApi,
  createProperty as createPropertyApi,
  deleteProperty as deletePropertyApi,
} from "../../api";

interface Property {
  [key: string]: any;
}

interface PropertyState {
  isLoading: boolean;
  data: Property[];
}

interface NewPropertyPayload {
  newPortfolioObj: Property;
}

interface DeletePropertyPayload {
  index: number;
}

export const getProperties = createAsyncThunk("getProperties", async () => {
  const response = await getPropertiesApi();
  return response.data;
});

export const createProperty = createAsyncThunk(
  "createProperty",
  async (name: string) => {
    const response = await createPropertyApi(name);
    return response.data;
  },
);

export const deleteProperty = createAsyncThunk(
  "deleteProperty",
  async (id: number) => {
    const response = await deletePropertyApi(id);
    return response.data;
  },
);

export const propertySlice = createSlice({
  name: "properties",
  initialState: {
    isLoading: false,
    data: [],
  } as PropertyState,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<PropertyState>) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getProperties.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createProperty.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.data.splice(
          state.data.findIndex((e) => e.id === action.meta.arg),
          1,
        );
        state.isLoading = false;
      })
      .addCase(deleteProperty.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default propertySlice.reducer;
