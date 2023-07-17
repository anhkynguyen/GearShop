import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/user/login/login";
import Register from "./pages/user/register/register";
import Home from "./pages/home/home";
import ListGear from "./pages/gear/listGear/listGear";
import CreateGear from "./pages/gear/createGear/createGear";
import User from "./pages/home/user";
import MyGear from "./pages/gear/myGear/myGear";
import UpdateGear from "./pages/gear/editGear/updateGear";
import GearDetail from "./pages/gear/gearDetail/gearDetail";
import ListOrder from "./pages/gear/listOrder/listOrder";
import RentOrder from "./pages/gear/rentGear/rentGear";
import Profile from "./pages/user/profile/profile";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login></Login>}></Route>
          <Route path={"register"} element={<Register></Register>}></Route>
          {/* {user !== "User not found" || user !== "Wrong password" ? ( */}
          <>
            <Route path={"home"} element={<Home />}>
              <Route path={""} element={<ListGear />}></Route>

              {/* <Route path={"edit-home/:id"} element={<EditHome />} />
                <Route path={"rent-home/:id"} element={<RentHome />} />
                <Route path={"home-detail/:id"} element={<HomeDetail />} />
                <Route path={"my-home/:id"} element={<MyHome />} /> */}
            </Route>
            <Route path={"user"} element={<User />}>
              <Route path={"create-gear"} element={<CreateGear />} />
              <Route path={"my-gear"} element={<MyGear />}></Route>
              <Route
                path={"updateGear/:gearId"}
                element={<UpdateGear />}
              ></Route>
              <Route
                path="gear-detail/:gearId"
                element={<GearDetail></GearDetail>}
              ></Route>
              <Route path="my-order" element={<ListOrder></ListOrder>}></Route>
              <Route
                path="my-order-detail"
                element={<RentOrder></RentOrder>}
              ></Route>
              <Route path="my-profile" element={<Profile></Profile>}></Route>

              {/* <Route path={":idUser"} element={<Profile />}></Route>
                <Route
                  path={"change-password/:idUser"}
                  element={<ChangePassword />}
                ></Route>
                <Route path={"my-order/:idUser"} element={<MyOrder />}></Route>
                <Route path={"edit-order/:id"} element={<EditOrder />}></Route> */}
            </Route>
          </>
          {/* ) : (
            <>
              <Route path={"/"} element={<Login></Login>}></Route>
            </>
          )} */}
        </Routes>
      </div>
    </>
  );
}

export default App;
