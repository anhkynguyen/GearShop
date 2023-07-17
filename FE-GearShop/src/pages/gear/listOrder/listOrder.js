import { useDispatch, useSelector } from "react-redux";
import "./listOder.css";
import { deleteGear, getAllGearOfUser } from "../../../services/gearService";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { deleteOrder, getMyOrder } from "../../../services/orderService";
import {
  createOrderDetail,
  getAllOrderDetail,
} from "../../../services/orderDetailServices";

export default function ListOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    console.log(state.user.currentUser.userId, 777);
    return state.user.currentUser.userId;
  });
  const myOrder = useSelector((state) => {
    console.log(state.order.myOrder, 888);
    return state.order.myOrder;
  });

  useEffect(() => {
    dispatch(getMyOrder(userId));
  }, []);
  let [startTime, setStartTime] = useState("");
  let [endTime, setEndTime] = useState("");

  return (
    <>
      <div className="listGearOfUser1">
        <div className="container">
          <div className="row">
            <table class="table table-primary">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="listGearOfUser__td1">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="listGearOfUser__td1">
                    Hình ảnh
                  </th>
                  <th scope="col" className="listGearOfUser__td1"></th>
                  <th scope="col" className="listGearOfUser__td1">
                    Thời gian thuê
                  </th>{" "}
                  <th scope="col" className="listGearOfUser__td1">
                    Giá
                  </th>
                  <th scope="col" className="listGearOfUser__td1">
                    Tùy chọn
                  </th>
                </tr>
              </thead>
              {myOrder.map((item, key) => {
                return (
                  <tbody>
                    <tr>
                      <th className="listGearOfUser-table-height1" scope="row">
                        {key + 1}
                      </th>
                      <td className="listGearOfUser-table-height1">
                        {item.gearName}
                      </td>
                      <td className="listGearOfUser-table-height1" colSpan={2}>
                        <img
                          className="listGearOfUser__img1"
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td className="listGearOfUser-table-height1">
                        <input
                          type="date"
                          onChange={(e) => {
                            setStartTime(e.target.value);
                          }}
                        ></input>

                        <input
                          type="date"
                          onChange={(e) => {
                            setEndTime(e.target.value);
                          }}
                        ></input>
                      </td>
                      <td className="listGearOfUser-table-height1">
                        {item.price} (đ)
                      </td>

                      <td className="listGearOfUser-button-btn-list1 listGearOfUser-table-height1">
                        <div className="listGearOfUser-button-btn-list-item1">
                          <button
                            className="listGearOfUser-button1"
                            onClick={() => {
                              swal({
                                title: "Bạn muốn thuê sản phẩm này không",
                                text: " Nhấn OK để đồng ý !",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willCheck) => {
                                if (willCheck) {
                                  let gearId = item.gearId;
                                  let orderId = item.orderId;
                                  let data = {
                                    startTime: startTime,
                                    endTime: endTime,
                                    gearId: gearId,
                                    orderId: orderId,
                                  };
                                  dispatch(createOrderDetail(data)).then(
                                    (e) => {
                                      console.log(e);
                                      if (e.payload === "Wrong Start Time") {
                                        swal({
                                          title: "Chọn lại thời gian bắt đầu !",
                                          text: " Nhấn OK để đồng ý !",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                        });
                                      }
                                      if (e.payload === "Wrong End Time") {
                                        swal({
                                          title:
                                            "Chọn lại thời gian kết thúc !",
                                          text: " Nhấn OK để đồng ý !",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                        });
                                      }
                                    }
                                  );
                                  swal({
                                    title: "Xác nhận đơn hàng thành công !",
                                    icon: "success",
                                  });
                                } else {
                                  swal({
                                    title: "Hủy thao tác thành công !",
                                    icon: "error",
                                  });
                                }
                              });
                            }}
                          >
                            <i class="fa-solid fa-check"> </i>
                          </button>
                        </div>
                        <div className="listGearOfUser-button-btn-list-item1">
                          <button
                            className="listGearOfUser-button1"
                            onClick={() => {
                              swal({
                                title:
                                  "Bạn muốn xóa sản phẩm này khỏi giỏ hàng không ?",
                                text: "Khi xóa không thể phục hồi ! Nhấn OK để đồng ý !",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  dispatch(deleteOrder(item.orderId)).then(
                                    () => {
                                      dispatch(getMyOrder(item.userId)).then(
                                        () => {
                                          navigate("/my-order");
                                        }
                                      );
                                    }
                                  );
                                  swal({
                                    title: "Xóa thành công !",
                                    icon: "success",
                                  });
                                } else {
                                  swal({
                                    title: "Hủy thao tác xóa !",
                                    icon: "error",
                                  });
                                }
                              });
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
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
