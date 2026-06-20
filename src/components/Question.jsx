import Answer from "./Answer.jsx"
import { GameStateContext } from "../App.jsx"
import { useContext, useState } from "react"
import clsx from "clsx"
import { nanoid } from "nanoid"

export default function Question(props) {

    const {gameState, GAME_STATE} = useContext(GameStateContext)
    const [answersData, setAnswersData] = useState(props.questionItem.answers)

    const questionTagStyles = clsx("question-tag", {
        "error-text-color" : gameState === GAME_STATE.INCOMPLETE && props.userAnswers[props.index].answer === null
    })

    const answersToRender = answersData.map((item, index) =>
        <Answer 
            toggleIsPressed={togglePressed}
            answersData={answersData[index]}
            key={answersData[index].answerId} 
            questionId={props.questionItem.id} 
            correctAnswer={props.questionItem.correct_answer}
            userAnswers={props.userAnswers}
        />
    )

    function togglePressed(id) {
        setAnswersData(prevData => prevData.map(item => {
            return item.answerId === id ? {...item, pressed: true} : {...item, pressed: false}
        }))
    }

    return (
        <div className="question-component">
            <p className={questionTagStyles}>QUESTION {props.index + 1} OUT OF {props.questionsLength}</p>
            <h2>{props.questionItem.question}</h2>
            <div className="question-answer-field">
                {answersToRender}
            </div>
        </div>
    )
}