import React from "react";
import CommonHeader from "../CommonHeader";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import BackButton from "../CommonButtonBack";
import CommonBtn from "../CommonButton";
import ReactivateProperty from "../Assets/Images/AgentDashboard/ReactivateProperty.png"

function ReactiveProperty() {
  return (
    <div
      className="form"
      style={{
        borderRadius: "16px",
        marginTop: "10%",
        backgroundImage: `url(${oneBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        padding: "20px",
      }}
    >
      <CommonHeader title="Reactivate(Archived Properties)" color="#52796F"  />

      <img src={ReactivateProperty} height={100}/>


       <div style={{display:"flex", flexDirection:"row" }}>
            
            <BackButton title="No, Go Back" margin="" fontweight="bolder"   />
            <CommonBtn title="Yes, Vacant again"  margin="40%" fontweight="bolder" />
        </div>
      <Footer />
    </div>
  );
}

export default ReactiveProperty;
