import React from 'react';
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

const AllPropertiesComp = () => {
  return (
    <>
   

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={imgOne} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                            <text style={{fontSize:"13px"}}>904, Central Park Homes</text>

                            <div style={{width:"150px",height:"25px",background:"#FFEEDB",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#BA7B28",marginLeft:"-50px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}>Incorrect Info</text>
                            </div>

                    </div>
            </div>
           
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Email</text>
                
            </div>        
         </div>      
        </>
  );
};

export default AllPropertiesComp;
