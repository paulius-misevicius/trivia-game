import { useContext } from "react"
import { GameSettingsContext } from "./App"

export default function Settings() {

    const {gameSettings, setGameSettings} = useContext(GameSettingsContext)

    const gameCategories = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", 
    "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathematics",
    "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"]
    const gameCategoriesToRender = gameCategories.map((item, index) => <option key={item} value={index + 9}>{item}</option>)

    const gameDifficulties = ["Easy", "Medium", "Hard"]
    const gameDifficultiesToRender = gameDifficulties.map(item => <option key={item} value={item.toLowerCase()}>{item}</option>)

    const gameTypes = [
    {key: "multiple", value: "Multiple Choice"},
    {key: "boolean", value: "True / False"}
    ]
    const gameTypesToRender = gameTypes.map(item => <option key={item.value} value={item.key}>{item.value}</option>)

    function saveSettings(event) {
        let GAME_SETTINGS_UPDATED = {...gameSettings}
        GAME_SETTINGS_UPDATED = {...GAME_SETTINGS_UPDATED, [event.target.name]: event.target.value}
        setGameSettings(GAME_SETTINGS_UPDATED)
    }

    return (
        <section className="quiz-settings">
            <p>Quiz settings</p>
            <div className="settings-row">
                <label className="settings-label" htmlFor="amount">Amount:</label>
                <input onChange={saveSettings} name="amount" id="amount" type="number" defaultValue={gameSettings.amount} min="1" max="50"></input>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="category">Category:</label>
                <select onChange={saveSettings} name="category" id="category" defaultValue={gameSettings.category}>
                    <option value="">Any</option>
                    {gameCategoriesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="difficulty">Difficulty:</label>
                <select onChange={saveSettings} name="difficulty" id="difficulty" defaultValue={gameSettings.difficulty}>
                    <option value="">Any</option>
                    {gameDifficultiesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="type">Type:</label>
                <select onChange={saveSettings} name="type" id="type" defaultValue={gameSettings.type}>
                    <option value="">Any</option>
                    {gameTypesToRender}
                </select>
            </div>
        </section>
    )
}