import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import gearReducer from "./Slices/gearSlice";
import categoryReducer from "./Slices/categorySlice";
import orderReducer from "./Slices/orderSlice";
import orderDetailReducer from "./Slices/orderDetailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    gear: gearReducer,
    category: categoryReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
  },
});
export default store;
