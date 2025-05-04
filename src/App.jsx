import { useState } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const navigationItems = [{ navItem: "HOME", link: "/" }];

  const routes = [{ component: <HomePage />, route: "/" }];

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.route}
              element={<Navbar>{route.component}</Navbar>}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
