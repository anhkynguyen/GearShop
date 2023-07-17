import "./myGear.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteGear,
  findGearById,
  getAllGearOfUser,
} from "../../../services/gearService";
import swal from "sweetalert";
import { Formik } from "formik";

export default function MyGear() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    return state.user.currentUser.userId;
  });
  const gearOfUser = useSelector((state) => {
    return state.gear.gearOfUser;
  });
  useEffect(() => {
    dispatch(getAllGearOfUser(userId));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {" "}
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Giá tiền (vnđ)</th>
                <th scope="col">Tùy chọn</th>
              </tr>
            </thead>
            {gearOfUser.map((item, key) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{item.gearName}</td>
                    <td>
                      <img
                        className="myGear__table-img"
                        src={item.image}
                        alt=""
                      />
                    </td>
                    <td>{item.price}(đ/h)</td>
                    <td>
                      <button
                        className="myGear__table-button"
                        onClick={() => {
                          swal({
                            title: "Bạn muốn xóa sản phẩm này không",
                            text: "Khi xóa không thể phục hồi ! Nhấn OK để đồng ý",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              dispatch(deleteGear(item.gearId)).then(() => {
                                dispatch(getAllGearOfUser(userId)).then(() => {
                                  navigate("/user/my-gear");
                                });
                              });
                              swal({
                                title: "Xóa thành công",
                                icon: "success",
                              });
                            } else {
                              swal({
                                title: "Hủy thao tác xóa",
                                icon: "error",
                              });
                            }
                          });
                        }}
                      >
                        <i class="fa-solid fa-xmark fa-xl"></i>
                      </button>

                      <Link to={`/user/updateGear/${item.gearId}`}>
                        <button
                          className="myGear__table-button"
                          onClick={() => {
                            dispatch(findGearById(item.gearId));
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square fa-lg"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
