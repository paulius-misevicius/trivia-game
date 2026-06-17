import { useContext } from "react"
import { GameSettingsContext } from "./App"

export default function Settings() {

    const {gameSettings, setGameSettings, GAME_SETTINGS} = useContext(GameSettingsContext)

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

    function saveSettingsChanges(event) {
        let GAME_SETTINGS_UPDATED = {...gameSettings}
        if (event.target.name === "amount") {
            GAME_SETTINGS_UPDATED = {...GAME_SETTINGS_UPDATED, AMOUNT: event.target.value}
        }
        if (event.target.name === "category") {
            GAME_SETTINGS_UPDATED = {...GAME_SETTINGS_UPDATED, CATEGORY: event.target.value}
        }
        if (event.target.name === "difficulty") {
            GAME_SETTINGS_UPDATED = {...GAME_SETTINGS_UPDATED, DIFFICULTY: event.target.value}
        }
        if (event.target.name === "type") {
            GAME_SETTINGS_UPDATED = {...GAME_SETTINGS_UPDATED, TYPE: event.target.value}
        }
        setGameSettings(GAME_SETTINGS_UPDATED)
    }
    console.log(gameSettings)
    return (
        <section className="quiz-settings">
            <p>Quiz settings</p>
            <div className="settings-row">
                <label className="settings-label" htmlFor="amount">Amount:</label>
                <input onChange={saveSettingsChanges} name="amount" id="amount" type="number" defaultValue={gameSettings.AMOUNT} min="1" max="50"></input>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="category">Category:</label>
                <select onChange={saveSettingsChanges} name="category" id="category" defaultValue={gameSettings.CATEGORY}>
                    <option value="">Any</option>
                    {gameCategoriesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="difficulty">Difficulty:</label>
                <select onChange={saveSettingsChanges} name="difficulty" id="difficulty" defaultValue={gameSettings.DIFFICULTY}>
                    <option value="">Any</option>
                    {gameDifficultiesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="type">Type:</label>
                <select onChange={saveSettingsChanges} name="type" id="type" defaultValue={gameSettings.TYPE}>
                    <option value="">Any</option>
                    {gameTypesToRender}
                </select>
            </div>
        </section>
    )
}