import React from 'react';

const FirstPage = ({name, errorName, handleNameChange, handleNameSubmit}) =>{
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleNameSubmit(); // Llama a la función cuando se presiona Enter
        }
    };

    return(
    
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
                    onKeyDown={handleKeyDown}
                    onChange={handleNameChange}
                    placeholder="Escriba su nombre" />
                <p className={errorName}>{errorName}</p>
                <button className="button-name" onClick={handleNameSubmit}>Guardar</button>
            </div>
        );
}
export default FirstPage;