export default function App() {

  function submitQuiz(formData) {
    console.log(formData.get("q-1"))
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
        <button className="submit-btn">Submit quiz</button>
      </form>
    </main>
  )
}