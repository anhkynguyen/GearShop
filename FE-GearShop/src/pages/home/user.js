import Navbar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

export default function User() {
  return (
    <div className="row">
      <div className="col-12">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
