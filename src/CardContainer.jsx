import './CardContainer.css'
import GameCard from './GameCard.jsx'


let CardContainer = ({data}) => {

  return (
    <div className="card-container">
      <div className="card-row">
        {data.map((cardItem, index) => (
          <GameCard
            key={`first-${index}`}
            title={cardItem.title}
            description={cardItem.description}
            image={cardItem.image}
            color={cardItem.color}
            icon={cardItem.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default CardContainer