import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    try {
      const parsedInput = JSON.parse(inputValue);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error('Input must contain a "data" array.');
      }

      fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: parsedInput.data })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setResponseData(data);
          setError('');
        })
        .catch(err => {
          console.error('Error:', err);
          setError('Error in fetching data.');
        });
    } catch (err) {
      setError('Invalid JSON input. Make sure it contains a "data" array.');
    }
  };

  return (
    <>
    <div className="container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder='{"data": [...]}'
        className="input"
      />
      <button onClick={handleClick} className="button">
        Submit
      </button>

    </div>
    
    {error && (
        <p className="error">{error}</p>
      )}

      {responseData && (
        <div className="response-container">
          <h3>Response Data:</h3>
          <p><strong>Status:</strong> {responseData.status}</p>
          <p><strong>User ID:</strong> {responseData.userId}</p>
          <p><strong>College Email ID:</strong> {responseData.collegeEmail}</p>
          <p><strong>College Roll Number:</strong> {responseData.collegeRollNumber}</p>
          <p><strong>Numbers:</strong> {responseData.numbers.join(', ')}</p>
          <p><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</p>
          <p><strong>Highest Lowercase Alphabet:</strong> {responseData.highestLowercase}</p>
        </div>
      )}
    </>
  );
}

export default App;
