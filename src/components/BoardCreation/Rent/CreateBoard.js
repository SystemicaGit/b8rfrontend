import React, { Component, useEffect, useState } from "react";

import backgroundImg from "../../Assets/Images/BoardCreation/BackgroundBoard.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from "../../CommonTopButton";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import CreateBoardUpper from "../../Assets/CreateBoardUpper.png";
import CreateBoardAmm from "../../Assets/CreateBoardAmm.png";
import ApartmentType from "../../Assets/Images/BoardCreation/ApartmentType.png";
import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import Money from "../../Assets/Images/BoardCreation/Money.png";
import loadingGif from "../../Assets/Images/loading.gif";

import axios from "axios";
import searchImg from "../../Assets/Search.png";
import SearchBar from "../../SearchBar";
import "./CreateBoard.css";
import gatedSecurity from "../../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import powerBackup from "../../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import ac from "../../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import carParking from "../../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import bikeParking from "../../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import clubHouse from "../../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";

import groceryStore from "../../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";

import gym from "../../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";

import bathroom from "../../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";

import swimmingPool from "../../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import nonVeg from "../../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import PropertyComp from "./PropertyComp";


function CreateBoard() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const tenantId = queryParameters.get("tenantId");
  const boardId = queryParameters.get("boardId");

  const [searchValue, setSearchValue] = useState("");
  const [responseDataTenantBoard, setResponseDataTenantBoard] = useState("");
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantData, setResponseDataTenantData] = useState([]);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [booleanValues, setBooleanValues] = useState([]); // Store boolean values here

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/tenant/${tenantId}`,
          axiosConfig
        );

        const responseData = response.data.data.tenant.tenantDetails;
        const responseDataTenant = response.data.data.tenant;
        const responseDataTenantBoardId = response.data.data.tenant.boardId;
        
        setResponseDataTenantBoard(responseDataTenantBoardId);
        // Update the formData state with the response data
        setResponseDataTenant(responseData);
        setResponseDataTenantData(responseDataTenant);

        // Separate boolean values and store them in booleanValues state
        const booleanValues = [];
        responseData.forEach((tenant) => {
          for (const key in tenant) {
            if (typeof tenant[key] === "boolean") {
              booleanValues[key] = tenant[key];
            }
          }
        });

        setBooleanValues(booleanValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }

      //Get Property from Board
      try {
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        const responseData = response.data.data.tenant.tenantDetails;
        const responseDataTenant = response.data.data.tenant;
        const responseDataTenantBoardId = response.data.data.tenant.boardId;
        const responseDataTenantPropertyId = response.data.data.tenant.propertyId;
        
        setResponseDataTenantBoard(responseDataTenantBoardId);
        // Update the formData state with the response data
        setResponseDataTenant(responseData);
        setResponseDataTenantData(responseDataTenant);

        // Separate boolean values and store them in booleanValues state
        const booleanValues = [];
        responseData.forEach((tenant) => {
          for (const key in tenant) {
            if (typeof tenant[key] === "boolean") {
              booleanValues[key] = tenant[key];
              console.log(booleanValues);

            }
          }
        });

        setBooleanValues(booleanValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }


      //Get All Properties
      try {
        setLoading(true);
        const response = await axios.get(
          `https://b8rliving.com/property`,
          axiosConfig
        );

        const responseData = response.data.data.properties;

        // Update the formData state with the response data
        setResponseDataProperty(responseData);
        // Check if the 'imagesApproved' property exists and has data
        const properties = response.data.data.properties;
        // console.log(properties);

        if (properties) {
          // Filter properties where 'imagesApproved' is true
          const filteredProperties = properties.filter(
            (property) => property.status == "Verified" && property.closeListingDetails == null
          );

          // console.log(filteredProperties);
          setResponseDataProperty(filteredProperties);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchTenantDetails(); // Call the fetch function
  }, [tenantId]);


  // console.log(responseDataProperty);

  // console.log(responseDataTenantData);

  // Create a mapping object for key names
  const keyNames = {
    carParking: "Car Parking",
    bikeParking: "Bike Parking",
    gatedSecurity: "Gated Security",
    powerBackup: "Power Backup",
    groceryStore: "Grocery Store",
    swimmingPool: "Swimming Pool",
    gym: "Gym",
    clubHouse: "Club House",
    AirCondition: "Air Conditioning",
    nonVeg: "Non-Veg",
    bathroom: "Bathroom",
  };

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Create/Add to Board" color="#52796F" />

        {/* <img src={CreateBoardUpper} style={{height:"190px"}}/> */}
        {/* upper component */}
        { loading ? (
            <div>
              <img
                src={loadingGif}
                height={180}
              />
            </div>
          ) : (


            <>
                    <div
          style={{
            height: "200px",
            width: "90%",
            background: "#DAF0EE",
            marginTop: "20px",
            marginLeft: "20px",
            borderRadius: "6px",
          }}
        >
          <h3 style={{ marginLeft: "-140px", marginTop: "10px" }}>
            Tenant name: {name}
          </h3>
          <h5 style={{ marginLeft: "-140px" }}>
            <b>
              <u>Preference of Tenant</u>
            </b>
          </h5>
            {responseDataTenant.map((values, index) => (
              <div key={index}>
                <div
                  style={{
                    height: "45px",
                    width: "90%",
                    background: "#FAFAFA",
                    marginLeft: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                  }}
                >
                  <img
                    src={area}
                    height={15}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                  />{" "}
                  <p style={{ fontSize: "12px" }}>
                    {values.houseConfiguration}
                  </p>
                  <img
                    src={Group}
                    height={15}
                    style={{ marginTop: "10px", marginLeft: "30px" }}
                  />{" "}
                  <p style={{ fontSize: "12px" }}>{values.furnishingType}</p>
                  {values.carParking && values.bikeParking ? (
                    values.carParking ? (
                      <>
                        <img
                          src={parking}
                          height={18}
                          style={{ marginTop: "10px", marginLeft: "10px" }}
                        />
                        <p style={{ fontSize: "12px" }}>
                          Car Parking Available
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <img
                          src={parking}
                          height={18}
                          style={{ marginTop: "10px", marginLeft: "10px" }}
                        />
                        <p>Bike Parking Available</p>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <img
                    src={Money}
                    height={20}
                    style={{ marginLeft: "-270px", marginTop: "10px" }}
                  />
                  <p style={{ marginLeft: "-200px", marginTop: "-23px" }}>
                    {values.rent}
                  </p>
                  <div
                    style={{
                      height: "25px",
                      width: "40%",
                      background: "#3B413D",
                      marginLeft: "200px",
                      borderRadius: "6px",
                      marginTop: "-35px",
                    }}
                  >
                    <img
                      src={ApartmentType}
                      style={{ marginLeft: "-110px", marginTop: "3px" }}
                    />
                    <p
                      style={{
                        color: "white",
                        marginTop: "-20px",
                        fontSize: "11px",
                        padding: "1%",
                      }}
                    >
                      {values.houseType}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    height: "170px",
                    width: "94%",
                    background: "#F5F5F5",
                    border: "1px solid #000",
                    marginLeft: "12px",
                    borderRadius: "5px",
                    marginTop: "20%",
                  }}
                >
                  <h5 style={{ marginLeft: "-100px", marginTop: "3px" }}>
                    <u>Amenities & Other Preference </u>
                  </h5>

                  <div
                    className="grid"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "0 6%",
                      width: "100%",
                      marginTop: "-18px",
                    }}
                  >
                    {Object.entries(booleanValues).map(([key, value]) => {
                      if (value === true) {
                        const imageSources = {
                          gatedSecurity: gatedSecurity,
                          powerBackup: powerBackup,
                          groceryStore: groceryStore,
                          swimmingPool: swimmingPool,
                          gym: gym,
                          clubHouse: clubHouse,
                          AirCondition: ac,
                          carParking: carParking,
                          bikeParking: bikeParking,
                          nonVeg: nonVeg,
                          bathroom: bathroom,
                        };
                        // Use the key to dynamically select the image source
                        const imageSrc = imageSources[key]; // You can set a default image source if needed

                        // return <li key={key}>{key}</li>;
                        return (
                          <div
                            className=""
                            style={{ width: "60px", padding: "3%" }}
                          >
                            <img
                              src={imageSrc}
                              height={22}
                              style={{ marginLeft: "10px" }}
                            />{" "}
                            <p style={{ fontSize: "10px" }}>
                              {" "}
                              {keyNames[key]}{" "}
                            </p>{" "}
                          </div>
                        );
                      }
                      return null; // Skip false values
                    })}
                  </div>
                </div>
              </div>

            ))}

</div>


            </>

          )}

          <div style={{ marginTop: "220px" }}> 
          <h3 style={{ color: "#52796F" }}>Add Property to Board</h3>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by property Name"
          />
          <PropertyComp  props={responseDataProperty} boardId={boardId} responseDataTenantData={responseDataTenantData} loading={loading} Id={tenantId} name={name} responseDataTenantBoard={responseDataTenantBoard} />
          </div>

          <Footer />
        </div>
      {/* </div> */}
    </>
  );
}
export default CreateBoard;
