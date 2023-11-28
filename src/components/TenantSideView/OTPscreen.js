import React, {useEffect,useState} from "react";

import TenantSideBack from "../Assets/Images/TenantSideView/TenantSideBack.png";
import bgm from "../Assets/Images/TenantSideView/TenantSideImg.png";
import Footer from "../Footer";
import axios from "axios";
import CommonBtn from "../CommonButton";
import style from "./OtpScreen.css";
import loadingGif from "../Assets/Images/loading.gif";


function OTPscreen() {

  const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  // const path = queryParameters.get("path");
  console.log(boardId);

  
  const [formData, setFormData] = useState({
    phone: "",
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [OtpSession, setOtpSession] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [FormDisable, setFormDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantNumber, setResponseDataTenantNunber] = useState("");
  const token = localStorage.getItem("token");
  // const [responseDataTotalProperties, setResponseDataTotalProperties] = useState("");
  const [responseDataPropertyId, setResponseDataTenantPropertyId] = useState("");

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
          `https://b8rliving.com/board/details/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataBoardData = response.data.data.board;
        const responseDataTenantData = response.data.data.board.tenantId;
        setResponseDataTenantNunber(response.data.data.board.tenantId.phoneNumber);
        setResponseDataTenantPropertyId(response.data.data.board.propertyId);

        
        // const responseDataPropertiesData = response.data.data.board.propertyId;
         // Count the number of properties
        //  setResponseDataTotalProperties(responseDataPropertiesData.length);


        console.log(responseDataTenantData);



        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardData);
        // setResponseDataProperty(responseDataPropertiesData);
        setResponseDataTenant(responseDataTenantData);


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
    fetchBoardDetails(); // Call the fetch function
    }, [boardId]); 



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleOTPChange = (event) => {
  //   setOTP(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData["phone"]);
    const phone = formData["phone"];
    if(responseDataTenantNumber == phone){
      try {
        axios
          .get(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`, formData)
          .then((response) => {
            console.log(response.data);
            // do something with the response
            // const token = response.data.token;
          
            const OTP_SESSION = response.data.Details;
            setOtpSession(OTP_SESSION);
            setFormDisable(false);
            alert("OTP has been send!");
            //redirect user to Dashboard
            // window.location.href = `/EnterOTP?sessionId=${OTP_SESSION}&phone=${phone}`;
          })
          .catch((error) => {
            console.log(error);
            // handle the error
          });
        } catch (error) {
          console.log("ASYNC ERROR:". error);
        }
    } else {
        alert("Please login with Registered Mobile Number")
    }
    // console.log(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`);
  
  };

console.log(OtpSession);
  const handleSubmitVeriy = (event) => {
    event.preventDefault();

    console.log(formData["enter_otp"]);
    const enter_otp = formData["enter_otp"];
    // 599325
    console.log(
      `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OtpSession}/${enter_otp}`
    ); 
    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OtpSession}/${enter_otp}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          // alert(response.data);
          const OTP_CHECK = response.data.Details;
          alert(OTP_CHECK);

          axios
            .post(
              "https://b8rliving.com/tenant/login",
              {
                phoneNumber: formData.phone,
              }
            )
            .then((response) => {
              console.log(response.data);
              alert(response.data.message);
              const token = response.data.data.jwtToken;
              // const name = response.data.data.agent.name;
              const phone = response.data.data.tenant.phoneNumber;
              // const tenantDetails = response.data.data.tenant.tenantDetails;
              console.log(response.data.data.tenant._id);
      
              //set JWT token to local
              // if (typeof localStorage !== 'undefined') {
                // localStorage is available
                // Your code using localStorage goes here
                localStorage.setItem("token", token);
                localStorage.removeItem( "name");
                localStorage.setItem("phone", phone);
              window.location.href = `/TenantSideView?tenantId=${response.data.data.tenant._id}&boardId=${boardId}`;
              // alert("Your Password has been Updated!");
            })
            .catch((error) => {
              console.log(error);
              const errorMessage = error.response.data.message;
              alert(errorMessage);
            });
          console.log(OTP_CHECK);

         
        })
        .catch((error) => {
          console.log(error);
          const OTP_CHECK = error.response.data.Details;
          alert("Please Re-enter: " + OTP_CHECK);
        });
    } catch (error) {
      console.log("ASYNC ERROR:", error);
    }
  };

  return (
    <>
    { loading ? (
      <div>
        <img
          src={loadingGif}
          height={180}
        />
      </div>
    ) : (
      <div className="startPage">
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundImage: `url(${TenantSideBack})`,
          backgroundSize: "100% 100%",
        }}
      >
        <form className="login-form" onSubmit={handleSubmit} >
          <div className="header">
            <img src={bgm} height={163} alt="headImage" />
          </div>

          <div className="TenantSideF">
            <p className="titleF"><b>
              Welcome to betterhomes
              </b>
            </p>
            <br />
            <p style={{textAlign:"left",marginLeft:"10px",marginRight:"10px"}}>
              Your agent has shared {responseDataPropertyId} awesome properties. <br />
              Log in using {responseDataTenantNumber}, mobile number to view details
            </p>
          </div>

          <div>
            <label className="Inputfield" htmlFor="phone">Enter Mobile Number</label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
              style={{height:"40px",width:"311px",borderColor:"#52796F",border:"3px"}} 
            />
            <CommonBtn title="Send OTP" margin="25%" fontweight="bolder" color="#DAF0EE" />
          </div>
          
          </form>
          <br></br>

        <form className="login-form" onSubmit={handleSubmitVeriy} >


          <div className="SpaceAbove" >
            <label className="Inputfield" htmlFor="enter_otp">Enter OTP</label>
            <input 
            className="InputF" 
            type="number" 
            name="enter_otp"
            disabled={FormDisable}
            id="enter_otp" 
            value={formData.enter_otp} 
            onChange={handleChange} 
            style={{height:"40px",width:"311px",borderColor:"#52796F",border:"3px"}}/>
            <CommonBtn title="Confirm OTP" margin="25%" fontweight="bolder" color="#DAF0EE" />
          </div>

          </form>
        
          <Footer />
        <br />
      </div>
    </div>
    
    )}
    </>
  );
}

export default OTPscreen;
