import Answer from "./Answer.jsx"
import { GameStateContext } from "./App.jsx"
import { useContext } from "react"
import clsx from "clsx"
import { nanoid } from "nanoid"

export default function Question(props) {

    const {gameState, GAME_STATE} = useContext(GameStateContext)

    const questionTagStyles = clsx("question-tag", {
        "error-text-color" : gameState === GAME_STATE.INCOMPLETE && props.userAnswers[props.index].answer === null
    })

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
            <p className={questionTagStyles}>QUESTION {props.index + 1} OUT OF {props.questionsLength}</p>
            <h2>{props.title}</h2>
            <div className="question-answer-field">
                {answersToRender}
            </div>
        </div>
    )
}