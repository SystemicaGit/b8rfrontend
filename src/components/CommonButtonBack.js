import React, { Component, useState, useEffect } from "react";

import vector from "./Assets/Vector.png";
import "./commonButton.css";

function CommonButtonBack(props) {
  // console.log(props.title);
  const { title, margin , fontweight,  color } = props;

  const [isBColor, setIsBColor] = useState(false);
  // const [isColor, setIsColor] = useState("");

  if (props.color) {
  //   setIsColor(props.color);
        // setIsBColor(true);
  //   console.log(isColor);
  //   console.log(isBColor);
  }

  return (
    <>


<div className="buttonClassContainer Cbutton Cbutton-reset-password CCommonnButton" 
style={{
  background: '#818683',
  margin: margin ? `${margin}` : '0%',
}}
>
<div className="buttonClass">
          <img
            className="CvectorResetPasswordVecBack "
            src={vector}
            alt="fireSpot"
          />
        </div>
        <div className="buttonClassBtn ">
          <button className="cBtn " style={{
  fontWeight: fontweight ? `${fontweight}` : '100',
  color: color ? `${color}` : '100'    }}
  >{title}</button>
        </div>
       
      </div>
    </>
  );
}
export default CommonButtonBack;
