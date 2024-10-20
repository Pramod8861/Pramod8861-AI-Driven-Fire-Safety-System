import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import AboutPage from "./components/Pages/AboutPage";
import InsigntsPage from "./components/Pages/InsigntsPage";
import ErrorPage from "./components/Pages/404";
import RemotePage from "./components/Pages/RemotePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/remote" element={<RemotePage />} />
        <Route path="/insignts" element={<InsigntsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
