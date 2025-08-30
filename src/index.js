import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./Navigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./notFound.jsx";
import Home from "./Home.jsx";
import CountrySearch from "./CountrySearch.jsx";
import Detail from "./Detail.jsx";
import Filter from "./Filter.jsx";
import About from "./About.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="countrySearch" element={<CountrySearch />} />
          <Route path="countrySearch/:name" element={<Detail />} />

          <Route path="countryFilter" element={<Filter />} />

          <Route path="about" element={<About />} />

          {/* //Kalo path yang dicari ga ada diatas */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
