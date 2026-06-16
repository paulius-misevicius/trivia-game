import { useState, createContext } from "react"
import { nanoid } from "nanoid"
import { TailSpin } from "react-loader-spinner"
import he from "he"
import Question from "./Question.jsx"

export const GameStateContext = createContext(null)

export default function App() {

//
  const GAME_STATE = {
    INTRO: "intro",
    LOADING: "loading",
    STARTED: "started",
    FINISHED: "finished",
    ERROR: "error"
  }

  const [gameState, setGameState] = useState(GAME_STATE.INTRO)
  const [questions, setQuestions] = useState([])
  const [submittedAnswers, setSubmittedAnswers] = useState([])

  console.log(gameState)

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
  const loadSpinner = <TailSpin width="40" color="var(--primary-color)"/>
//
  console.log(userScore)
  async function getQuestions() {
    setGameState(GAME_STATE.LOADING)
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=7')
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
    <GameStateContext.Provider value={{gameState, GAME_STATE}}>
      <main>
        {gameState === GAME_STATE.LOADING ? loadSpinner :
          <form action={submitQuiz}>
            <div>
              {questionsToRender}
            </div>
            {gameState === GAME_STATE.STARTED && <button className="submit-btn">Check answers</button>}
          </form>
        }
        <section className="score-section">
          {gameState === GAME_STATE.FINISHED && <p className="score">You scored {userScore}/{questions.length} correct answers</p>}
          {gameState !== GAME_STATE.STARTED && <button className="get-questions-btn" onClick={getQuestions}>Start quiz</button>}
        </section>
      </main>
    </GameStateContext.Provider>
  )
}