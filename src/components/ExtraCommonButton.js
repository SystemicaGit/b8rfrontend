import React, { Component, useState, useEffect } from "react";

import vector from "./Assets/Images/RegisterLoginUser/vector.png";
import "./commonButton.css";

function ExtraCommonButton(props) {
  // console.log(props.title);
  const { title, margin , fontweight,  color, bgColor , isHeight } = props;

  const [isBColor, setIsBColor] = useState(false);
  // const [isColor, setIsColor] = useState("");


  return (
    <>


<div className=" Cbutton CCommonnButton" 
style={{
  background: bgColor ? `${bgColor}` : '#52796f',
  margin: margin ? `${margin}` : '0%',
  height: isHeight ? '80px' : '',
  display:"flex", 
  justifyContent:'space-between',
  justifyItems:'space-between',
  
}}
>
        <div className="buttonClassBtn " style={{whiteSpace:'wrap'}}>
          <button className="cBtn " style={{
  fontWeight: fontweight ? `${fontweight}` : '100',
  color: color ? `${color}` : '100' , width: '120px'    }}
  >{title}</button>
        </div>
        <div className="buttonClass">
          <img
            className="CvectorResetPasswordVec "
            src={vector}
            alt="fireSpot"
          />
        </div>
      </div>
    </>
  );
}
export default ExtraCommonButton;
