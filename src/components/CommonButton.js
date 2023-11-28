import React, { Component, useState, useEffect } from "react";

import vector from "./Assets/Images/RegisterLoginUser/vector.png";
import "./commonButton.css";

function CommonButton(props) {
  // console.log(props.title);
  const { title, margin , fontweight,  color, bgColor , isHeight, width } = props;

  const [isBColor, setIsBColor] = useState(false);
  // const [isColor, setIsColor] = useState("");


  return (
    <>


<div className="buttonClassContainer Cbutton Cbutton-reset-password CCommonnButton" 
style={{
  background: bgColor ? `${bgColor}` : '#52796f',
  margin: margin ? `${margin}` : '0%',
  height: isHeight ? '80px' : '',
}}
>
        <div className="buttonClassBtn ">
          <button className="cBtn " style={{
  fontWeight: fontweight ? `${fontweight}` : '100', 
  width: width ? `${width}` : '100%',
  color: color ? `${color}` : '100'    }}
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
export default CommonButton;
