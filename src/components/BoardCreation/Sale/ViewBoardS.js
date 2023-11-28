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
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="View Board" color="#52796F" />

        <div style={{ Display: "flex" }}>
          <div>
            <h2>
              <u>{name}</u>
            </h2>
          </div>

          {responseDataTenantData.isOnBoard ? (
            "TRUE"
          ) : (
            <div>
              <h3>No Properties Shared Yet</h3>

              <img src={CreateBS} height={400} onClick={createNewBoard} />
            </div>
          )}

          <Link to={`/DeactivateTenantS?tenantId=${buyerId}&name=${name} `}>
            <img src={deactivateImg} style={{ marginTop: "100px" }} />
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default ViewBoardS;
