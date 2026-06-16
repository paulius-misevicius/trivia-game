import { useState } from "react"

export default function App() {

  const [questions, setQuestions] = useState([])

  async function getQuestions() {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=3')
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const data = await response.json()
      setQuestions(data.results)
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
        <section className="question-component">
          <h2 className="question-name">How would one say goodbye in Spanish?</h2>
          <div className="question-answer-field">
            <input type="radio" id="q-1-a-1" name="q-1" value="Adiós"></input>
            <label htmlFor="q-1-a-1">Adiós</label>

            <input type="radio" id="q-1-a-2" name="q-1" value="Hola"></input>
            <label htmlFor="q-1-a-2">Hola</label>

            <input type="radio" id="q-1-a-3" name="q-1" value="Au Revoir"></input>
            <label htmlFor="q-1-a-3">Au Revoir</label>

            <input type="radio" id="q-1-a-4" name="q-1" value="Salir"></input>
            <label htmlFor="q-1-a-4">Salir</label>
          </div>
        </section>
        <section className="question-component">
          <h2 className="question-name">Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h2>
          <div className="question-answer-field">
            <input type="radio" id="q-2-a-1" name="q-2" value="Cabbage Patch Kids"></input>
            <label htmlFor="q-2-a-1">Cabbage Patch Kids</label>

            <input type="radio" id="q-2-a-2" name="q-2" value="Transformers"></input>
            <label htmlFor="q-2-a-2">Transformers</label>

            <input type="radio" id="q-2-a-3" name="q-2" value="Care Bears"></input>
            <label htmlFor="q-2-a-3">Care Bears</label>

            <input type="radio" id="q-2-a-4" name="q-2" value="Rubik’s Cube"></input>
            <label htmlFor="q-2-a-4">Rubik’s Cube</label>
          </div>
        </section>
        <section className="question-component">
          <h2 className="question-name">What is the hottest planet in our Solar System?</h2>
          <div className="question-answer-field">
            <input type="radio" id="q-3-a-1" name="q-3" value="Mercury"></input>
            <label htmlFor="q-3-a-1">Mercury</label>

            <input type="radio" id="q-3-a-2" name="q-3" value="Venus"></input>
            <label htmlFor="q-3-a-2">Venus</label>

            <input type="radio" id="q-3-a-3" name="q-3" value="Mars"></input>
            <label htmlFor="q-3-a-3">Mars</label>

            <input type="radio" id="q-3-a-4" name="q-3" value="Saturn"></input>
            <label htmlFor="q-3-a-4">Saturn</label>
          </div>
        </section>
        <button className="submit-btn">Submit quiz</button>
      </form>
      <button className="get-questions-btn" onClick={getQuestions}>Get questions</button>
    </main>
  )
}