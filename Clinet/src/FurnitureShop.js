import React from 'react';

const FurnitureShop = ({ coins, onBuyFurniture }) => {
  const furnitureItems = ["Sofa", "Table", "Chair ", "Bed"];

  return (
    <div>
      <h2>Furniture Shop</h2>
      <ul>
        {furnitureItems.map((item, index) => (
          <li key={index}>
            <button onClick={() => onBuyFurniture(item, 8)}>
              Buy {item} for 10 coins
            </button>
          </li>
        ))}
      </ul>
      <p>You have {coins} coins</p>
    </div>
  );
};

export default FurnitureShop;
