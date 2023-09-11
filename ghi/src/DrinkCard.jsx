import React from 'react';
import { NavLink } from "react-router-dom";
import "./DrinkCard.css";



const DrinkCard = ({ item, tokenData, handleDrinkDelete, drinkTags }) => {



  return (
    <div className="col-md-4 mb-4">
      <div className="card card-container" >
        <img
          src={item.image_url}
          className="card-img-top card-image"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text"><strong>Instructions:</strong> {item.instructions}</p>
          {tokenData && (
            <div className= "card-text">
              <strong>Tags:</strong>{' '}
              {Array.isArray(drinkTags) && drinkTags.length > 0
                ? drinkTags
                    .filter((tag) => tag.drink_id === item.id)
                    .map((tag) => (
                      <span key={tag.id} className="badge bg-secondary me-1">
                        {tag.tag_name}
                      </span>
                    ))
                : "No tags available"}
            </div>
          )}
          <div className="mt-3">
            <NavLink className="btn btn-secondary me-2" to={`/drinks/${item.id}`}>
              Details
            </NavLink>
            {tokenData && item.user_id === tokenData.id && (
              <button
                onClick={handleDrinkDelete}
                className="btn btn-danger"
                value={item.id}
              >
                Delete Drink
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default DrinkCard;