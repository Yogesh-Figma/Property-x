import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import apiServiceInstance from "../Api/ApiService";

export const fetchchildUser = createAsyncThunk("childUser/fetchChildUser",
  async (_,{rejectWithValue})=>{
    try {
      const response = await apiServiceInstance.getchildUser();
      return response;
    } catch (error) {
       return rejectWithValue(error.response?.data|| error.message);
    }

  }
);

const childUserSlice =createSlice({
  name:"childUser",
  initialState:{
    data:[],
    loading:false,
    error: null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchchildUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchchildUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchchildUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }); 
  },
})
export default childUserSlice.reducer;

