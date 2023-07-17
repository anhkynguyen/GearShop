import { useDispatch, useSelector } from "react-redux";
import "./gearDetail.css";
import { useEffect } from "react";
import { findGearById } from "../../../services/gearService";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../../services/orderService";
import swal from "sweetalert";

export default function GearDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gearId } = useParams();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const userId = user.userId;

  const gearById = useSelector((state) => {
    if (state.gear.gearById !== undefined) {
      return state.gear.gearById;
    }
  });

  useEffect(() => {
    dispatch(findGearById(gearId));
  }, []);
  const handleCreateOder = (values) => {
    let data = { gearId: +gearId, userId: userId };
    dispatch(createOrder(data)).then((e) => {
      if (e.payload === "Already Exists") {
        swal({
          title: "Sản phẩm đã có trong giỏ hàng",
          text: " Vui lòng chọn sản phẩm khác hoặc thanh toán !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    });
  };
  return (
    <>
      <div className="gearDetail">
        <div className="gearDetail__form">
          <div className="row">
            <div className="col-12">
              <h3 className="gearDetail__form-title">CHI TIẾT SẢN PHẨM</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <img
                src={gearById.image}
                alt=""
                className="gearDetail__form-img"
              ></img>
            </div>
            <div className="col-7">
              <div className="gearDetail__form-content">
                <div className="gearDetail__form-content-item">
                  <h3 className="gearDetail__form-content-item-text">
                    {gearById.gearName}
                  </h3>
                </div>
                <div className="gearDetail__form-content-item"> </div>
                <div className="gearDetail__form-content-item">
                  <p className="gearDetail__form-content-item-textarea">
                    {gearById.description}
                  </p>
                </div>
              </div>
              <div className="gearDetail__form-content-footer">
                <button
                  className="gearDetail__form-content-footer-btn"
                  onClick={() => {
                    swal({
                      title: "Bạn muốn thêm sản phẩm này vào giỏ hàng không ?",
                      text: " Nhấn OK để đồng ý !",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        dispatch(handleCreateOder);
                        swal({
                          title: "Thêm thành công !",
                          icon: "success",
                        });
                      } else {
                        swal({
                          title: "Hủy thao tác !",
                          icon: "error",
                        });
                      }
                    });
                  }}
                >
                  <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
