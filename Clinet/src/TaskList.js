import React from 'react';
import './TaskList.css'; // ייבוא קובץ ה-CSS

const TaskList = ({ onCategorySelect }) => {
  return (
    <div className='container'>
      <div className='row'>

      <h2>Choose a Category</h2>
        <div className='category'>
          <button onClick={() => onCategorySelect('fruits')}><span><h1>Fruits</h1> פירות</span>
          <img src="https://publicdomainvectors.org/tn_img/Red%20apple.webp"/></button>
          
        </div>

        <div className='category'>
        <button onClick={() => onCategorySelect('vegetables')}><span><h1>Vegetables</h1> ירקות</span>
        <img src="https://publicdomainvectors.org/tn_img/1453547668.webp"/></button>
        </div>

        <div className='category'>
        <button onClick={() => onCategorySelect('family')}><span><h1>Family</h1> משפחה</span>
        <img src="https://publicdomainvectors.org/tn_img/publicdomainq-family.webp"/></button>
        </div>

        <div className='category'>
        <button onClick={() => onCategorySelect('Animals')}><span><h1>Animals</h1> חיות</span>
        <img src="https://publicdomainvectors.org/tn_img/Tiere-coloured.webp"/></button>
        </div>

        <div className='category'>
          <button onClick={() => onCategorySelect('Professions')}><span><h1>Professions</h1> מקצועות</span>
          <img src="https://publicdomainvectors.org/tn_img/Young-Male-Doctor.webp"/></button>
        </div>
      
      
      
      
      

      </div>
      
    </div>
  );
};

export default TaskList;
