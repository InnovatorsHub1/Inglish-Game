import React from 'react';
import ReactDOM from 'react-dom/client'; // ייבוא createRoot מ-react-dom/client
import AppWrapper from './AppWrapper'; // ייבוא של AppWrapper
import './index.css';

// יצירת root חדשה באמצעות createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
