import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import seen from "../Assets/Images/Seen.png";
import Like from "../Assets/Images/AgentDashboard/Like.png";
import axios from "axios";

const TenantComp = ({ props, name }) => {
  // console.log(props);
  const [filteredData, setfilteredData] = useState([]);
  
  const [searchValue, setSearchValue] = useState("");
  const boardIds = ["boardId1", "boardId2", "boardId3"]; // Replace with your actual boardIds

  const token = localStorage.getItem("token");

  console.log(props);

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    // If search term is empty, show all properties
    if (searchTerm === "") {
      setfilteredData(props);
      console.log("filteredData",filteredData);
    } else {
      // Filter properties based on houseName
      const filtered = props.filter((tenant) =>
        tenant.tenantDetails.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setfilteredData(filtered);
      
    }
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    // Initialize filteredData with all properties when the component loads
    const fetchPosts = async () => {
      setfilteredData(props);
      console.log(filteredData);

      const sharedTenantCount = props.filter(
        (tenant) => tenant.status == "Shared"
      );

      console.log(sharedTenantCount.boardId);
      // setSharedTenantCount(sharedTenantCount);

      const boardIds = [];
      sharedTenantCount.forEach((tenant) => {
        boardIds.push(tenant.boardId);
      });

      console.log(boardIds);

      for (const boardId of boardIds) {
        try {
          const response = await axios
            .get(`https://b8rliving.com/board${boardId}}`, axiosConfig)
            .then((response) => {
              // setSharedPropertyCount(response.data.data.board.propertyId.length); // Set sharedC in your state
              // return response.data.data.board.propertyId.length;
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              return 0; // Handle the error by returning 0 properties
            });
        } catch (error) {
          console.log(error);
          // Handle the error here if needed
        } finally {
          // setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [props]);

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by Tenant Name"
      />
      {/* Mapping */}
      {filteredData.map((values, index) => (
       
        <div key={index}>
          
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {/* left side */}
            <div
              style={{
                height: "78px",
                width: "80%",
                background: "#FFFFFF",
                border: "1px solid #DAF0EE",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                {values.status === "WaitingForProperty" ? (
                  <>
                    <img
                      src={PendingVerification}
                      alt="imgOne"
                      style={{ marginLeft: "10px", marginTop: "25px" }}
                      height={30}
                    />
                    <h6
                      style={{
                        whiteSpace: "pre-wrap",
                        width: "60px",
                      }}
                    >
                      {" "}
                      Waiting For Property{" "}
                    </h6>
                  </>
                ) : (
                  ""
                )}

                {values.status === "Shortlisted" ? (
                  <>
                    <img
                      src={Like}
                      alt="imgOne"
                      style={{ marginLeft: "10px", marginTop: "25px" }}
                      height={20}
                    />
                    <h6
                      style={{
                        whiteSpace: "pre-wrap",
                        padding: "5px 1%",
                        width: "70px",
                      }}
                    >
                      {" "} {values.numberShortlisted}
                      Shortlisted{" "}
                    </h6>
                  </>
                ) : (
                  ""
                )}
                {values.status === "Shared" ? (
                  <>
                    <img
                      src={seen}
                      alt="imgOne"
                      style={{ marginLeft: "10px", marginTop: "25px" }}
                      height={20}
                    />
                    <h6
                      style={{
                        whiteSpace: "pre-wrap",
                        padding: "5px 1%",
                        width: "70px",
                      }}
                    >{" "}{values.numberShared}{" "}
                      Properties shared{" "}
                    </h6>
                  </>
                ) : (
                  ""
                )}
                {values.status === "Deactivate" ? "Deactivate" : ""}
              </div>

              <hr style={{ flex: "1", marginLeft: "-1px" }} />

              <div style={{ marginTop: "10px" }}>
                <text
                  style={{
                    fontSize: "13px",
                    marginLeft: "-20%",
                    textAlign: "left",
                  }}
                >
                  <b>{values.tenantDetails.name}</b>
                </text>

                <div
                  style={{
                    width: "150px",
                    height: "25px",
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <text
                    style={{
                      fontSize: "12px",
                      marginLeft: "-50px",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                    }}
                  >
                    <u>Preference</u>
                    <br />
                    <b>
                      Rs.{values.tenantDetails.rent} &{" "}
                      {values.tenantDetails.houseConfiguration}
                    </b>
                  </text>
                  <p
                    style={{
                      fontSize: "12px",
                      marginLeft: "-50px",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      marginTop: "-0px",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "center",marginLeft:"right" }}>     
              <div
                style={{
                  height: "76px",
                  width: "90px",
                  background: "#E8E7E7",
                  borderRadius: "10px",
                  marginLeft: "35%",
                }}
              >
                {values.isOnBoard && values.status == "Shortlisted" ? (
                  <Link
                    to={`/PropertyViewBoard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId} `}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={checkP}
                      style={{
                        height: "27px",
                        marginTop: "20%",
                        marginLeft:"20%",
                        marginBottom: "-8px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#5D6560",
                        fontWeight: "bold",
                      }}
                    >
                      <br/>
                      Take Action
                    </span>
                    </div>
                  </Link>
                ) : (
                  ""
                )}

                {values.isOnBoard ? (
                  <Link
                    to={`/createboard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId} `}
                  >
                    <img
                      src={checkP}
                      style={{
                        height: "27px",
                        marginTop: "20%",
                        marginBottom: "-8px",
                      }}
                    />
                    <text
                      style={{
                        fontSize: "12px",
                        color: "#5D6560",
                        fontWeight: "bold",
                      }}
                    >
                      Take Action
                    </text>
                  </Link>
                ) : (
                  <Link
                    to={`/ViewBoard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId}`}
                  >
                    <img
                      src={checkP}
                      style={{
                        height: "27px",
                        marginTop: "20px",
                        marginBottom: "-8px",
                      }}
                    />
                    <text
                      style={{
                        fontSize: "12px",
                        color: "#5D6560",
                        fontWeight: "bold",
                      }}
                    >
                      Take Action
                    </text>
                  </Link>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TenantComp;
