import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGetDrinkQuery } from "./app/apiSlice";
import { NavLink } from "react-router-dom";
import dummyData from "./dummyData";

function RandomDrinkCarousel() {
  const { data: drinks, isLoading: drinksLoading } = useGetDrinkQuery();

  if (drinksLoading) return <div>Loading..</div>;
  const drinkSubset = drinks.slice(0, 50);
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffledDrinks = shuffleArray(drinkSubset);

  const random5Drinks =
    shuffledDrinks.length > 0
      ? shuffledDrinks.slice(0, 5)
      : dummyData.slice(0, 5);
  return (
    <div className="carousel-wrapper-123custom">
      <Carousel>
        {random5Drinks.map((drink, index) => (
          <Carousel.Item key={index}>
            <img src={drink.image_url} alt={drink.name} />
            <Carousel.Caption>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 mx-auto">
                    <div
                      className="text-white p-3 rounded shadow"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    >
                      <p>{drink.description}</p>
                      {shuffledDrinks.length > 0 ? (
                        <NavLink
                          className="btn btn-secondary"
                          to={`/drinks/${drink.id}`}
                        >
                          {drink.name}
                        </NavLink>
                      ) : (
                        <button className="btn btn-secondary">
                          {drink.name}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default RandomDrinkCarousel;
