import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [english, setEnglish] = useState('');
  const [correctTranslation, setCorrectTranslation] = useState('');
  const [wrongTranslation1, setWrongTranslation1] = useState('');
  const [wrongTranslation2, setWrongTranslation2] = useState('');
  const [category, setCategory] = useState('');
  const [audioFile, setAudioFile] = useState(null); // קובץ האודיו
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('english', english);
    formData.append('correctTranslation', correctTranslation);
    formData.append('wrongTranslation1', wrongTranslation1);
    formData.append('wrongTranslation2', wrongTranslation2);
    formData.append('category', category);
    if (audioFile) {
      formData.append('audioFile', audioFile);
    }

    try {
      const res = await axios.post('http://localhost:5001/api/words', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Word added successfully!');
      setEnglish('');
      setCorrectTranslation('');
      setWrongTranslation1('');
      setWrongTranslation2('');
      setCategory('');
      setAudioFile(null);
    } catch (error) {
      setMessage('Error adding word. Please try again.');
      console.error('Error adding word:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>English Word:</label>
          <input type="text" value={english} onChange={(e) => setEnglish(e.target.value)} required />
        </div>
        <div>
          <label>Correct Translation:</label>
          <input type="text" value={correctTranslation} onChange={(e) => setCorrectTranslation(e.target.value)} required />
        </div>
        <div>
          <label>Wrong Translation 1:</label>
          <input type="text" value={wrongTranslation1} onChange={(e) => setWrongTranslation1(e.target.value)} required />
        </div>
        <div>
          <label>Wrong Translation 2:</label>
          <input type="text" value={wrongTranslation2} onChange={(e) => setWrongTranslation2(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="fruits">Fruits</option>
            <option value="family">Family</option>
            <option value="animals">Animals</option>
            <option value="professions">Professions</option>
          </select>
        </div>
        <div>
          <label>Audio File:</label>
          <input type="file" onChange={(e) => setAudioFile(e.target.files[0])} />
        </div>
        <button type="submit">Add Word</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminPanel;
