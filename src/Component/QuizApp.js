import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ProgressBar from './ProgressBar';
import ErrorBoundary from './ErrorBound';
import '../Css/quizApp.css';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // seconds for each question
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false); // State to track if quiz has started
  const timerRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/Uw5CrX'); // Use the full URL
        console.log('Fetched questions:', response.data); // Log fetched questions
        setQuestions(response.data.questions); // Adjusted to access the correct array
      } catch (err) {
        setError(err.message);
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quizStarted && questions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleNextQuestion();
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [quizStarted, questions, currentQuestionIndex]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else {
      clearInterval(timerRef.current);
      displayResult();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(10);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleLeaveQuiz = () => {
    clearInterval(timerRef.current);
    navigate('/');
  };

  const displayResult = () => {
    navigate('/results', { state: { score, totalQuestions: questions.length } });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (!quizStarted) {
    return (
      <div className="quiz-app">
        <h1>Genetics and Evolution</h1>
        <button  onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length * 100;
  console.log('Current question index:', currentQuestionIndex); // Log current question index
  console.log('Current question:', currentQuestion); // Log current question
  console.log('Progress:', progress); // Log progress

  return (
    <div className="quiz-question">
      <h1>Genetics and Evolution</h1>
      <ProgressBar progress={progress} />
      <div>Time left: {timeLeft}s</div>
      <ErrorBoundary>
        {currentQuestion ? (
          <Question question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <div>Question not found</div>
        )}
      </ErrorBoundary>
      <div className="quiz-navigation">
        <button  className="previousButton" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button  className="nextButton" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        <button  className="leaveButton" onClick={handleLeaveQuiz}>Leave</button>
      </div>
    </div>
  );
};

export default QuizApp;