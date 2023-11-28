import React from "react";
import "./DashboardS.css";
import "./ListingComp.css";

import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";
import heartIcon from "../Assets/Images/AgentDashboard/Liked.png";

function ListingComp3(props) {
  const { img, title, number } = props;

  return (
    <div className="left-container">
      {/* <!-- left side --> */}
      <div className="left-content">
        {/* <!-- img --> */}
        <div className="left-image">
          <img src={img ? imgOne : noImg} alt="imgOne" />
        </div>
        <div className="left-text-container">
          <text className="left-address-text">{title}</text>

          <div className="left-info-box-s">
            <img src={heartIcon} alt="heart" className="heart-icon" />
            <text >{number} Clients</text>
          </div>
        </div>
      </div>
      {/* <!-- Down side --> */}
      <div className="right-container">
        {/* <img src={checkP} className="right-image" /> */}
        <text className="right-text">Edit Property</text>
      </div>
    </div>
  );
}

export default ListingComp3;
