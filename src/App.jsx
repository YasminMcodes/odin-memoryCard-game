import { useState, useEffect } from "react";
import "./App.css";
import CardGrid from "./components/CardGrid";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const poke = await res.json();
        return {
          id: poke.id,
          name: poke.name,
          image: poke.sprites.front_default,
        };
      }),
    );
    setCards(pokemonData);
  }
  useEffect(() => {
    fetchPokemon();
  }, []);

  function handleClick(id) {
    if (isLocked) return;
    setIsLocked(true);

    if (clickedCards.includes(id)) {
      setGameOver(true);
      setScore(0);
      setClickedCards([]);
      shuffleCards();
      setTimeout(() => {
        setGameOver(false);
        setIsLocked(false);
      }, 1000);
      return;
    }
    setClickedCards((prev) => [...prev, id]);
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      setBestScore((prevBest) => (newScore > prevBest ? newScore : prevBest));
      return newScore;
    });

    shuffleCards();
    setTimeout(() => setIsLocked(false), 300);
  }
  function shuffleCards() {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }
 return (
  <div className="app">
    <header className="header">
      <h1>🧠 Pokémon Memory Game</h1>

      <Scoreboard
        score={score}
        bestScore={bestScore}
      />
    </header>

    {gameOver && (
      <div className="game-over">
        <h2>Game Over! Try Again 🔁</h2>
      </div>
    )}

    <CardGrid
      cards={cards}
      handleClick={handleClick}
    />
  </div>
);
}

export default App;
