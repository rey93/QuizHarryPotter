import { useState } from "react";
import './Quiz.scss';
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
                
                <div className="quiz-container-name">
                    <p>Para entrar a nuestro escuela de programación para Magos
                       deberás responder una serie de preguntas y así yo el sombrero mágico
                       escojere a que casa pertenecerás. <br></br>!Suerte en tus respuestas¡
                    </p>
                    
                    <h1>Escriba su nombre</h1>
                    <input 
                    className="input-name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Escriba su nombre"
                    />
                    <p className="error">{errorName}</p>
                    <button className="button-name" onClick={handleNameSubmit}>Guardar</button>
                </div>
                
                ) : (
                        <>
                            {!showResult ? 
                            (
                                <div className="quiz-container">
                                    <span className="active-question-no">{currentQuestion + 1}</span>
                                    <span className="total-question">/{questions.length}</span>
                                    <h2>{question}</h2>
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
                                    <div className="footer">
                                        <button onClick={goToNextQuestion}>
                                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                
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
                                            <button onClick={onTryAgain}>Try again</button>
                                       </div>
                            )}
                        </>
            )}
            <div className="house">
                    <div className="gryffindor">
                        <img src={'src/assets/gryffindor.png'} />
                        <h3>Gryffindor (Frontend)</h3>
                    </div>
                    <div className="slytherin">
                        <img src={'src/assets/hufflepuff.png'} />
                        <h3>Slytherin (Backend)</h3>
                    </div>
                    <div className="ravenclaw">
                        <img src={'src/assets/ravenclaw.png'} />
                        <h3>Ravenclaw (Movile)</h3>
                    </div>
                    <div className="hufflepuff">
                        <img src={'src/assets/hufflepuff.png'} />
                        <h3>Hufflepuff (Data)</h3>
                    </div>
            </div>
        </div>
    );
}
export default Quiz;