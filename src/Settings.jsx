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

    function saveSettings(formData) {
        let GAME_SETTINGS_UPDATED = {...GAME_SETTINGS}
        GAME_SETTINGS_UPDATED = {
            AMOUNT: formData.get("amount"),
            CATEGORY: formData.get("category"),
            DIFFICULTY: formData.get("difficulty"),
            TYPE: formData.get("type")
        }
        setGameSettings(GAME_SETTINGS_UPDATED)
    }
    console.log(gameSettings)
    return (
        <form action={saveSettings} className="quiz-settings">
            <p>Quiz settings</p>
            <div className="settings-row">
                <label className="settings-label" htmlFor="amount">Amount:</label>
                <input name="amount" id="amount" type="number" defaultValue={gameSettings.AMOUNT} min="1" max="50"></input>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="category">Category:</label>
                <select name="category" id="category" key={gameSettings.CATEGORY} defaultValue={gameSettings.CATEGORY}>
                    <option value="">Any</option>
                    {gameCategoriesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="difficulty">Difficulty:</label>
                <select name="difficulty" id="difficulty" key={gameSettings.DIFFICULTY} defaultValue={gameSettings.DIFFICULTY}>
                    <option value="">Any</option>
                    {gameDifficultiesToRender}
                </select>
            </div>
            <div className="settings-row">
                <label className="settings-label" htmlFor="type">Type:</label>
                <select name="type" id="type" key={gameSettings.TYPE} defaultValue={gameSettings.TYPE}>
                    <option value="">Any</option>
                    {gameTypesToRender}
                </select>
            </div>
            <button className="save-settings-btn">Save settings</button>
        </form>
    )
}