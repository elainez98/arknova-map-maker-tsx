import './App.css';
import './App.css';

import { BrushSelection, BrushSelectionContext } from './context';
import React, { useState } from 'react';
import { Terrain, TerrainMap } from './Model/terrain';

import Bonus from './components/Bonus';
import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';
import { HexData } from './Model/hex';
import HexagonGrid from './components/HexagonGrid';

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
        <div className="bg">
          <div className="top">
            <div className="bonuses">
            </div>
            <div className="map">
              <HexagonGrid hexagons={hexagons} />
            </div>
            <div className="partners">
            </div>
            <div className="right-container">
              <div className="notebook">
              </div>
              <div className="uni-worker-container">
                <div className="uni">
                </div>
                <div className="worker">
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
          </div>
        </div>
        <BrushBox setBrushSelection={setBrushSelection} />
        <BrushBoxTextures setBrushSelection={setBrushSelection} />
      </BrushSelectionContext.Provider>
    </div>
  );
}

export default App;
