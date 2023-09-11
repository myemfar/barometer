import {
  useGetDrinkByIDQuery,
  useCreateDrinkTagsMutation,
  useGetTagsQuery,
  useGetRecipeForDrinkQuery,
  useDeleteRecipeMutation,
  useDeleteDrinkTagMutation,
  useGetDrinkTagsByDrinkQuery,
  useGetTokenQuery,
} from "./app/apiSlice";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import { openModal } from "./app/modalSlice";
import { useDispatch } from "react-redux";

const DrinkDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data: tokenData, isLoading: tokenDataLoading } = useGetTokenQuery();
  const { data: drinkTagsByDrink, isLoading: drinkTagsLoading } =
    useGetDrinkTagsByDrinkQuery(params.id, {
      skip: !tokenData,
    });
  const [deleteDrinkTags] = useDeleteDrinkTagMutation();
  const [createDrinkTags] = useCreateDrinkTagsMutation();
  const { data: drink, isLoading: drinksLoading } = useGetDrinkByIDQuery(
    params.id
  );
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();
  const { data: steps, isLoading: stepsLoading } = useGetRecipeForDrinkQuery(
    params.id
  );
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  if (
    drinksLoading ||
    tagsLoading ||
    stepsLoading ||
    drinkTagsLoading ||
    tokenDataLoading
  )
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );

  const handleRecipeDelete = (e) => {
    const drink = params.id;
    const recipe = e.target.value;
    if (!drink || !recipe) {
      alert("Invalid drink or recipe value");
      return;
    }
    deleteRecipe({ drink_id: drink, recipe_id: recipe })
      .unwrap()
      .then(() => {
        alert("Recipe succesfully deleted");
      })
      .catch(() => {
        alert("recipe not deleted");
      });
  };

  const handleTagDelete = (e) => {
    const tagData = { tag_id: e.target.value, drink_id: params.id };
    deleteDrinkTags(tagData);
  };

  const handleButton = (e) => {
    const tagData = { tag_id: e.target.value, drink_id: params.id };
    createDrinkTags(tagData);
  };
  return (
    <div className="drink-detail-container drink-font">
      <div className="drink-container px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold drink-font">{drink.name}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 drink-font">Drink Details</p>
        </div>
        <div>
          <div className="button-container">
            {tokenData &&
              tags &&
              tags.map((item) => (
                <div key={item.id}>
                  {drinkTagsByDrink?.drink_tags?.some(
                    (tag) => tag.tag_id === item.id
                  ) ? (
                    <button
                      className="btn btn-danger"
                      onClick={handleTagDelete}
                      value={item.id}
                    >
                      Remove {item.tag_name}{" "}
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleButton}
                      value={item.id}
                    >
                      {item.tag_name}{" "}
                    </button>
                  )}
                </div>
              ))}
          </div>

          <div className="text-bg-dark mb-3">
            <img
              src={drink.image_url}
              className="card-img-top rounded"
              alt={drink.name}
              style={{ maxHeight: "500px", maxWidth: "1000px" }}
            />

            <div className="card-body text-bg-dark mb-3">
              <div>
                <p className="card-text">{drink.description}</p>
              </div>
              <NavLink
                aria-current="page"
                to={`/drinks/${params.id}/update`}
                className="btn btn-primary"
                onClick={handleOpenModal}
                style={{
                  display:
                    !tokenData || tokenData.id !== drink.user_id
                      ? "none"
                      : "inline-block",
                }}
              >
                Update Drink
              </NavLink>
              <div className="instructions">
                <h5 className="card-text text-left">Instructions</h5>
                <p className="card-text text-left">{drink.instructions}</p>
              </div>
            </div>
            <div>
              <h3 className="display-5 fw-bold">Recipe</h3>
              <NavLink
                className="btn btn-primary mx-2"
                aria-current="page"
                to={`/drinks/recipes/${drink.name}`}
                onClick={handleOpenModal}
                style={{
                  display:
                    !tokenData || tokenData.id !== drink.user_id
                      ? "none"
                      : "inline-block",
                }}
              >
                Add Ingredients
              </NavLink>
              <table className="table table-dark add-padding table-striped">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Picture</th>
                    <th>Amount</th>
                    {tokenData && tokenData.id == drink.user_id && (
                      <th>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {steps &&
                    steps.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.image_url}
                            alt={item.name}
                            style={{ maxHeight: "100px", width: "auto" }}
                          />
                        </td>
                        <td>{item.quantity}</td>
                        {tokenData && tokenData.id == drink.user_id && (
                          <td>
                            <button
                              onClick={handleRecipeDelete}
                              value={item.id}
                              key={item.id}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        )}
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

export default DrinkDetail;
