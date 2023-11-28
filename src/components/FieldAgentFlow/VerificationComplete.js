import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import greenTick from "../Assets/Images/greenTick.png";
import vector from "../Assets/Images/vector.png"
import Footer from '../Footer';
// import key_1 from "./PropertyAdditionPageIcons/key_1/24.png";
// import rent_1 from "./PropertyAdditionPageIcons/rent_1/24.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";

function VerificationComplete()
{
    return(
            
        <div className="login-page">
          <div className="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} >
          <h2 style={{color:"#000000"}}>Verification Complete</h2>

            

            {/* -----------for name----------- */}
            <div style={{marginTop:"70px"}}>
            <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Society Name</h4>
            <h2 style={{color:"#52796F"}}>Society Name</h2>
            </div>

             {/* -----------budget details----------- */}
             <div  style={{marginTop:"40px"}}>
             <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Features</h4>
             <h2 style={{color:"#52796F"}}>2BHK</h2>
             </div>


              {/* -----------button----------- */}
              {/* <div style={{marginTop:"40px"}}>
              <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "75%" }}>Go to Agent Dashboard<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
              </div> */}
   
                

                

              

                
              <CommonBtn title="Go to Agent Dashboard" margin="11%" fontweight="bolder"  color="#DAF0EE" />
                      
           
              
         
                  

               <Footer/>
                
            </div>
        </div>
           
        
       
        
    );

}
export default VerificationComplete;