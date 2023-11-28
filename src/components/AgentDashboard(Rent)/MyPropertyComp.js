import React from "react";
import like from "../Assets/Images/AgentDashboard/Like.png";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

const MyPropertyComp = ({ responseProperty }) =>{
    return (
        <>

         {responseProperty.map((values, index) => (

        <div key={index}>


         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={imgOne} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"5px"}}>
                        <div style={{textAlign:"left",marginLeft:"10px"}}>
                            <text style={{fontSize:"9px",textAlign:"left"}}>{values.houseName},{values.societyName}<br/></text>
                        </div>
                            <div style={{width:"150px",height:"25px",background:"#FFFFFF",borderRadius:"10px",marginTop:"5px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#000000",marginLeft:"-50px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}><img src={like}/>4 Tenants</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Detail</text>
                
            </div>
               

               
               
        </div>
        </div>
        ))}
        </>
    )

};
export default MyPropertyComp;