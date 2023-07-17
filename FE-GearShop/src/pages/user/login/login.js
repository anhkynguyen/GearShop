import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login.css";
import { Field, Form, Formik } from "formik";
import { login } from "../../../services/userSevice";
import swal from "sweetalert";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    await dispatch(login(data)).then((e) => {
      if (e.payload !== "User not found" || e.payload !== "Wrong password") {
        navigate("/home");
      }
      if (e.payload === "User not found") {
        swal({
          title: "Tài khoản không tồn tại  !",
          icon: "error",
          text: "Bạn chưa có tài khoản hãy tạo tài khoản mới ngay bây giờ ",
        }).then(navigate("/"));
      }
      if (e.payload === "Wrong password") {
        swal({
          title: "Sai mật khẩu! Vui lòng nhập lại mật khẩu !",
          icon: "warning",
        }).then(navigate("/"));
      }
    });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className="login">
        <div className="login__form">
          <div className="login__form-logo">
            <img
              className="login__form-logo-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/2560px-XBOX_logo_2012.svg.png"
              alt=""
            />
          </div>
          <h3 className="login__form-text">Đăng nhập</h3>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(data) => {
              handleLogin(data);
            }}
          >
            <Form>
              <div className="login__form-info">
                <Field
                  className="login__form-info-input"
                  type="text"
                  placeholder=" Tên đăng nhập"
                  name="username"
                />
                <Field
                  className="login__form-info-input"
                  type="password"
                  placeholder=" Mật khẩu"
                  name="password"
                />{" "}
                <a className="login__form-changePassword" href="/">
                  Đổi mật khẩu ?
                </a>
                <button type="submit" className="login__form-button">
                  ĐĂNG NHẬP
                </button>
                <a className="login__form-changePassword" href="/register">
                  {" "}
                  Đăng kí tài khoản mới ?
                </a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
