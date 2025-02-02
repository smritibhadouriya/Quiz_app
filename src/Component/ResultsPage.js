import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Css/resultPages.css';
import goldMedal from '../Assests/OIP.jpeg';
import silverMedal from '../Assests/download.jpeg';
import bronzeMedal from '../Assests/Bronze.jpeg';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const determineMedal = (score) => {
    if (score >= 9) {
      return 'gold';
    } else if (score >= 5) {
      return 'silver';
    } else if (score >= 3) {
      return 'bronze';
    } else {
      return 'no';
    }
  };

  const medal = determineMedal(score);
  let message = `Quiz completed! Your score: ${score} out of ${totalQuestions}. You won a ${medal} medal!`;

  if (medal === 'no') {
    message = `Quiz completed! Your score: ${score} out of ${totalQuestions}. Better Luck Next Time.`;
  }

  const getMedalImage = (medal) => {
    switch (medal) {
      case 'gold':
        return goldMedal;
      case 'silver':
        return silverMedal;
      case 'bronze':
        return bronzeMedal;
      default:
        return null;
    }
  };

  return (
    <div className="results-page">
      <h1>Quiz Results</h1>
      <p className="result-message">{message}</p>
      {medal !== 'no' && <img src={getMedalImage(medal)} alt={`${medal} medal`} className="medal-image" />}
      <button onClick={() => navigate('/quiz')}>Try Again</button>
    </div>
  );
};

export default ResultsPage;