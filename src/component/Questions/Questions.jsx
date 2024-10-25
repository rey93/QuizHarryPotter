import React from 'react';

const Questions = ({currentQuestion, questions, question, options, responses, onAnswerClick, goToNextQuestion}) => {
    return (
        <div className="quiz-container">
        <div className="question-info">
           <span className="active-question-no">{currentQuestion + 1}</span>
           <span className="total-question">/{questions.length}</span>
       </div>
       <h2 className="h2-question">{question}</h2>
       <div className="label-container">
           {
               options.map((answer, index)=>(
                   <label key={index}>
                       <input
                           type="radio"
                           name={`question-${currentQuestion}`}
                           value={answer.charAt(0)} // A, B, C o D
                           checked={responses[currentQuestion] === answer.charAt(0)}
                           onChange={() => onAnswerClick(currentQuestion, answer.charAt(0))}
                       />
                       <p>{answer}</p>
                   </label>
                   
               ))
           }
       </div>
       <div className="footer">
           <button onClick={goToNextQuestion} className="button-quiz">
               {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
           </button>
       </div>
   </div>
    );
};

export default Questions;