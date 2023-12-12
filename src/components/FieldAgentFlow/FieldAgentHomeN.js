import React, { Component, useEffect, useState } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import peopleDown from "../Assets/Images/FieldAgent/peopleDown.png";
import Footer from "../Footer";
import vector from "../vector.png";
// import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import fieldAgent from "../Assets/Images/FieldAgent/FieldAgent.png";
import DashComponent from "./DashComponent";
import rentedOut from "../Assets/Images/FieldAgent/rentedOut.png";
import sharedOut from "../Assets/Images/FieldAgent/sharedOut.png";
import shortListed from "../Assets/Images/FieldAgent/shortListed.png";
import yetShared from "../Assets/Images/FieldAgent/yetShared.png";
import ActiveListing from "../Assets/Images/AgentDashboard/ActiveListing.png";
// import YashImg from "./Yash.png";
import House from "../Assets/Images/FieldAgent/House.png";
import pending from "../Assets/Images/FieldAgent/Group 51 (1).png";
import done from "../Assets/Images/FieldAgent/Group 54.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { MdHome } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

function FieldAgentHomeN() {
  const token = localStorage.getItem("token");
  console.log(token);

  const [loading, setLoading] = useState(false);
  const [PendingCount, setPendingCount] = useState();
  const [VerifiedCount, setVerifiedCount] = useState();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() => {
    // event.preventDefault();
    const fetchPosts = async () => {
      setLoading(true);
      axios
        .get("https://b8rliving.com/field-agent/count", axiosConfig)
        .then((response) => {
          console.log(response.data.data.pending);
          var PendingCount = response.data.data.pending;
          setPendingCount(PendingCount);

          console.log(response.data.data.verified);
          var VerifiedCount = response.data.data.completed;
          setVerifiedCount(VerifiedCount);
          // console.log(myArrayPropertyCount.length);

          // alert("Your data has been submitted");
          // do something with the response
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  return (
    <>
      <CommonHeader title="Field Agent Home" color="#52796F" />
      {/* <div
        className="form"
        style={{
          borderRadius: "16px",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundSecond})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          width: "100%",
          height: "80vw",
        }}
      >
        <h2 style={{color:"#52796F"}}> Field Agent Home</h2>
        <div
          className="containered form"
          style={{
            height: "90px",
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            for title and text
            <div style={{ textAlign: "left" }}>
              <label>
                Hey <b>{name},</b>
              </label>
              <br />
              <h5 style={{ fontWeight: "lighter" }}>
                Please Complete all the properties at the earliest
              </h5>
            </div>
            <div></div>
          </div>
        </div>
        BODY
        for icon
        <div>
          <img
            src={House}
            style={{ height: "50px", borderRadius: "25px 25px 25px 25px" }}
          />
        </div>

        <img src={pending}/>
        <div>
          <DashComponent
            img={fieldAgent}
            title="Properties"
            number={PendingCount}
          />
        </div>
        <div style={{ position: "absolute" }}>
          <Link to="/FieldPending">
            <CommonBtn title="Check & Complete" margin="70px" />
          </Link>
        </div>
        <div style={{ margin: "25% 0" }}>
          <DashComponent
            img={ActiveListing}
            title="Properties"
            number={VerifiedCount}
          />
        </div>

        <img src={done} style={{marginTop:"70px"}}/>
      </div> */}
      <div
        className="h-[90vh]"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundSecond})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          className="shadow-lg mx-[1.5rem] my-[2rem] rounded-[0.5rem] py-[2rem] px-[1rem]"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="text-[1.2rem] font-bold">Hey {name},</div>
          <div className="text-[1.1rem] py-[1rem]">
            Please Complete all the properties at the earliest
          </div>
        </div>
        <div className="flex justify-center items-center">
          <MdHome className="text-[#52796F] text-[5rem]" />
        </div>
        <div
          className="shadow-lg mx-[1.5rem] my-[2rem] rounded-[0.5rem] py-[2rem] px-[1rem] bg-[white] flex"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="">
            <RiQuestionnaireFill className="text-[3rem] text-[#AA223C]" />
          </div>
          <div className="px-[1.8rem]">
            <p className="text-[1.6rem] font-bold">{PendingCount} Pending</p>
            <p className="text-[1.1rem] font-bold">Properties</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/FieldPending">
            <CommonBtn title="Check & Complete" />
          </Link>
        </div>
        <div
          className="shadow-lg mx-[1.5rem] my-[2rem] rounded-[0.5rem] py-[2rem] px-[1rem] bg-[white] flex"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="">
            <BsFillBookmarkCheckFill className="text-[3rem] text-[#52796F]" />
          </div>
          <div className="px-[1.8rem]">
            <p className="text-[1.6rem] font-bold">{VerifiedCount} complete</p>
            <p className="text-[1.1rem] font-bold">Properties</p>
          </div>
        </div>
        <Footer />
        <div className="h-[2vh]" />
      </div>
    </>
  );
}
export default FieldAgentHomeN;
