import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, login, register } from "../../services/userSevice";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  user: [],
  profile: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("access-token", action.payload.token);
    });
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user.push(action.payload);
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export default userSlice.reducer;
