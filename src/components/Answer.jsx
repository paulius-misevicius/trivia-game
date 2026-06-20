import { useContext } from "react"
import { GameStateContext } from "../App.jsx"
import clsx from "clsx"

export default function Answer(props) {

    const {gameState, GAME_STATE} = useContext(GameStateContext)

    const isAnswerUserGuessed = props.userAnswers.some(item => item.key === props.questionId && item.answer === props.answersData.answer)
    const isAnswerCorrect = props.answersData.answer === props.correctAnswer
    const isAnswerIncorrect = isAnswerUserGuessed && !isAnswerCorrect

    const crossIcon = <svg className="cross-icon" role="img" aria-label="Wrong answer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z" fill="currentColor"></path> </g></svg>
    const checkIcon = <svg className="check-icon" role="img" aria-label="Correct answer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

    const answerStyle = clsx({
        "answer-correct" : isAnswerCorrect,
        "answer-incorrect" : isAnswerIncorrect,
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
            <label 
                className={gameState === GAME_STATE.FINISHED ? answerStyle : undefined} 
                htmlFor={props.answersData.answerId}
            >
                {gameState === GAME_STATE.FINISHED && isAnswerIncorrect ? crossIcon : null}
                {gameState === GAME_STATE.FINISHED && isAnswerCorrect ? checkIcon : null}
                {props.answersData.answer}
            </label>
        </>
    )
}