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
  name,
  boardId,
}) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  // const [isClickArray, setIsClickArray] = useState(new Array(boards.length).fill(false));

  // console.log(props);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // useEffect(() => {
  //   const fetchBoardDetails = async () => {
  //     setLoading(true);
  // Simulate an async operation, e.g., an API request
  // setTimeout( async () => {
  //   // console.log(props);

  //   const response = await axios.get(
  //     `https://b8rliving.com/property`,
  //     axiosConfig
  //   );
  //   const filteredProperties = response.data.data.property.filter(property => {
  //     return props.some(prop => prop._id === property._id.toString());
  //   });

  //   console.log(response.data.data.property);

  //   // setformData(response.data.data.property);
  //   // Assuming you have your response data stored in a variable called 'response'
  //   const responseDataPropertiesData = response.data.data.property;

  //   // const responseData = response.data.data.tenant.tenantDetails;
  //   // const responseDataBoardData = response.data.data.board;
  //   // const responseDataPropertiesData =  response;
  //   if (props && responseDataPropertiesData) {
  //     console.log(props);
  //     console.log(responseDataPropertiesData);
  //     // Perform filtering here
  //   } else {
  //     console.log("Props or responseDataPropertiesData is not available yet.");
  //   }

 
  //     console.log("filteredProperties:", filteredProperties);

    // setResponseDataProperty(responseDataPropertiesData); // Set All properties added to board
    // console.log(
    //   props.some((prop) => prop._id === responseDataPropertiesData._id)
    // );
    // console.log("responseDataPropertiesData:", responseDataPropertiesData);

    // console.log(responseDataPropertiesData);
    // if (responseDataPropertiesData) {
    //   // Create a set of unique _id values from responseDataPropertiesData
    //   const responseDataPropertyIds = new Set(
    //     responseDataPropertiesData.map((property) => property._id)
    //   );

    //   // Filter props based on matching _id values
    //   const filteredProps = props.filter((prop) =>
    //     responseDataPropertyIds.has(prop._id)
    //   );

    //   setResponseDataProperty(filteredProps); // Set all properties added to the board
    //   // setAddedItems(filteredProps); // Set matching items from props
    //   // setFilteredProps(filteredProps); // Set the filtered props to a new state

    //   console.log("filteredProps:", filteredProps);
    // }
    // console.log(responseDataBoardData);

    // Update the formData state with the response data
    // setResponseDataBoard(responseDataBoardData);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false); // Set loading to false when the request is complete
    // }
  // }, 3000); // Simulating a 2-second delay
  // };
  //   fetchBoardDetails(); // Call the fetch function
  // }, [boardId]);


  const addToBoard = async (pId) => {
    console.log(pId);

    if (!addedItems.includes(pId)) {
      // If it's not already added, add it to the addedItems state
      setAddedItems([...addedItems, pId]);
    } else {
      // If it's not added, add it to the addedItems state
      setAddedItems(addedItems.filter((item) => item !== pId));
    }
  };

  const viewToBoard = async () => {
    try {
      const propertyId = [...addedItems];
      if (propertyId.length === 0) {
        // Handle the case where no properties are added
        return;
      }

      for (const pId of addedItems) {
        const response = await axios.put(
          `https://b8rliving.com/board/property/${responseDataTenantBoard}`,
          { propertyId: pId },
          axiosConfig
        );
        console.log(response);
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
      // alert(error.message)
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };
  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 3);
  };

  // console.log(responseDataProperty);
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
                      src={values.images[0]}
                      alt="imgOne"
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        borderRadius: "15%",
                      }}
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
                    {addedItems.includes(values._id) ? (
                      <p
                        key={values._id}
                        onClick={() => addToBoard(values._id)}
                        style={{ color: "#52796F", fontWeight: "bolder" }}
                      >
                        {" "}
                        Added{" "}
                      </p>
                    ) : (
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
                    )}
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
      <div onClick={() => viewToBoard()}>
        <Link
          to={`/PropertyViewBoard?boardId=${responseDataTenantData.boardId}&tenantId=${Id}&name=${name} `}
        >
          <CommonBtn title="View Board" margin="90px" />
        </Link>
      </div>
    </>
  );
};

export default PropertyComp;
