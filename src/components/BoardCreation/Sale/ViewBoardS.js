import React, { useEffect, useState } from "react";

import backgroundImg from "../../Assets/Images/Sale/RestBg.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from "../../CommonTopButton";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import deactivateImg from "../../Assets/Deactivate.png";
import CreateBS from "../../Assets/Images/BoardCreation/CreateBS.png";
import { FcBusinessman } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";

function ViewBoardS() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const buyerId = queryParameters.get("buyerId");

  const [responseDataTenantData, setResponseDataTenantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  const createNewBoard = async () => {
    try {
      const response = await axios.post(
        `https://b8rliving.com/board`,
        { buyerId: buyerId },
        axiosConfig
      );

      // const responseData = response.data.data.tenant.tenantDetails;
      const responseDataBoard = response.data.data.board.buyerId.boardId;
      console.log(responseDataBoard);
      //Redirect
      window.location.href = `/CreateBoardS?buyerId=${buyerId}&name=${name}&boardId=${responseDataBoard}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <>
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="View Board" color="#1E0058" />
        {/* name and status  */}
        <div className="flex justify-center items-center flex-col py-[2rem]">
          <FcBusinessman className="text-[3rem]" />
          <p className="text-[1.5rem] font-bold text-center">
            <u>{name}</u>
          </p>
          <p>No Properties Shared Yet</p>
        </div>
        {/* create board container */}
        <div className="px-[2rem] cursor-pointer" onClick={createNewBoard}>
          <div
            className="flex justify-center items-center p-[1rem] flex-col"
            style={{
              background: "rgba(217, 217, 217, 0.47)",
              border: "1px dashed #000",
              borderRadius: "1rem",
            }}
          >
            <IoMdAddCircleOutline className="text-[5rem] mt-[2rem] mb-[1rem]" />
            <p className="text-[2rem] mb-[2rem] font-bold">Create New Board</p>
          </div>
        </div>

        <div className="flex justify-center items-center py-[2rem]">
          <Link
            to={`/DeactivateTenantS?tenantId=${buyerId}&name=${name} `}
            className="bg-[#FBF1F1] flex justify-center items-center py-[1rem] flex-col rounded-[1rem]"
            style={{
              border: "1px solid #E13018",
            }}
          >
            <ImCross className="text-[#CC3333] text-[3rem] my-[1rem]" />
            <p className="text-[1.5rem] font-bold px-[1rem]">Deactivate</p>
            <p className="text-[1.5rem] font-bold px-[1rem]">Buyer</p>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default ViewBoardS;
