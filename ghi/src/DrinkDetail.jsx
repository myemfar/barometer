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
import "./DrinkDetail.css";
import fillupload from "./images/fillupload.gif";

const DrinkDetail = () => {
  const params = useParams();
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
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drink Detail</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div>
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
        <div className="card">
          <img
            src={drink.image_url}
            className="card-img-top rounded mx-auto d-block"
            alt={drink.name}
            style={{ maxHeight: "500px", width: "500px" }}
          />

          <div className="card-body">
            <h5 className="card-title">{drink.name}</h5>
            <p className="card-text">{drink.descriptions}</p>
            <p className="card-text">{drink.instructions}</p>
          </div>
          <div>
            <h3 className="display-5 fw-bold">Recipe</h3>
            <NavLink
              aria-current="page"
              to={`/drinks/${params.id}/update`}
              className="btn btn-primary"
              style={{
                display:
                  !tokenData || tokenData.id !== drink.user_id
                    ? "none"
                    : "inline-block",
              }}
            >
              Update Drink
            </NavLink>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Picture</th>
                  <th>Amount</th>
                  <th>Actions</th>
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;
