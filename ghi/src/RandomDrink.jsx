import {
  useGetTokenQuery,
  useCreateDrinkMutation,
  useCreateRecipeMutation,
} from "./app/apiSlice";
import { useGetRandomCocktailQuery } from "./app/cocktailDBSlice";
import fillupload from "./images/fillupload.gif";
import { useState } from "react";

const RandomDrink = () => {
  const { data: tokenData, isLoading: tokenDataLoading } = useGetTokenQuery();
  const {
    data: randomDrink,
    isLoading: randomDrinkLoading,
    refetch,
  } = useGetRandomCocktailQuery();
  const [drinkadd] = useCreateDrinkMutation();
  const [recipeadd] = useCreateRecipeMutation();

  const [fetchingNewDrink, setFetchingNewDrink] = useState(false);

  // Function to handle fetching a new random drink
  const handleFetchNewDrink = async () => {
    setFetchingNewDrink(true);

    try {
      // Refetch the random cocktail query
      await refetch();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setFetchingNewDrink(false);
    }
  };
  if (randomDrinkLoading || fetchingNewDrink || tokenDataLoading)
    return (
      <div className="centered-spinner">
        <img src={fillupload} alt="spinner" />
        <div>Pouring...</div>
      </div>
    );
  const fetchedDrink = randomDrink.drinks[0];
  const ingredientList = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient_name = fetchedDrink[`strIngredient${i}`];
    let quantity = fetchedDrink[`strMeasure${i}`];

    if (ingredient_name) {
      if (!quantity) {
        quantity = "";
      }
      ingredientList.push({ ingredient_name, quantity });
    }
  }

  const drinkData = {
    description: `${fetchedDrink.strAlcoholic} ${fetchedDrink.strCategory} in a ${fetchedDrink.strGlass}`,
    image_url: fetchedDrink.strDrinkThumb,
    instructions: fetchedDrink.strInstructions,
    name: fetchedDrink.strDrink,
  };
  const handleButton = async (e) => {
    try {
      const drinkResponse = await drinkadd(drinkData);

      if (drinkResponse.data) {
        for (const item of ingredientList) {
          const ingredientData = {
            drink_name: fetchedDrink.strDrink,
            ingredient_name: item.ingredient_name,
            quantity: item.quantity || "",
          };
          await recipeadd(ingredientData);
        }
      } else {
        console.error("Drink creation failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="drink-detail-container drink-font">
      <div className="drink-container px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold drink-font">
          {fetchedDrink.strDrink}
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 drink-font">Drink Details</p>
        </div>
        <div>
          <div className="text-bg-dark mb-3">
            <img
              src={fetchedDrink.strDrinkThumb}
              className="card-img-top rounded"
              alt={fetchedDrink.strDrink}
              style={{ maxHeight: "500px", maxWidth: "1000px" }}
            />

            <div className="card-body text-bg-dark mb-3">
              <div>
                <p className="card-text">
                  {fetchedDrink.strAlcoholic} {fetchedDrink.strCategory} in a{" "}
                  {fetchedDrink.strGlass}
                </p>
              </div>
              <div className="instructions">
                {tokenData && (
                  <button onClick={handleButton} className="btn btn-primary">
                    Add drink
                  </button>
                )}

                <p>
                  NOTE: Add drink will only add recipe steps for which
                  ingredients exist
                </p>
                <h5 className="card-text text-left">Instructions</h5>
                <p className="card-text text-left">
                  {fetchedDrink.strInstructions}
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleFetchNewDrink}>
                Pour New Drink
              </button>
            </div>
            <div>
              <h3 className="display-5 fw-bold">Recipe</h3>
              <table className="table table-dark add-padding table-striped">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientList &&
                    ingredientList.map((item) => (
                      <tr key={item.ingredient_name}>
                        <td>{item.ingredient_name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomDrink;
