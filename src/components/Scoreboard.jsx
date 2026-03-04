export default function Scoreboard({score, bestScore}) {
    return (
        <div className="scoreboard">
            <h2>Score: {score}</h2>
            <h2>BestScore: {bestScore}</h2>
        </div>
    );
}