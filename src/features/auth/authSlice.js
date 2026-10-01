import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const storedToken = localStorage.getItem("token") || null;
let storedUser = null;
try {
  const u = localStorage.getItem("user");
  if (u) storedUser = JSON.parse(u);
} catch (e) {
  storedUser = null;
}

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to log in";
      return rejectWithValue(message);
    }
  }
);

export const addUserThunk = createAsyncThunk(
  "auth/addUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email: email.trim().toLowerCase(),
        password,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to register admin";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        toast.success(action.payload.message || "Welcome back!");
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed");
      })
      // Add Admin
      .addCase(addUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Admin registered successfully");
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to add admin");
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
