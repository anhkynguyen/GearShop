import { createSlice } from "@reduxjs/toolkit";
import {
  createGear,
  deleteGear,
  findGearById,
  getAllGear,
  getAllGearOfUser,
  updateGear,
} from "../../services/gearService";

const initialState = {
  gear: [],
  gears: [],
  gearOfUser: [],
  gearById: [],
};
const gearSlice = createSlice({
  name: "gear",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGear.fulfilled, (state, action) => {
      state.gear.push(action.payload);
    });
    builder.addCase(getAllGearOfUser.fulfilled, (state, action) => {
      state.gearOfUser = action.payload;
    });
    builder.addCase(deleteGear.fulfilled, (state, action) => {
      state.gearOfUser.splice(action.payload);
    });
    builder.addCase(findGearById.fulfilled, (state, action) => {
      state.gearById = action.payload;
    });
    builder.addCase(updateGear.fulfilled, (state, action) => {
      state.gears = action.payload;
    });
    builder.addCase(getAllGear.fulfilled, (state, action) => {
      state.gears = action.payload;
    });
  },
});
export default gearSlice.reducer;
