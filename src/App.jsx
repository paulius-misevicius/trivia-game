import { useState, useRef, useEffect, createContext } from "react"
import { nanoid } from "nanoid"
import { TailSpin } from "react-loader-spinner"
import clsx from "clsx"
import he from "he"
import Question from "./components/Question.jsx"
import Settings from "./components/Settings.jsx"

export const GameStateContext = createContext(null)
export const GameSettingsContext = createContext(null)

export default function App() {

// Global context values
  const GAME_STATE = {
    INTRO: "intro",
    LOADING: "loading",
    STARTED: "started",
    INCOMPLETE: "incomplete",
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
  const prevScores = JSON.parse(localStorage.getItem("recentScores")) || []
  const prevSettings = JSON.parse(localStorage.getItem("quizSettings")) || GAME_SETTINGS

// State values
  const [gameState, setGameState] = useState(GAME_STATE.INTRO)
  const [errorMessage, setErrorMessage] = useState()
  const [gameSettings, setGameSettings] = useState(prevSettings)
  const [questions, setQuestions] = useState([])
  const [submittedAnswers, setSubmittedAnswers] = useState([])
  const prevScoresRef = useRef(prevScores)

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme])

// Derived Values
  const isGameRunning = 
    gameState === GAME_STATE.STARTED || 
    gameState === GAME_STATE.INCOMPLETE || 
    gameState === GAME_STATE.FINISHED

  const fetchUrl = `https://opentdb.com/api.php?
  amount=${gameSettings.amount}&
  category=${gameSettings.category}&
  difficulty=${gameSettings.difficulty}&
  type=${gameSettings.type}`
  
  const questionsToRender = questions.map((item, index) => 
    <Question
      questionItem={item} 
      key={item.id} 
      index={index}
      questionsLength={questions.length}
      userAnswers={submittedAnswers}
    />
  )

  const latestScores = prevScoresRef.current.map((item, index) => 
    <span key={nanoid()} className={clsx("user-score", {"latest-score" : index === 0})}>{item}</span>
  )

  // Static values
  const loadSpinner = <TailSpin width="40" color="var(--primary-color)"/>
  const playIcon = <svg className="play-icon" aria-hidden="true" viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" fill="currentColor"> <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
  const scoresIcon = <svg className="svg-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 7L14.1502 14.939C14.0125 15.0784 13.8489 15.189 13.6689 15.2644C13.4889 15.3398 13.296 15.3787 13.1011 15.3787C12.9063 15.3787 12.7133 15.3398 12.5333 15.2644C12.3533 15.189 12.1898 15.0784 12.052 14.939L8.95919 11.811C8.82146 11.6716 8.65791 11.561 8.47791 11.4856C8.2979 11.4102 8.10496 11.3713 7.91011 11.3713C7.71526 11.3713 7.52232 11.4102 7.34232 11.4856C7.16231 11.561 6.99877 11.6716 6.86103 11.811L2 16.1147" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 1.5V22.5" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12V7H17" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  const sunIcon = <svg className="sun-icon" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.125 12C15.125 13.4497 13.9497 14.625 12.5 14.625C11.0503 14.625 9.875 13.4497 9.875 12C9.875 10.5503 11.0503 9.375 12.5 9.375C13.9497 9.375 15.125 10.5503 15.125 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19.5 12.75C19.9142 12.75 20.25 12.4142 20.25 12C20.25 11.5858 19.9142 11.25 19.5 11.25V12.75ZM17.75 11.25C17.3358 11.25 17 11.5858 17 12C17 12.4142 17.3358 12.75 17.75 12.75V11.25ZM7.25 12.75C7.66421 12.75 8 12.4142 8 12C8 11.5858 7.66421 11.25 7.25 11.25V12.75ZM5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75V11.25ZM13.25 5C13.25 4.58579 12.9142 4.25 12.5 4.25C12.0858 4.25 11.75 4.58579 11.75 5H13.25ZM11.75 6.75C11.75 7.16421 12.0858 7.5 12.5 7.5C12.9142 7.5 13.25 7.16421 13.25 6.75H11.75ZM13.25 17.25C13.25 16.8358 12.9142 16.5 12.5 16.5C12.0858 16.5 11.75 16.8358 11.75 17.25H13.25ZM11.75 19C11.75 19.4142 12.0858 19.75 12.5 19.75C12.9142 19.75 13.25 19.4142 13.25 19H11.75ZM17.9803 7.58033C18.2732 7.28744 18.2732 6.81256 17.9803 6.51967C17.6874 6.22678 17.2126 6.22678 16.9197 6.51967L17.9803 7.58033ZM15.6817 7.75767C15.3888 8.05056 15.3888 8.52544 15.6817 8.81833C15.9746 9.11122 16.4494 9.11122 16.7423 8.81833L15.6817 7.75767ZM9.31833 16.2423C9.61122 15.9494 9.61122 15.4746 9.31833 15.1817C9.02544 14.8888 8.55056 14.8888 8.25767 15.1817L9.31833 16.2423ZM7.01967 16.4197C6.72678 16.7126 6.72678 17.1874 7.01967 17.4803C7.31256 17.7732 7.78744 17.7732 8.08033 17.4803L7.01967 16.4197ZM8.08033 6.51967C7.78744 6.22678 7.31256 6.22678 7.01967 6.51967C6.72678 6.81256 6.72678 7.28744 7.01967 7.58033L8.08033 6.51967ZM8.25767 8.81833C8.55056 9.11122 9.02544 9.11122 9.31833 8.81833C9.61122 8.52544 9.61122 8.05056 9.31833 7.75767L8.25767 8.81833ZM16.7433 15.1827C16.4504 14.8898 15.9756 14.8898 15.6827 15.1827C15.3898 15.4756 15.3898 15.9504 15.6827 16.2433L16.7433 15.1827ZM16.9197 17.4803C17.2126 17.7732 17.6874 17.7732 17.9803 17.4803C18.2732 17.1874 18.2732 16.7126 17.9803 16.4197L16.9197 17.4803ZM19.5 11.25H17.75V12.75H19.5V11.25ZM7.25 11.25H5.5V12.75H7.25V11.25ZM11.75 5V6.75H13.25V5H11.75ZM11.75 17.25V19H13.25V17.25H11.75ZM16.9197 6.51967L15.6817 7.75767L16.7423 8.81833L17.9803 7.58033L16.9197 6.51967ZM8.25767 15.1817L7.01967 16.4197L8.08033 17.4803L9.31833 16.2423L8.25767 15.1817ZM7.01967 7.58033L8.25767 8.81833L9.31833 7.75767L8.08033 6.51967L7.01967 7.58033ZM15.6827 16.2433L16.9197 17.4803L17.9803 16.4197L16.7433 15.1827L15.6827 16.2433Z" fill="currentColor"></path> </g></svg>
  const moonIcon = <svg className="moon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  const toggleButton = <button className="theme-toggle" onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}>{theme === "light" ? moonIcon : sunIcon}</button>

  // Functions
  async function getQuestions() {
    setGameState(GAME_STATE.LOADING)
    setSubmittedAnswers([])
    
    try {
      const response = await fetch(fetchUrl)
      if (!response.ok) {
        throw new Error(
          response.status === 429 ? "Please wait a few seconds and try again." : `API error: ${response.status}`
        )
      }
      const data = await response.json()
      if (data.results.length === 0) {
        throw new Error('No questions! Try changing the quiz settings.')
      }
      const updatedQuestions = data.results.map(item => {
        const randomIndex = Math.floor(Math.random() * (data.results.length + 1))
        const shuffledAnswers = [...item.incorrect_answers.slice(0, randomIndex), item.correct_answer, ...item.incorrect_answers.slice(randomIndex)]
        return {
          ...item,
          id: nanoid(),
          question: he.decode(item.question),
          correct_answer: he.decode(item.correct_answer),
          answers: shuffledAnswers.map(item => ({
            answer: he.decode(item), 
            pressed: false,
            answerId: nanoid() 
          }))
        }
      })
      setQuestions(updatedQuestions)
      setGameState(GAME_STATE.STARTED)
    }
    catch (err) {
      setErrorMessage(err.message === "Failed to fetch" ? "Please check your internet connection." : err.message)
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
    
    if (userAnswers.some(item => item.answer === null)) {
      setErrorMessage("Please answer all questions.")
      setGameState(GAME_STATE.INCOMPLETE)
    }

    else {
      const correctAnswerAmount = userAnswers.filter((item, index) => 
        item.answer === questions[index].correct_answer && item.key === questions[index].id
      ).length
      const userScore = `${correctAnswerAmount}/${questions.length}`
      prevScoresRef.current = [userScore, ...prevScoresRef.current]
      localStorage.setItem("recentScores", JSON.stringify(prevScoresRef.current))
  
      setGameState(GAME_STATE.FINISHED)
    }
    setSubmittedAnswers(userAnswers)
  }

// App screens
  const introScreen = 
    <>
      <section className="intro-section">
        <h1>Trivia Game</h1>
        <p className="intro-description">Test your knowledge across many fields and industries.</p>
        <button aria-label="Start quiz" className="start-quiz-btn" onClick={getQuestions}>{playIcon}Start quiz</button>
        {gameState === GAME_STATE.ERROR && <p className="error-message margin-t">{errorMessage}</p>}
      </section>
      <section className="recent-scores-section">
        <div className="svg-icon-box">
          {scoresIcon}
        </div>
        <div className="recent-scores-label-scores">
          <p className="user-scores-label">Recent scores</p>
          <div className="user-scores">{prevScoresRef.current.length > 0 ? latestScores : "Start a quiz to see your progress!"}</div>
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
        <div className="align-sbs">
          {gameState === GAME_STATE.STARTED || gameState === GAME_STATE.INCOMPLETE
          ? 
            <>
              <button aria-label="Check Answers" type="submit" form="quiz-form">Check answers</button>
              {gameState === GAME_STATE.INCOMPLETE && <p className="error-message">{errorMessage}</p>}
            </>
          :
            <>
              <button aria-label="Play again" onClick={getQuestions}>Play again</button>
              <p className="score">{`You scored ${prevScoresRef.current[0]} correct answers`}</p>
            </>
          }
        </div>
        {gameState === GAME_STATE.FINISHED &&
          <button aria-label="Exit quiz" className="back-btn" onClick={() => setGameState(GAME_STATE.INTRO)}>Exit</button>
        }
      </section>
    </>

  return (
    <GameSettingsContext.Provider value={{gameSettings, setGameSettings}}>
      <GameStateContext.Provider value={{gameState, GAME_STATE}}>
        {gameState === GAME_STATE.INTRO && toggleButton}
        <main className={gameState === GAME_STATE.INTRO || gameState === GAME_STATE.ERROR ? "main-intro" : "main-quiz"}>
          {gameState === GAME_STATE.LOADING ? loadSpinner :
            <>
              {!isGameRunning && introScreen}
              {isGameRunning && quizScreen}
            </>
          }
        </main>
      </GameStateContext.Provider>
    </GameSettingsContext.Provider>
  )
}