import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password, rememberMe }, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      );
      return {
        access_token: response.data.access_token,
        user: response.data.user,
        rememberMe,
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  token: null,
  userInfo: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.access_token;
        state.userInfo = action.payload.user;

        // Persistence handled by redux-persist now
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Selectors with proper fallbacks
export const selectCurrentUser = (state) => state.user?.userInfo || null;
export const selectAuthStatus = (state) => state.user?.status || "idle";
export const selectAuthError = (state) => state.user?.error || null;
export const selectIsAuthenticated = (state) => !!state.user?.token;

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
