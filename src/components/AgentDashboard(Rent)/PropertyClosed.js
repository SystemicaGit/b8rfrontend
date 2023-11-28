import React from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from '../CommonTopButton';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import backgroundSecond from "../Assets/Images/other_bg.png";
import PropertyClosedimg from "../Assets/Images/PropertyClosed/PropertyImg.png";

function PropertyClosed()
{
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const societyName = queryParameters.get("societyname");
  const reason = queryParameters.get("closed");

    return(
        <>
         <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
        
        }}
      >
       
        <CommonHeader title="Property CLosed" color="#52796F" />

        <div style={{marginTop:"70px"}}>
            <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Name</h4>
            <h2 style={{color:"#52796F",fontWeight:"bolder"}}>{name},{societyName}</h2>
            </div>

             {/* -----------budget details----------- */}
             <div  style={{marginTop:"40px"}}>
             <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Closed Status</h4>
             <h2 style={{color:"#52796F",fontWeight:"bolder"}}>{reason}</h2>
             </div>
           
        <img src={PropertyClosedimg} style={{height:"150px", borderRadius:"10px"}}/>
        <Link to="/Dashboard"><CommonBtn title="Go to Agent Dashboard" margin="50px"/></Link>
        <Footer/>
        </div>
        </>
        
    );

}
export default PropertyClosed;