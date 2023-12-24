import React, { Component } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/homeDown.png";
import peopleDown from "../Assets/Images/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Vector2.png";
import backgroundSecond from "../Assets/Images/other_bg.png";
import rentedOut from "../Assets/Images/rentedOut.png";
import sharedOut from "../Assets/Images/sharedOut.png";
import shortListed from "../Assets/Images/shortListed.png";
import yetShared from "../Assets/Images/yetShared.png";
import check from "../Assets/Images/check.png";
import CommonHeader from "../CommonHeader";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaCheckToSlot } from "react-icons/fa6";

function PendingComp({ properties }) {
  function formatDate(startDate) {
    const options = { day: "numeric", month: "long" };
    return new Date(startDate).toLocaleDateString("en-US", options);
  }

  function calculateDaysGone(startDate) {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
    const timeDifference = currentDate - startDateObj;
    const daysGone = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days

    return daysGone;
  }

  // Usage in your component:
  //   const startDate = currentDate; // Replace with your actual date
  const todayISOString = new Date().toISOString().split("T")[0];

  const startDate = todayISOString;
  const daysGone = calculateDaysGone(startDate);
  const dateUpdated = formatDate(startDate);

  const formateDate = (givendate) => {
    const date = new Date(givendate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const daysAgo = (givendate) => {
    const currDate = new Date();
    const date = new Date(givendate);
    const diff = currDate - date;
    const daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  // console.log("Property Details -> " + properties.propertyId[0]);

  return (
    <>
      {/* <h2 style={{color:"#52796F"}}>Pending Pipeline</h2> */}

      {/* Mapping */}
      {properties.map((property, index) => (
        <div className="px-[1rem] flex w-[100%] justify-center mb-[1rem]">
          {/* left-side */}
          <div>
            {/* top */}
            <div
              className="p-[0.8rem]"
              style={{
                border: "1px solid #DAF0EE",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                background: "white",
              }}
            >
              <p className="text-[1.3rem] font-bold">
                {property.propertyId.houseName} ,{" "}
                {property.propertyId.societyName}
              </p>
              {/* buttons */}
              <div className="flex items-center justify-between gap-x-2 pt-[0.5rem]">
                {/* left-btn */}
                {property.propertyId.fieldAgentStatus === "Pending" ? (
                  <button className="flex justify-center items-center flex-col">
                    <RiErrorWarningFill className="text-[1.3rem] text-[#AA223C]" />
                    {/* <FaCheckToSlot className="text-[1.3rem] text-[#199D6D]" /> */}
                    <p className="bg-[#FCECEF] px-[0.5rem] py-[0.2rem] font-bold text-[#AA223C] rounded-[0.5rem]">
                      Information validation
                    </p>
                  </button>
                ) : (
                  <button className="flex justify-center items-center flex-col">
                    {/* <RiErrorWarningFill className="text-[1.3rem] text-[#AA223C]" /> */}
                    <FaCheckToSlot className="text-[1.3rem] text-[#199D6D]" />
                    <p className="bg-[#F0FBF8] px-[0.5rem] py-[0.2rem] font-bold text-[#52796F] rounded-[0.5rem]">
                      Information validation
                    </p>
                  </button>
                )}
                {property.propertyId.fieldAgentStatus === "Completed" ? (
                  <button className="flex justify-center items-center flex-col">
                    <FaCheckToSlot className="text-[1.3rem] text-[#199D6D]" />
                    <p className="bg-[#F0FBF8] px-[0.5rem] py-[0.2rem] font-bold text-[#52796F] rounded-[0.5rem]">
                      Photo Upload
                    </p>
                  </button>
                ) : (
                  <button className="flex justify-center items-center flex-col">
                    <RiErrorWarningFill className="text-[1.3rem] text-[#AA223C]" />
                    <p className="bg-[#FCECEF] px-[0.5rem] py-[0.2rem] font-bold text-[#AA223C] rounded-[0.5rem]">
                      Photo Upload
                    </p>
                  </button>
                )}
              </div>
              {/* details */}
              <div className="pt-[1rem]">
                <p className="font-bold">Address:</p>
                <p>
                  {property.propertyId.propertyDetails[0].propertyInfo.area} ,{" "}
                  {property.propertyId.pinCode}
                </p>
              </div>
            </div>
            {/* bottom */}
            <div
              className="bg-[#DAF0EE] flex justify-center items-center flex-col py-[0.5rem]"
              style={{
                borderRadius: "0 0 2rem 2rem",
              }}
            >
              <p>Assigned on:</p>
              <p className="font-bold">
                {formateDate(property.updatedAt)} ({daysAgo(property.updatedAt)}{" "}
                days before )
              </p>
            </div>
          </div>
          {/* right-side */}
          {property.propertyId.fieldAgentStatus === "DetailsCompleted" ? (
            <Link
              to={`/UploadPhotos?propertyId=${property.propertyId._id}`}
              className="bg-[#E8E7E7] mx-[0.4rem] rounded-[0.5rem] flex flex-col justify-center items-center text-[#5D6560] px-[0.5rem]"
            >
              <IoIosArrowDroprightCircle className="text-[1.8rem]" />
              <p className="text-[0.8rem] font-bold">Check</p>
            </Link>
          ) : (
            <Link
              to={`/FieldAgentVerifyProperty?propertyId=${property.propertyId._id}`}
              className="bg-[#E8E7E7] mx-[0.4rem] rounded-[0.5rem] flex flex-col justify-center items-center text-[#5D6560] px-[0.5rem]"
            >
              <IoIosArrowDroprightCircle className="text-[1.8rem]" />
              <p className="text-[0.8rem] font-bold">Check</p>
            </Link>
          )}
        </div>
      ))}
    </>
  );
}
export default PendingComp;
