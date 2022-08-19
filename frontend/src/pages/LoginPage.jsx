import React, { useEffect, useState } from "react";
import { exportImages } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate]);

  const submitHandler = async () => {
    // e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", data.email);
      localStorage.setItem("jwt", data.token);

      navigate("/home");
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <div className="login__page-container">
        <img src={exportImages.logo} alt={exportImages.logo} />
        {error && <ToastContainer />}
        {loading && <Loader />}
        <form className="login__page-inputs">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p />
          <input
            style={{ marginTop: "5px" }}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="login__page-button">
          <button onClick={submitHandler} type="submit">
            Login
          </button>
        </div>
        <div className="login__page-footer">
          <p>
            Don't have an account ? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
