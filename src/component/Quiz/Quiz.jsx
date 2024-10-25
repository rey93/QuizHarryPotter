import { useState } from "react";
import './Quiz.scss';
import FistPage from '../FistPage/FirstPage.jsx'
import Questions from "../Questions/Questions.jsx";
import Results from "../Results/Results.jsx";
import Houses from "../Houses/Houses.jsx";

const Quiz = ({ questions }) =>{

    const [responses, setResponses] = useState(Array(questions.length).fill(''));
    const [result, setResult] = useState('');

    const[currentQuestion, setCurrentQuestion] = useState(0);
    const[showResult, setShowResult] = useState(false);
    const[showName, setShowName] = useState(false);
    const[name, setName] = useState('');
    const[score, setScore] = useState('');
    const[errorName, setErrorName] = useState(null);


    const{ question, options} = questions[currentQuestion];

    const teams = {
        A: 'Gryffindor (Frontend)',
        B: 'Slytherin (Backend)',
        C: 'Ravenclaw (Movile)',
        D: 'Hufflepuff (Data)'
    };

    const onAnswerClick = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const goToNextQuestion = () => {

        if (responses[currentQuestion] === '') {
            return;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Aqui manejo el final de quiz
            setShowResult(true);
            calculateWinner();
        }
    };

    const calculateWinner = () => {
        const counts = {};
    
        // Contar las respuestas
        for (let i = 0; i < responses.length; i++) {
            const response = responses[i];
            if (response) {
                // Inicializar el conteo si no existe
                if (!counts[response]) {
                    counts[response] = 0;
                }
                // Incrementar el conteo
                counts[response]++;
            }
        }
    
        // Determinar el equipo ganador
        let winner = null;
        let maxCount = 0;
    
        for (const team in counts) {
            if (counts[team] > maxCount) {
                maxCount = counts[team];
                winner = team;
            }
        }
    
        // Establecer el puntaje basado en el ganador
        const resultMessage = winner ? teams[winner] : "No se seleccionó ninguna respuesta";
        setScore(resultMessage);
    };
    
    
    const onTryAgain = () =>{
        setResponses(Array().fill(''));
        setResult('');
        setCurrentQuestion(0);
        setShowName(false)
        setShowResult(false)
        setScore('');
        setName('')
    }

    function handleNameChange(event) {
        const value = event.target.value;
    
        setName(value);
    
        // Validar que solo contenga letras y espacios
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (regex.test(value)) {
            setErrorName("");
        } else {
            setErrorName("Solo se permiten letras y espacios");
        }
    }
    
    const handleNameSubmit = () => {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    
        if (name.trim() !== "" && regex.test(name)) {
            setShowName(true);
            setErrorName(""); 
        } else {
            setShowName(false);
            if (name.trim() === "") {
                setErrorName("El campo no puede estar vacío");
            } else {
                setErrorName("Solo se permiten letras y espacios");
            }
        }
    }

    return(
        <div className="container">
                
            {!showName ? (
                
                <FistPage 
                    name = {name}
                    error = {errorName}
                    handleNameChange = {handleNameChange}
                    handleNameSubmit = {handleNameSubmit}
                />
                
                ) : (
                        <>
                            {!showResult ? 
                            (
                                <Questions 
                                    currentQuestion={currentQuestion}
                                    questions={questions}
                                    question={question}
                                    options={options}
                                    responses={responses}
                                    onAnswerClick={onAnswerClick}
                                    goToNextQuestion={goToNextQuestion}
                                />
                            ) : (
                                
                                 <Results
                                    name={name}
                                    score={score} 
                                    onTryAgain={onTryAgain}
                                  />
                            )}
                        </>
            )}
                <Houses />
        </div>
    );
}
export default Quiz;