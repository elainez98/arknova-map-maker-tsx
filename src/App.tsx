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
        fill: "#007aff",
        stroke: "white"
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  };

  const renderHexagonContent = (hexagon) => {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: "white" }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  };

  let hexagons = times(58, (id) => id);

  
  return (
    <div className="App">
     
        {/* <HexagonTest /> */}
        <HexagonGrid gridHeight={410} gridWidth={500} x={50} y={300} hexProps={getHexProps} hexagons={hexagons} renderHexagonContent={renderHexagonContent}/>
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
