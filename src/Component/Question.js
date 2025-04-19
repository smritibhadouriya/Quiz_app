import React from 'react';

const Question = ({ question, onAnswer }) => {
  const { question: description, options } = question;

  return (
    <div className="question">
      <h2>{description}</h2>
      <div className="answers">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
