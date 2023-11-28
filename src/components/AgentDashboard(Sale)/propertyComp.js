import React from 'react';

const propertyComp = ({ image, address, buttonText, buttonImage }) => {
  return (
    <div style={{ display: 'flex' }}>
      <img src={image} alt="Property" style={{ width: '200px', height: '150px' }} />
      <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
        <p>{address}</p>
        <button style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <img src={buttonImage} alt="Button Icon" style={{ marginRight: '5px' }} />
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default propertyComp;
