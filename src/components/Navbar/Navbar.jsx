import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const PF = "http://localhost:5000/images/";
  const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user_data")));
    setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")));
  }, [])
  const signout = () => {
    setUser({});
    setLoggedin(false);
    window.localStorage.setItem("user_data", JSON.stringify({}));
    window.localStorage.setItem("loggedin", JSON.stringify(false));
    window.location.reload();
  };

  return (
    <>
      <div className="main">
        <Link className="link" to="/home">
          <img
            src="https://raw.githubusercontent.com/LAKSHYAJAIN16/assets/main/faviconpng.png"
            alt="logo"
            className="homeIcon"
          />
        </Link>
        <div className="left">
          <i className="icon fab fa-facebook-square" onClick={() => window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}></i>
          <i className="icon fab fa-twitter-square" onClick={() => window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}></i>
          <i className="icon fab fa-pinterest-square" onClick={() => window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}></i>
          <i className="icon fab fa-instagram-square" onClick={() => window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}></i>
        </div>
        <div className="center">
          <ul className="topList">
            <li className="topListItem ripple">
              <Link className="link" to="/home">
                HOME
              </Link>
            </li>
            <li className="topListItem ripple">
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/contact">
                CONTACT
              </Link>
            </li>
            <li className="topListItem ripple">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            <li className="topListItem ripple">
              <Link className="link" to="/explore">
                EXPLORE
              </Link>
            </li>
            <li className="topListItem">
              {loggedin ? (
                <Link className="link" to="/home" onMouseDown={signout}>
                  LOGOUT
                </Link>
              ) : (
                console.log("Not Signed in")
              )}
            </li>
          </ul>
        </div>
        <div className="right">
          {loggedin ? (
            <>
              <div>
                <img
                  className="image"
                  src={user.profilePic[0] === "h" ? user.profilePic : PF + user.profilePic}
                  alt="profile pic"
                  onMouseDown={() =>
                    window.location.replace("/userspec/" + user._id)
                  }
                />
                <i class="dbuttondown fas fa-chevron-circle-down" onMouseDown={() => setDropdown(!dropdown)}></i>
                {dropdown && (
                  <>
                    <div className="dropdown">
                      <button
                        className="dropdownButton"
                        onClick={() => window.location.replace("/settings")}>
                        <i class="dropdownIcon fas fa-user-cog userIcon"></i>
                        Credentials
                      </button>

                      <button
                        className="dropdownButton"
                        onClick={() => window.location.replace("/notifications")}>
                        <i class="dropdownIcon far fa-bell"></i>
                        Notifications
                      </button>

                      <button
                        className="dropdownButton"
                        onClick={() => window.location.replace("/monetization")}>
                        <i class="dropdownIcon fas fa-money-bill-wave"></i>
                        Monetization
                      </button>

                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )}
          <i
            className="searchIcon fas fa-search"
            onClick={() => window.location.replace("/search")}
          ></i>
        </div>
      </div>
      <hr className="navh1" />
    </>
  );
};

export default Navbar;
