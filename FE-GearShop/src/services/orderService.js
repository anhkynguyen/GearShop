import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const createOrder = createAsyncThunk(
  "order/createOder",
  async (data) => {
    const res = await customAxios.post("/orders", data);
    return res.data;
  }
);
export const getMyOrder = createAsyncThunk("order/getMyOrder", async (data) => {
  const res = await customAxios.get("/orders");
  return res.data;
});
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (data) => {
    console.log(data);
    const res = await customAxios.delete("/orders/" + data);

    return res.data;
  }
);
