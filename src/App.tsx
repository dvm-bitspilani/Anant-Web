import { useState } from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
