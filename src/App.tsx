import './App.css';

import Bonus from './components/Bonus';
import { Icon } from './Model/icon';
import React from 'react';
import './App.css';
import HexagonGrid from './components/HexagonGrid';
import { times } from 'lodash';

function App() {

  const getHexProps = (hexagon) => {
    return {
      style: {
        // fill: "#007aff",
        stroke: "black"
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  };

  const renderHexagonContent = (hexagon) => {
    return (
      <>
      {/* <text
        x="50%"
        y="50%"
        fontSize={50}
        fontWeight="lighter"
        style={{ fill: "blue" }}
        textAnchor="middle"
      >
        {hexagon}
      </text> */}
      <foreignObject width={200} height={200} x="29%" y="30%">
        <Bonus icon={Icon.AssociationWorker} />
      </foreignObject>
      
      </>
    );
  };

  let hexagons = times(58, (id) => {
    const row = Math.floor(id / 9);
    const rowIdx = id % 9;
    let column: number;
    if (rowIdx > 3) {
      column = (rowIdx - 4) * 2;
    }
    else {
      column = (rowIdx)*2 + 1;
    }
    return `${row}, ${column}`;
  });

  
  return (
    <div className="App">
     
        {/* <HexagonTest /> */}
        <HexagonGrid gridHeight={800} gridWidth={1000} x={50} y={100} hexProps={getHexProps} hexagons={hexagons} renderHexagonContent={renderHexagonContent}/>
      <Bonus
        icon={Icon.Money}
        value={'5'}
      />
      <Bonus
        icon={Icon.Multiplier}
      />
      <Bonus
        icon={Icon.Bonus}
      />
    </div>
  );
}

export default App;
