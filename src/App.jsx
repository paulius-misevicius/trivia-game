import { useState, useRef, createContext } from "react"
import { nanoid } from "nanoid"
import { TailSpin } from "react-loader-spinner"
import clsx from "clsx"
import he from "he"
import Question from "./Question.jsx"
import Settings from "./Settings.jsx"

export const GameStateContext = createContext(null)
export const GameSettingsContext = createContext(null)

export default function App() {

  // Global context values
  const GAME_STATE = {
    INTRO: "intro",
    LOADING: "loading",
    STARTED: "started",
    FINISHED: "finished",
    ERROR: "error"
  }
  const GAME_SETTINGS = {
    amount: "5",
    category: "",
    difficulty: "",
    type: ""
  }

  // DB values
  const prevScores = localStorage.getItem("recentScores") === null ? [] : JSON.parse(localStorage.getItem("recentScores"))
  const prevSettings = localStorage.getItem("quizSettings") === null ? GAME_SETTINGS : JSON.parse(localStorage.getItem("quizSettings"))

  // State values
  const [gameState, setGameState] = useState(GAME_STATE.INTRO)
  const [gameSettings, setGameSettings] = useState(prevSettings)
  const [questions, setQuestions] = useState([])
  const [submittedAnswers, setSubmittedAnswers] = useState([])
  const prevScoresRef = useRef(prevScores)
  console.log(gameSettings)

  // Derived Values
  const fetchUrl = `https://opentdb.com/api.php?
  amount=${gameSettings.amount}&
  category=${gameSettings.category}&
  difficulty=${gameSettings.difficulty}&
  type=${gameSettings.type}`
  
  const questionsToRender = questions.map((item, index) => 
    <Question 
  key={item.id} 
  id={item.id} 
  index={index}
  questionsLength={questions.length}
  title={item.question} 
  correctAnswer={item.correct_answer}
  answers={item.answers}
  userAnswers={submittedAnswers}
  />
  )

  const latestScores = prevScoresRef.current.map((item, index) => 
    <span key={nanoid()} className={clsx("user-score", {"latest-score" : index === 0})}>{item}</span>
  )

  // Static values
  const loadSpinner = <TailSpin width="40" color="var(--primary-color)"/>

  // Functions
  async function getQuestions() {
    setGameState(GAME_STATE.LOADING)
    setSubmittedAnswers([])

    try {
      const response = await fetch(fetchUrl)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const data = await response.json()
      const updatedQuestions = data.results.map(item => {
        const randomIndex = Math.floor(Math.random() * (data.results.length + 1))
        const shuffledAnswers = [...item.incorrect_answers.slice(0, randomIndex), item.correct_answer, ...item.incorrect_answers.slice(randomIndex)]
        return {
          ...item,
          id: nanoid(),
          question: he.decode(item.question),
          answers: shuffledAnswers.map(item => he.decode(item))
        }
      })
      setQuestions(updatedQuestions)
      setGameState(GAME_STATE.STARTED)
    }

    catch (err) {
      console.log(err.message)
      setGameState(GAME_STATE.ERROR)
    }
  }

  function submitQuiz(formData) {
    const userAnswers = questionsToRender.map(item => {
      return {
        key: item.key,
        answer: formData.get(item.key)
      }
    })

    const correctAnswerAmount = userAnswers.filter((item, index) => 
      item.answer === questions[index].correct_answer && item.key === questions[index].id
    ).length
    const userScore = `${correctAnswerAmount}/${questions.length}`
    prevScoresRef.current = [userScore, ...prevScoresRef.current]
    localStorage.setItem("recentScores", JSON.stringify(prevScoresRef.current))

    setSubmittedAnswers(userAnswers)
    setGameState(GAME_STATE.FINISHED)
  }

  // App screens
  const introScreen = 
    <>
      <section className="intro-section">
        <h1>Trivia Game</h1>
        <p className="intro-description">Test your knowledge across many fields and industries.</p>
        <button className="start-quiz-btn" onClick={getQuestions}><span className="play-icon">▶</span>Start quiz</button>
      </section>
      <section className="recent-scores-section">
        <div className="svg-icon-box">
          <svg className="svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 7L14.1502 14.939C14.0125 15.0784 13.8489 15.189 13.6689 15.2644C13.4889 15.3398 13.296 15.3787 13.1011 15.3787C12.9063 15.3787 12.7133 15.3398 12.5333 15.2644C12.3533 15.189 12.1898 15.0784 12.052 14.939L8.95919 11.811C8.82146 11.6716 8.65791 11.561 8.47791 11.4856C8.2979 11.4102 8.10496 11.3713 7.91011 11.3713C7.71526 11.3713 7.52232 11.4102 7.34232 11.4856C7.16231 11.561 6.99877 11.6716 6.86103 11.811L2 16.1147" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 1.5V22.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12V7H17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div>
          <p className="user-scores-label">Recent scores</p>
          <div className="user-scores">{prevScoresRef.current.length > 0 ? latestScores : "No recent scores yet. Start a quiz to see your progress!"}</div>
        </div>
      </section>
      <Settings />
    </>

  const quizScreen =
  <>
    <form id="quiz-form" action={submitQuiz} className="form-game">
        {questionsToRender}
    </form>
    <section className="score-section">
      {gameState === GAME_STATE.STARTED && 
        <button type="submit" form="quiz-form">Check answers</button>
      }
      {gameState === GAME_STATE.FINISHED &&
        <>
          <div className="align-sbs">
            <button onClick={getQuestions}>Play again</button>
            <p className="score">You scored {prevScoresRef.current[0]} correct answers</p>
          </div>
          <button className="back-btn" onClick={() => setGameState(GAME_STATE.INTRO)}>Exit</button>
        </>
      }
    </section>
  </>

  return (
    <GameSettingsContext.Provider value={{gameSettings, setGameSettings}}>
      <GameStateContext.Provider value={{gameState, GAME_STATE}}>
        <main className={gameState !== GAME_STATE.INTRO ? "main-quiz" : "main-intro"}>
          {gameState === GAME_STATE.LOADING ? loadSpinner :
            <>
              {gameState === GAME_STATE.INTRO && introScreen}
              {gameState === GAME_STATE.STARTED || gameState === GAME_STATE.FINISHED ? quizScreen : null}
            </>
          }
        </main>
      </GameStateContext.Provider>
    </GameSettingsContext.Provider>
  )
}