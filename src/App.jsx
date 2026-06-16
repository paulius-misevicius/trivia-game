import { useState } from "react"
import { nanoid } from "nanoid"
import he from "he"
import Question from "./Question.jsx"

export default function App() {

  const [questions, setQuestions] = useState([])

  const questionsToRender = questions.map(item => <Question key={item.id} id={item.id} title={item.question} answers={item.answers}/>)

  async function getQuestions() {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=3')
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
    }
    catch (err) {
      console.log(err.message)
    }
  }

  console.log(questions)

  function submitQuiz(formData) {
    console.log(formData.get("q-1"))
    console.log(formData.get("q-2"))
    console.log(formData.get("q-3"))
  }

  return (
    <main>
      <form action={submitQuiz}>
        {questionsToRender}
        <button className="submit-btn">Submit quiz</button>
      </form>
      <button className="get-questions-btn" onClick={getQuestions}>Get questions</button>
    </main>
  )
}