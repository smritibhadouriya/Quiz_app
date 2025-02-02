import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/startPage.css';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz App</h1>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartPage;