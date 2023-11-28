import React, { Component }  from 'react';
import Dashboardcss from '../Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/homeDown.png";
import peopleDown from "../Assets/Images/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Vector2.png"
import backgroundSecond from "../Assets/Images/other_bg.png";
import rentedOut from "../Assets/Images/rentedOut.png";
import sharedOut from "../Assets/Images/sharedOut.png";
import shortListed from "../Assets/Images/shortListed.png";
import yetShared from "../Assets/Images/yetShared.png";
import check from "../Assets/Images/check.png";
import CommonHeader from "../CommonHeader";

function PendingComp({ properties }){


    function formatDate(startDate) {
        const options = { day: 'numeric', month: 'long' };
        return new Date(startDate).toLocaleDateString('en-US', options);
      }
      
      function calculateDaysGone(startDate) {
        const currentDate = new Date();
        const startDateObj = new Date(startDate);
        const timeDifference = currentDate - startDateObj;
        const daysGone = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days
      
        return daysGone;
      }
      
      // Usage in your component:
    //   const startDate = currentDate; // Replace with your actual date
      const todayISOString = new Date().toISOString().split('T')[0];

      const startDate = todayISOString;
      const daysGone = calculateDaysGone(startDate);
      const dateUpdated = formatDate(startDate);
      

    return(
        <>

        
            {/* <h2 style={{color:"#52796F"}}>Pending Pipeline</h2> */}
            
        
        {/* Mapping */}
        {properties.map((property, index) => (
        <div key={index}>

        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        {/* left white side */}
        <div style={{marginTop:"-90px"}}>
        <div className="containered form" style={{display:"flex",flexDirection:"column",height:"15vh",width:"240px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", marginLeft:"20px"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"left"}}>
               
                {/* for title and text */}
                <div style={{marginTop:"-15px",textAlign:"left"}}>
                <h5 style={{fontSize:"16px"}}>{property.propertyId.houseName} , {property.propertyId.societyName}</h5>
                </div>
                {/* two buttons */}
                <div style={{display:"flex",flexDirection:"row",alignItems:"centre",marginTop:"-0px"}}>
                    {/* <div style={{height:"50%",width:"50%",background:"#FCECEF",borderRadius:"10px",marginRight:"10px"}}> */}
                    {property.propertyId ? 
                    <div style={{height:"50%",width:"50%",borderRadius:"10px",marginRight:"20px",background:"#FCECEF"}}>
                         <h6 style={{fontSize:"8px",color:"#AA223C",marginTop:"-5px",padding:"5%"}}>Information Validation</h6>
                    </div>
                    : ""

                    }

                    {property.propertyId.images ? 
                    <div style={{height:"50%",width:"50%",borderRadius:"20px !important",marginRight:"20px",background:"#FCECEF"}}>
                      <h6 style={{fontSize:"8px",color:"#AA223C",marginTop:"-5px",background:"#FCECEF",padding:"5%"}}>Photos Capture</h6>
                    </div> :
                    <div style={{height:"20px",width:"100px",borderRadius:"10px",marginRight:"20px",background:"#AA223C"}}>
                     <h6 style={{fontSize:"8px",color:"#AA223C",marginTop:"-5px"}}>Photos Capture</h6>                    
                    </div>
                    
                    }  
                
                </div>
                
                
            </div>
            {/* <div style={{marginTop:"-3px"}}>
                <h5 style={{fontSize:"10px",textAlign:"left"}}>Address:</h5>
                <h6 style={{fontSize:"10px",marginTop:"-18px",textAlign:"left"}}> {property.propertyId.propertyDetails._id}</h6>

                </div> */}
         <div style={{ marginTop: "-3px" }}>
  {property.propertyId.propertyDetails.length > 0 && (
    <>
      <h5 style={{ fontSize: "10px", textAlign: "left" }}>Address:</h5>
      <h6 style={{ fontSize: "12px", marginTop: "-18px", textAlign: "left" }}>
        {property.propertyId.propertyDetails[0].propertyInfo.area},  {property.propertyId.propertyDetails[0].propertyInfo.mapLocation}, {property.propertyId.pinCode}
      </h6>
    </>
  )}
</div>
        
        </div>

        {/* down extention */}
            <div style={{width:"262px",height:"40px",background:"#DAF0EE",marginTop:"-20px",marginLeft:"22px",borderBottomLeftRadius:"25px",borderBottomRightRadius:"25px"}}>
                <h6 style={{marginTop:"25px"}}>Assigned on:</h6>
                {daysGone >= 7 ? (
                   <h6 style={{marginTop:"-22px"}}>{startDate} ,  {daysGone} days have gone by since {startDate}</h6>
                )
                :
                (
                  <h6 style={{marginTop:"-22px"}}>{startDate}</h6>
                )}
                
            </div>

        </div>
       
        {/* for check button */}
        <Link to= {`/FieldAgentVerifyProperty?propertyId=${property.propertyId._id}`}  ><div style={{width:"45px",height:"150px",background:"#E8E7E7",borderRadius:"10px",marginBottom:"90px",marginLeft:"10px"}}>
            <img src={vector} style={{height:"20px",marginTop:"50px"}}/>
            <h6 style={{marginTop:"-2px",color:"#5D6560"}}>Check</h6>
        </div>
        </Link>
       
        </div>
       
        
 </div>
      ))}
        
        </>
    );
}
export default PendingComp;