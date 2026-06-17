import { useState, createContext } from "react"
import { nanoid } from "nanoid"
import { TailSpin } from "react-loader-spinner"
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
    AMOUNT: 5,
    CATEGORY: "",
    DIFFICULTY: "",
    TYPE: ""
  }

  // State values
  const [gameState, setGameState] = useState(GAME_STATE.INTRO)
  const [gameSettings, setGameSettings] = useState(GAME_SETTINGS)
  const [questions, setQuestions] = useState([])
  const [submittedAnswers, setSubmittedAnswers] = useState([])

  // Derived Values
  const fetchUrl = `https://opentdb.com/api.php?
    amount=${gameSettings.AMOUNT}&
    category=${gameSettings.CATEGORY}&
    difficulty=${gameSettings.DIFFICULTY}&
    type=${gameSettings.TYPE}`
  console.log(fetchUrl)
  const questionsToRender = questions.map((item, index) => 
    <Question 
      key={item.id} 
      id={item.id} 
      title={item.question} 
      correctAnswer={item.correct_answer}
      answers={item.answers}
      userAnswers={submittedAnswers}
    />
  )
  const userScore = submittedAnswers.filter((item, index) => 
    item.answer === questions[index].correct_answer && item.key === questions[index].id
  ).length

  // Static values
  const loadSpinner = <TailSpin width="40" color="var(--primary-color)"/>

  // Functions
  async function getQuestions() {
    setGameState(GAME_STATE.LOADING)
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
    console.log("submitting")
    const userAnswers = questionsToRender.map(item => {
      return {
        key: item.key,
        answer: formData.get(item.key)
      }
    })
    setSubmittedAnswers(userAnswers)
    setGameState(GAME_STATE.FINISHED)
  }

  return (
    <GameSettingsContext.Provider value={{gameSettings, setGameSettings, GAME_SETTINGS}}>
      <GameStateContext.Provider value={{gameState, GAME_STATE}}>
        <main>
          {gameState === GAME_STATE.LOADING ? loadSpinner :
            <>
              {gameState === GAME_STATE.INTRO &&
                <>
                  <section className="intro-section">
                    <h1>Trivia Game</h1>
                    <p className="intro-description">Simple trivia quiz game built with React and Vite</p>
                    <button className="start-quiz-btn" onClick={getQuestions}>Start quiz</button>
                  </section>
                  <Settings />
                </>}
              {gameState === GAME_STATE.STARTED || GAME_STATE.FINISHED ?
                <form action={submitQuiz} className="form-game">
                  <div>
                    {questionsToRender}
                  </div>
                  {gameState === GAME_STATE.STARTED && <button className="submit-btn">Check answers</button>}
                </form> : null}
              {gameState === GAME_STATE.FINISHED &&
                <section className="score-section">
                  <p className="score">You scored {userScore}/{questions.length} correct answers</p>
                  <button className="get-questions-btn" onClick={getQuestions}>Play again</button>
                </section>}
            </>
          }
        </main>
      </GameStateContext.Provider>
    </GameSettingsContext.Provider>
  )
}