import Answer from "./Answer.jsx"
import { nanoid } from "nanoid"

export default function Question(props) {

    const answersToRender = props.answers.map((item, index) => 
        <Answer 
            key={nanoid()} 
            id={nanoid()} 
            questionId={props.id} 
            answer={props.answers[index]}
            correctAnswer={props.correctAnswer}
            userAnswers={props.userAnswers}
        />
    )

    return (
        <section className="question-component">
          <h2 className="question-name">{props.title}</h2>
          <div className="question-answer-field">
            {answersToRender}
          </div>
        </section>
    )
}