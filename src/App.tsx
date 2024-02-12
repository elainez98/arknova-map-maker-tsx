import './App.css';

import { BrushSelection, BrushSelectionContext } from './context';
import { HexData, decode } from './Model/hex';

import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';
import ExportUrl from './components/ExportUrl';
import HexagonGrid from './components/HexagonGrid';
import { Icon } from './Model/icon';
import { Terrain } from './Model/terrain';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function getHexagonsOrDefault(serializedHexes: string | null): HexData[] {
  if (!serializedHexes) {
    return [{ index: 3, terrain: Terrain.ROCK }, {
      index: 24, terrain: Terrain.WATER, bonus: {
        icon: Icon.Clever
      }
    }];
  }
  return serializedHexes.split(',').map(decode);
}

function App() {
  const [brushSelection, setBrushSelection] = useState({} as BrushSelection);
  const { terrain, icon } = brushSelection;

  const [searchParams, setSearchParams] = useSearchParams();
  const hexagons = getHexagonsOrDefault(searchParams.get('hexes'));

  return (
    <div className="App">
      "Icon Id: {icon}"
      "Terrain Id: {terrain}"
      <BrushSelectionContext.Provider value={brushSelection}>
        <HexagonGrid hexagons={hexagons} />
        <BrushBox setBrushSelection={setBrushSelection} />
        <BrushBoxTextures setBrushSelection={setBrushSelection} />
      </BrushSelectionContext.Provider>
      <ExportUrl hexagons={hexagons} />
    </div>
  );
}

export default App;
