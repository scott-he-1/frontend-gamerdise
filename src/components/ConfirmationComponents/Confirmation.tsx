import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Confirmation.css";

export const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container confirmationPage">
      <div className="confirmationMessage">
        <FontAwesomeIcon icon={faCircleCheck} />
        <div>Thank you for your purchase</div>
        <button onClick={() => navigate("/")}>Return To Homepage</button>
      </div>
    </div>
  );
};
