import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import greenTick from "../Assets/Images/greenTick.png";
import vector from "../Assets/Images/vector.png";
import Footer from "../Footer";
// import key_1 from "./PropertyAdditionPageIcons/key_1/24.png";
// import rent_1 from "./PropertyAdditionPageIcons/rent_1/24.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { IoCloudDoneSharp } from "react-icons/io5";

function TenantCreated() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const budget = queryParameters.get("budget");

  const [checkedState, setCheckedState] = useState([]);

  console.log(checkedState);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // const [formData, setFormData] = useState({
  // 	duration_of_stay: '',
  // 	deposit_comfortable_for: '',
  // house_conf:'',
  // 	type_of_furnishing: '',
  // house_type:'',
  // movein_from:'',
  // rent:''
  //   });

  //   const handleChange = event => {
  // 	const { name, value } = event.target;
  // 	setFormData(prevState => ({ ...prevState, [name]: value }));

  //   };

  //   const handleSubmit = event => {
  // 	event.preventDefault();
  // 	console.log()
  // 	axios.post('http://127.0.0.1:5000/backend/tenantpref', formData)
  // 	  .then(response => {
  // 		console.log(response.data);
  // 		alert("Your tenant preferences has been submitted");
  // 		// do something with the response
  // 	  })
  // 	  .catch(error => {
  // 		console.log(error);
  // 		// handle the error
  // 	  });
  //   };

  return (
    <div className="login-page">
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {/* <h2 style={{color:"#52796F"}}>Tenant Created</h2> */}
        <CommonHeader title="Tenant Added" color="#52796F" />

        <div className="py-[2rem] flex justify-center items-center flex-col text-[#52796F] text-center">
          {/* <img src={greenTick} style={{ borderRadius: "65px" }} />
          <h4 style={{ fontWeight: "lighter" }}>Tenant Added</h4> */}
          <IoCloudDoneSharp className="text-[4rem]" />
          <p className="text-[2rem] font-bold">Tenant Added</p>
        </div>

        {/* -----------for name----------- */}
        <div className="flex justify-center items-center flex-col py-[2rem] text-center">
          <p className="text-[1.5rem] font-semibold">
            <u>Name</u>
          </p>
          <p className="text-[#52796F] text-[2rem] font-bold">{name}</p>
        </div>

        {/* -----------budget details----------- */}
        <div className="flex justify-center items-center flex-col py-[2rem] text-center">
          <p className="text-[1.5rem] font-semibold">
            <u> Budget Details</u>
          </p>
          <p className="text-[#52796F] text-[2rem] font-bold">
            {budget} /month
          </p>
        </div>
        {/* <div style={{ marginTop: "40px" }}>
          <h4 style={{ fontWeight: "lighter", textDecoration: "underline" }}>
            Budget Details
          </h4>
          <h2 style={{ color: "#52796F" }}>{budget} /month</h2>
        </div> */}

        {/* -----------button----------- */}
        {/* <div style={{marginTop:"40px"}}>
              <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "75%" }}>Go to Agent Dashboard<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
              </div> */}

        <Link
          to="/Dashboard"
          className="flex justify-center items-center py-[2rem]"
        >
          <CommonBtn
            title="Go to Agent Dashboard"
            margin="11%"
            fontweight="bolder"
            color="#DAF0EE"
          />
        </Link>

        <Footer />
      </div>
    </div>
  );
}

export default TenantCreated;
