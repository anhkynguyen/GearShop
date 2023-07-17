import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const createOrderDetail = createAsyncThunk(
  "orderDetail/createOrderDetail",
  async (data) => {
    const res = await customAxios.post("/orderDetails", data);
    return res.data;
  }
);
export const getAllOrderDetail = createAsyncThunk(
  "orderDetail/getAllOrderDetail",
  async () => {
    const res = await customAxios.get("/orderDetails");
    return res.data;
  }
);
