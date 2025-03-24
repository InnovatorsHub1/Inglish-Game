import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './TranslateFiveWords.css'; // ייבוא קובץ ה-CSS


const TranslateFiveWords = ({ onTaskCompleted, user }) => {
  const [category, setCategory] = useState('');
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredWords, setAnsweredWords] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
      fetchWords(categoryParam);
    }
  }, [location]);


  const fetchWords = async (category) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/words/${category}`);
      setWords(res.data.slice(0, 5)); // בחירת חמש מילים רנדומליות
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleTranslationClick = (word, translation) => {
    if (answeredWords.includes(word.english)) return;

    if (word.correctTranslation === translation) {
      setCorrectAnswers(correctAnswers + 1);
      setAnsweredWords([...answeredWords, word.english]);
      setMessage('Correct!');

      if (correctAnswers + 1 === 5) {
        setMessage('Congratulations! You answered all questions correctly!');
        setTimeout(() => {
          onTaskCompleted();
          navigate(-1);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentWordIndex(currentWordIndex + 1);
          setMessage('');
        }, 1000);
      }
    } else {
      setMessage('Wrong translation, try again!');
      setTimeout(() => setMessage(''), 1000);
    }
  };

  // השמעת קובץ האודיו כאשר המילה נטענת
  useEffect(() => {
    if (words[currentWordIndex] && words[currentWordIndex].audioFile) {
      const audio = new Audio(`/uploads/${words[currentWordIndex].audioFile}`);
      audio.play();
    }
  }, [currentWordIndex, words]);

  return (
    <div className="translate-container">
      <h2 className="translate-header">Translate Five Words</h2>
      {message && <p className="message">{message}</p>}
      {category && words[currentWordIndex] && (
        <div>
          <h3 className="translate-category">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <p>{currentWordIndex + 1}/5</p> {/* הצגת מספר השאלות שנותרו */}
          <ul className="word-list">
            <li className="word-item">
              <span className="word-english">{words[currentWordIndex].english}</span>
              {words[currentWordIndex].audioFile && (
                <audio controls>
                  <source src={`/uploads/${words[currentWordIndex].audioFile}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <div className="translation-options">
                <button
                  style={{ backgroundColor: words[currentWordIndex].correctTranslation === words[currentWordIndex].correctTranslation && answeredWords.includes(words[currentWordIndex].english) ? 'green' : '' }}
                  onClick={() => handleTranslationClick(words[currentWordIndex], words[currentWordIndex].correctTranslation)}
                >
                  {words[currentWordIndex].correctTranslation}
                </button>
                <button
                  style={{ backgroundColor: words[currentWordIndex].correctTranslation === words[currentWordIndex].wrongTranslation1 && answeredWords.includes(words[currentWordIndex].english) ? 'red' : '' }}
                  onClick={() => handleTranslationClick(words[currentWordIndex], words[currentWordIndex].wrongTranslation1)}
                >
                  {words[currentWordIndex].wrongTranslation1}
                </button>
               
                <button
                  style={{ backgroundColor: words[currentWordIndex].correctTranslation === words[currentWordIndex].wrongTranslation2 && answeredWords.includes(words[currentWordIndex].english) ? 'red' : '' }}
                  onClick={() => handleTranslationClick(words[currentWordIndex], words[currentWordIndex].wrongTranslation2)}
                >
                  {words[currentWordIndex].wrongTranslation2}
                </button>
              

              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TranslateFiveWords;
