import React, { Component, useState, useEffect } from "react";
import vector from "./Assets/Images/RegisterLoginUser/vector.png";
// import vector from "./Assets/Images/RegisterLoginUser/vector.png"
import "./commonHeader.css";
import { Link } from "react-router-dom";

import logo from "./Assets/Images/Logo.png";

function CommonHeader(props) {

  const { title, color } = props;

  // console.log(props.title);
  const [isLogin, setIsLogin] = useState(false);
  const [letter, setletter] = useState("");
 
  const username = localStorage.getItem("username");
  // const username = "Aparajita";

  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      // console.log(isLogin);
      let letter = username.charAt(0);
      // console.log(letter);
      setletter(letter);
    } else {
      setIsLogin(false);
      // console.log(isLogin);
    }
  });

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("Value hit");
    localStorage.removeItem("token");
    alert("You have been logged out.");
    //redirect user to UploadPhotos
    window.location.href = "/FrontLogin";
  };

  return (
    <>
      {/* <h1>commonHeader</h1> */}
      <div className="headerClassContainer">
        
        <div className="MainLogo">
          <Link to="/dashboard">
            <img src={logo} height={35} alt="fireSpot" />
          </Link>
        </div>

        <div>
          <p className="Headtitle" style={{ color : color || 'black'}}> {title} </p>
        </div>

        <div>
          <div>
            {/* <img style={{ marginBottom: '-24px' }}
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZNJREFUaEPtmA1uwyAMhd2TrTtZt5O1PdmqpwUJTQH/PGeECqSoSAXiz34GnItM3i6T2y8LYHQEj4jAVUTwfGxw6H9v/YeI4Elr2QBfInJTrAMMxqW0LAB4GYbj19o+M6KRBfBjtboaBykBgmoZABbZtIyk5cQCQDJ3yoW/UQgnNgvAeL9wU1E4AwCVCyxAJHn/Km4oAPTv2Tpb6RJ2ZHjiZkkGwPQ5MBRg+m0USmK2Usr7eDmbAyUpo7lAv59eoLoye05kbJ3wfvgELp7LAijrWeREy6bei7MBsHYpaNDHFbt4+bn1aa8fDUDe7XzTj4iAzwJy9AIgHUhPZyOw9wXCYlRaYkcBIkW8BhbaXr0ARxheg7khPAAZFzctCuV/c51sBfhP410QVoCM0tHq" /> */}

            {isLogin ? (
              <button className="logbtn-round " onClick={handleLogout}>
                {/* {username}, Logout */}
                <p className="letter" style={{ color : color || 'black' }}>{letter}</p>
              </button>
            ) : (
              <Link to="/FrontLogin">
                <button className="logbtn-round" style={{ fontWeight: "300" }}>
                  Sign-In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CommonHeader;
