import { useContext } from "react"
import { GameStateContext } from "./App.jsx"
import clsx from "clsx"

export default function Answer(props) {

    const {gameState, GAME_STATE} = useContext(GameStateContext)

    const isAnswerUserGuessed = props.userAnswers.some(item => item.key === props.questionId && item.answer === props.answersData.answer)
    const isAnswerCorrect = props.answersData.answer === props.correctAnswer

    const answerStyle = clsx({
        "answer-correct" : isAnswerCorrect,
        "answer-incorrect" : isAnswerUserGuessed && !isAnswerCorrect,
        "answer-disabled" : !isAnswerCorrect
    })

    return (
        <>
            <input 
                onChange={() => props.toggleIsPressed(props.answersData.answerId)} 
                type="radio" 
                id={props.answersData.answerId} 
                name={props.questionId} 
                value={props.answersData.answer} 
                disabled={gameState === GAME_STATE.FINISHED}
                defaultChecked={props.answersData.pressed && gameState === GAME_STATE.INCOMPLETE ? true : null}
            ></input>
            <label className={gameState === GAME_STATE.FINISHED ? answerStyle : undefined} htmlFor={props.answersData.answerId}>{props.answersData.answer}</label>
        </>
    )
}