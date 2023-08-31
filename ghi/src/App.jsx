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

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div className="body-base">
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/drinks" element={<Drinks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
