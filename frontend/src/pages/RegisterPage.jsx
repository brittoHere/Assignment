import React, { useState } from "react";
import { exportImages } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      toast.error(`Password doesn't match`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      setMessage(`password doesn't match`);
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:8000/api/users/register",
          {
            email,
            password,
          },
          config
        );

        setLoading(false);
        navigate("/login");
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
    }
  };
  return (
    <div className="register__page-container">
      <img src={exportImages.logo} alt={exportImages.logo} />
      {error && <ToastContainer />}
      {loading && <Loader />}
      {message && <ToastContainer />}

      <form className="register__page-inputs">
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
        <p />
        <input
          style={{ marginTop: "5px" }}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <div className="register__page-button">
        <button onClick={submitHandler} type="submit">
          Register
        </button>
      </div>
      <div className="register__page__footer">
        <p>
          Already have an account ? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
