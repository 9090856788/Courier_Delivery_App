import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const initialState = {
  parcels: [],
  currentParcel: null,
  trackingParcel: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  loading: false,
  trackingLoading: false,
  error: null,
  calculatedCost: null,
  costLoading: false,
};

export const fetchParcelsThunk = createAsyncThunk(
  "parcels/fetchParcels",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/parcels", { params });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch parcels";
      return rejectWithValue(message);
    }
  }
);

export const trackParcelThunk = createAsyncThunk(
  "parcels/trackParcel",
  async (trackingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/parcels/track/${encodeURIComponent(trackingId.trim())}`
      );
      return response.data?.data || response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Parcel not found with the provided Tracking ID";
      return rejectWithValue(message);
    }
  }
);

export const getParcelByIdThunk = createAsyncThunk(
  "parcels/getParcelById",
  async (trackingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/parcels/track/${encodeURIComponent(trackingId.trim())}`
      );
      return response.data?.data || response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieve parcel details";
      return rejectWithValue(message);
    }
  }
);

export const createParcelThunk = createAsyncThunk(
  "parcels/createParcel",
  async (parcelData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/parcels", parcelData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create parcel";
      return rejectWithValue(message);
    }
  }
);

export const addCheckpointThunk = createAsyncThunk(
  "parcels/addCheckpoint",
  async ({ trackingId, checkpointData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/parcels/${encodeURIComponent(trackingId)}/checkpoints`,
        checkpointData
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add checkpoint";
      return rejectWithValue(message);
    }
  }
);

export const calculateCostThunk = createAsyncThunk(
  "parcels/calculateCost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/parcels/calculate-cost",
        payload
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to calculate cost";
      return rejectWithValue(message);
    }
  }
);

const parcelSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    clearTrack: (state) => {
      state.trackingParcel = null;
      state.error = null;
    },
    clearCalculatedCost: (state) => {
      state.calculatedCost = null;
    },
    setCurrentParcel: (state, action) => {
      state.currentParcel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all parcels
      .addCase(fetchParcelsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParcelsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchParcelsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Track parcel
      .addCase(trackParcelThunk.pending, (state) => {
        state.trackingLoading = true;
        state.error = null;
      })
      .addCase(trackParcelThunk.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.trackingParcel = action.payload;
      })
      .addCase(trackParcelThunk.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingParcel = null;
        state.error = action.payload;
        toast.error(action.payload || "Tracking ID not found");
      })

      // Get parcel by ID
      .addCase(getParcelByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getParcelByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentParcel = action.payload;
      })
      .addCase(getParcelByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Parcel not found");
      })

      // Create parcel
      .addCase(createParcelThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createParcelThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.parcels.unshift(action.payload.data);
          state.currentParcel = action.payload.data;
        }
        toast.success(
          `Parcel booked successfully! Tracking ID: ${
            action.payload?.data?.trackingId || ""
          }`
        );
      })
      .addCase(createParcelThunk.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to create parcel");
      })

      // Add checkpoint
      .addCase(addCheckpointThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCheckpointThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data;
        if (updated) {
          state.currentParcel = updated;
          state.parcels = state.parcels.map((p) =>
            p.trackingId === updated.trackingId ? updated : p
          );
        }
        toast.success("Checkpoint recorded successfully!");
      })
      .addCase(addCheckpointThunk.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to add checkpoint");
      })

      // Calculate cost
      .addCase(calculateCostThunk.pending, (state) => {
        state.costLoading = true;
      })
      .addCase(calculateCostThunk.fulfilled, (state, action) => {
        state.costLoading = false;
        state.calculatedCost = action.payload;
      })
      .addCase(calculateCostThunk.rejected, (state, action) => {
        state.costLoading = false;
        toast.error(action.payload || "Failed to calculate shipping cost");
      });
  },
});

export const { clearTrack, clearCalculatedCost, setCurrentParcel } =
  parcelSlice.actions;

export default parcelSlice.reducer;
