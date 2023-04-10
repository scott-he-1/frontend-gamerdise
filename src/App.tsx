import "./App.css";
import React from "react";
import { useGamerdise } from "./providers/GamerdiseProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { PostAnItemPage } from "./pages/PostAnItemPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";

function App() {
  const loggedIn = localStorage.getItem("user");
  const currentAccountExists = JSON.parse(String(loggedIn));
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return currentAccountExists ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/confirmationPage" element={<ConfirmationPage />} />
            <Route
              path="/postAnItem"
              element={
                <PrivateRoute>
                  <PostAnItemPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
