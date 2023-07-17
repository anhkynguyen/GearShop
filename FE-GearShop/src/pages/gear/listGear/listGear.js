import "./listGear.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGear } from "../../../services/gearService";
import { Link } from "react-router-dom";
export default function ListGear() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const gears = useSelector((state) => {
    return state.gear.gears;
  });
  const userId = user.userId;
  useEffect(() => {
    dispatch(getAllGear(userId));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          {gears.map((item) => {
            return (
              <div className="col-3">
                <Link
                  className="card__link"
                  to={`/user/gear-detail/${item.gearId}`}
                >
                  <div class="card card__item">
                    <img
                      src={item.image}
                      class="card-img-top card__img"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.gearName}</h5>
                      <p class="card-text card__price">{item.price}(đ/ngày)</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
