import React from "react";

function CommonTopButton(props) {
  const { text, bgColor, borderColor, color, onclicked, margin } = props;

  const handleClick = () => {
    console.log("Button clicked!");
    // Call the provided onclicked callback if it's a function
    if (typeof onclicked === "function") {
      onclicked();
    }
  };
  // console.log(onclicked)

  return (
    <button
      style={{
        backgroundColor: bgColor || "#52796f",
        color: color,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "0.5rem 1rem",
        borderRadius: "0.7rem",
        fontWeight: "bolder",
        textAlign: "center",
        width: "100%",
        border: `3px solid ${borderColor}` || "1px solid",
        margin: margin || "0px",
      }}
      onClick={handleClick}
    >
      {text || "Rent"}
    </button>
  );
}

export default CommonTopButton;
