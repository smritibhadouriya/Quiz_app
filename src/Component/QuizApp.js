import React, { useState, useEffect, useRef } from 'react';
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
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const manualQuestions = [
      {
        question: 'What is the basic unit of heredity?',
        options: ['Gene', 'Chromosome', 'DNA', 'Protein'],
        correctAnswer: 'Gene',
      },
      {
        question: 'Which scientist is known as the father of genetics?',
        options: ['Charles Darwin', 'Gregor Mendel', 'Watson', 'Crick'],
        correctAnswer: 'Gregor Mendel',
      },
      {
        question: 'Which of the following is NOT a type of evolution?',
        options: ['Convergent', 'Divergent', 'Parallel', 'Cyclic'],
        correctAnswer: 'Cyclic',
      },
        {
          question: "What is the shape of DNA?",
          options: ['Single helix','Double helix','Triple helix','Circular' ],
          correctAnswer: 'Double helix',
        },
        {
          question: "Which organelle contains the genetic material in eukaryotic cells?",
          options: ['Mitochondria','Ribosome','Nucleus','Endoplasmic reticulum' ],
          correctAnswer: 'Nucleus',
        },
        {
          question: "Who is known as the father of genetics?",
          options: ['Charles Darwin','Gregor Mendel','Watson and Crick','Lamarck' ],
          correctAnswer: '"Gregor Mendal',
        },
        {
          question: "What does a Punnett square show?",
          options: ['The structure of DNA','Possible genetic crosses and outcomes','Evolutionary history','Chromosomal abnormalities' ],
          correctAnswer: 'Possible genetic crosses and outcomes'
        },
        {
          question: "What term describes different forms of a gene?",
          options: ['Traits','Alleles','Chromosomes','Mutations' ],
          correctAnswer: 'Alleles'
        },
        {
          question: "What does a Punnett square show?",
          options: ['The structure of DNA','Possible genetic crosses and outcomes','Evolutionary history','Chromosomal abnormalities' ],
          correctAnswer: 'Possible genetic crosses and outcomes'
        },
        {
          question: "What term describes different forms of a gene?",
          options: ['Traits','Alleles','Chromosomes','Mutations' ],
          correctAnswer: 'Alleles'
        },
    
       
       
      
    ];
    setQuestions(manualQuestions);
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

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
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

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (!quizStarted) {
    return (
      <div className="quiz-app">
        <h1>Genetics and Evolution</h1>
        <button onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        <button className="previousButton" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button className="nextButton" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        <button className="leaveButton" onClick={handleLeaveQuiz}>Leave</button>
      </div>
    </div>
  );
};

export default QuizApp;
