import React, { Component, useState, useEffect } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png";
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/AgentDashboard/Pvbackground.png";
import newImg from "../Assets/Images/AgentDashboard/newImg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import BackButton from "../CommonButtonBack";
import editButton from "../Assets/Button.png";
import { useNavigate } from "react-router-dom";

function ChangeStatus() {
  const queryParameters = new URLSearchParams(window.location.search);
  const propertyId = queryParameters.get("propertyId");
  console.log(propertyId);

  const [RenderRent, setRenderRent] = useState("rent");
  const [RenderRentName, setRenderRentName] = useState("Rented of B8R");
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const [formData, setFormData] = useState({
    closeListingReason: RenderRentName,
    closeListingDetails: {
      tenantName: "",
      tenancyStartDate: "",
      rentAmount: "",
      agreementFor: "",
      phoneNumber: "",
    },
  });

  const [formDataTwo, setFormDataTwo] = useState({
    closeListingReason: "",
    closeListingDetails: {
      feedback: "",
    },
  });

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
    const fetchpropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${propertyId}`,
          axiosConfig
        );
        console.log(response);

        const responseData = response.data.data.property;
        setPropertyDetails(responseData);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchpropertyDetails(); // Call the fetch function
  }, []); // Make sure to include propertyId in the dependency array if it's dynamic.

  const handlePageAvailable = (condition) => {
    switch (condition) {
      case "rent":
        setIsActive1(true);
        setIsActive2(false);
        setIsActive3(false);
        setRenderRent(condition);
        setRenderRentName("Rented of B8R");
        setFormData({ closeListingReason: "Rented of B8R" });
        break;

      case "delist":
        setIsActive2(true);
        setFormDataTwo({ closeListingReason: "Rented of B8R" });
        setRenderRentName("Delist (Owner Denied)");
        setRenderRent(condition);

        setIsActive1(false);
        setIsActive3(false);

        break;

      case "rented":
        setIsActive3(true);
        setRenderRentName("Rented Outside");
        setRenderRent(condition);
        setIsActive1(false);
        setIsActive2(false);
        break;

      // default:
      //   setFilteredTenants(responseTenat); // Show all tenants when no specific condition is selected
      //   break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setFormData((prevState) => ({ ...prevState, [name]: value }));

    setFormData((prevState) => {
      if (name in prevState.closeListingDetails) {
        return {
          ...prevState,

          closeListingDetails: {
            ...prevState.closeListingDetails,
            [name]: value,
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

  const handleChangeTwo = (event) => {
    const { name, value } = event.target;
    // setFormData((prevState) => ({ ...prevState, [name]: value }));

    setFormData((prevState) => {
      if (name in prevState.closeListingDetails) {
        return {
          ...prevState,

          closeListingDetails: {
            ...prevState.closeListingDetails,
            [name]: value,
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

  const submitRent = async (event) => {
    event.preventDefault();

    //  console.log(formData);
    console.log(JSON.stringify(formData));
    try {
      const response = await axios.put(
        `https://b8rliving.com/property/close-listing/${propertyId}`,
        formData,
        axiosConfig
      );

      // Log the updated state
      console.log(JSON.stringify(response));
      var nameResponse = response.data.data.property.houseName;
      var nameResponse2 = response.data.data.property.societyName;
      var ClosedStatus = response.data.data.property.closeListingReason;

      alert("Property Closed sucessfully!");
      window.location.href = `/PropertyClosed?name=${nameResponse}&closed=${ClosedStatus}&societyname=${nameResponse2}`;
    } catch (error) {
      // Handle any errors that occur during the API request
      alert(error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  console.log(propertyDetails);

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${PVbackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Change Status/ Edit Property" color="#52796F" />
        <div
          className="containered form"
          style={{
            height: "110px",
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            border: "1px solid #DAF0EE",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* for image */}
            <div>
              <img src={newImg} />
            </div>
            {/* for title and text */}

            <div
              style={{
                marginTop: "-5px",
                margintLeft: "10px",
                marginBottom: "-5px",
              }}
            >
              <h5 style={{ marginLeft: "10px" }}>
                {" "}
                {propertyDetails.houseName}{" "}
              </h5>
              <br />
              <h5 style={{ marginTop: "-40px" }}>
                {propertyDetails.societyName}
              </h5>
            </div>
            <Link to="/EditPropertyInfo">
              <img src={editButton} />
            </Link>
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}
        <div
          className="containered form"
          style={{
            height: "250px",
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <h4>Close Listing</h4>
            <div>
              <CommonTopButton
                bgColor={isActive1 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive1 ? "#FFFFFF" : "#77A8A4"}
                text="Rented On B8R"
                onclicked={() => handlePageAvailable("rent")}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor={isActive2 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive2 ? "#FFFFFF" : "#77A8A4"}
                text="Delist (Owner Denied)"
                onclicked={() => handlePageAvailable("delist")}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor={isActive3 ? "#52796F" : "#D2D7D6"}
                borderColor="#DAF0EE"
                color={isActive3 ? "#FFFFFF" : "#77A8A4"}
                text="Rented Outside"
                onclicked={() => handlePageAvailable("rented")}
              />
            </div>

            {/* </div> */}
            {/* for title and text */}
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}

        {/* -----------------------------------------------3rd div----------------------------------------------------- */}
        {RenderRent == "rent" ? (
          <form className="login-form" onSubmit={submitRent}>
            <div
              className="containered form"
              style={{
                height: "500px",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* for image */}
                <div>
                  <b>Enter Details if Rented on B8R</b>
                </div>
                {/* for title and text */}

                <div style={{ marginTop: "20px" }}>
                  <label
                    for="tenantName"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Tenant Name
                  </label>
                  <input
                    type="text"
                    id="tenantName"
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="rentAmount"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Rent Amaount (Rent + Maintenance)
                  </label>
                  <input
                    type="text"
                    id="rentAmount"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

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
                    Enter Tenant Contact Number
                  </label>
                  <input
                    type="text"
                    id="mapphoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="tenancyStartDate"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Tenancy Start Date
                  </label>
                  <input
                    type="date"
                    id="tenancyStartDate"
                    name="tenancyStartDate"
                    value={formData.tenancyStartDate}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="agreementFor"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Agreement For
                  </label>
                  <input
                    type="text"
                    id="agreementFor"
                    name="agreementFor"
                    value={formData.agreementFor}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <BackButton title="Go Back" margin="" fontweight="bolder" />
              <CommonBtn
                title="Yes, close listing"
                margin="40%"
                fontweight="bolder"
              />
            </div>
          </form>
        ) : null}

        {/* -----------------------------------------------3rd div----------------------------------------------------- */}
        {/* BODY */}

        {RenderRent == "delist" ? (
          <div>
            <form className="login-form" onSubmit={submitRent}>
              <p>
                <b>Write your Feedback here</b>
              </p>
              <div
                className="containered form"
                style={{
                  height: "250px",
                  width: "320px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  cols="50"
                  value={formDataTwo.feedback}
                  onChange={handleChangeTwo}
                >
                  {" "}
                  Enter Feed Back
                </textarea>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <BackButton title="Go Back" margin="" fontweight="bolder" />
                <CommonBtn
                  title="Yes, close listing"
                  margin="40%"
                  fontweight="bolder"
                />
              </div>
            </form>
          </div>
        ) : null}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {RenderRent == "rented" ? (
          <div
            className="containered form"
            style={{
              height: "400px",
              borderRadius: "15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form className="login-form" onSubmit={submitRent}>
                {/* for image */}
                <div>
                  <b>Enter Details if Rented outside</b>
                </div>
                {/* for title and text */}

                <div style={{ marginTop: "20px" }}>
                  <label
                    for="tenantName"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Tenant Name
                  </label>
                  <input
                    type="text"
                    id="tenantName"
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="rentAmount"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Rent Amaount (Rent + Maintenance)
                  </label>
                  <input
                    type="text"
                    id="rentAmount"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

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
                    Enter Tenant Contact Number
                  </label>
                  <input
                    type="text"
                    id="mapphoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />

                  <label
                    for="tenancyStartDate"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Agreement For
                  </label>
                  <input
                    type="date"
                    id="tenancyStartDate"
                    name="tenancyStartDate"
                    value={formData.tenancyStartDate}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />
                    <label
                    for="agreementFor"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Agreement For
                  </label>
                  <input
                    type="text"
                    id="agreementFor"
                    name="agreementFor"
                    value={formData.agreementFor}
                    onChange={handleChange}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                  <BackButton title="Go Back" margin="" fontweight="bolder" />

                  </div>
                  
                  <CommonBtn
                    title="Yes, close listing"
                    margin="40%"
                    fontweight="bolder"
                  />
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </>
  );
}
export default ChangeStatus;
