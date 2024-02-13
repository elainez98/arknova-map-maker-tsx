import './App.css';

import { BrushSelection, BrushSelectionContext } from './context';
import { HexData, decode } from './Model/hex';

import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';
import ExportUrl from './components/ExportUrl';
import HexagonGrid from './components/HexagonGrid';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function getHexagonsOrDefault(serializedHexes: string | null): HexData[] {
  if (!serializedHexes) {
    return [];
  }
  return serializedHexes.split(',').map(decode);
}

function App() {
  const [brushSelection, setBrushSelection] = useState({} as BrushSelection);
  const [searchParams] = useSearchParams();
  const { terrain, icon } = brushSelection;
  const [hexagons, setHexagons] =
    useState<HexData[]>(getHexagonsOrDefault(searchParams.get('hexes')))

  return (
    <div className="App">
      "Icon Id: {icon}"
      "Terrain Id: {terrain}"
      "Brush:  {brushSelection.icon} {brushSelection.terrain}""
      <BrushSelectionContext.Provider value={brushSelection}>
        <HexagonGrid hexagons={hexagons} setHexagons={setHexagons} />
        <BrushBox setBrushSelection={setBrushSelection} brushSelection={brushSelection} />
        <BrushBoxTextures setBrushSelection={setBrushSelection} brushSelection={brushSelection} />
      </BrushSelectionContext.Provider>
      <ExportUrl hexagons={hexagons} />
    </div>
  );
}

export default App;
