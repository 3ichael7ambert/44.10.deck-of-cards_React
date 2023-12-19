import React from 'react';

const Card = ({ card }) => (
  <div className="Card">
    <img src={card.image} alt={card.code} />
    <p>{`${card.value} of ${card.suit}`}</p>
  </div>
);

export default Card;
