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
import ConsumerProtection from "./pages/ConsumerProtection";
import ConsumerProtectionPrivacyPolicy from "./pages/ConsumerProtectionPrivacyPolicy";
import ConsumerProtection1VBProducts from "./pages/ConsumerProtection1VBProducts";
import ConsumerProtectionProductRequirements from "./pages/ConsumerProtectionProductRequirements";
import AboutUs from "./pages/AboutUs";
import OneVBAdvisory from "./pages/OneVBAdvisory";
import Newsletter from "./pages/Newsletter";
import Deposits from "./pages/Deposits";
import Loans from "./pages/Loans";
import PropertiesForSale from "./pages/PropertiesForSale";
import ContactUs from "./pages/ContactUs";

function App() {
  const [count, setCount] = useState(0);

  const routes = [
    { component: <HomePage />, route: "/" },
    { component: <ConsumerProtection />, route: "/consumer-protection" },
    {
      component: <ConsumerProtectionPrivacyPolicy />,
      route: "/consumer-protection/privacy-policy",
    },
    {
      component: <ConsumerProtection1VBProducts />,
      route: "/consumer-protection/1vb-products",
    },
    {
      component: <ConsumerProtectionProductRequirements />,
      route: "/consumer-protection/product-requirements",
    },
    {
      component: <AboutUs />,
      route: "/about-us",
    },
    {
      component: <OneVBAdvisory />,
      route: "/1vb-advisory",
    },
    {
      component: <Newsletter />,
      route: "/newsletter",
    },
    {
      component: <Deposits />,
      route: "/deposits",
    },
    {
      component: <Loans />,
      route: "/loans",
    },
    {
      component: <PropertiesForSale />,
      route: "/properties-for-sale",
    },
    {
      component: <ContactUs />,
      route: "/contact-us",
    },
  ];

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
