import Card from './Card'

export default function CardGrid({cards, handleClick}){
    return (
        <div className="grid">
            {cards.map((card)=> (
                <Card 
                key={card.id}
                card={card}
                handleClick={handleClick}
                 />
            ))}
        </div>
    )
}