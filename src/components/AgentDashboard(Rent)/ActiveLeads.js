import React, { Component, useEffect, useState } from "react";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from '../CommonTopButton';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import backgroundSecond from "../Assets/Images/other_bg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import ActiveLeadsI from "../Assets/Images/AgentDashboard/ActiveLeadsI.png";
import TenantComp from "./TenantComp";

function ActiveLeads()
{

  const [loading, setLoading] = useState(false);
  const [responsePendingTenants, setresponsePendingTenants] = useState([]);

  const token = localStorage.getItem("token");

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
      try {
        const response = await axios.get(
          "https://b8rliving.com/tenant",
          axiosConfig
        );
  
      //      // Sort the response data by the 'imagesApproved' property in descending order
      // const sortedTenants = response.data.data.tenants.sort((a, b) => {
      //   return a.status - b.status;
      // });

      console.log(response.data.data.tenants);

     
       // Filter the response data to exclude tenants with status "deactive"
       const filteredTenants = response.data.data.tenants.filter(
        (tenant) => tenant.status !== "Deactivate"
      );

      setresponsePendingTenants(filteredTenants);

      // const sharedTenantCount = response.data.data.tenants.filter(
      //   (tenant) => tenant.status == "Shared"
      // );

      // const boards = sharedTenantCount.map((tenant) => tenant.board);


      // axios.get(`https://b8rliving.com/board/${myArrayTenantCount}`, axiosConfig)
      // .then((response) => {
      // // setSharedPropertyCount(response.data.data.board.propertyId.length); // Set sharedC in your state
      //   // return response.data.data.board.propertyId.length;
      //   console.log(response)
      // })
      // .catch((error) => {
      //   console.log(error);
      //   return 0; // Handle the error by returning 0 properties
      // });

      } catch (error) {
        console.log(error);
        // Handle the error here if needed
      } finally {
        setLoading(false);
      }




    };
  
    fetchPosts();
  }, []);

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(' ')); 

    return(
        <>
         <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundSecond})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Active Leads" color="#52796F" />

        {/* <SearchBar onSearch={handleSearch} placeholder="Search by Tenant Name"/> */}

        <p style={{textAlign:"left"}}>Hey,<b>{name}</b> <br/>

        Here are all the tenants that you have onboarded </p>
        

        <TenantComp props={responsePendingTenants} name={name}/>
        
        <Footer/>
        </div>
        </>
        
    );

}
export default ActiveLeads;