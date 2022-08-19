import React from "react";
import { exportImages } from "../constants";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login__container">
      <nav className="login__navbar">
        <a href="/">
          <img src={exportImages.logo} alt={exportImages.logo} />
        </a>
        <div className="login__p">
          <a href="/register" className="join__now">
            Join now
          </a>
          <a href="/login" className="sign__in">
            Sign in
          </a>
        </div>
      </nav>
      <div className="login__proffesional-messages">
        <div className="login__h1-img">
          <h1>Welcome to your professional community</h1>
          <img src={exportImages.loginHero} alt={exportImages.loginHero} />
        </div>
        <div className="login__google__signin-container">
          <div className="login__google-img">
            <img src={exportImages.google} alt={exportImages.google} />
            <span>Sign in with google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
