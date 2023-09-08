import RandomDrinkCarousel from "./RandomDrinkCarousel";

const MainPage = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Barometer</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">WE HELP U DRANK</p>
      </div>
      <div>
        <RandomDrinkCarousel />
      </div>
    </div>
  );
};

export default MainPage;
