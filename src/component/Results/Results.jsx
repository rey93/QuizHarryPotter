import React from 'react';

const Results = ({name, score, onTryAgain}) => {
    return (
        <div className="result-data">  
            <h1>Final Results<hr></hr></h1>                               
            <h1>Congratulations</h1>
            <h3>
            <span>{name}</span>
            </h3>
            <p>
            Usted pertecererá a la casa 
            </p>
            <span>{score}</span>
            <button onClick={onTryAgain} className="button-last">Try again</button>
        </div>
    );
};

export default Results;