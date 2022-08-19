import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Home.scss";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

//cloudinary : https://api.cloudinary.com/v1_1/btmindustries/image/upload'

const Home = (props) => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);
  return (
    <>
      <Header />
      <div className="home__container">
        <section className="home__section">
          <h5>Hiring in a hurry ? - </h5>
          <p>Find out person's in upwork and keep business moving</p>
        </section>
        <div className="home__layout">
          <LeftSide />
          <Main />
          <RightSide />
        </div>
      </div>
    </>
  );
};

export default Home;
