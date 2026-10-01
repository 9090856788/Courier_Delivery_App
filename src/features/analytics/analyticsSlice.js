import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/services/axiosInstance";

const initialState = {
  summary: null,
  revenue: [],
  growth: [],
  topCities: [],
  performance: [],
  loading: false,
  error: null,
};

export const fetchAnalyticsThunk = createAsyncThunk(
  "analytics/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [summaryRes, revenueRes, growthRes, citiesRes, perfRes] =
        await Promise.all([
          axiosInstance.get("/analytics/summary").catch(() => ({ data: {} })),
          axiosInstance.get("/analytics/revenue").catch(() => ({ data: {} })),
          axiosInstance.get("/analytics/growth").catch(() => ({ data: {} })),
          axiosInstance.get("/analytics/cities").catch(() => ({ data: {} })),
          axiosInstance
            .get("/analytics/performance")
            .catch(() => ({ data: {} })),
        ]);

      return {
        summary: summaryRes.data,
        revenue: revenueRes.data?.data || [],
        growth: growthRes.data?.data || [],
        topCities: citiesRes.data?.data || [],
        performance: perfRes.data?.data || [],
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch analytics";
      return rejectWithValue(message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.revenue = action.payload.revenue;
        state.growth = action.payload.growth;
        state.topCities = action.payload.topCities;
        state.performance = action.payload.performance;
      })
      .addCase(fetchAnalyticsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
