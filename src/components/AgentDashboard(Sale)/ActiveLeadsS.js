import React from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from '../CommonTopButton';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import backgroundSecond from "../Assets/Images/Sale/SaleBg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";

function ActiveLeadsS()
{

  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

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
        <CommonHeader title="Active Leads" color="#1E0058" />

        <SearchBar onSearch={handleSearch} placeholder="Search by Buyer Name"/>

        <p style={{textAlign:"left"}}>Hey Yash, <br/>

        Here are all the tenants that you have onboarded </p>
        <Footer/>
        </div>
        </>
        
    );

}
export default ActiveLeadsS;