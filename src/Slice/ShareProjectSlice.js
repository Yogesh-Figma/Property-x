import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServiceInstance from "../Api/ApiService";
import { toast } from "react-toastify";

export const shareProject = createAsyncThunk(
  "ShareProject/shareProject",
  async ({ leadsId, type }, { rejectWithValue }) => {
    try {
      console.log(leadsId, type, "type in thunk");
      const response = await apiServiceInstance.ShareProject(leadsId, type);
      toast.success(response.message);
      return response;
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(`Failed to assign lead. ${errorMessage}`);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ShareProjectSlice = createSlice({
  name: "shareProject",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shareProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareProject.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(shareProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ShareProjectSlice.reducer;
