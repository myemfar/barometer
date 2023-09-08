import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGetDrinkQuery } from "./app/apiSlice";
import { NavLink } from "react-router-dom";
import dummyData from "./dummyData";

function RandomDrinkCarousel() {
  const { data: drinks, isLoading: drinksLoading } = useGetDrinkQuery();

  if (drinksLoading) return <div>Loading..</div>;

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffledDrinks = shuffleArray(drinks);

  const random5Drinks = drinks.length > 0 ? drinks : dummyData.slice(0, 5);
  console.log(random5Drinks);
  return (
    <div className="carousel-wrapper-123custom">
      <Carousel>
        {random5Drinks.map((drink, index) => (
          <Carousel.Item key={index}>
            <img src={drink.image_url} alt={drink.name} />
            <Carousel.Caption>
              <p>{drink.description}</p>
              {drinks.length > 0 && (
                <NavLink
                  className="btn btn-secondary"
                  to={`/drinks/${drink.id}`}
                >
                  {drink.name}
                </NavLink>
              )}
              {drinks.length == 0 && (
                <button className="btn btn-secondary">{drink.name}</button>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default RandomDrinkCarousel;
