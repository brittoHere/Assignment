import React from "react";
import { useState } from "react";
import { exportImages } from "../constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import axios from "axios";
import "./ProfilePage.scss";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/users/profile",
        {
          email,
        },
        config
      );
      localStorage.setItem("userInfo", data.email);
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
      <Header />
      <div className="profile__page-container">
        <div style={{ textAlign: "center" }}>
          <img src={exportImages.logo} alt={exportImages.logo} />
          {error && <ToastContainer />}
          {loading && <Loader />}
        </div>

        <form className="profile__page-inputs">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <div className="profile__page-button">
          <button onClick={submitHandler} type="submit">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
