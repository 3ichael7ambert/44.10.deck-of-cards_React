import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const Deck = () => {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const drawButtonRef = useRef();

  // Declare createNewDeck function
  const createNewDeck = async () => {
    try {
      const response = await fetch(
        'https://deckofcardsapi.com/api/deck/new/shuffle/'
      );
      const data = await response.json();
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    } catch (error) {
      console.error('Error creating a new deck:', error);
    }
  };

  useEffect(() => {
    createNewDeck();
  }, []);

  useEffect(() => {
    document.title = `Card Deck (${remaining} cards remaining)`;
  }, [remaining]);

  const drawCard = async () => {
    if (remaining > 0) {
      try {
        const response = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
        );
        const data = await response.json();

        if (data.success) {
          setCurrentCard(data.cards[0]);
          setRemaining(data.remaining);
        } else {
          console.error('Error drawing a card:', data);
        }
      } catch (error) {
        console.error('Error drawing a card:', error);
      }
    } else {
      alert('Error: no cards remaining!');
    }
  };

  const resetDeck = () => {
    setDeckId(null);
    setCurrentCard(null);
    setRemaining(0);
    drawButtonRef.current.focus();
    createNewDeck();
  };

  return (
    <div className="Deck">
      <h1>Deck of Cards App</h1>
      {currentCard && <Card card={currentCard} />}
      <button ref={drawButtonRef} onClick={drawCard}>
        Draw a Card
      </button>
      <button onClick={resetDeck}>Reset Deck</button>
    </div>
  );
};

export default Deck;
