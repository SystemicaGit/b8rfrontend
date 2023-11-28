import React, { useEffect, useState } from "react";

// import Dashboardcss from '../Dashboard.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import CommonBtn from "../CommonButton";
// import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailView1 from "../Assets/Images/TenantSideView/DetailView1.png";
import DetailView2 from "../Assets/Images/TenantSideView/DetailView2.png";
import DetailView3 from "../Assets/Images/TenantSideView/DetailView3.png";
import Heart from "react-animated-heart";
import "./DetailView.css";
import Footer from "../Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import gatedSecurity from "../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import powerBackup from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import ac from "../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import carParking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import bikeParking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import clubHouse from "../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";
import groceryStore from "../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";
import gym from "../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";
import bathroom from "../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import swimmingPool from "../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import nonVeg from "../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import construction_year from "../Assets/Images/PropertyAdditionPageIcons/construction_year/24.png";
import space_or_area from "../Assets/Images/PropertyAdditionPageIcons/space_or_area/24.png";
import Movein from "../Assets/Images/Move-in.png";
import rent_1 from "../Assets/Images/PropertyAdditionPageIcons/rent_1/24.png";
import calender from "../Assets/Images/AgentDashboard/calender.png";
import balcony from "../Assets/Images/PropertyAdditionPageIcons/number_of_balcony/24.png";
import sofa from "../Assets/Images/AgentDashboard/Sofa.png";
import house_Config from "../Assets/Images/AgentDashboard/House_Config.png";
import floors from "../Assets/Images/AgentDashboard/floors.png";
import key from "../Assets/Images/AgentDashboard/key.png";
import { useNavigate } from "react-router-dom";

function DetailImgView() {
  const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  const propertyId = queryParameters.get("propertyId");
  console.log(boardId);

  const [isClick, setClick] = useState(false);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [booleanValues, setBooleanValues] = useState([]); // Store boolean values here

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);

      //Get All Properties
      try {
        setLoading(true);
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.board.propertyId;
        const responseDataProperty = response.data.data.board.propertyId;
        // const responseDataFilter = response.data.data.board.propertyId.propertyDetails;
        const responseData =
          response.data.data.board.propertyId[0].propertyDetails.featureInfo;
        console.log(responseData);
        const booleanValues = [];
        // responseData.forEach((tenant) => {
        for (const key in responseData) {
          if (typeof responseData[key] === "boolean") {
            booleanValues[key] = responseData[key];
            console.log(booleanValues);
          }
        }
        // });

        setBooleanValues(booleanValues);

        const filteredProperties = responseDataProperty.filter(
          (property) => property._id == propertyId
        );

        // Update the formData state with the response data
        setResponseDataProperty(filteredProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchTenantDetails(); // Call the fetch function
  }, [boardId]);

  console.log(responseDataProperty);
  // console.log(setBooleanValues);

  const keyNames = {
    // carParking: "Car Parking",
    // bikeParking: "Bike Parking",
    gatedSecurity: "Gated Security",
    powerBackup: "Power Backup",
    groceryStore: "Grocery Store",
    // swimmingPool: "Swimming Pool",
    // gym: "Gym",
    clubHouse: "Club House",
    // AirCondition: "Air Conditioning",
    // nonVeg: "Non-Veg",
    // bathroom: "Bathroom",
  };

  return (
    <>
      {responseDataProperty.map((property, index) => (
        <div key={index}>
          <div
            className="form"
            style={{
              borderRadius: "9px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div
            //   className="containered form"
            //   style={{
            //     height: '300px',
            //     borderRadius: '5px',
            //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            //     background: '#DAF0EE',
            //   }}
            >
              {/* <Link to="/DetailImgView"><img
            src={DetailView1}
            alt="Tenant"
            height={373}
            style={{marginLeft:"-14px",marginTop:"-14px"}}

          /></Link> */}

              {property.images.map((image, index) => (
                <div key={index} style={{ padding: "5% 0" }}>
                  {index === 1 ? (
                    <div>
                      {/* <img src={image} height="140%" width="140%" /> */}
                      <Link to={property.tourLink3D}>
                        <div
                          id="container"
                          style={{ marginTop: "-98px", marginLeft: "3%" }}
                        >
                          <img
                            id="someimg"
                            src={image}
                            height="140%" width="140%"
                          />
                          <div
                            id="overlay"
                            style={{
                              color: "white",
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            <p>3D Virtual Tour</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <img src={image} height="140%" width="140%" />
                  )}
                </div>
              ))}
            </div>

            <Link to={property.tourLink3D}>
              <div
                id="container"
                style={{ marginTop: "-98px", marginLeft: "3%" }}
              >
                <img
                  id="someimg"
                  src={property.images[0]}
                  height={55}
                  width={100}
                />
                <div
                  id="overlay"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  <p>3D Virtual Tour</p>
                </div>
              </div>
            </Link>

            {/* <div className="legend"  style={{ marginLeft:"-65%",marginTop:"-95px"}}>
          <Link to={property.tourLink3D}>
            <img src={property.images[0]} height={55} width={100} style={{position:"relative", background:"rgba(0, 0, 0, 0.7)", textAlign:"center", padding:"0px"}}/></Link>
          <p style={{color:"white", fontSize:"16px", fontWeight:"bold"}}>3D Tour</p>
        </div> */}

            <div
            //   className="containered form"
            //   style={{
            //     height: '300px',
            //     borderRadius: '5px',
            //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            //     background: '#DAF0EE',
            //   }}
            >
              <b>
                <h2 style={{ marginBottom: "-10px" }}> {property.houseName}</h2>
              </b>
              <div
                style={{
                  marginLeft: "20px",
                  height: "140px",
                  width: "370px",
                  borderRadius: "8px",
                  backgroundColor: "#E8E7E7",
                }}
              >
                <h3 style={{ marginLeft: "-150px", marginTop: "10px" }}>
                  About the Society
                </h3>
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // flexWrap: "wrap",
                    padding: "0 6%",
                    // width: "100%",
                    marginTop: "8px",
                  }}
                >
                  {Object.entries(booleanValues).map(([key, value]) => {
                    if (value === true) {
                      const imageSources = {
                        gatedSecurity: gatedSecurity,
                        powerBackup: powerBackup,
                        groceryStore: groceryStore,
                        clubHouse: clubHouse,
                        // AirCondition: ac,
                        // carParking: carParking,
                        // bikeParking: bikeParking,
                        // nonVeg: nonVeg,
                        // bathroom: bathroom,
                      };
                      // Use the key to dynamically select the image source
                      const imageSrc = imageSources[key]; // You can set a default image source if needed

                      // return <li key={key}>{key}</li>;
                      return (
                        <div
                          className=""
                          // style={{ disp: "3%" }}
                        >
                          <img
                            src={imageSrc}
                            height={22}
                            style={{ marginLeft: "1px" }}
                          />{" "}
                          <p style={{ fontSize: "10px" }}> {keyNames[key]} </p>{" "}
                        </div>
                      );
                    }
                    return null; // Skip false values
                  })}
                </div>
              </div>

              {/* <img
            src={DetailView2}
            alt="Tenant"
            height={180}
            style={{ marginLeft: "-14px", marginTop: "14px" }}
          /> */}
            </div>
            <div
            //   className="containered form"
            //   style={{
            //     height: '300px',
            //     borderRadius: '5px',
            //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            //     background: '#DAF0EE',
            //   }}
            >
              <div
                style={{
                  marginLeft: "20px",
                  height: "360px",
                  width: "370px",
                  backgroundColor: "#DAF0EE",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ marginLeft: "-170px" }}>House Details</h3>

                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div>
                      <img
                        src={house_Config}
                        alt="Tenant"
                        height={30}
                        // style={{ marginLeft: "-14px", marginTop: "14px" }}
                      />
                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.propertyInfo.houseConfig}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        +{property.propertyDetails.featureInfo.bathrooms}{" "}
                        Bathrooms
                      </p>
                    </div>

                    <div>
                      <img src={balcony} alt="Tenant" height={30} />
                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.balconies}{" "}
                        balconies
                      </h6>
                      {/* <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        +{property.propertyDetails.featureInfo.bathrooms}{" "}
                        Bathrooms
                      </p> */}
                    </div>

                    <div>
                      <img src={carParking} alt="Tenant" height={40} />
                      <h6 style={{ marginTop: "-1px" }}>
                        Available
                        {/* {property.propertyDetails.featureInfo.parking}{" "} */}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        {property.propertyDetails.featureInfo.parking.bike} bike
                        + {property.propertyDetails.featureInfo.parking.car}{" "}
                      </p>
                    </div>

                    <div>
                      <img src={space_or_area} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.carpetArea} sft
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        spacious than most
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "10%",
                    }}
                  >
                    <div>
                      <img src={sofa} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.furnishingType}{" "}
                      </h6>
                      {/* <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        +{property.propertyDetails.featureInfo.bathrooms}{" "}
                        Bathrooms
                      </p> */}
                    </div>

                    <div>
                      <img src={key} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>Immediate </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        possesion Time{" "}
                      </p>
                    </div>

                    <div>
                      <img src={floors} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.propertyInfo.houseConfig}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        +{property.propertyDetails.featureInfo.bathrooms}{" "}
                        Bathrooms
                      </p>
                    </div>

                    <div>
                      <img src={nonVeg} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        Floor {property.propertyDetails.featureInfo.floors.your}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        Total{" "}
                        {property.propertyDetails.featureInfo.floors.total}{" "}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "10%",
                    }}
                  >
                    <div>
                      <img src={rent_1} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.rentAmount}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        Total Rent
                      </p>
                    </div>

                    <div>
                      <img src={rent_1} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.rentDeposit}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        Security Deposit
                      </p>
                    </div>

                    <div>
                      <img src={calender} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.updatedAt.slice(0, 10)}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        posted on
                      </p>
                    </div>

                    <div>
                      <img src={construction_year} alt="Tenant" height={30} />

                      <h6 style={{ marginTop: "-1px" }}>
                        {property.propertyDetails.featureInfo.constructionYear}{" "}
                      </h6>
                      <p style={{ marginTop: "-20px", fontSize: "10px" }}>
                        Construction year
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: "10px" }}> </p>{" "}
                </div>
              </div>

              <p
                style={{
                  fontStyle: "Glida Display",
                  bottomMargin: "-50px",
                  fontSize: "28px",
                }}
              >
                {" "}
                Loved this property?
              </p>
              <div className="Apps">
                <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
              </div>

              {isClick ? (
                <p
                  style={{
                    fontStyle: "Glida Display",
                    fontSize: "28px",
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
                    fontSize: "28px",
                    color: "#B30808",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Shortlist{" "}
                </p>
              )}

              <Link to="/TenantSideView"></Link>
              <button onClick={handleClick} className="newBtn">
                See other properties
              </button>
            </div>
            <Footer />
          </div>
        </div>
      ))}
    </>
  );
}
export default DetailImgView;
