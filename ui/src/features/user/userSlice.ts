import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api";

interface LoginState {
  username: string;
  password: string;
  loading: boolean;
  errorMessage: string;
}

const initialState: LoginState = {
  username: "",
  password: "",
  loading: false,
  errorMessage: "",
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await login(username, password);
      return response.data;
    } catch (error) {
      return rejectWithValue("Invalid username or password"); // Customize error handling as needed
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
        window.location.href = "/app/welcome"; // Redirect on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string; // Display error message
      });
  },
});

export const { setPassword, setUsername, setLoading, setErrorMessage } =
  userSlice.actions;
export default userSlice.reducer;
