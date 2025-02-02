import React from 'react';

const Question = ({ question, onAnswer }) => {
  const { description, options } = question;

  return (
    <div className="question">
      <h2 dangerouslySetInnerHTML={{ __html: description }} />
      <div className="answers">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.is_correct)}
            dangerouslySetInnerHTML={{ __html: option.description }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;