import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import seen from "../Assets/Images/Seen.png";
import Like from "../Assets/Images/AgentDashboard/Like.png";

const TenantComp = ({ props, name }) => { 
  // console.log(props);
  const [filteredData, setfilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    // If search term is empty, show all properties
    if (searchTerm === "") {
      setfilteredData(props);
    } else {
      // Filter properties based on houseName
      const filtered = props.filter((buyer) =>
      buyer.buyerDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredData(filtered);
    }
  };

  useEffect(() => {
    // Initialize filteredData with all properties when the component loads
    setfilteredData(props);
    console.log(filteredData)
  }, [props]);

  return (
    <>
    
   <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by buyer Name"
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
          
                  {values.status === "WaitingForProperty"
                    ?  
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
                      width: "60px"
                    }}
                  > Waiting For Property </h6>
                  </>: ""}

                  {values.status === "Shortlisted" ? <>
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
                      width: "70px"
                    }}
                  > Shortlisted </h6>
                  </> : ""}
                  {values.status === "CurrentlyViewing"
                    ? "Currently Viewing"
                    : ""}
                  {values.status === "Deactivate" ? "Deactivate" : ""}
              </div>

              <hr style={{ flex: "1", marginLeft: "-1px" }} />

              <div style={{ marginTop: "10px" }}>
                <text style={{ fontSize: "13px",marginLeft:"-60px", textAlign:"left" }}><b>{values.buyerDetails.name}</b></text>

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
                        <u>Preference</u><br/>
                    <b>Rs.{values.buyerDetails.budget} Cr & {values.buyerDetails.houseConfiguration}</b>
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
                  >
                    
                  </p>
                </div>
              </div>

              <div
                style={{
                  height: "75px",
                  width: "500%",
                  background: "#E8E7E7",
                  borderRadius: "10px",
                  marginLeft: "85px",
                }}
              >
                
                {values.isOnBoard && values.status == "Shortlisted" ? 
               <Link to={`/PropertyViewBoardS?buyerId=${values._id}&name=${values.buyerDetails.name} `} >
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
                : "" }

          {values.isOnBoard ? 

                <Link to={`/createboardS?buyerId=${values._id}&name=${values.buyerDetails.name} `} >
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

               : 
               <Link to={`/ViewBoardS?buyerId=${values._id}&name=${values.buyerDetails.name}`} >
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
                }
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TenantComp;
