import Carousel from "../../components/carousel/carousel";
import Navbar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="row">
      <div className="col-12">
        <Navbar></Navbar>
        <Carousel></Carousel>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
