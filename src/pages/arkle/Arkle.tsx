import './Arkle.css';

import _ from 'lodash';
import cardData from './card_data.json';
import { useState } from 'react';

const DOWN_ARROW = "⬇";
const UP_ARROW = "⬆";

interface Card {
  card_id: number,
  name: string,
  scientific_name: string,
  size: number,
  special?: string,
  rock_water?: string,
  cost: number,
  type: string[],
  continent: string,
  reqs?: string
  ability: string,
  tickets: number
  conservation: number,
  reputation: number,
  reef?: string,
  wave?: string,
  expansion: string
}

function getRandomCard(expansion: boolean): number {
  let usedCards = cardData;
  if (!expansion) {
    usedCards = usedCards.filter(card => card.expansion === "BASE");
  }
  usedCards = usedCards.filter(card => card.type.includes("Pet"))
  const index = Math.floor(Math.random() * usedCards.length);
  const card = usedCards[index];

  return cardData.findIndex(i => i === card);
}

function Arkle() {
  const cards: Card[] = [...cardData];
  const [expansion, setExpansion] = useState(false);
  const [index, setIndex] = useState(getRandomCard(expansion));
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  let card = cards[index];

  function processGuess(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      setGuesses([...guesses, guess.toUpperCase()]);
      setGuess('');
    }
  }

  function reset() {
    setGuess('');
    setGuesses([]);
    setIndex(getRandomCard(expansion));
  }

  function getGuessClass(input: boolean) {
    return input ? "correct" : "wrong";
  }

  function getTypeClass(card: unknown[], guess: unknown[]) {
    if (_.isEqual(card, guess)) {
      return "correct";
    }
    if (_.intersection(card, guess).length) {
      return "partial";
    }
    return "wrong";

  }

  const guessDisplay = guesses.map((guess) => {
    const animal = cards.find(card => card.name === guess);
    if (!animal) {
      return <tr></tr>;
    }
    let costCompare = <></>;
    if (card.cost > animal.cost) {
      costCompare = <div>{UP_ARROW}</div>;
    } else if (card.cost < animal.cost) {
      costCompare = <div>{DOWN_ARROW}</div>;
    }
    let ticketCompare = <></>;
    if (card.tickets > animal.tickets) {
      ticketCompare = <div>{UP_ARROW}</div>;
    } else if (card.tickets < animal.tickets) {
      ticketCompare = <div>{DOWN_ARROW}</div>;
    }
    return (
      <tr key={animal.card_id}>
        <td className={getGuessClass(animal.name === card.name)}>
          {animal.name}
        </td>
        <td className={getGuessClass(animal.size === card.size)}>
          {animal.size}
        </td>
        <td className={getGuessClass(animal.continent === card.continent)}>
          {animal.continent}
        </td>
        <td className={getTypeClass(card.type, animal.type)}>
          {animal.type.join('/')}
        </td>
        <td className={getGuessClass(animal.cost === card.cost)}>
          {costCompare}
          <div>{animal.cost}</div>
        </td>
        <td className={getGuessClass(animal.tickets === card.tickets)}>
          {ticketCompare}
          <div>{animal.tickets}</div>
        </td>
      </tr>
    );
  });

  const win = guesses[guesses.length - 1] === card.name;

  return (
    <div className="arkle">
      <div className="main">
        <div className="details">
          <div className="title">Arkle</div>
          <div>
            <input
              type="checkbox"
              id="expansion"
              checked={expansion}
              onChange={() => setExpansion(!expansion)}
            />
            <label htmlFor="expansion">Include Marine Worlds Expansion?</label>
          </div>
          <div className="guesses">Tries {guesses.length}/5</div>
        </div>
        <div>
          <input
            value={guess}
            onChange={e => setGuess(e.target.value)}
            onKeyUp={e => processGuess(e)}
          />
        </div>
      </div>
      <div className="guess-container">
        <table>
          <thead>
            <tr>
              <th className="name">Name</th>
              <th>Size</th>
              <th>Continent</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {guessDisplay}
          </tbody>
        </table>
      </div>
      {win && (<div className="win">You Win!</div>)}
      <div className="reset-container">
        {/* <div>card id: {card.card_id}</div>
        <div>card name: {card.name}</div> */}
        <button type="button" onClick={reset}>reset</button>
      </div>
    </div >
  )
}

export default Arkle;