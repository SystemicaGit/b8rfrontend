import React, { useState, useEffect } from "react";
import backgroundImg from "../../Assets/Images/Sale/RestBg.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from '../../CommonTopButton';
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import CreateBoardUpper from "../../Assets/Byerboard.png";
import CreateBoardAmm from "../../Assets/CreateBoardAmm.png";
import axios from 'axios';
import searchImg from "../../Assets/Search.png";
import SearchBar from "../../SearchBar";
import ApartmentType from "../../Assets/Images/BoardCreation/ApartmentType.png";
import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import Money from "../../Assets/Images/BoardCreation/Money.png";
import loadingGif from "../../Assets/Images/loading.gif";
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


function CreateBoardS()
{
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const buyerId = queryParameters.get("buyerId");
  const boardId = queryParameters.get("boardId");

  console.log(buyerId)

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
          `https://b8rliving.com/buyer/${buyerId}`,
          axiosConfig
        );

        const responseData = response.data.data.buyer.buyerDetails;
        const responseDataTenant = response.data.data.buyer.boardId;
        console.log(response.data.data.buyer.boardId);
        const responseDataTenantBoardId = response.data.data.buyer.boardId;
        
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
            (property) => property.status == "Verified"
          );

          console.log(filteredProperties);
          setResponseDataProperty(filteredProperties);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchTenantDetails(); // Call the fetch function
  }, [buyerId]);


  console.log(responseDataProperty);

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

  
    return(
        <div>
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
        <CommonHeader title="Create/Add to Board" color="#1E0058" />

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
            background: "#E8C5ED",
            marginTop: "20px",
            marginLeft: "20px",
            borderRadius: "6px",
            boxShadow: "10px 12px 17px rgba(0, 0, 0, 0.4)",
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
                    {values.budget} Cr
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

          
              </div>

            ))}

</div>


            </>

          )}

          <div style={{ marginTop: "100px" }}> 
          <h3 style={{ color: "#1E0058" }}>Add Property to Board</h3>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by property Name"
          />
          <PropertyComp props={responseDataProperty} responseDataTenantData={responseDataTenantData} loading={loading} Id={buyerId} responseDataTenantBoard={responseDataTenantBoard} />
          </div>

          <Footer />
        </div>
        </div>
        
    );
}
export default CreateBoardS;