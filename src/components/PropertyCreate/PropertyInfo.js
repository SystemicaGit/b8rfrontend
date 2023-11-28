import React, { Component, useState } from "react";
import PropertyInfocss from "./PropertyInfo.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import Footer from "../Footer";
import ReactSwitch from "react-switch";
import num_1 from "../Assets/Images/num.png";
import CommonBtn from "../CommonButton";
import CommonHeader from "../CommonHeader";
import vector from "../Assets/Images/vector.png";
import num_2 from "../Assets/Images/num_2.png";
import BackButton from "../CommonButtonBack";
import CommonTopButton from "../CommonTopButton";
import num3 from "../Assets/Images/num3.png";
import gated_sec from "../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "../Assets/Images/PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "../Assets/Images/PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "../Assets/Images/PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "../Assets/Images/PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "../Assets/Images/PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "../Assets/Images/PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "../Assets/Images/PropertyAdditionPageIcons/rent_1/24.png";
import security_deposit from "../Assets/Images/PropertyAdditionPageIcons/security_deposit/24.png";
import space_or_area from "../Assets/Images/PropertyAdditionPageIcons/space_or_area/24.png";
import swimming_pool from "../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import number_of_balcony from "../Assets/Images/PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "../Assets/Images/PropertyAdditionPageIcons/floor_number/broom.png";
import Movein from "../Assets/Images/Move-in.png";
import { useNavigate } from "react-router-dom";

function PropertyInfo() {
  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);
  const [isCheckRent, setisCheckRent] = useState(Boolean);
  const [isCheckSale, setisCheckSale] = useState(Boolean);
  
  const [formData, setFormData] = useState({
    status: "Pending",
    houseName: "",
    societyName: "",
    pinCode: "",
    propertyData: {
      propertyInfo: {
        houseType: "",
        houseConfig: "",
        area: "",
        mapLocation: "",
        purposeRent: false,
        purposeSale: false,
      },
      ownerInfo: {
        phoneNumber: "",
        panNumber: "",
        country: "",
        city: "",
        name: {
          first: "",
          last: "",
        },
      },
      featureInfo: {
        gatedSecurity: true,
        powerBackup: true,
        groceryStore: true,
        swimmingPool: true,
        gym: true,
        clubHouse: true,
        carpetArea: "",
        houseHelpRoom: "",
        bathrooms: "",
        balconies: "",
        furnishingType: "",
        ac: true,
        nonVeg: true,
        constructionYear: "",
        availableFrom: "",
        rentAmount: 0,
        rentDeposit: 0,
        rentMaintenance: 0,
        lockInPeriod: 0,
        saleAmount: 0,
        saleDeposit: 0,
        saleMaintenance: 0,
        moveInFrom: "",
        floors: {
          total: "",
          your: "",
        },
        parking: {
          car: "",
          bike: "",
          type: "",
        },
      },
    },
  });
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };
  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => {
      if (name in prevState.propertyData.propertyInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            propertyInfo: {
              ...prevState.propertyData.propertyInfo,
              [name]: value,
              [name]: type === "checkbox" ? checked : value,
            },
          },
        };
      } else if (name in prevState.propertyData.ownerInfo.name) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            ownerInfo: {
              ...prevState.propertyData.ownerInfo,
              name: {
                ...prevState.propertyData.ownerInfo.name,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.ownerInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            ownerInfo: {
              ...prevState.propertyData.ownerInfo,
              [name]: value,
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo.floors) {
        return {
          ...prevState,
        propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              floors: {
                ...prevState.propertyData.featureInfo.floors,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo.parking) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              parking: {
                ...prevState.propertyData.featureInfo.parking,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              [name]: value,
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
  // const handleChange = (event) => {
  //   //   const { name, value } = event.target;
  //   //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  //   const { name, value, type, checked } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     propertyData: {
  //       ...prevState.propertyData,
  //       propertyInfo: {
  //         ...prevState.propertyData.propertyInfo,
  //         [name]: value,
  //         [name]: type === "checkbox" ? checked : value,
  //       },
  //     //   ownerInfo: {
  //     //     ...prevState.propertyData.ownerInfo,
  //     //     [name]: value,
  //     //     name: {
  //     //       ...prevState.propertyData.ownerInfo.name,
  //     //       [name]: value,
  //     //     },
  //     //   },
  //     //   featureInfo: {
  //     //     ...prevState.propertyData.featureInfo,
  //     //     [name]: value,
  //     //     // [name]: type === 'checkbox' ? checked : value,
  //     //     floors: {
  //     //       ...prevState.propertyData.featureInfo.floors,
  //     //       [name]: value,
  //     //     },
  //     //     parking: {
  //     //       ...prevState.propertyData.featureInfo.parking,
  //     //       [name]: value,
  //     //     },
  //     //   },
  //     // },
  //     [name]: value, // this will set houseName in the state
  //   },
  //   })
  //   );
  // };
  const token = localStorage.getItem("token");
  console.log(token);
  // console.log(formData);
  const handleChangeOne = () => {
    setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
    console.log("Received from PrpertyInfo - 1s In state:", formData);
    formData.propertyData.propertyInfo.purposeRent
      ? setisCheckRent(true)
      : setisCheckRent(false);
    formData.propertyData.propertyInfo.purposeSale
      ? setisCheckSale(true)
      : setisCheckSale(false);
  };
  const handleChangeTwo = () => {
    setCheckedStateTwo((current) => !current);
    setCheckedStateThree((current) => !current);
    console.log("Received from TenantPref In state:", formData);
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
  //API REQUEST
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const Jdata =  JSON.stringify(formData, null, 2);
    // console.log("JSON VARIABLE",Jdata);
    console.log(JSON.stringify(formData));

// Create a copy of the formData
    const formDataCopy = { ...formData };
    //Check if sale and rent data are set
    if (formDataCopy.propertyData.featureInfo.moveInFrom === "") {
      // If it's empty, remove the moveInFrom property
      delete formDataCopy.propertyData.featureInfo.moveInFrom;
    }

    console.log(JSON.stringify(formDataCopy));

    axios
      .post("https://b8rliving.com/property", formDataCopy, axiosConfig)
      .then((response) => {
        console.log(response.data);
        alert("Your Property details has been submitted");
        // do something with the response
        if (response.data.data.property.propertyDetails.length > 0) {
          const rentAmountConst =
            response.data.data.property.propertyDetails[0].featureInfo
              .rentAmount;
          const saleAmountConst =
            response.data.data.property.propertyDetails[0].featureInfo
              .rentAmount;
          console.log("Rent Amount:", rentAmountConst);
          if (rentAmountConst > 1 && saleAmountConst > 1) {
            window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&rentAmount=${formData.propertyData.featureInfo.rentAmount}&rentDeposit=${formData.propertyData.featureInfo.rentDeposit}&saleAmount=${formData.propertyData.featureInfo.saleAmount}&saleDeposit=${formData.propertyData.featureInfo.saleDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
          } else if (rentAmountConst > 1) {
            window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&rentAmount=${formData.propertyData.featureInfo.rentAmount}&rentDeposit=${formData.propertyData.featureInfo.rentDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
          } else if (saleAmountConst > 1) {
            window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&saleAmount=${formData.propertyData.featureInfo.saleAmount}&saleDeposit=${formData.propertyData.featureInfo.saleDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
          }
        } else {
          console.log("propertyDetails array is empty. Try Again");
        }
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
    console.log("Finale In state:", formData);
  };
  const styles = {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid grey",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
  };
  return (
    <>
      {checkedStateOne ? (
        <div className="login-page">
          <div
            class="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{ color:"#52796f" }}>Create New Listing </h2> */}
            <CommonHeader title="Create New Listing" color="#52796f" />
            <img src={num_1} alt="Image description" height={55} width={300} />
            <form
              className="login-form inner-background"
              onSubmit={handleChangeOne}
            >
              <h4 style={{ color: "#52796f" }}>
                {" "}
                Let's get some basic details in
              </h4>
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
                value={formData.propertyData.propertyInfo.houseType}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="" disabled>
                  Select from Drop Down
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
                value={formData.propertyData.propertyInfo.houseConfig}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="" disabled>
                  Select from Drop Down
                </option>
                <option value="Studio">Studio</option>
                <option value="1 BHK">1BHK</option>
                <option value="2 BHK">2BHK</option>
                <option value="3 BHK">3BHK</option>
                <option value="4 BHK">4BHK</option>
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
                value={formData.propertyData.propertyInfo.area}
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
              {/* Map */}
              <label
                for="map"
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
                value={formData.propertyData.propertyInfo.mapLocation}
                onChange={handleChange}
                placeholder="Google Maps Plug-in"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              />
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
                    value={formData.propertyData.propertyInfo.purposeRent}
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
                    value={formData.propertyData.propertyInfo.purposeSale}
                    // checked={saleChecked}
                    onChange={handleChange}
                  />
                  <label htmlFor="purposeSale">For Sale</label>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <CommonBtn title="Save & Next" margin="70px" />
              </div>
            </form>
            <Footer />
          </div>
        </div>
      ) : (
        ""
      )}
      {checkedStateTwo ? (
        <div className="login-page ">
          <div
            class="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2> Add Landlord Details </h2> */}
            <CommonHeader title="Add Landlord/Owner Details" color="#52796F" />
            <img src={num_2} alt="Image description" height={55} />
            <form
              onSubmit={handleChangeTwo}
              style={{ borderRadius: "16px" }}
              className="inner-background"
            >
              {/* Landlord FIRST NAME */}
              <h4 style={{ color: "#52796f" }}> Who owns this Property?</h4>
              <label
                for="first"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Landlord First Name{" "}
              </label>
              <input
                type="text"
                id="first"
                placeholder="Landlord First Name"
                name="first"
                value={formData.propertyData.ownerInfo.name.first}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* Landlord LAST NAME */}
              <label
                for="last"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Landlord Last Name{" "}
              </label>
              <input
                type="text"
                id="last"
                placeholder="Landlord last name"
                name="last"
                value={formData.propertyData.ownerInfo.name.last}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* CONTACT NUM */}
              <label
                for="phoneNumber"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="contact number"
                name="phoneNumber"
                value={formData.propertyData.ownerInfo.phoneNumber}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* PAN CARD */}
              <label
                for="panNumber"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Pan Card(Useful for Rental Agreement)
              </label>
              <input
                type="text"
                id="panNumber"
                placeholder="Pan number"
                name="panNumber"
                value={formData.propertyData.ownerInfo.panNumber}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* Residing Country */}
              <label
                for="country"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Country of residence of Landlord
              </label>
              <input
                type="text"
                id="country"
                placeholder="residing country"
                name="country"
                value={formData.propertyData.ownerInfo.country}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              <label
                for="city"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                City of residence of Landlord
              </label>
              <input
                type="text"
                id="city"
                placeholder="residing city"
                name="city"
                value={formData.propertyData.ownerInfo.city}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              <br></br>
              <div
                className="n"
                style={{ marginTop: "10px", marginLeft: "-7px" }}
              >
                <div>
                <BackButton title="Back" fontweight="bolder" onClick={handleClick}/>

                </div>
                
                <CommonBtn
                  title="Save and next"
                  margin="40%"
                  fontweight="bolder"
                />
              </div>
            </form>
            <Footer />
          </div>
        </div>
      ) : (
        ""
      )}
      {checkedStateThree ? (
        <div className="login-page">
          <div
            class="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Property Features</h2> */}
            <CommonHeader title="Property Features" color="#52796F" />
            <img src={num3} alt="Image description" height={55} />
            <h3
              style={{
                fontSize: "21px",
                fontWeight: "bold",
                margin: "5px 0 0",
                textAlign: "left",
                marginLeft: "5px",
              }}
            >
              House number, Society Name
            </h3>
            <form className="login-form" onSubmit={handleSubmit}>
              <div
                style={{
                  marginRight: "10px",
                  border: "0.5px solid grey",
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
                  <div class="grid-item">
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
                      checked={formData.propertyData.featureInfo.gatedSecurity}
                      //  onChange={() =>  setFormData({
                      //    ...formData,
                      //    gatedSecurity: !formData.propertyData.featureInfo.gatedSecurity,
                      //  })}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["gatedSecurity"]:
                                !formData.propertyData.featureInfo
                                  .gatedSecurity,
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
                  <div class="grid-item">
                    <img src={Power_backup} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px" }}>24 X 7</h5>
                    <h5 style={{ marginTop: "-13px", fontSize: "8px" }}>
                      Power Back-up
                    </h5>
                    <ReactSwitch
                      checked={formData.propertyData.featureInfo.powerBackup}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["powerBackup"]:
                                !formData.propertyData.featureInfo.powerBackup,
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
                  <div class="grid-item">
                    <img src={convenience_store} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px", fontSize: "10px" }}>
                      Grocery Store
                    </h5>
                    <h5 style={{ marginTop: "-9px", fontSize: "8px" }}>
                      In Campus
                    </h5>
                    <ReactSwitch
                      checked={formData.propertyData.featureInfo.groceryStore}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["groceryStore"]:
                                !formData.propertyData.featureInfo.groceryStore,
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
                  <div class="grid-item">
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
                      checked={formData.propertyData.featureInfo.swimmingPool}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["swimmingPool"]:
                                !formData.propertyData.featureInfo.swimmingPool,
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
                  <div class="grid-item">
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
                      checked={formData.propertyData.featureInfo.gym}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["gym"]: !formData.propertyData.featureInfo.gym,
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
                  <div class="grid-item">
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
                      checked={formData.propertyData.featureInfo.clubHouse}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["clubHouse"]:
                                !formData.propertyData.featureInfo.clubHouse,
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
              {/* <!-- //Main --> */}
              <div
                style={{
                  padding: "10px",
                  margin: "20px",
                  border: "1px solid #DAF0EE",
                  padding: "5px",
                  margin: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "327px",
                  background:
                    "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%),box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h3 style={{ textAlign: "left", marginTop: "-1px" }}>
                  House Details
                </h3>
                <div
                  class="grid-container"
                  style={{
                    width: "150px",
                    marginTop: "10px",
                    boxShadow:
                      "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24",
                    border: "none",
                    height: "120px",
                  }}
                >
                  <div
                    class="grid-item"
                    style={{
                      width: "150px",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      border: "1px solid #DAF0EE",
                      borderRadius: "5px",
                    }}
                  >
                    <img src={space_or_area} alt="Icon description" />
                    <h5 style={{ fontSize: "12px", marginTop: "-5px" }}>
                      Super Carpet Area
                    </h5>
                    <h6 style={{ fontSize: "10px", marginTop: "-20px" }}>
                      (in Square feet, sq.ft)
                    </h6>
                    <input
                      type="number"
                      id="carpetArea"
                      value={formData.propertyData.featureInfo.carpetArea}
                      onChange={handleChange}
                      name="carpetArea"
                      placeholder="number only*"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width: "120px",
                        marginTop: "-15px",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      }}
                    />
                  </div>
                  <div
                    class="grid-item"
                    style={{
                      width: "145px",
                      marginLeft: "5px",
                      marginTop: "-5px",
                      border: "none",
                      height: "120px",
                      marginBottom: "20px",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "5px",
                    }}
                  >
                    <img src={floor_number} alt="Icon description" />
                    <h5 style={{ marginTop: "-1px" }}>Floor Number</h5>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                    {/* <label style={{marginTop:"-5px",fontSize:"10px"}}>Total Floor</label> */}
                      <input
                        type="number"
                        id="total"
                        value={formData.propertyData.featureInfo.floors.total}
                        onChange={handleChange}
                        name="total"
                        placeholder="number*"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "70",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />

                      {/* <label style={{marginTop:"-5px",fontSize:"10px"}}>Your Floor</label> */}
                      <input
                        type="number"
                        max={formData.propertyData.featureInfo.floors.total}
                        id="your"
                        value={formData.propertyData.featureInfo.floors.your}
                        onChange={handleChange}
                        name="your"
                        placeholder="number only*"
                        style={{
                          backgroundColor: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "50px",
                          marginTop: "-15px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                   
                    </div>
                  </div>
                </div>
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
                  }}
                >
                  <img
                    src={car_parking}
                    style={{ marginLeft: "10px" }}
                    alt="Icon description"
                  />
                  <br />
                  <label style={{ fontSize: "10px", marginTop: "5px" }}>
                    Car & Bike Parking Availability
                  </label>
                  <div>
                    <label style={{ fontSize: "10px" }}>
                      Number of Car Parking
                    </label>
                    <select
                      id="car"
                      name="car"
                      value={formData.propertyData.featureInfo.parking.car}
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
                      <option value="" disabled selected>Drop Down</option>
                      <option
                        style={{ textAlign: "center", backgroundColor: "red" }}
                        value="1 Car"
                      >
                        1 Car
                      </option>
                      <option value="2 Cars">2 Car</option>
                      <option value="3 Cars">3 Car</option>
                      <option value="No Car Parking">No Car Parking</option>
                    </select>
                    <label style={{ fontSize: "10px" }}>
                      Number of Bike Parking
                    </label>
                    <select
                      id="bike"
                      name="bike"
                      value={formData.propertyData.featureInfo.parking.bike}
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
                      {/* [0, 1, 2, 1 Bike, Included with Car, Owned Garage] */}
                      <option value="" disabled>Drop Down</option>
                      <option
                        style={{ textAlign: "center", backgroundColor: "red" }}
                        value="0"
                      >
                        1 Bike
                      </option>
                      <option value="1">
                        Included with Car
                      </option>
                      <option value="2">Owned Garage</option>
                    </select>
                    <label style={{ fontSize: "10px" }}>Parking Type</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.propertyData.featureInfo.parking.type}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width: "150px",
                        marginTop: "20px",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      }}
                    >
                      
                      <option value="" disabled>Drop Down</option>
                      <option
                        style={{ textAlign: "center", backgroundColor: "red" }}
                        value="Covered Roof"
                      >
                        Covered Roof
                      </option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>
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
                  }}
                >
                  <img src={broom} alt="Icon description" />
                  <label style={{ fontSize: "10px" }}>House help room</label>
                  <select
                    id="houseHelpRoom"
                    name="houseHelpRoom"
                    value={formData.propertyData.featureInfo.houseHelpRoom}
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
                    <option value="" disabled>Drop Down</option>
                    <option
                      style={{ textAlign: "center", backgroundColor: "red" }}
                      value="1 Room"
                    >
                      1 Room
                    </option>
                    <option value="1 Room + Bathroom">1 Room + Bathroom</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div class="grid-container" style={{}}>
                  <div
                    class="grid-item"
                    style={{
                      width: "145px",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      boxShadow: "5px",
                    }}
                  >
                    <img src={num_of_bathrooms} alt="Icon description" />
                    <h5>Number of Bathrooms</h5>
                    <select
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.propertyData.featureInfo.bathrooms}
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
                      <option value="" disabled >Drop Down</option>
                      <option
                        style={{ textAlign: "center", backgroundColor: "red" }}
                        value="1"
                      >
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      
                    </select>
                  </div>
                  <div
                    class="grid-item"
                    style={{
                      width: "150px",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      boxShadow: "5px",
                    }}
                  >
                    <img src={number_of_balcony} alt="Icon description" />
                    <h5>No of Balconies</h5>
                    <select
                      id="balconies"
                      name="balconies"
                      value={formData.propertyData.featureInfo.balconies}
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
                      
                      <option value="" disabled>Drop Down</option>
                      <option
                        style={{ textAlign: "center", backgroundColor: "red" }}
                        value="1"
                      >
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    
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
                    boxShadow: "5px",
                  }}
                >
                  <img src={furniture_1} alt="Icon description" />
                  <h5>Furnishing</h5>
                  <h6>Type Of Furnishing</h6>
                  <select
                    id="furnishingType"
                    name="furnishingType"
                    value={formData.propertyData.featureInfo.furnishingType}
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
                    
                    <option value="" disabled>
                      Drop Down
                    </option>
                    <option value="Un-furnished">Un-Furnished</option>
                    <option value="Semi-furnished">Semi-Furnished</option>
                    <option value="Full-furnished">Full-Furnished</option>
                  </select>
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
                      boxShadow: "5px",
                    }}
                  >
                    <img src={Ac_png} alt="Icon description" />
                    <h5>Air Conditioner</h5>
                    <ReactSwitch
                      checked={formData.propertyData.featureInfo.ac}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["ac"]: !formData.propertyData.featureInfo.ac,
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
                      boxShadow: "5px",
                    }}
                  >
                    <img src={veg_nonveg} alt="Icon description" />
                    <h5 style={{ marginTop: "0px" }}>Non Veg Allowed?</h5>
                    <ReactSwitch
                      checked={formData.propertyData.featureInfo.nonVeg}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyData: {
                            ...prevState.propertyData,
                            featureInfo: {
                              ...prevState.propertyData.featureInfo,
                              ["nonVeg"]:
                                !formData.propertyData.featureInfo.nonVeg,
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
                        >
                          No
                        </span>
                      }
                      checkedIcon={false}
                      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                    />
                  </div>
                </div>
                <div class="grid-container">
                  <div
                    class="grid-item"
                    style={{
                      marginTop: "20px",
                      width: "150px",
                      marginBottom: "10px",
                      boxShadow:
                        "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24",
                      border: "none",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      boxShadow: "5px",
                    }}
                  >
                    <img src={construction_year} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px" }}>Construction year</h5>
                    <input
                      type="number"
                      id="constructionYear"
                      value={formData.propertyData.featureInfo.constructionYear}
                      onChange={handleChange}
                      name="constructionYear"
                      placeholder="-year drop-down* -"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        marginTop: "-25px",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      }}
                    />
                  </div>
                  <div
                    class="grid-item"
                    style={{
                      marginTop: "20px",
                      width: "150px",
                      marginBottom: "10px",
                      boxShadow:
                        "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24",
                      border: "none",
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      boxShadow: "5px",
                    }}
                  >
                    <img src={key_1} alt="Icon description" />
                    <h5 style={{ marginTop: "-5px" }}>Available from</h5>
                    <input
                      type="date"
                      id="availableFrom"
                      pattern="\d{2}-\d{2}-\d{4}"
                      value={formData.propertyData.featureInfo.availableFrom}
                      onChange={handleChange}
                      name="availableFrom"
                      // placeholder="username"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "-10px",
                        border: "1px solid #52796F",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* </form> */}
              {isCheckRent ? (
                <div
                  style={{
                    border: "1px solid #CFD3D2",
                    padding: "5px",
                    margin: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "327px",
                    background:
                      "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                    borderRadius: "5px",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "left",
                      fontSize: "19px",
                      fontfamily: "Inter",
                    }}
                  >
                    Rent Details
                  </h2>
                  <div class="grid-container">
                    <div
                      class="grid-item"
                      style={{
                        width: "150px",
                        border: "1px solid #CFD3D2",
                        background:
                          "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        borderRadius: "5px",
                      }}
                    >
                      <img src={rent_1} alt="Icon description" />
                      <h5 style={{ marginTop: "2px" }}>Rent(per month)</h5>
                      <h6 style={{ marginTop: "-20px" }}>
                        (without Maintenance)
                      </h6>
                      <input
                        type="number"
                        id="rentAmount"
                        value={formData.propertyData.featureInfo.rentAmount}
                        onChange={handleChange}
                        name="rentAmount"
                        placeholder="-number only*-"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "130px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          marginTop: "-10px",
                        }}
                      />
                    </div>
                    <div
                      class="grid-item"
                      style={{
                        width: "145px",
                        border: "1px solid #CFD3D2",
                        background:
                          "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        borderRadius: "5px",
                      }}
                    >
                      <img src={security_deposit} alt="Icon description" />
                      <h5 style={{ marginTop: "10px" }}>Security Deposit</h5>
                      <h6 style={{ marginTop: "-20px" }}>(Refundable)</h6>
                      <input
                        type="number"
                        id="rentDeposit"
                        value={formData.propertyData.featureInfo.rentDeposit}
                        onChange={handleChange}
                        name="rentDeposit"
                        placeholder="-number only*-"
                        style={{
                          backgroundColor: "white",
                          marginTop: "-15px",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "130px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                    </div>
                  </div>
                  <div class="grid-container">
                    <div
                      class="grid-item"
                      style={{
                        width: "150px",
                        marginTop: "10px",
                        border: "1px solid #CFD3D2",
                        height: "120px",
                        background:
                          " linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        borderRadius: "5px",
                      }}
                    >
                      <img src={mainteance_1} alt="Icon description" />
                      <h5 style={{ marginTop: "5px", fontSize: "12px" }}>
                        Maintenance (per month)
                      </h5>
                      <h6 style={{ marginTop: "-20px" }}>(for tenant)</h6>
                      <input
                        type="number"
                        id="rentMaintenance"
                        value={
                          formData.propertyData.featureInfo.rentMaintenance
                        }
                        onChange={handleChange}
                        name="rentMaintenance"
                        placeholder="-number only*-"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          marginTop: "-20px",
                          width: "130px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                    </div>
                    <div
                      class="grid-item"
                      style={{
                        width: "145px",
                        marginTop: "10px",
                        border: "1px solid #CFD3D2",
                        height: "120px",
                        background:
                          "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                        borderRadius: "5px",
                      }}
                    >
                      <img src={mainteance_1} alt="Icon description" />
                      <h5 style={{ marginTop: "7px" }}>Lock-in Period</h5>
                      <h6 style={{ marginTop: "-20px" }}>(in Months)</h6>
                      <input
                        type="number"
                        id="lockInPeriod"
                        value={formData.propertyData.featureInfo.lockInPeriod}
                        onChange={handleChange}
                        name="lockInPeriod"
                        placeholder="-number only*-"
                        style={{
                          backgroundColor: "white",
                          marginTop: "-20px",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "130px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p></p>
              )}
              {isCheckSale ? (
                <>
                  <div
                    style={{
                      border: "1px solid #CFD3D2",
                      padding: "5px",
                      margin: "20px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "327px",
                      background:
                        "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                      borderRadius: "5px",
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "left",
                        fontSize: "19px",
                        fontfamily: "Inter",
                      }}
                    >
                      Sale Details
                    </h2>
                    <div class="grid-container">
                      <div
                        class="grid-item"
                        style={{
                          width: "150px",
                          border: "1px solid #CFD3D2",
                          background:
                            "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={rent_1} alt="Icon description" />
                        <h5 style={{ marginTop: "2px" }}>Sale Amount</h5>
                        <h6 style={{ marginTop: "-20px" }}>
                          (without Maintenance)
                        </h6>
                        <input
                          type="number"
                          id="saleAmount"
                          value={formData.propertyData.featureInfo.saleAmount}
                          onChange={handleChange}
                          name="saleAmount"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "130px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            marginTop: "-10px",
                          }}
                        />
                      </div>
                      <div
                        class="grid-item"
                        style={{
                          width: "145px",
                          border: "1px solid #CFD3D2",
                          background:
                            "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={security_deposit} alt="Icon description" />
                        <h5 style={{ marginTop: "10px" }}>
                          Token Money Deposit
                        </h5>
                        <h6 style={{ marginTop: "-20px" }}>(Refundable)</h6>
                        <input
                          type="number"
                          id="saleDeposit"
                          value={formData.propertyData.featureInfo.saleDeposit}
                          onChange={handleChange}
                          name="saleDeposit"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            marginTop: "-15px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "130px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                    <div class="grid-container">
                      <div
                        class="grid-item"
                        style={{
                          width: "150px",
                          marginTop: "10px",
                          border: "1px solid #CFD3D2",
                          height: "120px",
                          background:
                            " linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={mainteance_1} alt="Icon description" />
                        <h5 style={{ marginTop: "5px", fontSize: "12px" }}>
                          Maintenance (per month)
                        </h5>
                        <h6 style={{ marginTop: "-20px" }}>(for buyer)</h6>
                        <input
                          type="number"
                          id="saleMaintenance"
                          value={
                            formData.propertyData.featureInfo.saleMaintenance
                          }
                          onChange={handleChange}
                          name="saleMaintenance"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            marginTop: "-20px",
                            width: "130px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                      <div
                        class="grid-item"
                        style={{
                          width: "145px",
                          marginTop: "10px",
                          border: "1px solid #CFD3D2",
                          height: "120px",
                          background:
                            "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                          borderRadius: "5px",
                        }}
                      >
                        <img src={Movein} alt="Icon description" />
                        <h5 style={{ marginTop: "7px" }}>Preffered Move-in</h5>
                        <input
                          type="date"
                          id="moveInFrom"
                          pattern="\d{2}-\d{2}-\d{4}"
                          value={formData.propertyData.featureInfo.moveInFrom}
                          onChange={handleChange}
                          name="moveInFrom"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            marginTop: "-20px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "130px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p></p>
              )}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                <BackButton title="Back" margin="" fontweight="bolder" onClick={handleClick}/>

                </div>
                
                <CommonBtn title="Save" margin="50%" fontweight="bolder" />
              </div>
            </form>
            <Footer />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default PropertyInfo;
