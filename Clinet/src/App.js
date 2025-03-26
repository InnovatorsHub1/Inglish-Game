import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './styles.css';  // ייבוא קובץ ה-CSS
import axios from 'axios';  // ייבוא axios
import Login from './Login';
import Register from './Register';
import TaskList from './TaskList';
import CoinCounter from './CoinCounter';
import House from './House';
import FurnitureShop from './FurnitureShop';
import TranslateFiveWords from './TranslateFiveWords';
import AdminPanel from './AdminPanel';  // ייבוא של AdminPanel
import CompleteTenSentences from './CompleteTenSentences';
import AddSentence from './AddSentence'; // ייבוא של AddSentence
import Home from './Home';


const App = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false); // ניהול מצב התחברות מנהלים
  const [welcomeMessage, setWelcomeMessage] = useState(''); // הודעת ברכה
  const navigate = useNavigate();

  useEffect(() => {
    // שליפת נתוני המשתמש כאשר האפליקציה נטענת מחדש
    const fetchUser = async () => {
      try {
        const userId = "67c41bb1eab05ea417a36af4"; // ID של המשתמש "eli"
        const res = await axios.get(`http://localhost:5001/api/user/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setWelcomeMessage(`ברוכים הבאים ${userData.username}  יש לך ${userData.coins} מטבעות .`);
  };

  const handleRegister = () => {
    setUser(null);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(false);
    navigate('/login');
  };

  const handleTaskCompleted = async () => {
    const updatedUser = { ...user, coins: user.coins + 5 };
    try {
      await axios.put(`http://localhost:5001/api/user/${user._id}`, updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleBuyFurniture = async (furniture, price) => {
    const updatedUser = {
      ...user,
      coins: user.coins - price,
      furniture: user.furniture.concat(`${furniture} -`), // הוספת רהיט חדש עם רווח וסימן -
    };
    try {
      await axios.put(`http://localhost:5001/api/user/${user._id}`, updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCategorySelect = (category) => {
    navigate(`/task/1?category=${category}`);
  };

  return (
    <div className="container">
      {!user && !admin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : user ? (
        <>
          {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
          <CoinCounter coins={user.coins} />
          <Link to="/admin-panel">
            <button>Admin Panel</button>
          </Link>
          <Link to="/add-sentence">

            <button>Add Sentence</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
          <Routes>
            <Route path="/" element={<TaskList onCategorySelect={handleCategorySelect} onTaskCompleted={handleTaskCompleted} user={user} />} />
            <Route path="/task/1" element={<TranslateFiveWords onTaskCompleted={handleTaskCompleted} user={user} setUser={setUser} />} />
            <Route path="/task/2" element={<CompleteTenSentences onTaskCompleted={handleTaskCompleted} />} />
            <Route path="/add-sentence" element={<AddSentence />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
          <House furniture={user.furniture} />
          <FurnitureShop coins={user.coins} onBuyFurniture={handleBuyFurniture} />
        </>
      ) : (
        <Routes>
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
