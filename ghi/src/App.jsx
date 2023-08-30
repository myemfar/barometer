import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import Inventory from "./Inventory.jsx";
import Nav from "./Nav.jsx";
import MainPage from "./Home.jsx";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
