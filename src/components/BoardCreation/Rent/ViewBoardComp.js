import React, { Component, useEffect, useState } from "react";
import axios from "axios";


import imgOne from "../../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../../Assets/Images/CheckP.png";
import loadingGif from "../../Assets/Images/loading.gif";

import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import space from "../../Assets/Images/BoardCreation/space.png";

const ViewBoardComp = ({ props, loading , Id, responseDataBoard }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    propertyId : "",
  });
  const [addedProperty, setAddedProperty] = useState(false);
  console.log(props);

    const boardId = responseDataBoard.boardId

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };


  
  const addToBoard = async (pId) => {
    // const { name, value } = event.target;
   
   console.log(pId);
  //   setFormData(pId);
  //   // setFormData((prevState) => {
  //   //   return {
  //   //     ...prevState,
  //   //     [name]: value,
  //   //   };
  //   // })

  //   console.log(formData);

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/property/${boardId}`,
        { propertyId : pId},
        axiosConfig
      );
      console.log(response);
      setAddedProperty(true)
      console.log(addedProperty)
      // alert(response);
      // console.log(JSON.stringify(formData));
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false); // Set loading to false when the request is complete
    }
  }

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 3);
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          {/* {responseDataBoard.key} */}
          {props.map((values, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                {/* left side */}
                <div
                  style={{
                    height: "75px",
                    width: "332px",
                    background: "#F5F5F5",
                    border: "1px solid #000000",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                  }}
                >
                  {/* img */}
                  <div>
                  <img
                      src={values.images[0]}
                      alt="imgOne"
                      style={{ marginLeft: "10px", marginTop: "10px", borderRadius:"15%" }}
                      height={60}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "10px", marginLeft: "-2px" }}>
                      <text style={{ fontSize: "10px" }}>
                        {values.houseName},{values.societyName}
                      </text>
                      <br />
                      <text style={{ fontSize: "10px", marginLeft: "-90px" }}>
                        <b>
                          Rent:{values.propertyDetails.featureInfo.rentAmount}
                        </b>
                      </text>
                      <div
                        style={{
                          width: "150px",
                          height: "25px",
                          marginTop: "10px",
                          marginLeft: "10px",
                          display: "flex",
                        }}
                      >
                        <img src={Group} height={15} />
                        <text
                          style={{
                            fontSize: "12px",
                            marginLeft: "1px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "bold",
                          }}
                        >
                          {values.propertyDetails.featureInfo.furnishingType}
                        </text>
                      </div>
                    </div>
                    <div style={{ marginTop: "13px" }}>
                      <div style={{ marginLeft: "-25px" }}>
                        <img src={space} alt="space" />
                        <text style={{ fontSize: "10px" }}>
                          {values.propertyDetails.featureInfo.carpetArea}
                        </text>
                      </div>
                      <div>
                        <img
                          src={area}
                          alt="area"
                          style={{ marginLeft: "-25px" }}
                        />
                        <text style={{ fontSize: "7px" }}>
                          {values.propertyDetails.propertyInfo.houseConfig}
                        </text>
                      </div>
                      <img
                        src={parking}
                        alt="parking"
                        style={{ marginLeft: "-25px" }}
                      />
                      <text style={{ fontSize: "10px" }}>
                        {values.propertyDetails.featureInfo.parking.car > 0 &&
                        values.propertyDetails.featureInfo.parking.bike > 0
                          ? "Available"
                          : "No"}
                      </text>
                    </div>
                  </div>
                </div>
             
                  

                    {/* {values._id} */}
                  {addedProperty ? 
                  <p style={{color:"#52796F", fontWeight: "bolder"}}>Added</p> :  
                  <>
                     <div 
                  style={{
                    height: "75px",
                    width: "52px",
                    background: "#E8E7E7",
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <img
                    src={checkP}
                    alt="Add"
                    style={{
                      height: "27px",
                      marginTop: "20px",
                      marginBottom: "-8px",
                    }}
                  />
                  
                  <text style={{ fontSize: "12px", color: "#5D6560" }}>
                    <b onClick={() => addToBoard(values._id)}>Change Status</b>
                  </text>
              </div>
                  
                  </>
                  }
                 
              </div>
            </div>
          ))}
          {visibleItems < props.length && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button onClick={handleLoadMore}>Load More Properties</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewBoardComp;
