import React from "react";
import "./DashboardS.css";

// import ActiveLeads from "./ActiveLeads";


function DashComponent(props)
{
    const {img, title, number}=props;

    return(
        <div className="Litems">
        <div className="menuIng">
            <img src={img}  height={25} />
        </div>
        <div className="menuContent">
            <p>{number}</p>
            <p>{title}</p>
        </div>
    </div>

    );

}
export default DashComponent;