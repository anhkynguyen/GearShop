import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../../services/categoryService";

const initialState = {
  category: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});
export default categorySlice.reducer;
