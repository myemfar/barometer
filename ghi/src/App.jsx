import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
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


function App() {

  return (
    <div className="body-base">
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/drinks">
               <Route index element={<Drinks />} />
               <Route path="new" element={<DrinkForm />} />
               <Route path="recipes" element={<RecipeForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
