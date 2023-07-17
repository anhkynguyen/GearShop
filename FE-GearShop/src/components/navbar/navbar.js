import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { getAllCategory } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { createGear } from "../../services/gearService";
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const categories = useSelector((state) => {
    console.log(state, 2222);
    return state.category.category;
  });
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    if (images.length > 0) {
      images.map((image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURLs) => {
                setUrls([downloadURLs]);
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => toast("Tải ảnh lên thành công !"))
      .catch((err) => console.log(err));
  };

  const handleCreateGear = (values) => {
    let userId = user.userId;
    let data = { ...values, image: urls[0], userId: userId };
    console.log(data, 567);
    dispatch(createGear(data))
      .then((value) => {
        toast("Thêm mới thành công");
      })
      .then(() => {
        navigate("/home");
      });
  };
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar__container">
        <div class="container">
          <Link class="navbar-brand" to={"/home"}>
            <img
              className="navbar__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png"
              alt=""
            />
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active text-white  "
                  aria-current="page"
                  to={"/home"}
                >
                  Trang chủ
                </Link>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li> */}

              <li class="nav-item">
                <form class="d-flex " role="search">
                  <input
                    class="form-control me-2 navbar__form-search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn navbar__btn-search" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </li>
            </ul>

            <Formik
              initialValues={{
                gearName: "",
                price: "",
                description: "",
                image: "",
                categoryId: "",
              }}
              onSubmit={(values) => {
                handleCreateGear(values);
              }}
            >
              <Form>
                <div className="navbar__create">
                  <button
                    className="navbar__btn-create"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    type="button"
                  >
                    {" "}
                    <i class="fa-solid fa-pen-to-square"></i> ĐĂNG TIN
                  </button>
                  <div
                    class="modal fade  "
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg ">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            TẠO SẢN PHẨM MỚI
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div className="container">
                            <div className="row">
                              <div className="create__img-container col-4">
                                <img
                                  src={urls[0]}
                                  alt=""
                                  className="create__img"
                                />
                              </div>
                              <div className="create__form col-8">
                                {" "}
                                <label
                                  htmlFor=""
                                  className="create__form-title"
                                >
                                  Tên sản phẩm
                                </label>
                                <Field
                                  className="input create__form-input"
                                  type="text"
                                  name="gearName"
                                ></Field>
                                <label
                                  htmlFor=""
                                  className="create__form-title"
                                >
                                  Giá
                                </label>
                                <Field
                                  className="input create__form-input"
                                  type="text"
                                  name="price"
                                ></Field>
                                <label
                                  htmlFor=""
                                  className="create__form-title"
                                >
                                  Mô tả
                                </label>
                                <Field
                                  component="textarea"
                                  className="input create__form-input create__form-input-textarea"
                                  type="text"
                                  name="description"
                                ></Field>
                                <label
                                  className="create__form-title"
                                  htmlFor=""
                                >
                                  Thể loại
                                </label>
                                <Field as="select" name="categoryId">
                                  <option value="categoryId">
                                    Chọn thể loại
                                  </option>
                                  {categories !== undefined &&
                                    categories.map((item, index) => (
                                      <option value={item.categoryId}>
                                        {index + 1}. {item.nameOfCategory}
                                      </option>
                                    ))}
                                </Field>
                                <div className="create__upload-img">
                                  <div className="create__upload-img-choice">
                                    <label
                                      htmlFor=""
                                      className="create__form-title"
                                    >
                                      Chọn ảnh cho sản phẩm
                                    </label>
                                    <input
                                      onChange={handleChange}
                                      className="input create__form-input"
                                      type="file"
                                    ></input>
                                  </div>
                                  <div className="create__upload-img-btn">
                                    <button
                                      className="create__form-btn-upload"
                                      onClick={() => dispatch(handleUpload)}
                                      type="button"
                                    >
                                      Tải ảnh lên
                                    </button>
                                  </div>
                                </div>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="create__createGear-btn-close"
                            data-bs-dismiss="modal"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            class="create__createGear-btn"
                            data-bs-dismiss="modal"
                          >
                            Thêm mới sản phẩm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </Form>
            </Formik>
            <Link to={"/user/my-order"}>
              <div className="navbar__cart">
                <i class="fa-solid fa-cart-shopping fa-xl"></i>
              </div>{" "}
            </Link>
            <div class="nav-item dropdown ">
              <a
                class="nav-link  "
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="navbar__name">{user.username}</span>
                <img className="navbar__avatar" src={user.avatar} alt="" />
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/user/my-profile">
                    Tài khoản của tôi
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/user/my-gear">
                    Quản lý sản phẩm
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/user/my-order-detail">
                    Hóa đơn
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="/">
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
