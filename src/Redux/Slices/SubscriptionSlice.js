import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  subscriptions: [],
  currentSubscription: null,
  stats: {
    monthlyTotal: 0,
    annualTotal: 0,
    activeCount: 0,
    upcomingCount: 0,
  },
  upcomingRenewals: [],
  spendingData: [],
  categories: [],
  loading: false,
  error: null,
};

// Get All Subscriptions
export const getAllSubscriptions = createAsyncThunk(
  "subscription/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/subscriptions");
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get Dashboard Stats
export const getDashboardStats = createAsyncThunk(
  "subscription/stats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/subscriptions/stats/overview");
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get Upcoming Renewals
export const getUpcomingRenewals = createAsyncThunk(
  "subscription/upcoming",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/subscriptions/upcoming");
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message ;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Create Subscription
export const createSubscription = createAsyncThunk(
  "subscription/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/subscriptions", data);
      
      toast.promise(res, {
        loading: "Wait! creating subscription...",
        success: (response) => {
          return response?.data?.message || "Subscription created successfully!";
        },
        error: (err) => {
          return err?.response?.data?.message || "Failed to create subscription";
        }
      });

      const response = await res;
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Update Subscription
export const updateSubscription = createAsyncThunk(
  "subscription/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = axiosInstance.put(`/subscriptions/${id}`, data);
      
      toast.promise(res, {
        loading: "Wait! updating subscription...",
        success: (response) => {
          return response?.data?.message || "Subscription updated successfully!";
        },
        error: (err) => {
          return err?.response?.data?.message || "Failed to update subscription";
        }
      });

      const response = await res;
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Delete Subscription
export const deleteSubscription = createAsyncThunk(
  "subscription/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/subscriptions/${id}`);
      
      toast.promise(res, {
        loading: "Wait! deleting subscription...",
        success: (response) => {
          return response?.data?.message || "Subscription deleted successfully!";
        },
        error: (err) => {
          return err?.response?.data?.message || "Failed to delete subscription";
        }
      });

      await res;
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    clearCurrentSubscription: (state) => {
      state.currentSubscription = null;
    },
    setCurrentSubscription: (state, action) => {
      state.currentSubscription = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Subscriptions
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.subscriptions || [];
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Dashboard Stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats || state.stats;
        state.spendingData = action.payload.spendingData || [];
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Upcoming Renewals
      .addCase(getUpcomingRenewals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingRenewals.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingRenewals = action.payload.subscriptions || [];
      })
      .addCase(getUpcomingRenewals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Subscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.subscription) {
          state.subscriptions.push(action.payload.subscription);
        }
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Subscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.subscription) {
          const index = state.subscriptions.findIndex(
            sub => sub._id === action.payload.subscription._id
          );
          if (index !== -1) {
            state.subscriptions[index] = action.payload.subscription;
          }
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Subscription
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(
          sub => sub._id !== action.payload
        );
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSubscriptionError, clearCurrentSubscription, setCurrentSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;