import React, { Component, useState, useEffect } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png";
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/AgentDashboard/Pvbackground.png";
import newImg from "../Assets/Images/AgentDashboard/newImg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import BackButton from "../CommonButtonBack";
import Deactivateimg from "../Assets/Deactivate.png";

function DeactivateTenant() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idTenant = queryParameters.get("tenantId");
  // const name = queryParameters.get("name");

  const [stateRender, setStateRender] = useState("rent");
  const [loading, setLoading] = useState(false);

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  const handleButtonClick = (buttonNumber) => {
    // Reset the active state for all buttons
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);

    // Set the active state for the clicked button
    switch (buttonNumber) {
      case 1:
        setIsActive1(true);
        break;
      case 2:
        setIsActive2(true);
        break;
      case 3:
        setIsActive3(true);
        break;
      case 4:
        setIsActive4(true);
        break;
      default:
        break;
    }

    // Additional logic for each button if needed
    // ...
  };

  const token = localStorage.getItem("token");
  console.log(token);

  // const [deactivateStatus, setDeactivateStatus] = useState("Rented From B8R");
  const [deactivateStatus, setDeactivateStatus] = useState({
    deactivateStatus: ""
  });

  console.log(deactivateStatus);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Received from Final In state:", deactivateStatus);
    console.log(JSON.stringify(deactivateStatus));

    try {
      const response = await axios.put(
        `https://b8rliving.com/tenant/deactivate/${idTenant}`,
        { deactivateStatus: deactivateStatus },
        axiosConfig
      );

      // Log the updated state
      console.log(response);
      alert("Tenant Deactivated sucessfully!");
      window.location.href = "/Dashboard";
    } catch (error) {
      // Handle any errors that occur during the API request
      alert(error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${PVbackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Deactivate Tenant" color="#52796F" />

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}
        <div
          className="containered form"
          style={{
            height: "250px",
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <h4>
              <b>Are you deactivating the customer?</b>
            </h4>
            <div>
            {/* [Rented From B8R, Rented Externally, Does not need anymore, Not responding, 0, 1, 2, 3] */}
              <CommonTopButton
                bgColor={isActive1 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive1 ? "#FFFFFF" : "#77A8A4"}
                text="Rented From B8R"
                onclicked={() => {
                  setDeactivateStatus("Rented From B8R");
                  handleButtonClick(1);
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor={isActive2 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive2 ? "#FFFFFF" : "#77A8A4"}
                text="Rented Externally"
                onclicked={() => {
                  setDeactivateStatus("Rented Externally");
                  handleButtonClick(2);
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor={isActive3 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive3 ? "#FFFFFF" : "#77A8A4"}
                text="Does not need anymore"
                onclicked={() => {
                  setDeactivateStatus("Does not need anymore");
                  handleButtonClick(3);
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor={isActive4 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive4 ? "#FFFFFF" : "#77A8A4"}
                text="Not responding"
                onclicked={() => {
                  setDeactivateStatus("Not responding");
                  handleButtonClick(4);
                }}
              />
            </div>

            {/* </div> */}
            {/* for title and text */}
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}

        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={Deactivateimg}
            style={{ marginLeft: "130px" }}
            onClick={handleSubmit}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
export default DeactivateTenant;
