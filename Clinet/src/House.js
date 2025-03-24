import React from 'react';

const House = ({ furniture }) => {
  return (
    <div>
      <h2>Your Furniture</h2>
      <ul>
        {furniture.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default House;
