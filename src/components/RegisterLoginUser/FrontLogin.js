import React, { Component, useState, useEffect } from "react";
import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import logo from "../Assets/Images/Logo.png";
import CommonBtn from "../CommonButton";

function FrontLogin() {
  //States
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  // const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const validateEmail = () => {
  //   if (emailRegex.test(formData.email)) {
  //     // alert('Valid email address');
  //   } else {
  //     alert("Invalid email address");
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    // alert("SignIn Hit");
    event.preventDefault();
    axios
      .post("https://b8rliving.com/agent/signin", formData)
      .then((response) => {
        // console.log(response.data);
        // setData(response.data);

        // alert(response.data.data.jwtToken);
        // alert(response.data.data.user.name);
        // console.log(response.data.data);

        const token = response.data.data.jwtToken;
        const name = response.data.data.agent.name;
        const phone = response.data.data.agent.phone;
        const inviteCode = response.data.data.agent.inviteCode;
        console.log(inviteCode.substring(0, 2));

        //set JWT token to local
        // if (typeof localStorage !== 'undefined') {
          // localStorage is available
          // Your code using localStorage goes here
          localStorage.setItem("token", token);
          localStorage.setItem("username", name);
          localStorage.setItem("phone", phone);
        // } else {
        //   // localStorage is not available or disabled
        //   // Handle this situation gracefully
        //    alert("Localstorage");
        // }


        //set token to axios common header
        //  setAuthToken(token);

        alert("You're Logged In");
        //redirect user to Dashboard
        if(inviteCode.substring(0, 2) == "FA"){
          window.location.href = "/FieldAgentHomeN";
        }

        if(inviteCode.substring(0, 2) == "PA"){
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        console.log(error);
        // handle the error
        alert(error.response.data.message);
      });
  };

  // console.log(data);

  // const styles = {
  //   backgroundColor:"white",
  //   padding: "10px",
  //   borderRadius: "5px",
  //   border: "1px solid grey",
  //   boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
  // };

  return (
    <>
      <div className="login-page">
        <div
          class="form"
          style={{
            borderRadius: "16px",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${backgroundSecond})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            width: "100%",
            
          }}
        >
          <div className="MainLogoDesign">
            <Link to="/dashboard">
              <img src={logo} height={40} alt="fireSpot" />
            </Link>
          </div>
          <h3 className="Htitle">Agent Sign In</h3>

          <form onSubmit={handleSubmit} className="login-form">
            {/* phone */}
            <label htmlFor="phoneNumber" className="label-phone">
              Mobile Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              className="input-field"
              required
            />

            {/* Password */}
            <label htmlFor="password" className="label-password">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="input-field"
              required
            ></input>

            {/* Submit */}
            <Link to="/Resetpassword">
              <p className="message">
                Forgot password? <t className="messageUnderline"> Click here</t>
              </p>
            </Link>

            {/* <button className="CommonnButton">Sign In <img className="vectorSignIn" src={vector} alt="fireSpot"/></button> */}
              <CommonBtn title="Sign In" margin="25%" fontweight="bolder" />

            <Footer />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
export default FrontLogin;
