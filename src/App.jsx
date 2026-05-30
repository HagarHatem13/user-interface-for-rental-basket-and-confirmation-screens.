import React from "react";
import {Routes, Route } from "react-router-dom";

import BasketPage from "./pages/BasketPage";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import HomePage from "./pages/HomePage";

const App = () => (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/basket/confirmation" element={<ConfirmationPage />} />
      </Routes>
);

export default App;