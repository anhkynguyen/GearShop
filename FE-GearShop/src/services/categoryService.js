import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    const res = await customAxios.get("categories");
    return res.data;
  }
);
