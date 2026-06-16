export default function Answer(props) {
    return (
        <>
            <input type="radio" id={props.id} name={props.questionId} value={props.answer}></input>
            <label htmlFor={props.id}>{props.answer}</label>
        </>
    )
}