import React, { useState, useEffect } from "react";
import "./UserLoginDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "../vector.png";
import Footer from "../Footer";
import backgroundthird from "../Assets/Images/other_bg.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";

function ConfirmOTPAgent(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const OTP_SESSION = queryParameters.get("sessionId");
  const phone = queryParameters.get("phone");
  const username = queryParameters.get("username");

  const [formData, setFormData] = useState({
    enter_otp: "",
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enter_otp = formData["enter_otp"];

    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTP_SESSION}/${enter_otp}`,
          formData
        )
        .then((response) => {
          // alert(response.data);
          const OTP_CHECK = response.data.Details;
          alert(OTP_CHECK);

          window.location.href = "/FrontLogin";

          // axios
          //   .put("http://localhost:5000/backend/updatepassword", formData)
          //   .then((response) => {
          //     alert(response.data);
          //     alert("Your Password has been Updated!");
          //     window.location.href = "/FrontLogin";
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("ASYNC ERROR:", error);
    }
  };

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;

    const countdown = () => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    };

    interval = setInterval(countdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <>
      <div
        className="startPage login-page"
        style={{
          backgroundImage: `url("")`,
        }}
      >
        <div className="login-page">
          <div
            className="form"
            style={{
              borderRadius: "16px",
              marginTop: "40%",
              borderRadius: "16px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundthird})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <form onSubmit={handleSubmit} className="login-form">
              <CommonHeader title="Confirm OTP" />

              <div style={{ marginTop: "100px" }}></div>

              <label
                htmlFor="enter_otp"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                }}
              >
                Enter OTP (Check Phone or Email Registered)
              </label>
              <input
                type="text"
                id="enter_otp"
                value={formData.enter_otp}
                onChange={handleChange}
                name="enter_otp"
                required
              />

              <p
                style={{
                  marginTop: "-9px",
                  marginRight: "-230px",
                  fontSize: "10px",
                }}
              >
                <b>
                  <u>Resend OTP? ({timer}s)</u>
                </b>
              </p>

              <div style={{ marginTop: "50px" }}></div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <BackButton title="Back" margin="" fontweight="bolder" />
                <CommonBtn title="Submit" margin="50%" fontweight="bolder" />
              </div>

              <Footer />
            </form>

            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOTPAgent;
