import React, {useEffect,useState} from "react";


import backgroundImg from "../../Assets/Images/BoardCreation/BackgroundBoard.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from "../../CommonTopButton";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import deactivateImg from "../../Assets/Deactivate.png";
import CreateB from "../../Assets/Images/BoardCreation/CreateB.png";
import loadingGif from "../../Assets/Images/loading.gif";
import PropertyComp from "./PropertyComp";


function ViewBoard() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const tenantId = queryParameters.get("tenantId");

  const [responseDataTenantData, setResponseDataTenantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const createNewBoard = async () =>
  {
    try {
      const response = await axios.post(
        `https://b8rliving.com/board`, {tenantId: tenantId},
        axiosConfig
      );

      // const responseData = response.data.data.tenant.tenantDetails;
      const responseDataBoard = response.data.data.board.tenantId.boardId;
      console.log(responseDataBoard)

      // Update the formData state with the response data
      // setResponseDataTenant(responseData);
      // setResponseDataTenantData(responseDataTenant); 
      window.location.href= `/CreateBoard?tenantId=${tenantId}&name=${name}&boardId=${responseDataBoard}`
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }

  }


  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/tenant/${tenantId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataTenant = response.data.data.tenant;

        // Update the formData state with the response data
        // setResponseDataTenant(responseData);
        setResponseDataTenantData(responseDataTenant);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
      fetchTenantDetails(); // Call the fetch function
    }, [tenantId]); 

    

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

{responseDataTenantData.isOnBoard ?           
"TRUE"
 :  

        <div>
            <h3>No Properties Shared Yet</h3>
         
            <img src={CreateB} height={400} onClick={createNewBoard} />
         
      </div>
      }



          <Link to={`/DeactivateTenant?tenantId=${tenantId}&name=${name} `} ><img src={deactivateImg} style={{ marginTop: "100px" }} /></Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default ViewBoard;
