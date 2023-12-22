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
 
  //console.log("TOKEN ",token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
  }
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
              property.status === "Verified"  &&
              // (property.sharedBuyerProperty.length === 0
                 property.sharedProperty.length === 0
             
            );
          });

          setYtsCount(ytsCount.length);
          // console.log(ytsCount);

          const sharedPropertyCount = myArrayPropertyCount.filter(
            (property) =>{
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
            setSharedPropertyCount(response.data.data.board.propertyId.length); // Set sharedC in your state
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
         console.log(response.data.data.counts)
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
        console.log("Count count",response.data.data.counts)
        console.log("Count tenants",response.data.data.tenant)
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
  const AvailablePropertyNumner = CountProperties.Total - CountProperties.Closed;
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
        <CommonHeader title="My Dashboard" color="#52796F" />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginRight: "8px", marginLeft:"10px",boxShadow: "0 4px 8px -3px rgba(0, 0, 0, 0.8)", borderRadius:"8px" }}>
            <CommonTopButton
              text="For Rent"
              bgcolor="#1E0058"
              borderColor="#DAF0EE"
              color="#DAF0EE"
            />
          </div>
          <div style={{marginRight:"10px",boxShadow: "0 4px 8px -3px rgba(0, 0, 0, 0.8)", borderRadius:"8px" }}>
            <Link to="/DashboardS">
              <CommonTopButton
                text="For Sale"
                bgColor="#F5F5F5"
                borderColor="#B3A8C8"
                color="#B3A8C8"
              />
            </Link>
          </div>
          {/* Listing */}
        </div>

        {/* BODY */}
        <div className="mainDashboardContainer d-flex">
          {/* left starts */}
          <div className="leftDashboard">
            <div className="lMenusHead">
              <img src={listing} height={30} />
              <label style={{ color: "#52796F" }}>Listings</label>
            </div>

            <div></div>
            <div className="newboxSizingl">
              <Link className="leftlink" to="/AvailablePropertyrental">
                <DashComponent
                  img={AvailaibleProperty}
                  title="Available Properties"
                  number={AvailablePropertyNumner}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/My_propertyPV" className="leftlink">
                {" "}
                <DashComponent
                  img={PendingVerification}
                  title="Pending Verification"
                  number={CountProperties.Pending}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/AllActiveProperties" className="leftlink">
                <DashComponent
                  img={ActiveListing}
                  title="Active Listing"
                  number={CountProperties.Verified}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/My_PropertyYTS" className="leftlink">
                <DashComponent
                  img={yetToShare}
                  title="Yet To Share"
                  number={ytsCount}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/My_PropertySNA" className="leftlink">
                <DashComponent
                  img={sharedOut}
                  title="Shared"
                  number={SharedPropertyCount}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/My_PropertyS" className="leftlink">
                <DashComponent
                  img={shortlisted}
                  title="Shortlisted"
                  number={CountProperties.Shortlisted}
                />
              </Link>
            </div>
            <label>{CountProperties.Closed} Closed</label>

            {/* left end */}
          </div>

          {/* Right starts */}

          <div className="rightDashboard">
            <div className="rMenusHead">
              <img src={Tenimg} height={30} />
              <label className="labelH" style={{ color: "#000000 !important" }}>
                Tenants
              </label>
            </div>

            <div className="newboxSizingr">
              <Link className="Link" to="/ActiveLeads">
                <DashComponent
                  img={ActiveLeads}
                  title="Active Leads"
                  number={number}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link className="Link" to="/AllTenantOne">
                <DashComponent
                  img={PendingVerification}
                  title="Waiting For Property"
                  number={CountTenants.WaitingForProperty}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/AllTenantOne" className="Link">
                <DashComponent
                  img={CurrentlyViewing}
                  title="Currently Viewing"
                  number={CountTenants.CurrentlyViewing}
                />
              </Link>
              <div style={{ marginTop: "5px" }}></div>
              <Link to="/AllTenantOne" className="Link">
                <DashComponent
                  img={shortlisted}
                  title="ShortListed"
                  number={CountTenants.Shortlisted}
                />
              </Link>
            </div>
            <label>{CountTenants.Deactivate} Closed</label>
            {/* Right ENd */}
          </div>

          {/* Container ENd */}
        </div>

        <div className="btnGroup">
          <div
            className="btnGroupOne"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Link to="/AllProperty">
              <CommonBtn
                title="All Properties"
                margin="1.2%"
                fontweight="bolder"
                bgColor="#5D6560"
              />
            </Link>
            <Link to="/AllTenantOne">
              <CommonBtn title="All Tenants" margin="52%" fontweight="bolder" />
            </Link>
          </div>

          {/* <div className="btnGroupTwo" style={{display:"flex", flexDirection:"row",marginTop:"80px" }}>
            
            <CommonBtn style={{display:"flex"}} title="Add New Property"  margin="3px" fontweight="bolder" bgColor="#5D6560" isHeight="true" />
            <CommonBtn title="Add New Tenant"  margin="40%" fontweight="bolder" isHeight="true" />
            </div> */}

          <div
            className="btnGroupTwo"
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "80px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/Propertyinfo">
              <ExtraCommonButton
                title="Add New Property"
                margin="10px 0px 0px 25px"
                fontweight="bolder"
                bgColor="#5D6560"
                isHeight="true"
              />
            </Link>
            <Link to="/AddTenant">
              <ExtraCommonButton
                title="Add New Tenant"
                margin="10px 15px 0px 20px"
                fontweight="bolder"
                isHeight="true"
              />
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default Dashboard;
