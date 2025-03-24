import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompleteTenSentences.css';

const CompleteTenSentences = ({ onTaskCompleted }) => {
  const [sentences, setSentences] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/sentences');
      setSentences(res.data);
    } catch (error) {
      setMessage('Failed to load sentences.');
    }
  };

  const handleOptionChange = (sentenceId, selectedOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [sentenceId]: selectedOption,
    });

    const updatedSentences = sentences.map(sentence => {
      if (sentence._id === sentenceId) {
        return { ...sentence, correct: selectedOption === sentence.missingWord };
      }
      return sentence;
    });
    setSentences(updatedSentences);

    const allCorrect = updatedSentences.every(sentence => sentence.correct);
    if (allCorrect) {
      onTaskCompleted();
      setMessage('All translations are correct! Task completed.');
    }
  };

  return (
    <div className="complete-ten-sentences">
      <h2>Complete 10 Sentences</h2>
      <ul>
        {sentences.map(sentence => (
          <li key={sentence._id}>
            <span>{sentence.text.replace(sentence.missingWord, '_____')}</span>
            <div>
              {sentence.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleOptionChange(sentence._id, option)}
                  className={selectedOptions[sentence._id] === option ? 'selected' : ''}
                >
                  {option}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {message && <p className="completion-message">{message}</p>}
    </div>
  );
};

export default CompleteTenSentences;
