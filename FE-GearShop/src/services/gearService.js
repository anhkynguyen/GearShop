import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const createGear = createAsyncThunk("gear/createGear", async (data) => {
  const res = await customAxios.post("/gears", data);
  return res.data;
});
export const getAllGearOfUser = createAsyncThunk(
  "gear/getAllGearOfUser",
  async (data) => {
    const res = await customAxios.get("/gears/listGearOfUser");
    return res.data;
  }
);
export const deleteGear = createAsyncThunk("gear/deleteGear", async (data) => {
  const res = await customAxios.delete("/gears/" + data);
  return res.data;
});
export const findGearById = createAsyncThunk(
  "gear/findGearById",
  async (data) => {
    const res = await customAxios.get("/gears/" + data);
    return res.data;
  }
);
export const updateGear = createAsyncThunk("gear/updateGear", async (data) => {
  const res = await customAxios.put("/gears/" + +data[1], data[0]);
  return res.data;
});
export const getAllGear = createAsyncThunk("gear/getAllGear", async (data) => {
  const res = await customAxios.get("/gears");
  return res.data;
});
