import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
export const login = createAsyncThunk("user/login", async (data) => {
  const res = await customAxios.post("users/login", data);
  console.log(res.data);
  return res.data;
});
export const register = createAsyncThunk("user/register", async (data) => {
  const res = await customAxios.post("users/register", data);

  return res.data;
});
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (data) => {
    const res = await customAxios.get("users/profile/", data);
    return res.data;
  }
);
