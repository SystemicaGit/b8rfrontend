import React, {useEffect,useState} from "react";

import backgroundImg from "../../Assets/Images/BoardCreation/BackgroundBoard.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from '../../CommonTopButton';
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';

function BoardCreated()
{
  const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  const path = queryParameters.get("path");
  // console.log(boardId);

  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantName, setResponseDataTenantName] = useState("");
  const [responseDataTotalProperties, setResponseDataTotalProperties] = useState("");
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const handleClick = async () => {
    console.log("Handle")
    const linkToCopy = path; // The link you want to copy

    // Create a temporary input element to copy the link to the clipboard
    const input = document.createElement('input');
    input.setAttribute('value', linkToCopy);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    // Optionally, you can provide some user feedback (e.g., a notification)
    alert(`Link copied to clipboard: ${linkToCopy}`);

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/share/${boardId}`,
        {},
        axiosConfig
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
    
  };


  
  useEffect(() => {
    const fetchBoardDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataBoardData = response.data.data.board;
        const responseDataTenantData = response.data.data.board.tenantId;
        setResponseDataTenantName(response.data.data.board.tenantId.tenantDetails[0].name);
        const responseDataPropertiesData = response.data.data.board.propertyId;
         // Count the number of properties
         setResponseDataTotalProperties(responseDataPropertiesData.length);


        console.log(responseDataTenantData);



        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardData);
        setResponseDataProperty(responseDataPropertiesData);
        setResponseDataTenant(responseDataTenantData);


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
    fetchBoardDetails(); // Call the fetch function
    }, [boardId]); 

    return(
        <>
         <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          height:"740px"
         
        }}
      >
        <CommonHeader title="Board Created" color="#52796F"/>
        <div >
          <div>
            <p>Added to the Board : {responseDataTotalProperties} properties </p>
            <p>Tenant Name : {responseDataTenantName} </p>
            <p>Log-in Mobile Number :  {responseDataTenant.phoneNumber}</p>
          </div>
        <Link to={`/TenantSideView?boardId=${boardId}`}><CommonBtn title="Preview Board" margin="90px"/></Link>

        </div>
       <div style={{marginTop:"70px"}}>

       
        <p onClick={handleClick} ><CommonBtn title = {`Share Link with ${responseDataTenantName}`} margin="90px"/></p>
        </div>

        <div style={{marginTop:"460px"}}>
        <Footer/>

        </div>
        
        </div>
        </>
        
    );



}
export default BoardCreated;