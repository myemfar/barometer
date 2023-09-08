import RandomDrinkCarousel from "./RandomDrinkCarousel";

const MainPage = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto">
        <div className="container my-3">
          <div className="row">
            <div className="col-lg-4 mx-auto">
              <div
                className="text-white p-3 rounded shadow"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              >
                <h1 className="display-5 fw-bold">Barometer</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RandomDrinkCarousel />
      </div>
    </div>
  );
};

export default MainPage;
