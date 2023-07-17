import "../createGear/createGear.css";
import { useEffect, useState } from "react";
import { storage } from "../../../upload/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { getAllCategory } from "../../../services/categoryService";
import { Field, Formik, Form } from "formik";
import { createGear } from "../../../services/gearService";
import swal from "sweetalert";
export default function CreateGear() {
  const dispatch = useDispatch();
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
                setUrls((prevState) => [...prevState, downloadURLs]);
                console.log("File available at", downloadURLs);
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };
  const categories = useSelector((state) => {
    return state.category.category;
  });
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const handleCreateGear = async (values) => {
    let data = { ...values, idUser: user.userId };
    console.log(data, 333);
    await dispatch(createGear(data));
  };
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          gearName: "",
          price: "",
          description: "",
          image: "",
          categoryId: "",
        }}
        onSubmit={(data) => {
          data.image = urls[0];
          data.userId = user.userId;
          handleCreateGear(data);
        }}
      >
        <Form>
          <div className="createGear">
            <div className="createGear-form">
              <div className="row">
                <div className="col-12">
                  <div className="create-form-title">
                    <img
                      className="login__form-logo-img "
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/2560px-XBOX_logo_2012.svg.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <img className="create-form-img" src={urls[0]} alt="" />

                  <div className="form__create-btn-img">
                    <Field
                      className="create-form-img-upload"
                      type="file"
                      onChange={handleChange}
                      name={"image"}
                    />
                    <button
                      className="form__create-btn-submit-img"
                      onClick={() => dispatch(handleUpload)}
                    >
                      {" "}
                      Tải lên
                      <i class="fa-solid fa-upload form__create-btn-icon"></i>
                    </button>
                  </div>
                </div>
                <div className="col-7">
                  <div className="create-form-create">
                    <h4 className="create-form-create-text">Tên sản phẩm</h4>
                    <Field
                      type="text"
                      className="create-form-create-input"
                      name="gearName"
                    />
                    <h4 className="create-form-create-text">Giá</h4>
                    <Field
                      type="text"
                      className="create-form-create-input"
                      name="price"
                    />{" "}
                    <h4 className="create-form-create-text">Mô tả</h4>
                    <Field
                      type="text"
                      component="textarea"
                      className="create-form-create-input-description"
                      name="description"
                    />
                    <Field as="select" name="categoryId">
                      <option value="categoryId">Chọn thể loại</option>
                      {categories !== undefined &&
                        categories.map((item, index) => (
                          <option value={item.categoryId}>
                            {index + 1}. {item.nameOfCategory}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <div className="form__create-btn">
                    <button className="form__create-btn-submit" type="submit">
                      Thêm
                      <i class="fa-solid fa-file-import form__create-btn-icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </Form>
      </Formik>
    </>
  );
}
