export default function Card({card, handleClick}) {
    return (
        <div className="card"onClick={()=> handleClick(card.id)}>
            <img src={card.image} alt ={card.name}/>
            <p>{card.name}</p>
        </div>
    );
}