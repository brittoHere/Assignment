import React from "react";
import { exportImages } from "../constants";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  return (
    <div className="header__container">
      <div className="header__content">
        <span className="header__logo">
          <a href="/home">
            <img src={exportImages.logo} alt={exportImages.logo} />
          </a>
        </span>
        <div className="mobile__avatar-profile">
          <span>
            <i className="fa-solid fa-id-card"></i>
          </span>
        </div>
        <div className="header__search">
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <div className="header__search-icon">
            <img src={exportImages.searchIcon} alt={exportImages.searchIcon} />
          </div>
        </div>
        <nav className="header__nav">
          <ul className="header__nav__list-wrap">
            <li className="active">
              <div>
                <img src={exportImages.navHome} alt={exportImages.navHome} />
                <span>Home</span>
              </div>
            </li>
            <li>
              <div>
                <img
                  src={exportImages.navNetwork}
                  alt={exportImages.navNetwork}
                />
                <span>My Network</span>
              </div>
            </li>
            <li>
              <div>
                <img src={exportImages.navJobs} alt={exportImages.navJobs} />
                <span>Jobs</span>
              </div>
            </li>
            <li>
              <div>
                <img
                  src={exportImages.navMessaging}
                  alt={exportImages.navMessaging}
                />
                <span>Messaging</span>
              </div>
            </li>
            <li>
              <div>
                <img
                  src={exportImages.navNotifications}
                  alt={exportImages.navNotifications}
                />
                <span>Notifications</span>
              </div>
            </li>
            <li>
              <div className="avatar">
                {/* <img src={profilePic} alt={profilePic} /> */}

                <span>{userInfo}</span>
                <img src={exportImages.downIcon} alt={exportImages.downIcon} />
              </div>
              <div className="mobile__avatar-signout">
                <span>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
              </div>

              <div className="sign__out-container">
                <p
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("jwt");
                    navigate("/login");
                  }}
                >
                  Sign Out
                </p>
                <div>
                  <p
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
