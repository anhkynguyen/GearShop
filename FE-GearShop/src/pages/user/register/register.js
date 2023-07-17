import { Formik, Form, Field } from "formik";
import "./register.css";
import { useDispatch } from "react-redux";
import { register } from "../../../services/userSevice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async (data) => {
    await dispatch(register(data)).then((e) => {
      if (e.payload === "Register success") {
        swal({
          title: "Đăng ký thành công  !",
          icon: "success",
          text: "Bạn đã dăng ký tài khoản thành công vui lòng đăng nhập ",
        }).then(navigate("/login"));
      }
    });
  };
  return (
    <>
      <div className="register">
        <div className="register__form">
          <div className="register__form-logo">
            <img
              className="register__form-logo-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/2560px-XBOX_logo_2012.svg.png"
              alt=""
            />
          </div>
          <h3 className="register__form-text">Đăng Ký</h3>
          <Formik
            initialValues={{ username: "", password: "", phone: "" }}
            onSubmit={(data) => {
              handleRegister(data);
            }}
          >
            <Form>
              <div className="register__form-info">
                <Field
                  className="register__form-info-input"
                  type="text"
                  placeholder="Tên đăng nhập"
                  name="username"
                />
                <Field
                  className="register__form-info-input"
                  type="text"
                  placeholder="Mật khẩu"
                  name="password"
                />{" "}
                <Field
                  className="register__form-info-input"
                  type="text"
                  placeholder="Số điện thoại"
                  name="phone"
                />
                <button type="submit" className="register__form-button">
                  ĐĂNG KÝ
                </button>
                <a className="register__form-changePassword" href="/">
                  {" "}
                  Đăng nhập bằng tài khoản của bạn ?
                </a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
