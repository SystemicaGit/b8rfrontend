import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LandlordInfo.css";
import backgroundSecond from "../Assets/Images/other_bg.png";
import Footer from "../Footer";
import { useEffect } from "react";

import vector from "../Assets/Images/vector.png";
import num_2 from "../Assets/Images/num_2.png";
import hamburger_1 from "../PropertyAdditionPageIcons/hamburger_1/24.png";
import logo from "../Assets/Images/Logo.png";
import loadingImg from "../Assets/Images/loading.gif";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { TbHomeCheck } from "react-icons/tb";

function PropertyCreated() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const furnishingType = queryParameters.get("furnishingType");
  const rentAmount = queryParameters.get("rentAmount");
  const rentDeposit = queryParameters.get("rentDeposit");
  const saleAmount = queryParameters.get("saleAmount");
  const saleDeposit = queryParameters.get("saleDeposit");
  const houseConfig = queryParameters.get("houseConfig");

  const [responseTenant, setresponseTenant] = useState();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  //   useEffect(() => {
  //     // event.preventDefault();
  //     const fetchPosts = async () => {
  //       setLoading(true);
  //       axios
  //         .get("https://b8rliving.com/property", axiosConfig)
  //         .then((response) => {
  //           setresponseTenant(response.data);
  //           console.log(responseTenant);
  //           // alert("Your data has been submitted");
  //           // do something with the response
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           // handle the error
  //         });
  //       setLoading(false);
  //     };

  //     fetchPosts();
  //   }, []);

  return (
    <>
      <CommonHeader title="Property Created" color="#52796F" />
      {/* main-container */}
      <div className="py-[2rem] flex items-center justify-center flex-col">
        <TbHomeCheck className="text-[5rem] text-[#52796F]" />
        <p className="text-[1.3rem] font-semibold pt-[2rem]">
          <u>Name</u>
        </p>
        <p className="text-[2.1rem] font-bold text-[#52796F]">{name}</p>
        <p className="text-[1.3rem] font-semibold pt-[1rem]">
          <u>Features</u>
        </p>
        <p className="text-[2.1rem] font-bold text-[#52796F]">{houseConfig}</p>
        <p className="text-[1.3rem] font-semibold">({furnishingType})</p>
        <p className="text-[1.3rem] font-semibold pt-[2rem]">
          <u>Rent Details</u>
        </p>
        <p className="text-[2.1rem] font-bold text-[#52796F]">
          {rentAmount} /month
        </p>
        <p className="text-[1.3rem] font-semibold">
          ({rentDeposit} INR Deposit)
        </p>
      </div>
      {/* <div
        className="login-page form"
        style={{
          height: "130vh",
          width: "370PX",
          backgroundColor: "#FFFFFF",
          marginLeft: "35%",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "#52796F", marginTop: "-8px" }}>Location</h4>
          <u>
            <h4>Name:</h4>
          </u>
          <h2 style={{ color: "#52796F", marginTop: "-10px" }}>{name}</h2>

          <u>
            <h4>Features</h4>
          </u>
          <h2 style={{ color: "#52796F", marginTop: "-10px" }}>
            {houseConfig}
          </h2>
          <h3>({furnishingType})</h3>
          <u>
            <h4>Rent Details</h4>
          </u>
          <h2 style={{ color: "#52796F", marginTop: "-10px" }}>
            {rentAmount} /month
          </h2>
          <h4>({rentDeposit} INR Deposit)</h4>

          {saleDeposit > 0 ? (
            <>
              <u>
                <h4>Budget Details</h4>
              </u>
              <h2 style={{ color: "#3F007F", marginTop: "-10px" }}>
                {saleAmount} Cr
              </h2>
              <h4>({saleDeposit} INR Deposit)</h4>{" "}
            </>
          ) : (
            ""
          )}
        </div>
      </div> */}
      <Link
        to="/dashboard"
        className="flex justify-center items-center py-[1rem]"
      >
        <CommonBtn title="Go to Agent Dashboard" margin="60px" />
      </Link>
      <Footer />
    </>
  );
}
export default PropertyCreated;
