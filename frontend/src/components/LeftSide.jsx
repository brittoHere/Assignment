import React from "react";
import "./LeftSide.scss";

const LeftSide = () => {
  const userInfo = localStorage.getItem("userInfo");
  return (
    <div className="left__side-container">
      <div className="left__side__art-card">
        <div className="left__side__user-info">
          <div className="left__side__card-bg">
            <div className="left__side__photo" />
            <div>
              <p>Welcome, {userInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
