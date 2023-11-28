import React, { useEffect, useRef , useState } from 'react';
import Dashboardcss from '../Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Housimg from "../Assets/Images/TenantSideView/TenantSideViewS.png";
import Footer from '../Footer';
import logo from "../Assets/Images/Logo.png";
import TenantSideViewComp from './TenantSideViewComp';


function TenantSideView() {
  const queryParameters = new URLSearchParams(window.location.search);
  const tenantId = queryParameters.get("tenantId");
  const boardId = queryParameters.get("boardId");
  console.log(tenantId);

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
  

  useEffect(() => {
    const fetchBoardDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        // const responseDataBoardData = response.data.data.board;
        const responseDataBoardtData = response.data.data.board;
        // setResponseDataTenantName(response.data.data.board.tenantId.tenantDetails[0]);
        const responseDataPropertiesData = response.data.data.board.propertyId;


        console.log(responseDataBoardtData);

        const filteredProperties = responseDataPropertiesData.filter(
          (property) => property.status != "Closed"
        );


        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardtData);
        setResponseDataProperty(filteredProperties);

         // Count the number of properties
        setResponseDataTotalProperties(filteredProperties.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
    fetchBoardDetails(); // Call the fetch function
    }, []); 


    //TENANT
    useEffect(() => {
      const fetchBoardDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://b8rliving.com/tenant/${tenantId}`,
            axiosConfig
          );
  
          
          // const responseData = response.data.data.tenant.tenantDetails;
          // const responseDataBoardData = response.data.data.board;
          const responseDataTenantData = response.data.data.tenant;
          setResponseDataTenantName(response.data.data.tenant.tenantDetails[0].name);
          // const responseDataPropertiesData = response.data.data.board.propertyId;
           // Count the number of properties
          //  setResponseDataTotalProperties(responseDataPropertiesData.length);
  
  
          console.log(responseDataTenantData);
  
  
  
          // Update the formData state with the response data
          // setResponseDataBoard(responseDataBoardData);
          // setResponseDataProperty(responseDataPropertiesData);
          setResponseDataTenant(responseDataTenantData);
  
  
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Set loading to false when the request is complete
        }
      }
      fetchBoardDetails(); // Call the fetch function
      }, [tenantId]); 

// console.log(responseDataTotalProperties);


  return (
    <>

    
    
      <div
        className="form"
        style={{
          borderRadius: '16px',
          marginTop: '10%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="MainLogoDesign">
        <Link to="/dashboard"><img  src={logo} height={40} alt="fireSpot"/></Link>
      </div>
        <h2 style={{ color: '#52796F' }}>Welcome</h2>
        <h3 style={{ textAlign: 'left' }}>Hey {responseDataTenantName}, </h3>
        <p style={{ textAlign: 'left'  }}>
          Your agent has shared {responseDataTotalProperties} awesome properties with you!
          <br />
          Check them out and pick which you like.
        </p>

        <div
          // className="containered form"
          // style={{
          //   height: '300px',
          //   borderRadius: '5px',
          //   boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          //   background: '#DAF0EE',
          // }}
        >
          {/* <Link to="/DetailView"><img
            src={Housimg}
            alt="Tenant"
            height={320}
          /></Link> */}
        
       
        
        <TenantSideViewComp boards={responseDataProperty} boardId={boardId} />
          
          <h3 style={{fontFamily:"GlidaDisplay"}}>That’s All for the Day!<br/>
        Hope you love the properties shared.</h3>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TenantSideView;



