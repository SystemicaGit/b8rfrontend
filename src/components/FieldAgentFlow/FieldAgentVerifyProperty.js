import React, { Component, useEffect, useState } from "react";
import ReactSwitch from "react-switch";

import { Link, redirect } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import peopleDown from "../Assets/Images/FieldAgent/peopleDown.png";
import Footer from "../Footer";
import vector from "../vector.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import swimming_pool from "../PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "../PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import number_of_balcony from "../PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "../PropertyAdditionPageIcons/floor_number/broom.png";

import backgroundSecond from "../Assets/Images/FieldAgent/other_bg.png";
import num3 from "../Assets/Images/FieldAgent/num3.png";
import gated_sec from "../PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "../PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "../PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "../PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "../PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "../PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "../PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "../PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "../PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "../PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "../PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "../PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "../PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "../PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "../PropertyAdditionPageIcons/rent_1/24.png";
import LiftLobby from "../Assets/Images/FieldAgent/LiftLobby.png";
import Door from "../Assets/Images/FieldAgent/Door.png";
import LivingRoom from "../Assets/Images/FieldAgent/LivingRoom.png";
import TVarea from "../Assets/Images/FieldAgent/TVarea.png";
import Kitchen from "../Assets/Images/FieldAgent/Kitchen.png";
import UtilityArea from "../Assets/Images/FieldAgent/UtilityArea.png";
import Backyard from "../Assets/Images/FieldAgent/Backyard.png";
import CommonWashroom from "../Assets/Images/FieldAgent/CommonWashroom.png";
import Balcony from "../Assets/Images/FieldAgent/Balcony.png";
import bedroom from "../Assets/Images/FieldAgent/Bedroom.png";
import washroom from "../Assets/Images/FieldAgent/washroom.png";
import balcony from "../Assets/Images/FieldAgent/Balcony_two.png";
import broom_clean from "../Assets/Images/FieldAgent/Broom_clean.png";
// import BackButton from "../CommonButtonBack";
// import CommonHeader from "../CommonHeader";
// import CommonBtn from "../CommonButton";

function FieldAgentVerifyProperty() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idProperty = queryParameters.get("propertyId");
  // console.log("id" + idProperty);

  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);
  const [checkedStateFour, setCheckedStateFour] = useState(false);
  const [checkedStateFive, setCheckedStateFive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [responseDataPendingProperties, setresponseDataPendingProperties] =
    useState([]);
  const token = localStorage.getItem("token");
  //   console.log(token);

  const [formData, setFormData] = useState({
    houseName: "",
    societyName: "",
    pinCode: "",
    propertyDetails: {
      propertyInfo: {
        houseType: "",
        houseConfig: "",
        area: "",
        mapLocation: "",
        purposeRent: false,
        purposeSale: false,
      },
      ownerInfo: {
        name: {
          first: "",
          last: "",
        },
        phoneNumber: "",
        panNumber: "",
        country: "",
        city: "",
      },
      featureInfo: {
        gatedSecurity: true,
        powerBackup: true,
        groceryStore: true,
        swimmingPool: false,
        gym: false,
        clubHouse: false,
        carpetArea: "",
        floors: {
          total: "",
          your: "",
        },
        parking: {
          car: "",
          bike: "",
          type: "",
        },
        houseHelpRoom: "",
        bathrooms: "",
        balconies: "",
        furnishingType: "",
        ac: true,
        nonVeg: false,
        constructionYear: "",
        availableFrom: "",
        rentAmount: 0,
        rentDeposit: 0,
        rentMaintenance: 0,
        lockInPeriod: 0,
        saleAmount: 0,
        saleDeposit: 0,
        saleMaintenance: 0,
        moveInFrom: 0,
      },
      verifyInfo: {
        liftLobby: true,
        entryDoor: true,
        homeEntry: true,
        livingRoom: false,
        tvArea: false,
        kitchen: false,
        utilityArea: false,
        backyard: false,
        commonWashroom: false,
        livingRoomBalcony: false,
        mainGate: false,
        clubHouse: false,
        groceryStore: false,
        swimmingPool: false,
        gym: false,
        parking: false,
        feature1: "",
        // "feature2": "",
        // "feature3": ""
      },
    },
  });

  // Define a JSON object with fields and their values
  const [featureData, setfeatureData] = useState({
  bed_one: false,
  bath_one: false,
  balcony: false,
  bedroom_two: false,
  bath_two: false,
  balcony_two: false,
  bedroom_three: false,
  bath_three: false,
  balcony_three: false,
  servant_room: false,
  servant_washroom: false
  // Add other fields and set their values as needed
  });



  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${idProperty}`,
          axiosConfig
        );

        const responseData = response.data.data.property;
        // Create a copy of the existing formData
        const updatedFormData = { ...formData };
        // // Iterate over the keys in responseData
        // for (const key in responseData) {
        //   // Check if the key exists in updatedFormData
        //   if (updatedFormData.hasOwnProperty(key)) {
        //     // Update the corresponding field in updatedFormData
        //     updatedFormData[key] = responseData[key];
        //   }
        // }

        // Check if propertyDetails exists in responseData
        if (responseData.hasOwnProperty("propertyDetails")) {
          // Create a copy of the existing propertyDetails
          const updatedPropertyDetails = { ...updatedFormData.propertyDetails };

          // Iterate over the keys in responseData.propertyDetails
          for (const key in responseData.propertyDetails) {
            // Check if the key exists in updatedPropertyDetails
            if (updatedPropertyDetails.hasOwnProperty(key)) {
              // Update the corresponding field in updatedPropertyDetails
              updatedPropertyDetails[key] = responseData.propertyDetails[key];
            }
          }
          // Update top-level fields (houseName, societyName, pinCode)
          updatedFormData.houseName = responseData.houseName;
          updatedFormData.societyName = responseData.societyName;
          updatedFormData.pinCode = responseData.pinCode;

          // Update propertyDetails in updatedFormData
          updatedFormData.propertyDetails = updatedPropertyDetails;
        }

        // Update the state with the updatedFormData
        setFormData(updatedFormData);
        // console.log(JSON.stringify(formData));
        // Now, formData will contain the updated data

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [idProperty]); // Add idProperty and formData as dependencies if

  // // This useEffect will log the updated state after it has been set.
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //PUT
  const [isCheckRent, setisCheckRent] = useState(Boolean);
  const [isCheckSale, setisCheckSale] = useState(Boolean);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevState) => {
      if (name in prevState.propertyDetails.propertyInfo) {
        return {
          ...prevState,

          propertyDetails: {
            ...prevState.propertyDetails,
            propertyInfo: {
              ...prevState.propertyDetails.propertyInfo,
              [name]: value,
              [name]: type === "checkbox" ? checked : value,
            },
          },
        };
      } else if (name in prevState.propertyDetails) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            [name]: value,
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              [name]: value,
            },
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo.floors) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              floors: {
                ...prevState.propertyDetails.featureInfo.floors,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo.parking) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              parking: {
                ...prevState.propertyDetails.featureInfo.parking,
                [name]: value,
              },
            },
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  // const [xToggle, setXToggle] = useState({
  //   xToggle: false,
  // });

  // const handleToggle = (btnId) => {
  //   // Toggle the state based on the button's ID
  //   setXToggle((prevState) => ({
  //     xToggle: btnId === 'specificButtonId' ? !prevState.xToggle : prevState.xToggle,
  //   }));
  // };

// Create an object to store toggle states for different buttons
const [buttonToggles, setButtonToggles] = useState({});

const handleToggle = (btnId) => {
  // Update the toggle state for the button with the specified btnId
  setButtonToggles((prevState) => ({
    ...prevState,
    [btnId]: !prevState[btnId] || false,
  }));
};

const handleChangeOne = (event) => {
    event.preventDefault();

    setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
    console.log("Received from PrpertyInfo - 1s In state 1:", formData);

    // formData.propertyData.propertyInfo.purposeRent
    //   ? setisCheckRent(true)
    //   : setisCheckRent(false);
    // formData.propertyInfo.houseType
    //   ? setisCheckSale(true)
    //   : setisCheckSale(false);
  };
  const handleChangeTwo = (event) => {
    event.preventDefault();
    console.log("CLICKED");

    // setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
    setCheckedStateThree((current) => !current);
    console.log("Received from PrpertyInfo - 1s In state 2:", formData);
  };

  const handleChangeThree = (event) => {
    event.preventDefault();
    setCheckedStateThree((current) => !current);
    setCheckedStateFour((current) => !current);
    console.log("Received from PrpertyInfo - 1s In state 3:", formData);
  };

  const handleChangeFour = (event) => {
    event.preventDefault();
    setCheckedStateFour((current) => !current);
    setCheckedStateFive((current) => !current);

    console.log("Received from PrpertyInfo - 1s In state 4:", formData);
  };


  //SUBMIT DATA
  const handleChangeSubmit = async (event) => {
    event.preventDefault();
    console.log("Received from Final In state:", formData);

    
    // Extract feature1 and stringify it
  const feature1String = JSON.stringify(formData.propertyDetails.verifyInfo.feature1);

  // Create a copy of the formData and set the stringified feature1
  const updatedFormData = { ...formData };
  updatedFormData.propertyDetails.verifyInfo.feature1 = feature1String;
  console.log(feature1String);

    try {
      const response = await axios.put(
        `https://b8rliving.com/field-agent/verify/${idProperty}`,
        formData,
        axiosConfig
      );

      // setformData(response.data.data.property);
      // Assuming you have your response data stored in a variable called 'response'
      // const responseData = response.data.data.property;

      // Update the formData state with the response data
      // setFormData(responseData);
      // setFormDataNew(response.data.data.property);

      // Log the updated state
      console.log(response);
      alert(response.data.message);
      window.location.href = "/fieldAgentHomeN";
      // console.log(JSON.stringify(formData));
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const pincodeRegex = /^\d{6}$/;

  const validatePincode = () => {
    console.log("blur");
    if (pincodeRegex.test(formData.pinCode)) {
      // alert('Valid PIN code');
    } else {
      alert("Invalid PIN code");
    }
  };

  return (
    <>
      {checkedStateOne ? (
        <div
          className="form"
          style={{
            borderRadius: "16px",
            marginTop: "10%",
            backgroundRepeat: "no-repeat",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {/* <h2 style={{color:"#52796F"}}>Verification</h2> */}
          <CommonHeader title="Property Verification(1/2)" color="#52796F" />

          <h4
            style={{
              marginBottom: "-10px",
              fontSize: "25px",
              color: "#3B413D",
            }}
          >
            {formData.houseName}, {formData.societyName}
          </h4>

          <div
            className="containered"
            style={{
              padding: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <form
                  className="login-form inner-background"
                  onSubmit={handleChangeOne}
                >
                  <label
                    for="mapLocation"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Map Location
                  </label>
                  <input
                    type="text"
                    id="mapLocation"
                    name="mapLocation"
                    value={formData.propertyDetails.propertyInfo.mapLocation}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="houseType"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    What is the House type?
                  </label>
                  <select
                    id="houseType"
                    name="houseType"
                    // value={formData.propertyData.propertyInfo.houseType}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  >
                    <option
                      selected
                      value="{formData.propertyDetails.propertyInfo.houseType}"
                      disabled
                    >
                      {formData.propertyDetails.propertyInfo.houseType}
                    </option>
                    <option value="Flat (in Gated Society)">
                      Flat (in Gated Society)
                    </option>
                    <option value="Individual Builder Floor">
                      {" "}
                      Individual Builder Floor
                    </option>
                    <option value="Individual House(in Gated Society)">
                      Individual House(in Gated Society)
                    </option>
                    <option value=" Standalone Individual House">
                      Standalone Individual House
                    </option>
                  </select>
                  <br></br>

                  {/* house configuration */}
                  <label
                    for="houseConfig"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    What is the house configuration?{" "}
                  </label>
                  <select
                    id="houseConfig"
                    name="houseConfig"
                    // value={formData.data.property.propertyInfo.houseConfig}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  >
                    <option
                      selected
                      value="{formData.propertyDetails.propertyInfo.houseConfig}"
                      disabled
                    >
                      {formData.propertyDetails.propertyInfo.houseConfig}
                    </option>

                    <option value="Studio">Studio</option>

                    <option value="1 BHK">1 BHK</option>

                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                  </select>
                  <br></br>

                  {/* house_num type */}

                  <label
                    for="houseName"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    House Number/ Flat Number/ Name
                  </label>
                  <input
                    type="text"
                    id="houseName"
                    value={formData.houseName}
                    onChange={handleChange}
                    name="houseName"
                    placeholder="Text Input (Do not Enter Block Number)"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  ></input>

                  {/* Society type */}

                  <label
                    for="society_type"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    What is the Society?
                  </label>
                  <input
                    type=""
                    id="societyName"
                    value={formData.societyName}
                    onChange={handleChange}
                    name="societyName"
                    placeholder="for eg(Oceanus Triton or Sushant Estate)"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  ></input>

                  {/* Pin code */}

                  <label
                    for="pinCode"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Pin Code
                  </label>
                  <input
                    type="number"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    onBlur={validatePincode}
                    placeholder="Pin code"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  ></input>
                  <br></br>
                  {/* Area */}
                  <label
                    for="address"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Area/Locality
                  </label>

                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.propertyDetails.propertyInfo.area}
                    // value={formData.propertyDetails.version}

                    onChange={handleChange}
                    placeholder="Area/Locality"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                    }}
                  ></input>
                  <br></br>

                  <div className="checkContainer">
                    <label
                      htmlFor="checkboxGroup"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Select Purpose:
                      <br />
                      (select both if property is open for sale as well as rent)
                    </label>
                    <br></br>
                    <div className="checkboxes">
                      <input
                        type="checkbox"
                        id="purposeRent"
                        name="purposeRent"
                        checked={
                          formData.propertyDetails.propertyInfo.purposeRent
                            ? true
                            : false
                        }
                        // value={formData.data.propertyData.propertyInfo.purposeRent}
                        style={{
                          width: "10px",
                          padding: "1%",
                          boxShadow: "none",
                          zoom: "2",
                          borderRadius: "0px",
                        }}
                        // checked={rentChecked}
                        onChange={handleChange}
                      />
                      <label for="purposeRent">For Rent</label>
                    </div>
                    <div className="checkboxes">
                      <input
                        style={{
                          width: "10px",
                          padding: "1%",
                          boxShadow: "none",
                          zoom: "2",
                        }}
                        type="checkbox"
                        id="purposeSale"
                        name="purposeSale"
                        checked={
                          formData.propertyDetails.propertyInfo.purposeSale
                            ? true
                            : false
                        }
                        // value={formData.propertyData.propertyInfo.purposeSale}
                        // checked={saleChecked}
                        onChange={handleChange}
                      />
                      <label htmlFor="purposeSale">For Sale</label>
                    </div>
                  </div>
                  {/* <div style={{ marginTop: "-50px" }}> */}
                  {/* <Link to="/FieldAgentVerifyPropertyF"> */}
                  <CommonBtn
                    title="Save & Next"
                    margin="12%"
                    fontweight="bolder"
                  />
                </form>
              </div>
              <div></div>
            </div>
          </div>

          <div style={{ marginTop: "150px" }}>
            <Footer />
          </div>
        </div>
      ) : null}

      {checkedStateTwo ? (
        // FORM TWO
        <div
          className="form"
          style={{
            borderRadius: "16px",
            marginTop: "10%",
            backgroundRepeat: "no-repeat",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <CommonHeader title="Property Verification(2/2)" color="#52796F" />

          <h4
            style={{
              marginBottom: "-10px",
              fontSize: "25px",
              color: "#3B413D",
            }}
          >
            {formData.houseName}, {formData.societyName}
          </h4>

          <div
            className="containered"
            style={{
              padding: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <form
                  className="login-form inner-background"
                  onSubmit={handleChangeTwo}
                >
                  <div
                    style={{
                      marginRight: "10px",
                      border: "0.5px solid #CFD3D2",
                      width: "300px",
                      padding: "10px",
                      borderRadius: "2%",
                      background:
                        "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "left",
                        marginTop: "20px",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      About the society
                    </h3>
                    <div class="grid-container" style={{ width: "300px" }}>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={gated_sec} alt="Icon description" />
                        <h5
                          style={{
                            marginTop: "-2px",
                            fontSize: "10px",
                            fontFamily: "sans-serif",
                          }}
                        >
                          Gated Security
                        </h5>
                        <h6 style={{ marginTop: "-13px", fontSize: "8px" }}>
                          always secure
                        </h6>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.gatedSecurity
                          }
                          // onChange={() =>
                          //   setFormData({
                          //     ...formData,
                          //     gatedSecurity: !formData.propertyDetails.featureInfo.gatedSecurity,
                          //   })
                          // }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  gatedSecurity:
                                    !prevState.propertyDetails.featureInfo
                                      .gatedSecurity,
                                },
                              },
                            }))
                          }
                          // onChange={handleChange}
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={Power_backup} alt="Icon description" />
                        <h5 style={{ marginTop: "-5px" }}>24 X 7</h5>
                        <h5 style={{ marginTop: "-13px", fontSize: "8px" }}>
                          Power Back-up
                        </h5>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.powerBackup
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  powerBackup:
                                    !prevState.propertyDetails.featureInfo
                                      .powerBackup,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={convenience_store} alt="Icon description" />
                        <h5 style={{ marginTop: "-5px", fontSize: "10px" }}>
                          Grocery Store
                        </h5>
                        <h5 style={{ marginTop: "-9px", fontSize: "8px" }}>
                          In Campus
                        </h5>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.groceryStore
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  groceryStore:
                                    !prevState.propertyDetails.featureInfo
                                      .groceryStore,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={swimming_pool} alt="Icon description" />
                        <h5
                          style={{
                            marginTop: "-5px",
                            marginBottom: "15px",
                            fontSize: "10px",
                          }}
                        >
                          Swimming Pool
                        </h5>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.swimmingPool
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  swimmingPool:
                                    !prevState.propertyDetails.featureInfo
                                      .swimmingPool,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={gym_1} alt="Icon description" />
                        <h5
                          style={{
                            marginTop: "-1px",
                            marginBottom: "20px",
                            fontSize: "10px",
                          }}
                        >
                          Gym
                        </h5>
                        <ReactSwitch
                          checked={formData.propertyDetails.featureInfo.gym}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  gym: !prevState.propertyDetails.featureInfo
                                    .gym,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div class="grid-item" style={{ border: "none" }}>
                        <img src={club_house} alt="Icon description" />
                        <h5
                          style={{
                            marginTop: "-5px",
                            marginBottom: "10px",
                            fontSize: "10px",
                          }}
                        >
                          Club house
                        </h5>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.clubHouse
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  clubHouse:
                                    !prevState.propertyDetails.featureInfo
                                      .clubHouse,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      margin: "20px",
                      border: "1px solid #DAF0EE",
                      padding: "5px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "327px",
                      background:
                        "linear-gradient(180deg, rgba(218, 240, 238, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      borderRadius: "5px",
                    }}
                  >
                    <h3 style={{ textAlign: "left", marginTop: "-1px" }}>
                      House Details
                    </h3>

                    {/* -------------------------FLOOR NUMBER----------------------------- */}
                    <div
                      class="grid-container"
                      style={{
                        width: "320px",
                        marginTop: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        border: "none",
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        height: "120px",
                        borderRadius: "5px",
                      }}
                    >
                      <h5 style={{ marginTop: "55px" }}>Floor Number</h5>

                      <div style={{ display: "flex" }}>
                        <div style={{ marginTop: "38px", marginRight: "" }}>
                          <label
                            style={{ marginTop: "-5px", fontSize: "10px" }}
                          >
                            Your Floor
                          </label>
                          <input
                            type="number"
                            id="your"
                            value={
                              formData.propertyDetails.featureInfo.floors.your
                            }
                            onChange={handleChange}
                            name="your"
                            placeholder="number*"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "80px",
                              height: "30px",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          />
                        </div>

                        <div
                          style={{ marginTop: "10px", marginRight: "-100px" }}
                        >
                          <img src={floor_number} alt="Icon description" />
                          <br />
                          <label
                            style={{ marginTop: "-1px", fontSize: "10px" }}
                          >
                            Total Floor
                          </label>

                          <input
                            type="number"
                            id="total"
                            value={
                              formData.propertyDetails.featureInfo.floors.total
                            }
                            onChange={handleChange}
                            name="total"
                            placeholder="number*"
                            style={{
                              backgroundColor: "#F5F5F5",

                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "80px",
                              height: "30px",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* -------------------------FLOOR NUMBER----------------------------- */}

                    {/* -------------------------CAR PARKING----------------------------- */}
                    <div
                      class="grid-item"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "30px",
                        marginBottom: "20px",
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    >
                      <div>
                        <img
                          src={car_parking}
                          style={{ marginLeft: "10px" }}
                          alt="Icon description"
                        />
                        <br />
                        <label style={{ fontSize: "10px", marginTop: "5px" }}>
                          Car & Bike Parking Availability
                        </label>
                      </div>
                      <div>
                        <div>
                          <label style={{ fontSize: "10px" }}>
                            Number of Car Parking
                          </label>
                          <select
                            id="parking"
                            name="parking"
                            value={
                              formData.propertyDetails.featureInfo.parking.car
                            }
                            onChange={handleChange}
                            style={{
                              backgroundColor: "white",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "150px",
                              marginLeft: "50px",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          >
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking.car
                              }
                              selected
                              disabled
                            >
                              {formData.propertyDetails.featureInfo.parking.car}
                            </option>
                            <option
                              style={{
                                textAlign: "center",
                                backgroundColor: "red",
                              }}
                              value="1Car"
                            >
                              1 Car
                            </option>
                            <option value="2Car">2 Car</option>
                            <option value="3Car">3 Car</option>
                            <option value="4Car">4 Car</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: "10px" }}>
                            Number of Bike Parking
                          </label>
                          <select
                            id="parking"
                            name="parking"
                            value={formData.parking}
                            onChange={handleChange}
                            style={{
                              backgroundColor: "white",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "150px",
                              marginLeft: "50px",

                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          >
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking
                                  .bike
                              }
                              selected
                              disabled
                            >
                              {
                                formData.propertyDetails.featureInfo.parking
                                  .bike
                              }
                            </option>

                            <option
                              style={{
                                textAlign: "center",
                                backgroundColor: "red",
                              }}
                              value="1Bike"
                            >
                              1 Bike
                            </option>
                            <option value="IncludedwithCar">
                              Included with Car
                            </option>
                            <option value="Ownedgarage">Owned Garage</option>
                          </select>
                        </div>
                        <div>
                          <label
                            style={{
                              fontSize: "11px",
                              textAlign: "left",
                              marginLeft: "-29px",
                            }}
                          >
                            Parking Type
                          </label>
                          <br />
                          <select
                            id="parking"
                            name="parking"
                            value={formData.parking}
                            onChange={handleChange}
                            style={{
                              backgroundColor: "white",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "150px",
                              marginTop: "5px",
                              marginLeft: "50px",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          >
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking
                                  .type
                              }
                              selected
                              disabled
                            >
                              {
                                formData.propertyDetails.featureInfo.parking
                                  .type
                              }
                            </option>

                            <option
                              style={{
                                textAlign: "center",
                                backgroundColor: "red",
                              }}
                              value="Covered Roof"
                            >
                              Covered Roof
                            </option>
                            <option value="Open">Open</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------CAR PARKING----------------------------- */}

                    {/* -----------------------------------------House help--------------------------------------------------------------- */}

                    <div
                      class="grid-item"
                      style={{
                        marginTop: "30px",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "5px",
                        border: "none",
                        height: "90px",
                      }}
                    >
                      <div>
                        <img src={broom} alt="Icon description" />
                        <br />
                        <label style={{ fontSize: "10px" }}>
                          House help room
                        </label>
                      </div>
                      <div>
                        <label style={{ fontSize: "10px" }}>
                          House Help Room
                        </label>
                        <br />
                        <select
                          id="houseHelpRoom"
                          name="houseHelpRoom"
                          value={formData.houseHelpRoom}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            width: "150px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            marginLeft: "60px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option
                            value={
                              formData.propertyDetails.featureInfo.houseHelpRoom
                            }
                            selected
                            disabled
                          >
                            {formData.propertyDetails.featureInfo.houseHelpRoom}
                          </option>

                          <option
                            style={{
                              textAlign: "center",
                              backgroundColor: "red",
                            }}
                            value="1 Room"
                          >
                            1 Room
                          </option>

                          <option value=" 1 Room + Bathroom">
                            1 Room + Bathroom
                          </option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>

                    {/* -----------------------------------------House help--------------------------------------------------------------- */}

                    <div class="grid-container" style={{}}>
                      <div
                        class="grid-item"
                        style={{
                          width: "145px",
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                          border: "none",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={num_of_bathrooms} alt="Icon description" />
                        <h5>Number of Bathrooms</h5>
                        <select
                          id="numofbath"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option
                            value={
                              formData.propertyDetails.featureInfo.bathrooms
                            }
                            selected
                            disabled
                          >
                            {formData.propertyDetails.featureInfo.bathrooms}
                          </option>

                          <option
                            style={{
                              textAlign: "center",
                              backgroundColor: "red",
                            }}
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      <div
                        class="grid-item"
                        style={{
                          width: "150px",
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "5px",
                          border: "none",
                        }}
                      >
                        <img src={number_of_balcony} alt="Icon description" />
                        <h5>No of Balconies</h5>
                        <select
                          id="balconies"
                          name="balconies"
                          value={formData.propertyDetails.featureInfo.balconies}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option
                            value={
                              formData.propertyDetails.featureInfo.balconies
                            }
                            selected
                            disabled
                          >
                            {formData.propertyDetails.featureInfo.balconies}
                          </option>
                          {/* <option value="furnish">Drop Down</option> */}
                          <option
                            style={{
                              textAlign: "center",
                              backgroundColor: "red",
                            }}
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                    <div
                      class="grid-item"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        marginBottom: "20px",
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    >
                      <div style={{}}>
                        <img
                          src={furniture_1}
                          style={{ marginTop: "0px" }}
                          alt="Icon description"
                        />
                        <h5 style={{ marginTop: "-1px" }}>Furnishing</h5>
                      </div>
                      <div style={{ marginLeft: "50px" }}>
                        <h6 style={{ marginTop: "30px" }}>
                          Type Of Furnishing?
                        </h6>
                        <select
                          id="furnishingType"
                          name="furnishingType"
                          // value={formData.propertyDetails.featureInfo.furnishingType}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            marginTop: "-50px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option
                            value={
                              formData.propertyDetails.featureInfo
                                .furnishingType
                            }
                            selected
                            disabled
                          >
                            {
                              formData.propertyDetails.featureInfo
                                .furnishingType
                            }
                          </option>

                          <option
                            style={{
                              textAlign: "center",
                              backgroundColor: "red",
                            }}
                            value="Un-furnished"
                          >
                            Un-furnished
                          </option>
                          <option value="Semi-furnished">Semi-Furnished</option>
                          <option value="Full-furnished">Full-Furnished</option>
                        </select>
                      </div>
                    </div>
                    <div class="grid-container">
                      <div
                        class="grid-item"
                        style={{
                          width: "150px",
                          marginBottom: "10px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24",
                          border: "none",
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={Ac_png} alt="Icon description" />
                        <h5 style={{ marginTop: "10px" }}>Air Conditioner</h5>
                        <ReactSwitch
                          checked={formData.propertyDetails.featureInfo.ac}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  ac: !prevState.propertyDetails.featureInfo.ac,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                      <div
                        class="grid-item"
                        style={{
                          width: "150px",
                          marginBottom: "10px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24",
                          border: "none",
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={veg_nonveg} alt="Icon description" />
                        <h5 style={{ marginTop: "0px" }}>Non Veg Allowed?</h5>
                        <ReactSwitch
                          checked={formData.propertyDetails.featureInfo.nonVeg}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  nonVeg:
                                    !prevState.propertyDetails.featureInfo
                                      .nonVeg,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={
                            <span
                              style={{
                                color: "#black",
                                fontSize: "15px",
                                marginTop: "10px",
                              }}
                            ></span>
                          }
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <BackButton title="Back" margin="" fontweight="bolder" />
                    <CommonBtn
                      title="Upload Photos"
                      margin="38%"
                      fontweight="bolder"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* for title and text */}

            <div></div>
          </div>
        </div>
      ) : null}

      {checkedStateThree ? (
        <>
          <div
            className="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <form
              className="login-form inner-background"
              onSubmit={handleChangeThree}
            >
              {/* <h2 style={{color:"#52796F"}}>Photo Capture</h2> */}
              <CommonHeader title="Photo Capture" color="#52796F" />
              <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <text
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "20px",
                  }}
                >
                  Please make sure to capture all the places inside the House as
                  well as the <br />
                  Society
                  <br />
                  Make sure following is set-up
                  <br />
                  1. Keep all the <b>windows open</b>
                  <br />
                  2. Make sure the <b>curtains are wide open</b>
                  <br />
                  3. The <b>house is clean, tidy & well arranged</b>
                  <br />
                  4. Shoes & Footwear is locked inside
                  <br />
                  5. Bedsheets are well laid out and no open blankets
                  <br />
                  6. Pillow are well set
                  <br />
                  7. No random things on floor <br />
                </text>
              </div>
              <CommonBtn
                title="Yes all the things are arranged"
                margin="20px"
              />
              <div style={{ textAlign: "left" }}>
                <h3 style={{ textAlign: "left", marginTop: "80px" }}>
                  <u>Basic Home Photos</u>
                </h3>
                <text
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "20px",
                  }}
                >
                  Select <b>Yes</b> after clicking and checking the photo on the
                  Camera.
                  <br />
                  If it is not relevant or the space does not exist, select no
                </text>
              </div>
              {/* BODY */}
              <div style={{ marginTop: "50px" }}>
                {/* //First row */}
                <div style={{ display: "flex", width: "700px" }}>
                  {/* --------------lift Lobby----------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={LiftLobby}
                      style={{ fontSize: "10px" }}
                      alt="LiftLobby"
                    />
                    <h5 style={{ marginTop: "10px" }}>Lift Lobby</h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.liftLobby}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              liftLobby:
                                !formData.propertyDetails.verifyInfo.liftLobby,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------lift Lobby----------------- */}
                  {/* --------------Entry Door---------------------- */}
                  <div style={{ width: "90px" }}>
                    <img src={Door} style={{ fontSize: "10px" }} alt="Door" />
                    <h5 style={{ marginTop: "10px" }}>Door</h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.entryDoor}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              entryDoor:
                                !formData.propertyDetails.verifyInfo.entryDoor,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------Entry Door---------------------- */}
                  {/* --------------Home Entry---------------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={LiftLobby}
                      style={{ fontSize: "10px" }}
                      alt="LiftLobby"
                    />
                    <h5 style={{ marginTop: "10px" }}>Home Entry</h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.homeEntry}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              homeEntry:
                                !formData.propertyDetails.verifyInfo.homeEntry,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------Home Entry---------------------- */}
                  {/* --------------Living Room---------------------- */}
                  <div style={{ width: "100px", marginTop: "-14px" }}>
                    <img
                      src={LivingRoom}
                      style={{ height: "70px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.livingRoom}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              livingRoom:
                                !formData.propertyDetails.verifyInfo.livingRoom,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------Living Room---------------------- */}
                </div>
                {/* //Second row */}
                <div style={{ display: "flex", marginTop: "20px" }}>
                  {/* -------------------------------TV Area------------------------- */}
                  <div style={{ width: "90px" }}>
                    <img src={TVarea} style={{ height: "50px" }} alt="TVarea" />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.tvArea}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              tvArea:
                                !formData.propertyDetails.verifyInfo.tvArea,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* -------------------------------TV Area------------------------- */}
                  {/* -------------------------------Kitchen------------------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={Kitchen}
                      style={{ height: "50px" }}
                      alt="Kitchen"
                    />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.kitchen}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              kitchen:
                                !formData.propertyDetails.verifyInfo.kitchen,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* -------------------------------Kitchin------------------------- */}
                  {/* -------------------------------Utility Area------------------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={UtilityArea}
                      style={{ height: "57px" }}
                      alt="UtilityArea"
                    />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.utilityArea}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              utilityArea:
                                !formData.propertyDetails.verifyInfo
                                  .utilityArea,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* -------------------------------Utility Area------------------------- */}
                  {/* -------------------------------Backyard------------------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={Backyard}
                      style={{ height: "50px" }}
                      alt="Backyard"
                    />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.backyard}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              backyard:
                                !formData.propertyDetails.verifyInfo.backyard,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* -------------------------------Backyard------------------------- */}
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                  {/* //Third row */}
                  {/* --------------------------Common Wahsroom--------------------------------- */}
                  <div style={{ width: "90px" }}>
                    <img
                      src={CommonWashroom}
                      style={{ height: "90px" }}
                      alt="CommonWashroom"
                    />
                    <h5 style={{ marginTop: "10px" }}></h5>
                    <ReactSwitch
                      checked={
                        formData.propertyDetails.verifyInfo.commonWashroom
                      }
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              commonWashroom:
                                !formData.propertyDetails.verifyInfo
                                  .commonWashroom,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------Common Wahsroom--------------------------------- */}
                  {/* --------------------------Living Room Balcony--------------------------------- */}
                  <div style={{ width: "130px", marginLeft: "20px" }}>
                    <img
                      src={Balcony}
                      style={{ height: "40px" }}
                      alt="Balcony"
                    />
                    <h5 style={{ marginTop: "10px", fontSize: "18px" }}>
                      Living Room Balcony
                    </h5>
                    <ReactSwitch
                      checked={
                        formData.propertyDetails.verifyInfo.livingRoomBalcony
                      }
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              livingRoomBalcony:
                                !formData.propertyDetails.verifyInfo
                                  .livingRoomBalcony,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------Living Room Balcony--------------------------------- */}
                </div>
              </div>

              <CommonBtn title="Bedroom Photos" margin="18%" />
            </form>
          </div>
        </>
      ) : null}

      {checkedStateFour ? (
        <>
          <div
            className="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <form
              className="login-form inner-background"
              onSubmit={handleChangeFour}
            >
              <CommonHeader title="Photo Capture" color="#52796F" />

              <div style={{ textAlign: "left" }}>
                <text>
                  Bedroom Photos Checklist
                  <br />
                  <div style={{ marginTop: "20px" }}></div>
                  1. Keep all the <b> windows open</b>
                  <br />
                  2. Make sure the{" "}
                  <b>
                    curtains are wide <br />
                    open
                  </b>
                  <br />
                  3. Bedsheets are well laid out and no
                  <br /> open blankets
                  <br />
                  4. Pillow are well set
                  <br />
                  5. No random things on floor
                  <div style={{ marginLeft: "40px" }}>
                    <CommonBtn
                      title="Yes all the things are arranged"
                      margin="-15px"
                    />
                  </div>
                </text>
              </div>

              <h3
                style={{
                  textAlign: "left",
                  marginBottom: "-10px",
                  marginTop: "80px",
                }}
              >
                Bedroom & Other Details
              </h3>
              <div
                style={{
                  height: "600px",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(180deg, rgba(218, 240, 238, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                  border: "1px solid #CFD3D2",
                  marginTop: "20px",
                  marginBottom: "90px",
                }}
              >
                {/* ------------------------------first row---------------------------------- */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* --------------------------------bedroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={bedroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Bedroom 1</h5>
                    <ReactSwitch
                      checked={featureData.bed_one}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bed_one: !featureData.bed_one,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------bedroom------------------------------------------------- */}

                  {/* --------------------------------washroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={washroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Attached Bath 1</h5>
                    <ReactSwitch
                      checked={featureData.bath_one}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_one: !featureData.bath_one,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------washroom------------------------------------------------- */}

                  {/* --------------------------------balcony------------------------------------------------- */}

                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={balcony}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Balcony 1</h5>
                    <ReactSwitch
                      checked={featureData.balcony}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony: !featureData.balcony,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>
                {/* ------------------------------Second row---------------------------------- */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* --------------------------------bedroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={bedroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Bedroom 2</h5>
                    <ReactSwitch
                      checked={featureData.bedroom_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bedroom_two: !featureData.bedroom_two,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------bedroom------------------------------------------------- */}

                  {/* --------------------------------washroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={washroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Attached Bath 2</h5>
                    <ReactSwitch
                      checked={featureData.bath_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_two: !featureData.bath_two,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------washroom------------------------------------------------- */}

                  {/* --------------------------------balcony------------------------------------------------- */}

                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={balcony}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Balcony 2</h5>
                    <ReactSwitch
                      checked={featureData.balcony_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony_two: !featureData.balcony_two,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>

                {/* ------------------------------thrid row---------------------------------- */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* --------------------------------bedroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={bedroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Bedroom 3</h5>
                    <ReactSwitch
                      checked={featureData.bedroom_three}
                      onChange={() =>
                        setFormData({
                          ...featureData,
                          bedroom_three: !featureData.bedroom_three,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------bedroom------------------------------------------------- */}

                  {/* --------------------------------washroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={washroom}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Attached Bath 3</h5>
                    <ReactSwitch
                      checked={featureData.bath_three}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_three: !featureData.bath_three,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------washroom------------------------------------------------- */}

                  {/* --------------------------------balcony------------------------------------------------- */}

                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={balcony}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Balcony 3</h5>
                    <ReactSwitch
                      checked={featureData.balcony_three}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony_three: !featureData.balcony_three,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={broom_clean}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Servant Room</h5>
                    <ReactSwitch
                      checked={featureData.servant_room}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          servant_room: !featureData.servant_room,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  {/* --------------------------------bedroom------------------------------------------------- */}

                  {/* --------------------------------washroom------------------------------------------------- */}
                  <div
                    style={{
                      width: "60px",
                      marginTop: "20px",
                      marginLeft: "40px",
                    }}
                  >
                    <img
                      src={broom_clean}
                      style={{ height: "20px" }}
                      alt="LivingRoom"
                    />
                    <h5 style={{ marginTop: "10px" }}>Servant Washroom </h5>
                    <ReactSwitch
                      checked={featureData.servant_washroom}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          servant_washroom: !featureData.servant_washroom,
                        })
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>
              </div>

              {/* -----------------------------society related pressure-------------------------------------- */}

              <div style={{ marginTop: "50px" }}></div>
              {/* <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "80%" }}>Submit & Upload Photos<img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%",marginTop:"-25px" }}/></button>
		                </div> */}
              {/* BODY */}

              <div style={{ display: "flex", flexDirection: "row" }}>
                <BackButton title="Back" margin="" fontweight="bolder" />
                <CommonBtn
                  title="Upload Photos"
                  margin="38%"
                  fontweight="bolder"
                />
              </div>
            </form>
          </div>
        </>
      ) : null}

      {checkedStateFive ? (
        <>
          <div
            className="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{ color: "#52796F" }}>Photo Capture</h2> */}
            <CommonHeader title="Photo Capture" color="#52796F" />
            <form
              className="login-form inner-background"
              onSubmit={handleChangeSubmit}
            >
            <div style={{ textAlign: "left" }}>
              <text>
                Society Photos Checklist
                <br />
                <div style={{ marginTop: "20px" }}></div>
                1. Below are mandatory pictures
                <br />
                2. If there are more places in the society relevant to the
                tenant, please click all pictures.
                <br />
              </text>
            </div>

            {/* -----------------------------society related pressure-------------------------------------- */}

            <h3
              style={{
                textAlign: "left",
                marginBottom: "10px",
                marginTop: "80px",
              }}
            >
              Society Related Pictures
            </h3>
            <div
              style={{
                height: "300px",
                borderRadius: "5px",
                background:
                  "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                border: "1px solid #CFD3D2",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div class="grid-container" style={{ width: "300px" }}>
                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={gated_sec} alt="Icon description" />
                    <h5
                      style={{
                        marginTop: "-2px",
                        fontSize: "10px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Main Gate
                    </h5>
                    <h6 style={{ marginTop: "-13px", fontSize: "8px" }}></h6>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.mainGate}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              mainGate:
                                !formData.propertyDetails.verifyInfo
                                  .gated_security,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={club_house} alt="Icon description" />
                    <h5
                      style={{
                        marginTop: "-5px",
                        marginBottom: "10px",
                        fontSize: "10px",
                      }}
                    >
                      Club house
                    </h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.clubHouse}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              clubHouse:
                                !formData.propertyDetails.verifyInfo.clubHouse,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={convenience_store} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px", fontSize: "10px" }}>
                      Grocery Store
                    </h5>
                    <h5 style={{ marginTop: "-9px", fontSize: "8px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.groceryStore}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              groceryStore:
                                !formData.propertyDetails.verifyInfo
                                  .groceryStore,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={swimming_pool} alt="Icon description" />
                    <h5
                      style={{
                        marginTop: "-5px",
                        marginBottom: "15px",
                        fontSize: "10px",
                      }}
                    >
                      Swimming Pool
                    </h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.swimmingPool}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              swimmingPool:
                                !formData.propertyDetails.verifyInfo
                                  .swimmingPool,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>

                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={gym_1} alt="Icon description" />
                    <h5
                      style={{
                        marginTop: "-1px",
                        marginBottom: "20px",
                        fontSize: "10px",
                      }}
                    >
                      Gym
                    </h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.gym}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              gym: !formData.propertyDetails.verifyInfo.gym,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>

                  <div class="grid-item" style={{ border: "none" }}>
                    <img src={car_parking} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px" }}>Parking</h5>
                    <h5 style={{ marginTop: "-13px", fontSize: "8px" }}></h5>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.parking}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              parking:
                                !formData.propertyDetails.verifyInfo.parking,
                            },
                          },
                        }))
                      }
                      onColor="#DAF0EE"
                      onHandleColor="#fff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------Add Features---------------------------------------------- */}
            <h3 class="heading">
              Add other Places for which you have <br /> clicked photos
            </h3>
            <div class="container">
              <h4 class="subtitle">Add Features</h4>
              <div class="input-row">
                <div class="input-field">
                  <input type="text" placeholder="Enter Field Name" />
                </div>
                <div class="add-button">
                  <CommonBtn title="Add" margin="15px" width="10px" />
                </div>
              </div>

              <div class="input-row">
                <div class="input-field">
                  <input type="text" placeholder="Enter Field Name" />
                </div>
                <div class="add-button">
                  <CommonBtn title="Add" margin="15px" width="10px" />
                </div>
              </div>
              <div class="input-row">
                <div class="input-field">
                  <input type="text" placeholder="Enter Field Name" />
                </div>
                <div class="add-button">
                  <CommonBtn title="Add" margin="15px" width="10px" />
                </div>
              </div>
              <div class="empty-row"></div>
              <div class="empty-row"></div>
            </div>

            {/* <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "40%" }}>Submit<img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%",marginTop:"-25px" }}/></button>
		                </div> */}
            {/* BODY */}

            <div
              style={{
                display: "flex",
                marginTop: "50px",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "40px",
              }}
            >
              <BackButton title="Back" margin="" fontweight="bolder" />
              <CommonBtn title="Submit" margin="38%" fontweight="bolder" />
            </div>
            </form>
          </div>
        </>
      ) : null}

      {/* <div style={{ marginTop: "200px" }}>
            <Footer />
          </div> */}
    </>
  );
}
export default FieldAgentVerifyProperty;
