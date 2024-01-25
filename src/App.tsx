import './App.css';

import { useState } from 'react';
import './App.css';
import HexagonGrid from './components/HexagonGrid';
import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';
import { BrushSelectionContext, BrushSelection } from './context';
import { HexData } from './Model/hex';

function App() {
  const [brushSelection, setBrushSelection] = useState({} as BrushSelection);
  const { terrain, icon } = brushSelection;
  const [hexagons, setHexagons] = useState([] as HexData[])


  return (
    <div className="App">
      "Icon Id: {icon}"
      "Terrain Id: {terrain}"
      <BrushSelectionContext.Provider value={brushSelection}>
        <HexagonGrid hexagons={hexagons} setHexagons={setHexagons}/>
        <BrushBox brushSelection={brushSelection} setBrushSelection={setBrushSelection} />
        <BrushBoxTextures brushSelection={brushSelection} setBrushSelection={setBrushSelection} />
      </BrushSelectionContext.Provider>
    </div>
  );
}

export default App;
