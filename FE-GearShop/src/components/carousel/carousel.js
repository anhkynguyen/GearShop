import "./carousel.css";
export default function Carousel() {
  return (
    <>
      <div className="container">
        {" "}
        <div className="carousel">
          <div className="row">
            <div className="col-12">
              {" "}
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active ">
                    <img
                      src="https://blogs.microsoft.com/wp-content/uploads/prod/sites/166/2020/11/LaunchPost_HERO.jpg"
                      class="d-block w-100 carousel__img "
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://ecdn.game4v.com/g4v-content/uploads/2020/01/Xbox-Game-Pass-1.jpg"
                      class="d-block w-100 carousel__img"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://photo2.tinhte.vn/data/attachment-files/2021/04/5418549_FB_IMG_1617334925772.jpg"
                      class="d-block w-100 carousel__img"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
