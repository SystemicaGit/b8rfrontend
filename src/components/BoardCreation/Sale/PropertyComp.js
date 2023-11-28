import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import imgOne from "../../Assets/Images/AgentDashboard/imgOne.png";
import Add from "../../Assets/Images/BoardCreation/Add.png";
import loadingGif from "../../Assets/Images/loading.gif";

import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import space from "../../Assets/Images/BoardCreation/space.png";
import CommonBtn from "../../CommonButton";


const PropertyComp = ({
  props,
  Id,
  responseDataTenantData,
  responseDataTenantBoard,
}) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [addedItems, setAddedItems] = useState([]);

 console.log(responseDataTenantData);
 
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const addToBoard = async (pId) => {
    console.log(pId);
    setLoading(true);

    if (addedItems.includes(pId)) {
      // If it's already added, remove it
      setAddedItems(addedItems.filter(item => item !== pId));
    } else {
      // If it's not added, add it
      setAddedItems([...addedItems, pId]);
    }
};

  const viewToBoard = async (pId) => {

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/property/${responseDataTenantBoard}`,
        { propertyId: pId },
        axiosConfig
      );
      console.log(response);
      // setAddedProperty(true);
      // console.log(addedProperty);
      // alert(response.data.message)
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
      // alert(error.message)
    } finally {
      setLoading(false); // Set loading to false when the request is complete
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
          {props.slice(0, visibleItems).map((values, key) => (
            <div key={key}>
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
                      src={imgOne}
                      alt="imgOne"
                      style={{ marginLeft: "10px", marginTop: "10px" }}
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
                {/* {addedProperty ? (
                  <p style={{ color: "#52796F", fontWeight: "bolder" }}>
                    Added
                  </p>
                ) : (
                  <> */}
                  

                      <text style={{ fontSize: "12px", color: "#5D6560" }}>
                        {/* <b onClick={() => addToBoard(values._id)}>
                          Add to Board
                        </b> */}
                        <b key={values._id} onClick={() => addToBoard(values._id)}>
                           {addedItems.includes(values._id) ?  <p style={{ color: "#52796F", fontWeight: "bolder" }}> Added </p> : 
                            
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
                               src={Add}
                               alt="Add"
                               style={{
                                 height: "27px",
                                 marginTop: "20px",
                                 marginBottom: "-8px",
                               }}
                             />
                             <br></br>
                             <br></br>
                              Add to Board
                              </div>
                              
                             
                             }
                     </b>
                      </text>
                    </div>
                  {/* </>
                )} */}
              {/* </div> */}
            </div>
          ))}
          {visibleItems < props.length && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button onClick={handleLoadMore}>Load More Properties</button>
            </div>
          )}
        </div>
      )}
          <div onClick={() => viewToBoard()} >
           <Link to={`/PropertyViewBoard?boardId=${responseDataTenantData.boardId}`}><CommonBtn title="View Board" margin="90px" bgolor="#3F007F"/></Link>
          </div>

    </>
  );
};

export default PropertyComp;
