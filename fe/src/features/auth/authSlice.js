import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register, verifyToken } from "../../service/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.api_token);
      return data;
    } catch (err) {
      console.log(err);

      if (err.type === "INVALID_CREDENTIALS") {
        const msg = err.message || "Login failed";
        return rejectWithValue({ message: msg });
      }

      // return rejectWithValue({
      //   message: "Network error",
      //   type: "NETWORK_ERROR",
      // });
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const data = await register(email, password, name);
      return data;
    } catch (err) {
      const msg = err.response.data?.message;
      return rejectWithValue({ message: msg });
    }
  },
);

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  isLoading: false,
  isError: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.api_token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;

        // if (action.payload?.type === "UNAUTHORIZED") {
        //   state.user = null;
        //   state.token = null;
        //   state.isAuthenticated = false;
        // }

        state.isError = action.payload?.message || "Terjadi kesalahan";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.api_token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      });
    // .addCase(checkAuth.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(checkAuth.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.user = action.payload.user;
    //   state.isAuthenticated = true;
    // })
    // .addCase(checkAuth.rejected, (state) => {
    //   state.isLoading = false;
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;

    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    // });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export const isAuthentication = (state) => state.auth.isAuthenticated;
// export const dataToken = (state) => state.auth.token
export const dataUser = (state) => state.auth.user;
