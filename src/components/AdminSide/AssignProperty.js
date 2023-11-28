import React, { Component, useState, useEffect } from "react";
// import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
// import vector from "../../../Assets/Images/RegisterLoginUser/vector.png";
import logo from "../Assets/Images/Logo.png";
import CommonBtn from "../CommonButton";

function AssignProperty() {
  //States
  const [formData, setFormData] = useState({
    fieldAgentId: "",
    propertyId: "",
  });
  const [data, setData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://b8rliving.com/property/assign", formData)
      .then((response) => {
        console.log(response.data);
        // setData(response.data);

        // alert(response.data.data.jwtToken);
        // alert(response.data.data.user.name);
        console.log(response.data.data);

        // const token = response.data.data.jwtToken;
        // const name = response.data.data.user.name;
        // const phone = response.data.data.user.phone;

        //set JWT token to local
        // localStorage.setItem("token", token);
        // localStorage.setItem("username", name);
        // localStorage.setItem("phone", phone);

        //set token to axios common header
        //  setAuthToken(token);

        alert("Property has been assigned to the Field Agent");
        //redirect user to Dashboard
        // window.location.href = "/SignUp";
      })
      .catch((error) => {
        console.log(error);
        // if (error.response && error.response.data) {
        //   const errorMessage = error.response.data.message;
        //   if (errorMessage.includes("E11000 duplicate key")) {
        //     alert("Entity Code already exists");
        //   } else {
        //     alert(error);
        //   }
        // }
        // alert(error.response.data.message);
        // handle the error
      });
  };

 

  return (
    <>
      <div className="login-page">
        <div
          class="form"
          style={{
            borderRadius: "16px",
            marginTop: "10%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${backgroundSecond})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="MainLogoDesign">
            <Link to="/dashboard">
              <img src={logo} height={40} alt="fireSpot" />
            </Link>
          </div>
          <h3 className="Htitle">Assign Property to Field Agent</h3>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Entity */}
            <label htmlFor="entity" className="label-phone">
              Field Agent Id
            </label>
            <input
              type="text"
              id="fieldAgentId"
              value={formData.fieldAgentId}
              onChange={handleChange}
              name="fieldAgentId"
              className="input-field"
              required
            />

            {/* Code */}
            <label htmlFor="code" className="label-password">
              Property Id
            </label>
            <input
              type="text"
              id="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              name="propertyId"
              className="input-field"
              required
            ></input>

              <CommonBtn title="Add" margin="25%" fontweight="bolder" />

            <Footer />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
export default AssignProperty;
