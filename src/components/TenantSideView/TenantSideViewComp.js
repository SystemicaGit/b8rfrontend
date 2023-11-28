import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
// import "./DashComponent.css";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import Rupee from "../Assets/Images/TenantSide/Ruppee.png";
import space from "../Assets/Images/TenantSide/area.png";
import Sofa from "../Assets/Images/TenantSide/Sofa.png";
import HouseConfig from "../Assets/Images/TenantSide/HouseConfig.png";
import Parking from "../Assets/Images/TenantSide/Parking.png";
import Parking2 from "../Assets/Images/TenantSide/Parking2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import ActiveLeads from "./ActiveLeads";

function TenantSideViewComp({ boards, boardId }) {
  const token = localStorage.getItem("token");
  // console.log(token);

  const [isClick, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  // Initialize isClick state as an array with the same length as boards
  const [isClickArray, setIsClickArray] = useState(new Array(boards.length).fill(false));

  const hitPutApi = async (pId) => {
    try {
      const response = await axios.put(
        `https://b8rliving.com/board/share/${boardId}`,
        { propertyid: pId },
        axiosConfig
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "https://b8rliving.com/property",
  //         axiosConfig
  //       );

  //     //Filter Data
  //     const filterData = response.data.data.properties ;

  //     // Sort the response data by the 'imagesApproved' property in descending order
  //     const sortedProperties = filterData.sort((a, b) => {
  //       return a.imagesApproved - b.imagesApproved;
  //     });

  //       setresponsePendingProperties(sortedProperties);

  //     } catch (error) {
  //       console.log(error);
  //       // Handle the error here if needed
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  const shortlist = async (propertyid) => {
    // event.preventDefault();
    // setClick(true);
    console.log("Received Id:", propertyid);

    setIsClickArray((prevState) => {
      const updatedIsClickArray = [...prevState];
      updatedIsClickArray[propertyid] = true;
      return updatedIsClickArray;
    });

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/shortlist/${boardId}`,
        { propertyid: propertyid },
        axiosConfig
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  console.log(boards);

  return (
    <>
      {/* Mapping */}
      {boards.map((property, index) => (
        <div key={index} onClick={() => hitPutApi(property._id)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#DAF0EE",
              borderRadius: "20px",
              margin: "1%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "20px",
                color: "#DAF0EE",
              }}
            >
              <Link
                to={`/DetailView?boardId=${boardId}&propertyId=${property._id}`}
              >
                <Carousel showThumbs={false} showArrows={true}>
                  {property.images.map((image, index) => (
                    <div key={index}>
                      <img src={image} />
                      <p
                        className="legend"
                        style={{
                          color: "#FFFFF",
                          fontSize: "16px",
                          fontWeight: "bolder",
                        }}
                      >
                        {property.houseName}
                      </p>
                    </div>
                  ))}
                </Carousel>
              </Link>
              {/* For Images */}
              {/* <img src={homeDown} alt="Los Angeles" /> */}
            </div>

            {/* For Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  textAlign: "centre",
                  ItemAlign: "centre",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img style={{ marginTop: "20px" }} src={Rupee} height={19} />
                <h6
                  style={{
                    textAlign: "centre",
                    ItemAlign: "centre",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {property.propertyDetails.featureInfo.rentAmount}/month
                  <p style={{ marginTop: "0px" }}>(incl. Maintenance )</p>
                </h6>
              </div>
              <div
                className="Apps"
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  zoom: "0.5",
                }}
              >
                {/* <div onClick={shortlist(property._id)} > </div> */}
                {isClickArray[index] ? (
                <Heart
                  height={10}
                  isClick={isClick}
                  onClick={() => shortlist(property._id)}
                /> ) :
                (
                  <Heart
                  height={10}
                  isClick={isClick}
                  onClick={() => shortlist(property._id)}
                /> 
                )
                }
                {isClick ? (
                  <p
                    style={{
                      fontStyle: "Glida Display",
                      fontSize: "20px",
                      color: "#B30808",
                      fontWeight: "bold",
                      color: "#B30808",
                    }}
                  >
                    {" "}
                    Shortlisted{" "}
                  </p>
                ) : (
                  <p
                    style={{
                      fontStyle: "Glida Display",
                      fontSize: "20px",
                      color: "#B30808",
                      fontWeight: "bold",
                      margin: "40px -30px 0 10px",
                    }}
                  >
                    Shortlist{" "}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={space} height={17} />
                <h6 style={{ marginTop: "0px" }}>
                  {" "}
                  {property.propertyDetails.featureInfo.carpetArea} sqft
                </h6>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={HouseConfig} height={17} />
                <h6 style={{ marginTop: "0px" }}>
                  {" "}
                  {property.propertyDetails.propertyInfo.houseConfig}{" "}
                </h6>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={Sofa} height={17} />
                <h6 style={{ marginTop: "0px" }}>
                  {" "}
                  {property.propertyDetails.featureInfo.furnishingType}{" "}
                </h6>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={Parking} height={17} />
                <h6 style={{ marginTop: "0px" }}>
                  {" "}
                  {property.propertyDetails.featureInfo.parking.car != "" ||
                  property.propertyDetails.featureInfo.parking.bike > 0
                    ? "Available"
                    : "No"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default TenantSideViewComp;
