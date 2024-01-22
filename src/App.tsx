import './App.css';

import Bonus from './components/Bonus';
import { Icon } from './Model/icon';
import { TextureMap } from './Model/texture';
import React, { useState } from 'react';
import './App.css';
import HexagonGrid from './components/HexagonGrid';
import { times } from 'lodash';
import BrushBox from './components/Brushbox';
import BrushBoxTextures from './components/Brushbox-textures';

function App() {

  const [icon, setIcon] = useState(-1)
  const [texture, setTexture] = useState(0)


  const setIconState = (iconId: number) => {
    setIcon(iconId)
  }

  const setTextureState = (textureId: number) => {
    setTexture(textureId)
  }

  const getHexProps = (hexagon: any) => {
    return {
      style: {
        fill: TextureMap.get(texture), //TextureMap.get(0),//
        stroke: "black",
        strokeWidth: 2,
        margin: 0
      },
      onClick: () => onClickHex(hexagon)//alert(`Hexagon n.${hexagon} has been clicked`)
    };
  };

  const onClickHex = (hexagon) => {
    alert(`Hexagon n.${hexagon} has been clicked. Set texture to ${TextureMap.get(texture)}`)
    return {style: {
      fill: TextureMap.get(texture),
    }
  }
  }

  const renderHexagonContent = (hexagon: any, icon: any = 0) => {
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
        <Bonus icon={icon} />
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
      "Icon Id: {icon}"
      "Texture Id: {texture}"
    
      <HexagonGrid gridHeight={650} gridWidth={1000} x={50} y={100} hexProps={getHexProps} hexagons={hexagons} renderHexagonContent={renderHexagonContent} icon={icon} texture={texture}/>

      <BrushBox setIconState={setIconState}/>
      <BrushBoxTextures setTextureState={setTextureState}/>
      {/* <Bonus
        icon={Icon.Money}
        value={'5'}
      />
      <Bonus
        icon={Icon.Multiplier}
      />
      <Bonus
        icon={Icon.Bonus}
      /> */}
    </div>
  );
}

export default App;
