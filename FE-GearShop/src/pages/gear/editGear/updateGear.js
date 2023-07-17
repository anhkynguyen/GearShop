import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { storage } from "../../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory } from "../../../services/categoryService";
import {
  findGearById,
  getAllGearOfUser,
  updateGear,
} from "../../../services/gearService";
import "./updateGear.css";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateGear() {
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const userId = user.userId;
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
                setUrls("");
                setUrls(downloadURLs);
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
  const handleEdit = (values) => {
    let data = [{ ...values, image: urls }, gearId];
    dispatch(updateGear(data))
      .then(() => {
        dispatch(getAllGearOfUser(userId));
      })
      .then((value) => {
        toast("Cập nhật sản phẩm thành công");
        navigate("/user/my-gear");
      });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gearId } = useParams();

  const gearById = useSelector((state) => {
    if (state.gear.gearById !== undefined) {
      return state.gear.gearById;
    }
  });
  const categories = useSelector((state) => {
    return state.category.category;
  });
  useEffect(() => {
    dispatch(findGearById(gearId)).then((e) => {
      setUrls(e.payload.image);
    });
    dispatch(getAllCategory());
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          gearName: gearById.gearName,
          price: gearById.price,
          description: gearById.description,
          categoryId: gearById.categoryId,
        }}
        onSubmit={(values) => {
          handleEdit(values);
        }}
      >
        <Form>
          {" "}
          <div className="updateGear">
            <div className="updateGear-form">
              <div className="row">
                <div className="col-12">
                  <div className="update-form-title">
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
                  <img className="update-form-img" src={urls} alt={urls} />

                  <div className="form__update-btn-img">
                    <input
                      className="update-form-img-upload"
                      type="file"
                      multiple
                      onChange={handleChange}
                    />
                    <button
                      className="form__update-btn-submit-img"
                      type="button"
                      onClick={() => dispatch(handleUpload)}
                    >
                      {" "}
                      Tải lên
                      <i class="fa-solid fa-upload form__update-btn-icon"></i>
                    </button>
                  </div>
                </div>
                <div className="col-7">
                  <div className="update-form-update">
                    <h4 className="update-form-update-text">Tên sản phẩm</h4>
                    <Field
                      type="text"
                      className="update-form-update-input"
                      name={"gearName"}
                    />
                    <h4 className="update-form-update-text">Giá</h4>
                    <Field
                      type="text"
                      className="update-form-update-input"
                      name="price"
                    />{" "}
                    <h4 className="update-form-update-text">Mô tả</h4>
                    <Field
                      type="text"
                      component="textarea"
                      className="update-form-update-input-description"
                      name={"description"}
                    />
                    <Field as="select" name={"categoryId"}>
                      <option value="categoryId">Chọn thể loại</option>
                      {categories !== undefined &&
                        categories.map((item, index) => (
                          <option value={item.categoryId}>
                            {index + 1}. {item.nameOfCategory}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <div className="form__update-btn">
                    <button className="form__update-btn-submit" type="submit">
                      Sửa
                      <i class="fa-solid fa-file-import form__update-btn-icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <ToastContainer />
        </Form>
      </Formik>
    </>
  );
}
