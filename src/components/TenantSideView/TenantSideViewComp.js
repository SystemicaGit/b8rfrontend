import React, { useEffect, useState } from "react";

import "../Dashboard.css";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
// import "./DashComponent.css";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import Rupee from "../Assets/Images/TenantSide/Ruppee.png";
import space from "../Assets/Images/TenantSide/area.png";
import Sofa from "../Assets/Images/TenantSide/Sofa.png";
import HouseConfig from "../Assets/Images/TenantSide/HouseConfig.png";
import Parking from "../Assets/Images/TenantSide/Parking.png";
import Parking2 from "../Assets/Images/TenantSide/Parking2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBoardState } from "./boardState";
import { globalTenantId } from "./TenantSideView";

// import ActiveLeads from "./ActiveLeads";

function TenantSideViewComp({ boards, boardId }) {
  const token = localStorage.getItem("token");
  // console.log(token);
  //const shortListStatus = false;
  const [isClick, setClick] = useState(false);
  const[shortListStatus, setshortListStatus ] = useState(false)
  const [loading, setLoading] = useState(false);
  // Initialize isClick state as an array with the same length as boards
  const { isClickArray, setIsClickArray } = useBoardState(boards.length);
  //const ClickArray 
console.log("isClickArray",isClickArray);
//console.log("boardLength", boards.length)
 

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "https://b8rliving.com/property",
  //         axiosConfig
  //       );

  //     //Filter Data
  //     const filterData = response.data.data.properties ;

  //     // Sort the response data by the 'imagesApproved' property in descending order
  //     const sortedProperties = filterData.sort((a, b) => {
  //       return a.imagesApproved - b.imagesApproved;
  //     });

  //       setresponsePendingProperties(sortedProperties);

  //     } catch (error) {
  //       console.log(error);
  //       // Handle the error here if needed
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  const shortlist = async (propertyid,index) => {
    // event.preventDefault();
    // setClick(true);

    if(isClickArray[index])
    {setClick(!isClick)
      setshortListStatus(true)
   }
    
    else{
      setClick(false)
      setshortListStatus(false)
      
    }
    //setIsClickArray
  /*  
   if(isClick){
      alert("Property shortlisted  ")
    }
    else{
    alert("Property removed from shortlist")}
   */ 
   // console.log("Received Id:", propertyid);
    //console.log("Recieved BId", boardId);

    setIsClickArray((prevState) => {
      const updatedIsClickArray = [...prevState];
      updatedIsClickArray[index] = !isClickArray[index];
      //if(updatedIsClickArray[index]){
      //setClick(!isClick)}
      //else{
        //setClick(isClick)
     // }
      //console.log(isClickArray)
      //console.log(updatedIsClickArray)
      return updatedIsClickArray;
      
    });
    


    try {
     // console.log("Final pid",propertyid)
     // console.log("Recieved BId", boardId);
     console.log("PropertyId",propertyid,"shortliststatus",shortListStatus,"tenantId",globalTenantId)
      const response = await axios.put(
        `https://b8rliving.com/board/shortlist/${boardId}`,
        {propertyid,shortListStatus,globalTenantId},
        axiosConfig
      );
      console.log("Response fo apishortlist ",response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  //console.log(boards);

  return (
    <>
      {/* Mapping */}
      {boards.map((property, index) => (
     
        <div key={index} >
         
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#B6E1DD",
              borderRadius: "20px",
              margin: "2%",
              //height :"350px",
            }}
          >
            <div
              style={{
                height: "50%",
                width: "100%",
                borderRadius: "20px",
                color: "#A4DAD5",
                
               
              }}
            >
              <Link
                to={`/DetailView?boardId=${boardId}&propertyId=${property._id}&index=${index}`}
              >
                <Carousel showThumbs={false} showArrows={true}>
                  {property.images.map((image, index) => (
                    <div key={index}>
                      <img src={image} style={ {
                    width: '95%', // 
                    height: '95%', //
                    objectFit: 'cover', //
                    borderRadius: '10px', 
                    marginTop : '10px',
  }}   />
                      <p
                        className="legend"
                        style={{
                          
                        
                          color: "#FFFFF",
                          fontSize: "16px",
                          fontWeight: "bolder",
                      
                        }}
                      >
                        {property.houseName}
                      </p>
                    </div>
                  ))}
                </Carousel>
              </Link>
              {/* For Images */}
              {/* <img src={homeDown} alt="Los Angeles" /> */}
            </div>

            {/* For Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  textAlign: "centre",
                  ItemAlign: "centre",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img style={{ marginTop: "21px" , marginRight :"5px", marginLeft :"3px"}} src={Rupee} height={19} />
                <h4
                  style={{
                    textAlign: "centre",
                    ItemAlign: "centre",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {property.propertyDetails.featureInfo.rentAmount} /month
                  <h6 style={{ marginTop: "0px",fontSize: '10px',marginLeft: '5px' }}> (incl. Maintenance )</h6>
                </h4>
              </div>
              <div className="Apps" 
              style={{ marginBottom: "1px",
               display: "flex", flexDirection: "row-reverse", 
               zoom: "0.7" }}>

      <Heart height={10} isClick={isClickArray[index]} onClick={() => shortlist(property._id,index)  } />
     
 {isClickArray[index] ? (
  
    <p
      style={{
        fontStyle: "Glida Display",
        fontSize: "20px",
        color: "#B30808",
        fontWeight: "bold",
        margin: "40px -30px 0 10px",
      }}
    >
      
      Shortlisted
    </p>
  ) : (
    <p
      style={{
        fontStyle: "Glida Display",
        fontSize: "20px",
        color: "#B30808",
        fontWeight: "bold",
        margin: "40px -30px 0 10px",
      }}
    >
      Shortlist{" "}
    </p>
  )}
</div>
</div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={space} height={17}/>
                <h5 style={{ marginTop: "1px", marginLeft: "4px" }}>
                  {"  "}
                  {property.propertyDetails.featureInfo.carpetArea} sqft
                </h5>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={HouseConfig} height={17} />
                <h5 style={{ marginTop: "0px" , marginLeft: "4px"}}>
                  {" "}
                  {property.propertyDetails.propertyInfo.houseConfig}{" "}
                </h5>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={Sofa} height={17} />
                <h5 style={{ marginTop: "0px", marginLeft: "4px" }}>
                  {" "}
                  {property.propertyDetails.featureInfo.furnishingType}{" "}
                </h5>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={Parking} height={17} />
                <h5 style={{ marginTop: "0px", marginLeft: "4px" }}>
                  {" "}
                  {property.propertyDetails.featureInfo.parking.car != "" ||
                  property.propertyDetails.featureInfo.parking.bike > 0
                    ? "Available"
                    : "No"}
                </h5>
              </div>
            </div>
          </div>
          <div style={{padding : "3px"}}></div>
        </div>
      ))}
    </>
  );
}
export default TenantSideViewComp;
