import React, { useState } from 'react';
import axios from 'axios';

const AddSentence = () => {
  const [text, setText] = useState('');
  const [missingWord, setMissingWord] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options.length !== 3) {
      setMessage('Must provide exactly three options.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/sentences', { text, missingWord, options });
      setMessage('Sentence added successfully!');
      setText('');
      setMissingWord('');
      setOptions(['', '', '']);
    } catch (error) {
      setMessage('Error adding sentence.');
    }
  };

  return (
    <div>
      <h2>Add a Sentence</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sentence Text:</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
        </div>
        <div>
          <label>Missing Word:</label>
          <input type="text" value={missingWord} onChange={(e) => setMissingWord(e.target.value)} required />
        </div>
        <div>
          <label>Option 1:</label>
          <input type="text" value={options[0]} onChange={(e) => handleOptionChange(0, e.target.value)} required />
        </div>
        <div>
          <label>Option 2:</label>
          <input type="text" value={options[1]} onChange={(e) => handleOptionChange(1, e.target.value)} required />
        </div>
        <div>
          <label>Option 3:</label>
          <input type="text" value={options[2]} onChange={(e) => handleOptionChange(2, e.target.value)} required />
        </div>
        <button type="submit">Add Sentence</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSentence;
