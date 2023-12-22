import React, { Component, useEffect, useState } from "react";
import Dashboardcss from "./Dashboard.css";
// import "./DashComponent.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import DashComponent from "./DashComponent";
import Footer from "../Footer";
import vector from "../Assets/Images/vector.png";
import backgroundSecond from "../Assets/Images/other_bg.png";
import listing from "../Assets/Images/AgentDashboard/listing.png";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Tenimg from "../Assets/Images/AgentDashboard/tenantimg.png";
import AvailaibleProperty from "../Assets/Images/AgentDashboard/AvailableProperties.png";
import ActiveListing from "../Assets/Images/AgentDashboard/ActiveListing.png";
import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import yetToShare from "../Assets/Images/AgentDashboard/yetToShare.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortlisted from "../Assets/Images/AgentDashboard/shortListed.png";
import tenantI from "../Assets/Images/AgentDashboard/tenantI.png";
import CurrentlyViewing from "../Assets/Images/AgentDashboard/CurrentlyViewing.png";
import ActiveLeads from "../Assets/Images/AgentDashboard/activeLeads.png";
import ExtraCommonButton from "../ExtraCommonButton";
// -------------------// icons //----------------------------//
import { FaHouse } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { TbBrandGoogleHome } from "react-icons/tb";
import { BsFillBookmarkCheckFill } from "react-icons/bs"; //check
import { MdOutlineMobileScreenShare } from "react-icons/md"; //share
import { RiHomeHeartLine } from "react-icons/ri"; //shortlist
import { TbShareOff } from "react-icons/tb"; //yet to share
import { FaEye } from "react-icons/fa6"; //eye
import { RiQuestionnaireFill } from "react-icons/ri"; //question

function Dashboard() {
  // const [CountProperties, setCountProperties] = useState([]);
  const [responseCountProperties, setresponseCountProperties] = useState();
  const [responseProperties, setresponseProperties] = useState([]);
  const [CountProperties, setCountProperties] = useState([]);
  const [CountTenants, setCountTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ytsCount, setYtsCount] = useState([]);
  const [SharedPropertyCount, setSharedPropertyCount] = useState([]);

  const token = localStorage.getItem("token");
  // console.log(token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      axios
        .get("https://b8rliving.com/property", axiosConfig)
        .then((response) => {
          // console.log(response.data.data.properties);
          var myArrayPropertyCount = response.data.data.properties;
          setresponseCountProperties(myArrayPropertyCount.length);
          console.log(myArrayPropertyCount.length);

          setresponseProperties(response.data.data.properties);

          const ytsCount = myArrayPropertyCount.filter((property) => {
            return (
              property.status === "Verified" &&
              // (property.sharedBuyerProperty.length === 0
              property.sharedProperty.length === 0
            );
          });

          setYtsCount(ytsCount.length);
          // console.log(ytsCount);

          const sharedPropertyCount = myArrayPropertyCount.filter(
            (property) => {
              return (
                property.sharedProperty.length > 0 &&
                property.status == "Verified"
              );
            }
          );
          setSharedPropertyCount(sharedPropertyCount.length);

          // if(response.data.data.properties.status == "pending"){

          //   console.log("apending");
          // }

          // alert("Your data has been submitted");
          // do something with the response
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });

      //Get Shared Property
      axios
        .get("https://b8rliving.com/tenant", axiosConfig)
        .then((response) => {
          var myArrayTenantCount = response.data.data.tenants;

          const sharedTenantCount = myArrayTenantCount.filter(
            (tenant) => tenant.status == "Shared"
          );
          const boardIds = [];

          // Create a function to get property count for a specific boardId
          function getPropertyCount(boardId) {
            return axios
              .get(`https://b8rliving.com/board/${boardId}`, axiosConfig)
              .then((response) => {
                setSharedPropertyCount(
                  response.data.data.board.propertyId.length
                ); // Set sharedC in your state
                return response.data.data.board.propertyId.length;
              })
              .catch((error) => {
                console.log(error);
                return 0; // Handle the error by returning 0 properties
              });
          }

          // for( var i=0;  i<1;  i++ ){
          //   getPropertyCount(sharedTenantCount[i].boardId);
          // }

          // Use Promise.all to handle all requests and accumulate counts
          // Promise.all(
          //   sharedTenantCount.map((tenant) => getPropertyCount(tenant.boardId))
          // )
          //   .then((propertyCounts) => {
          //     // Sum the property counts
          //     var sharedC = propertyCounts.reduce(
          //       (accumulator, currentValue) => accumulator + currentValue,
          //       0
          //     );
          //     console.log(sharedC);

          //     // Now, you can set the sharedC in your state or do any other operation with it
          //     setSharedPropertyCount(sharedC); // Set sharedC in your state
          //     // Other actions with sharedC
          //   })
          // .catch((error) => {
          //   console.log(error);
          //   // handle the error
          // });
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });

      setLoading(false);
    };

    const fetchPropertiesCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://b8rliving.com/property/count",
          axiosConfig
        );
        // Update the countProperties state with the response data
        setCountProperties(response.data.data.counts);
        // console.log(response.data.data.counts)
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };

    const fetchTententCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://b8rliving.com/tenant/count",
          axiosConfig
        );
        // Update the countProperties state with the response data
        setCountTenants(response.data.data.tenant);
        // console.log(response.data.data.counts)
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };

    fetchPosts();
    fetchPropertiesCounts();
    fetchTententCounts();
    // console.log(CountTenants.Total)
  }, [CountProperties]);

  var pendingCounting = 0;
  var activeCounting = 0;
  const number = CountTenants.Total - CountTenants.Deactivate;
  responseProperties.map((element) => {
    // console.log(element.status);
    if (
      (element.fieldAgentStatus = "Completed" && element.imagesApproved == true)
    ) {
      activeCounting = activeCounting + 1;
      // console.log(activeCounting);
    } else {
      pendingCounting = pendingCounting + 1;
      // console.log(pendingCounting);
    }
    return null; // You should return something when using map to avoid React warnings.
  });

  return (
    <>
      <CommonHeader title="My Dashboard" color="#52796F" />
      {/* top-btn */}
      <div className="p-[1rem]">
        <div className="grid grid-cols-2 gap-x-[1rem]">
          <div>
            <CommonTopButton
              text="For Rent"
              bgcolor="#1E0058"
              borderColor="#DAF0EE"
              color="#DAF0EE"
            />
          </div>
          <Link to="/DashboardS">
            <CommonTopButton
              text="For Sale"
              bgColor="#F5F5F5"
              borderColor="#B3A8C8"
              color="#B3A8C8"
            />
          </Link>
        </div>
      </div>
      {/* main content */}
      <div className="p-[1rem]">
        {/* listing & tenant */}
        <div className="px-[1rem] grid grid-cols-2">
          {/* Listing */}
          <div className="flex justify-center items-center text-[#52796F]">
            <FaHouse className="text-[1.7rem]" />
            <p className="px-[0.6rem] text-[1.4rem] font-bold">Listing</p>
          </div>
          {/* tenant */}
          <div className="flex justify-center items-center">
            <FaCircleUser className="text-[1.7rem]" />
            <p className="px-[0.6rem] text-[1.4rem] font-bold">Tenants</p>
          </div>
        </div>
        {/* main-container */}
        <div className="px-[1rem] py-[1rem]">
          <div className="grid grid-cols-2 gap-x-[1rem]">
            {/* left-container */}
            <div>
              <div className="flex justify-center items-center flex-col bg-[#DAF0EE] rounded-[0.8rem] gap-y-[0.5rem] p-[1rem]">
                {/* AvailableProperties */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/AvailablePropertyrental"
                >
                  {/* icon */}
                  <TbBrandGoogleHome className="text-[#52796F] text-[4rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountProperties.Total}
                    </p>
                    <p className="text-[0.9rem] text-center">
                      Available Properties
                    </p>
                  </div>
                </Link>
                {/* PendingVerification */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/My_propertyPV"
                >
                  {/* icon */}
                  <RiQuestionnaireFill className="text-[#52796F] text-[4rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountProperties.Pending}
                    </p>
                    <p className="text-[0.9rem] text-center">
                      Pending Verification
                    </p>
                  </div>
                </Link>
                {/* ActiveListing */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/AllActiveProperties"
                >
                  {/* icon */}
                  <BsFillBookmarkCheckFill className="text-[#52796F] text-[2.5rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountProperties.Verified}
                    </p>
                    <p className="text-[0.9rem] text-center">Active Listing</p>
                  </div>
                </Link>
                {/* yetToShare */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/My_PropertyYTS"
                >
                  {/* icon */}
                  <TbShareOff className="text-[#52796F] text-[2.5rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">{ytsCount}</p>
                    <p className="text-[0.9rem] text-center">Yet to share</p>
                  </div>
                </Link>
                {/* shared */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/My_PropertySNA"
                >
                  {/* icon */}
                  <MdOutlineMobileScreenShare className="text-[#52796F] text-[2.5rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {SharedPropertyCount}
                    </p>
                    <p className="text-[0.9rem] text-center">Shared</p>
                  </div>
                </Link>
                {/* shortlisted */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/My_PropertyS"
                >
                  {/* icon */}
                  <RiHomeHeartLine className="text-[#52796F] text-[2.5rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountProperties.Sortlisted}
                    </p>
                    <p className="text-[0.9rem] text-center">Shortlisted</p>
                  </div>
                </Link>
              </div>
              <p className="font-bold text-[1.2rem] text-center py-[1rem]">
                {CountProperties.Closed} Closed
              </p>
            </div>
            {/* right-container */}
            <div>
              <div className="flex flex-col bg-[#E8E7E7] rounded-[0.8rem] gap-y-[0.5rem] p-[1rem] h-max">
                {/* active leads */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/ActiveLeads"
                >
                  {/* icon */}
                  <FaCircleUser className="text-[#52796F] text-[2.5rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">{number}</p>
                    <p className="text-[0.9rem] text-center">Active Leads</p>
                  </div>
                </Link>
                {/* waiting for property */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/AllTenantOne"
                >
                  {/* icon */}
                  <RiQuestionnaireFill className="text-[#52796F] text-[4rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountTenants.WaitingForProperty}
                    </p>
                    <p className="text-[0.9rem] text-center">
                      Waiting for Property
                    </p>
                  </div>
                </Link>
                {/* currently viewing */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/AllTenantOne"
                >
                  {/* icon */}
                  <FaEye className="text-[#52796F] text-[3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountTenants.CurrentlyViewing}
                    </p>
                    <p className="text-[0.9rem] text-center">
                      Currently Viewing
                    </p>
                  </div>
                </Link>
                {/* shortlisted */}
                <Link
                  className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%]"
                  to="/AllTenantOne"
                >
                  {/* icon */}
                  <RiHomeHeartLine className="text-[#52796F] text-[2.5rem] mx-[0.3rem]" />
                  {/* text */}
                  <div className="font-bold flex justify-center items-center flex-col">
                    <p className="text-[1.5rem] text-center">
                      {CountTenants.Shortlisted}
                    </p>
                    <p className="text-[0.9rem] text-center">Shortlisted</p>
                  </div>
                </Link>
              </div>
              <p className="font-bold text-[1.2rem] text-center py-[1rem]">
                {CountTenants.Deactivate} Closed
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* buttons-containers */}
      <div className="px-[1rem] py-[1rem]">
        {/* btngrp1 */}
        <div className="grid grid-cols-2 gap-x-[0.5rem]">
          <Link to="/AllProperty" className="flex justify-center items-center">
            <CommonBtn
              title="All Properties"
              margin="1.2%"
              fontweight="bolder"
              bgColor="#5D6560"
            />
          </Link>
          <Link to="/AllTenantOne" className="flex justify-center items-center">
            <CommonBtn title="All Tenants" margin="52%" fontweight="bolder" />
          </Link>
        </div>
        {/* btngrp2 */}
        <div className="grid grid-cols-2 gap-x-[0.5rem] py-[1.5rem]">
          <Link to="/Propertyinfo" className="flex justify-center items-center">
            <CommonBtn title="Add New Property" bgColor="#5D6560" />
          </Link>
          <Link to="/AddTenant" className="flex justify-center items-center">
            <CommonBtn title="Add New Tenant" />
          </Link>
        </div>
      </div>
      <div className="py-[1rem]">
        <Footer />
      </div>
    </>
  );
}
export default Dashboard;
