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
        <div className="question-component">
            <p className="question-tag">QUESTION {props.index + 1} OUT OF {props.questionsLength}</p>
            <h2>{props.title}</h2>
            <div className="question-answer-field">
                {answersToRender}
            </div>
        </div>
    )
}