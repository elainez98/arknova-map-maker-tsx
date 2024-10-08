import './App.css';
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
        <div className="bg">
          <div className="top">
            <div className="bonuses">
            </div>
            <div className="map">
              <HexagonGrid hexagons={hexagons} setHexagons={setHexagons} />
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
        <BrushBox setBrushSelection={setBrushSelection} brushSelection={brushSelection} />
        <BrushBoxTextures setBrushSelection={setBrushSelection} brushSelection={brushSelection} />
      </BrushSelectionContext.Provider>
      <ExportUrl hexagons={hexagons} />
    </div>
  );
}

export default App;
