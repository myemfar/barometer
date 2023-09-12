import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import Inventory from "./Inventory.jsx";
import Drinks from "./Drinks";
import Nav from "./Nav.jsx";
import MainPage from "./Home.jsx";
import DrinkForm from "./DrinkForm";
import RecipeForm from "./RecipeForm";
import DrinkDetail from "./DrinkDetail";
import InventoryForm from "./InventoryForm";
import DrinkUpdateForm from "./DrinkUpdateForm";
import RandomDrink from "./RandomDrink";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <div className="body-base">
      <BrowserRouter basename={basename}>
        <Nav />
        <div>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/inventory">
              <Route path="mine" element={<Inventory />} />
              <Route path="new" element={<InventoryForm />} />
            </Route>
            <Route path="/drinks">
              <Route index element={<Drinks />} />
              <Route path="new" element={<DrinkForm />} />
              <Route path="recipes/:drinkName" element={<RecipeForm />} />
              <Route path="random" element={<RandomDrink />} />
              <Route path=":id">
                <Route index element={<DrinkDetail />} />
                <Route path="update" element={<DrinkUpdateForm />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
