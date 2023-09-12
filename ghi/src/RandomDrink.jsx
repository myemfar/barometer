import {
  useGetTokenQuery,
  useCreateDrinkMutation,
  useCreateRecipeMutation,
} from "./app/apiSlice";
import { useGetRandomCocktailQuery } from "./app/cocktailDBSlice";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import { useDispatch } from "react-redux";

const RandomDrink = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data: tokenData, isLoading: tokenDataLoading } = useGetTokenQuery();
  const { data: randomDrink, isLoading: randomDrinkLoading } =
    useGetRandomCocktailQuery();

  if (randomDrinkLoading)
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );
  const fetchedDrink = randomDrink.drinks[0];
  //   const handleButton = (e) => {
  //     const tagData = { tag_id: e.target.value, drink_id: params.id };
  //     createDrinkTags(tagData);
  //  const for drink data to be submitted
  // const for recipe data to be submitted
  // createdrink(drink data)
  // create recipe(for loop iterating over each non-null recipe step)
  //   };
  const ingredientList = [];
  console.log(fetchedDrink);

  for (let i = 1; i <= 15; i++) {
    const ingredient_name = fetchedDrink[`strIngredient${i}`];
    const quantity = fetchedDrink[`strMeasure${i}`];

    if (ingredient_name) {
      if (!quantity) {
        quantity = "";
      }
      ingredientList.push({ ingredient_name, quantity });
    }
  }

  console.log(ingredientList);
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
                <h5 className="card-text text-left">Instructions</h5>
                <p className="card-text text-left">
                  {fetchedDrink.strInstructions}
                </p>
              </div>
            </div>
            <div>
              <h3 className="display-5 fw-bold">Recipe</h3>
              <table className="table table-dark add-padding table-striped">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    {tokenData && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {ingredientList &&
                    ingredientList.map((item) => (
                      <tr key={item.ingredient_name}>
                        <td>{item.ingredient_name}</td>
                        <td>{item.quantity}</td>
                        {/* {tokenData && (
                          <td>
                            <button
                              onClick={handleButton}
                              value={item.id}
                              key={item.id}
                              className="btn btn-primary"
                            >
                              Add drink
                            </button>
                          </td>
                        )} */}
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
