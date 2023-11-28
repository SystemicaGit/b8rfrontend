import React, { Component } from "react";
import "./DashboardS.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import DashComponent from "./DashComponent";

import Footer from "../Footer";
import vector from "../Assets/Images/vector.png";
import backgroundSecond from "../Assets/Images/Sale/SaleBg.png";
import listing from "../Assets/Images/AgentDashboard/listing.png";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Tenimg from "../Assets/Images/AgentDashboard/tenantimg.png";
import buyerpng from "../Assets/Images/Sale/bUYER.png";
import listingimg from "../Assets/Images/Sale/listing.png";
import currentview from "../Assets/Images/Sale/currentview.png";
import shortlistL from "../Assets/Images/Sale/shortlistL.png";
import shortlistR from "../Assets/Images/Sale/shortlistR.png";
import Vector from "../Assets/Images/Sale/Vector.png";
import wtp from "../Assets/Images/Sale/wtp.png";
import yts from "../Assets/Images/Sale/yts.png";
import tenantoraccounr from "../Assets/Images/Sale/tenantoraccounr.png";
import pv from "../Assets/Images/Sale/pv.png";
import shared from "../Assets/Images/Sale/shared.png";
import al from "../Assets/Images/Sale/al.png";
import righteye from "../Assets/Images/Sale/righteye.png"


import ExtraCommonButton from "../ExtraCommonButton";

function DashboardS() {
  const token = localStorage.getItem("token");
  console.log(token);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };

  return (
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
        {/* <h2 style={{color:"#52796F"}}>Agent Dashboard</h2> */}
        <CommonHeader title="Sale Dashboard" color= "#1E0058" />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginRight: "8px" }}>
          <Link to="/Dashboard"><CommonTopButton
              text="For Rent"
              bgColor="#F5F5F5"
              borderColor="#B3A8C8"
              color="#B3A8C8"
            /></Link>
          </div>
          <div>
            <CommonTopButton
              text="For Sale"
              bgColor="#1E0058"
              borderColor="#F1F8F7"
              color="#F1F8F7"
            />
          </div>
          {/* Listing */}
        </div>

        {/* BODY */}
        <div className="mainDashboardContainer d-flex">
          {/* left starts */}
          <div className="leftDashboard">
            <div className="lMenusHead">
              <img src={listingimg} height={30} />
              <label style={{ color: "#1E0058" }}>Listing</label>
            </div>

           
              

               
            <div>

            </div>
            <div className="boxSizingl">

           
                <Link to="/AvailablePropertyrentalS"><DashComponent img={wtp} title="Available Properties" number="20"/></Link>
                <div style={{ marginTop: "0px" }}></div>
                <Link to="/My_PropertyPVS"><DashComponent img={pv} title="Pending Verification" number="5"/></Link>
                <div style={{ marginTop: "5px" }}></div>
                <Link to="/AllPropertyS"><DashComponent img={al} title="Active Listing" number="15"/></Link>
                <div style={{ marginTop: "5px" }}></div>
                <Link to="/My_PropertyYTSS"><DashComponent img={yts} title="Yet To Share" number="2"/></Link>
                <div style={{ marginTop: "5px", marginLeft:"5px" }}></div>
                <Link to="/My_PropSNAS"><DashComponent img={shared} title="Shared" number="13"/></Link>
                <div style={{ marginTop: "5px" }}></div>
                <Link to="/My_PropertySS"><DashComponent img={shortlistL} title="Shortlisted" number="2"/></Link>
                
            
                </div>
                <label>8 Sold</label>
                

            {/* left end */}
          </div>

          {/* Right starts */}

          <div className="rightDashboard">
            <div className="rMenusHead">
              <img src={Tenimg} height={30} />
              <label style={{ color: "#000000" }}>Buyers</label>
            </div>

        
            <div className="boxSizingr" >
            
            <Link to="/ActiveLeadsS"><DashComponent img={buyerpng} title="Active Leads" number="20"/></Link>
            <div style={{ marginTop: "5px" }}></div>
            <Link to="/AllTenantOneS"><DashComponent img={Vector} title="Wating For Property" number="2"/></Link>
            <div style={{ marginTop: "5px" }}></div>
            <Link to="/AllTenantOneS"><DashComponent img={righteye} title="Currently Viewing" number="18"/></Link>
            <div style={{ marginTop: "5px" }}></div>
            <Link to="/AllTenantOneS"><DashComponent img={shortlistR} title="ShortListed" number="6"/></Link>
           
            
            </div>
            <label>8 Sold</label>
            {/* Right ENd */}
          </div>

          {/* Container ENd */}
        </div>

    <div className="btnGroup">

            <div className="btnGroupOne" style={{display:"flex", flexDirection:"row" }}>
            <Link to="/AllPropertyS"><CommonBtn title="All Properties"  margin="2%" fontweight="bolder" bgColor="#1E0058" /></Link>
            <Link to="/AllTenantOneS"><CommonBtn title="All Buyer"  margin="55%" fontweight="bolder" bgColor="#3F007F" /></Link>
            </div>
       

        

            {/* <div className="btnGroupTwo" style={{display:"flex", flexDirection:"row",marginTop:"80px" }}>
            
            <CommonBtn style={{display:"flex"}} title="Add New Property"  margin="3px" fontweight="bolder" bgColor="#5D6560" isHeight="true" />
            <CommonBtn title="Add New Tenant"  margin="40%" fontweight="bolder" isHeight="true" />
            </div> */}


            <div className="btnGroupTwo" style={{display:"flex", flexDirection:"row",marginTop:"80px", justifyContent:"space-between" }}>
            
            <Link to="/Propertyinfo"><ExtraCommonButton title="Add New Property"  margin="25px 0px 0px 22px" fontweight="bolder" bgColor="#1E0058" isHeight="true" /></Link>
            <Link to="/AddBuyer"><ExtraCommonButton title="Add New Buyer"  margin="25px 30px" fontweight="bolder" isHeight="true" bgColor="#3F007F" /></Link>
            </div>
            

      </div>

       

        <Footer />
      </div>
    </>
  );
}
export default DashboardS;
