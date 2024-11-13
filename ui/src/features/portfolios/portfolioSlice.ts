import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getPortfolios as getPortfoliosApi,
  createPortfolio as createPortfolioApi,
  deletePortfolio as deletePortfolioApi,
  updatePortfolio as updatePortfolioApi,
} from "../../api";

interface Portfolio {
  [key: string]: any;
}

interface PortfolioState {
  isLoading: boolean;
  data: Portfolio[];
}

interface NewPortfolioPayload {
  newPortfolioObj: Portfolio;
}

interface DeletePortfolioPayload {
  index: number;
}

export const getPortfolios = createAsyncThunk("getPortfolios", async () => {
  const response = await getPortfoliosApi();
  return response.data;
});

export const createPortfolio = createAsyncThunk(
  "createPortfolio",
  async (name: string) => {
    const response = await createPortfolioApi(name);
    return response.data;
  },
);

export const deletePortfolio = createAsyncThunk(
  "deletePortfolio",
  async (id: number) => {
    const response = await deletePortfolioApi(id);
    return response.data;
  },
);

export const updatePortfolio = createAsyncThunk(
  "updatePortfolio",
  async (updatedPortfolioObj) => {
    const { id, name } = updatedPortfolioObj;
    const response = await updatePortfolioApi(id, name);
    return response.data;
  },
);

export const portfolioSlice = createSlice({
  name: "portfolios",
  initialState: {
    isLoading: false,
    data: [],
  } as PortfolioState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<PortfolioState>) => {
    builder
      .addCase(getPortfolios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.data = action.payload.map((element) => {
          return {
            ...element,
            show: true,
          };
        });
        state.isLoading = false;
      })
      .addCase(getPortfolios.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.data.push({ ...action.payload, show: true });
        state.isLoading = false;
      })
      .addCase(createPortfolio.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.data.splice(
          state.data.findIndex((e) => e.id === action.meta.arg),
          1,
        );
        state.isLoading = false;
      })
      .addCase(deletePortfolio.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.data.splice(
          state.data.findIndex((e) => e.id === action.meta.arg),
          1,
        );
        state.data.push({ ...action.payload, show: true });
        state.isLoading = false;
      })
      .addCase(updatePortfolio.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setData } = portfolioSlice.actions;

export default portfolioSlice.reducer;
