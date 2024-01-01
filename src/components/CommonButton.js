import React, { Component, useState, useEffect } from "react";
// import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import vector from "./Assets/Images/RegisterLoginUser/vector.png";
import "./commonButton.css";

function CommonButton(props) {
  // console.log(props.title);
  const { title, margin, fontweight, color, bgColor, isHeight, width, type } =
    props;

  const [isBColor, setIsBColor] = useState(false);
  // const [isColor, setIsColor] = useState("");

  return (
    <>
      <div
        className=""
        // style={{
        //   background: bgColor ? `${bgColor}` : "#52796f",
        //   margin: margin ? `${margin}` : "0%",
        //   height: isHeight ? '80px' : '',
        // }}
      >
        <button
          type={type}
          className="flex text-white justify-center items-center border-[#daf0ee] border-2 rounded-[0.5rem] px-[0.6rem] py-[0.2rem] commonbtn"
          style={{
            background: bgColor ? `${bgColor}` : "#52796f",
          }}
        >
          {/* <button
            className=""
            style={{
              fontWeight: fontweight ? `${fontweight}` : "100",
              width: width ? `${width}` : '100%',
              color: color ? `${color}` : "100",
            }}
          >
          </button> */}
          <div className="text-[1.2rem]">{title}</div>
          <div>
            <IoIosArrowDropright className="text-[1.4rem] lg:text-[2rem] text-white ml-[0.5rem] " />
          </div>
        </button>
        {/* <div className="">
        
        </div> */}
      </div>
    </>
  );
}
export default CommonButton;
