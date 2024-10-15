import Quiz from './component/Quiz/Quiz.jsx';
import { jsQuizz } from './questions.js';
import './App.scss';
function App() {

  return(
    <div className='main'>
      <div className='profiles'>
      <a href="https://github.com/rey93" target="_blank">
         <img
          className='profiles-img' 
          src={'src/assets/github.png'}
          alt="github pofile"
          />
        </a>
        <a href="https://www.linkedin.com/in/reinaldo-pe%C3%B1a-rios-5969441b1/" target="_blank">
          <img
          className='profiles-img' 
          src={'src/assets/linkedin.png'}
          alt="linkedin pofile"/>
          </a>
      </div>
      <Quiz questions={jsQuizz.data}/>
    </div>
  );  
}

export default App
