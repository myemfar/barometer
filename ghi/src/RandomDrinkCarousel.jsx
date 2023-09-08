import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGetDrinkQuery } from "./app/apiSlice";
import { NavLink } from "react-router-dom";

function RandomDrinkCarousel() {
  const { data: drinks, isLoading: drinksLoading } = useGetDrinkQuery();

  if (drinksLoading) return <div>Loading..</div>;

  // Function to shuffle an array randomly
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  }

  // Shuffle the drinks array randomly
  const shuffledDrinks = shuffleArray(drinks);

  // Select the first 5 drinks from the shuffled array
  const random5Drinks = shuffledDrinks.slice(0, 5);

  return (
    <div className="carousel-wrapper-123custom">
      <Carousel>
        {random5Drinks.map((drink, index) => (
          <Carousel.Item key={index}>
            <img src={drink.image_url} alt={drink.name} />
            <Carousel.Caption>
              <p>{drink.description}</p>
              <NavLink className="btn btn-secondary" to={`/drinks/${drink.id}`}>
                {drink.name}
              </NavLink>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default RandomDrinkCarousel;
