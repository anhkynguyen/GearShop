import { useEffect } from "react";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../../../services/userSevice";
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const profile = useSelector((state) => {
    return state.user.profile;
  });
  const userId = user.userId;
  useEffect(() => {
    dispatch(getMyProfile(userId));
  }, []);
  return (
    <>
      <div className="profile">
        <div className="profile__form">
          <div className="row">
            <div className="col-5">
              <img className="profile__img" src={profile.avatar} alt="" />
              <button>Đổi ảnh đại diện</button>
            </div>
            <div className="col-7">
              <div className="profile__info">
                <div className="profile__info-title">THÔNG TIN CÁ NHÂN</div>
                <div className="profile__info-name">
                  <i class="fa-solid fa-user profile__info-icon"></i>{" "}
                  {profile.username}
                </div>
                <div className="profile__info-phone">
                  <i class="fa-solid fa-phone profile__info-icon"></i>{" "}
                  {profile.phone}
                </div>
              </div>
              <button className="">Đổi mật khẩu</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
