import { useContext } from "react"
import { GameStateContext } from "./App.jsx"
import clsx from "clsx"

export default function Answer(props) {

    const {gameState, GAME_STATE} = useContext(GameStateContext)

    const isAnswerUserGuessed = props.userAnswers.some(item => item.key === props.questionId && item.answer === props.answer)
    const isAnswerCorrect = props.answer === props.correctAnswer

    const answerStyle = clsx({
        "answer-correct" : isAnswerCorrect,
        "answer-incorrect" : isAnswerUserGuessed && !isAnswerCorrect,
        "answer-disabled" : !isAnswerCorrect
    })

    return (
        <>
            <input type="radio" id={props.id} name={props.questionId} value={props.answer} disabled={gameState === GAME_STATE.FINISHED}></input>
            <label className={gameState === GAME_STATE.FINISHED ? answerStyle : undefined} htmlFor={props.id}>{props.answer}</label>
        </>
    )
}