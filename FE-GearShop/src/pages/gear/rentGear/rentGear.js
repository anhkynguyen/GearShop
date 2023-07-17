import { useDispatch, useSelector } from "react-redux";
import "./rentGear.css";
import { deleteGear, getAllGearOfUser } from "../../../services/gearService";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrder } from "../../../services/orderService";
import {
  createOrderDetail,
  getAllOrderDetail,
} from "../../../services/orderDetailServices";

export default function RentOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    return state.user.currentUser.userId;
  });

  const myOrderDetail = useSelector((state) => {
    return state.orderDetail.orderDetail;
  });
  const handleCreateOrderDetail = (data) => {
    console.log(data, 123);
    dispatch(createOrderDetail(data));
  };

  useEffect(() => {
    dispatch(getAllOrderDetail(userId));
  }, []);

  return (
    <>
      <div className="listGearOfUser">
        <div className="container">
          <div className="row">
            <table class="table table-primary">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="listGearOfUser__td">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="listGearOfUser__td">
                    Hình ảnh
                  </th>
                  <th scope="col" className="listGearOfUser__td"></th>
                  <th scope="col" className="listGearOfUser__td">
                    Thời gian thuê
                  </th>{" "}
                  <th scope="col" className="listGearOfUser__td">
                    Tổng số tiền
                  </th>
                </tr>
              </thead>
              {myOrderDetail.map((item, key) => {
                return (
                  <tbody>
                    <tr>
                      <th className="listGearOfUser-table-height" scope="row">
                        {key + 1}
                      </th>
                      <td className="listGearOfUser-table-height">
                        {item.gearName}
                      </td>
                      <td className="listGearOfUser-table-height" colSpan={2}>
                        <img
                          className="listGearOfUser__img"
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td className="listGearOfUser-table-height">
                        {item.startTime} <i class="fa-solid fa-arrow-right"></i>{" "}
                        {item.endTime}
                      </td>

                      <td className="listGearOfUser-table-height">
                        {item.total} (đ)
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
