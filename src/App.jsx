import { useState, useEffect} from 'react'
import './App.css'
import CardGrid from './components/CardGrid'
import Scoreboard from './components/Scoreboard'

function App() {
  const[cards, setCards] = useState([]);
  const[score,setScore] = useState(0);
  const[bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
 
  async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    const pokemonData = await Promise.all(data.results.map(async(pokemon)=>{
      const res = await fetch(pokemon.url);
      const poke = await res.json();
      return {
        id: poke.id,
        name: poke.name,
        image: poke.sprites.front_default,
      };
    })
  );
  setCards(pokemonData);
  }
   useEffect(() => {
    fetchPokemon();
  },[]);
  function handleClick(id) {
    if(clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
      return;
    }
    setClickedCards[prev => [...prev, id]];
    setScore(prevScore => {
      const newScore = prevScore +1;
      setBestScore(prevBest => newScore > prevBest? newScore: prevBest);
      return newScore;
    })
  
    shuffleCards();
  }
  function shuffleCards() {
    const shuffled = [...cards].sort(()=> Math.random()-0.5);
    setCards(shuffled);
  }
  return (
    <div className="app">
   <h1> Memory Game</h1>
   <Scoreboard 
   score= {score}
   bestScore = {bestScore}
   />
   <CardGrid
   cards= {cards}
   handleClick={handleClick}
    />
    </div>
  )
}

export default App
