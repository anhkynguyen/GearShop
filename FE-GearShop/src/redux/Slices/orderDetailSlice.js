import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderDetail,
  getAllOrderDetail,
} from "../../services/orderDetailServices";

const initialState = {
  orderDetail: [],
  myOrderDetail: [],
};
const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderDetail.fulfilled, (state, action) => {
      console.log(action.payload, 999);
      state.orderDetail.push(action.payload);
    });
    builder.addCase(getAllOrderDetail.fulfilled, (state, action) => {
      console.log(action.payload, 999);
      state.orderDetail = action.payload;
    });
  },
});
export default orderDetailSlice.reducer;
