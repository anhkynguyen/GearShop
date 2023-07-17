import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  getMyOrder,
} from "../../services/orderService";

const initialState = {
  order: [],
  myOrder: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order.push(action.payload);
    });
    builder.addCase(getMyOrder.fulfilled, (state, action) => {
      state.myOrder = action.payload;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      console.log(action.payload, 88);
      state.order.splice(action.payload);
    });
  },
});
export default orderSlice.reducer;
