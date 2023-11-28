import React from "react";
import "../Dashboard.css";
// import "./DashComponent.css";

// import ActiveLeads from "./ActiveLeads";


function DashComponent(props)
{
    const {img, title, number}=props;

    return(
        <div className="Litems" style={{height:"35%",width:"60%",marginLeft:"20%",borderRadius:"13%"}}>
                <div className="menuIng" style={{marginTop:"-30px"}}>
                    <img src={img}  height={35} />
                </div>
                <div className="menuContent">
                    <p>{number}</p>
                    <p>{title}</p>
                </div>
        </div>

    );

}
export default DashComponent;