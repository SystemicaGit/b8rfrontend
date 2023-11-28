import React, { Component } from "react";
import carpetarea from "../Assets/Images/BoardCreation/space.png";
import money from "../Assets/Images/BoardCreation/Money.png";
import furnishingtype from "../Assets/Images/BoardCreation/Group.png";
import housetype from "../Assets/Images/BoardCreation/area.png";
import demoimg from "../Assets/Images/AgentDashboard/imgOne.png";
const YetToShareComp = ({ responseProperty }) => {
  // console.log(responseProperty);

  function formatDate(startDate) {
    const options = { day: "numeric", month: "long" };
    return new Date(startDate).toLocaleDateString("en-US", options);
  }
  console.log(responseProperty.updatedAt);

  function calculateDaysGone(startDate) {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
    const timeDifference = currentDate - startDateObj;
    const daysGone = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days

    return daysGone;
  }
  const todayISOString = new Date().toISOString().split("T")[0];
  const startDate = todayISOString;

  const dateUpdated = formatDate(startDate);

  return (
    <>
      {responseProperty.map((values, index) => (
        <div key={index}>
          {/* upper side */}
          <div
            style={{
              height: "78px",
              width: "322px",
              background: "#FFFFFF",
              border: "1px solid #DAF0EE",
              borderRadius: "15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              display: "flex",
              marginLeft: "10px",
            }}
          >
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
              <img 
              src={values.images[0]}
              alt="imgOne"
              style={{ marginLeft: "0px", marginTop: "0px",borderRadius:"15px" }}
              height="60px"
               />
            </div>

            {/* rigth side */}
            <div style={{ marginTop: "-10px" }}>
              <h5 style={{ marginLeft: "-10px" }}>
                {values.houseName}, {values.societyName}
              </h5>
              <div
                style={{
                  display: "flex",
                  marginTop: "-18px",
                  marginLeft: "2px",
                }}
              >
                <img src={money} height={15} />
                <h6 style={{ marginTop: "0.5px", marginLeft: "2px" }}>
                  {values.propertyDetails.featureInfo.rentAmount}
                </h6>
              </div>

              <div style={{ display: "flex", marginTop: "-20px" }}>
                <div style={{ display: "flex" }}>
                  <img src={carpetarea} height={15} />
                  <h6 style={{ marginTop: "0.5px" }}>
                    {values.propertyDetails.featureInfo.carpetArea}sq. ft{" "}
                  </h6>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={housetype} height={15} />
                  <h6 style={{ marginTop: "0.5px" }}>
                    {values.propertyDetails.propertyInfo.houseConfig}
                  </h6>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={furnishingtype} height={15} />
                  <h6 style={{ marginTop: "0.5px" }}>
                    {values.propertyDetails.featureInfo.furnishingType}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {/* lower Side */}
          <div
            style={{
              height: "30px",
              width: "250px",
              background: "#DAF0EE",
              marginTop: "-19px",
              marginLeft: "50px",
              borderRadius: "0px 0px 10px 10px",
            }}
          >
            <h5>Added since {calculateDaysGone(values.updatedAt)} days</h5>
          </div>
        </div>
      ))}
    </>
  );
};
export default YetToShareComp;
