import './App.css';

import Bonus from './components/Bonus';
import { Terrain, TerrainMap } from './Model/terrain';
import React, { useState } from 'react';
import './App.css';
import HexagonGrid from './components/HexagonGrid';
import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';
import { BrushSelectionContext, BrushSelection } from './context';
import { HexData } from './Model/hex';

function App() {
  const [brushSelection, setBrushSelection] = useState({} as BrushSelection);
  const { terrain, icon } = brushSelection;

  const hexagons: HexData[] = [
    {
      index: 3,
      terrain: Terrain.ROCK
    }
  ];

  return (
    <div className="App">
      "Icon Id: {icon}"
      "Terrain Id: {terrain}"
      <BrushSelectionContext.Provider value={brushSelection}>
        <HexagonGrid hexagons={hexagons} />
        <BrushBox setBrushSelection={setBrushSelection} />
        <BrushBoxTextures setBrushSelection={setBrushSelection} />
      </BrushSelectionContext.Provider>
    </div>
  );
}

export default App;
