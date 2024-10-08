import { Terrain, TerrainMap } from "../Model/terrain";

import Bonus from "./Bonus";
import { HexData } from "../Model/hex";
import Hexagon from "react-hexagon"
import { times } from "lodash"
import { useState } from "react"

function getGridDimensions(
  hexSize = 63.5,
  columns = 5,
  rows = 13
) {
  return {
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3)),
    columns,
    rows
  };
};

function getHexStyle(hexagon: HexData) {
  return {
    fill: TerrainMap.get(hexagon.terrain || Terrain.NORMAL),
    stroke: "black",
    strokeWidth: 2,
    margin: 0
  };
}

interface HexagonGridProps {
  hexagons: HexData[];
}

function HexagonGrid(props: HexagonGridProps) {
  const {
    hexagons,
  } = props;

  const [hexInfo] = useState(getGridDimensions())

  function getXYIndex(index) {
    const row = Math.floor(index / 9);
    const rowIdx = index % 9;
    const column: number = rowIdx > 3 ? (rowIdx - 4) * 2 :
      (rowIdx) * 2 + 1;
    return `${row}, ${column}`;
  }

  function getHexDims(i: number) {
    const patternIdx = i % 9;
    const group = Math.floor(i / 9);
    const isFirstRow = patternIdx < 4;
    const realIdx = isFirstRow ? patternIdx : patternIdx - 4;
    const rad = hexInfo.hexSize;
    const height = hexInfo.hexHeight;
    const width = hexInfo.hexWidth;
    const y = height * group + (isFirstRow ? 0 : height / 2);
    const x = (3 * rad * realIdx) + (isFirstRow ? rad * (3 / 2) : 0);
    return {
      height: `${height}px`,
      width: `${width}px`,
      y,
      x,
    }
  }

  function testOnClick(hexagon: HexData) {
    console.log("clicked! now", hexagon);
  }

  const nCells = 58;
  return (<svg width="900" height="780">
    {times(nCells, (n) => {
      const dims = getHexDims(n);
      const hexagon = hexagons.find(hex => hex.index === n) ||
        { index: n, terrain: Terrain.NORMAL };
      const bonus = hexagon.bonus ? <Bonus bonusData={hexagon.bonus} /> : null;
      return (
        <svg
          key={n}
          height={dims.height}
          width={dims.width}
          y={dims.y}
          x={dims.x}
        >
          <Hexagon style={getHexStyle(hexagon)} flatTop
            onClick={testOnClick}
          >
            <foreignObject
              width={200}
              height={200}
              x="29%"
              y="30%"
              style={{ pointerEvents: 'none' }}
            >
              {bonus}
            </foreignObject>
          </Hexagon>
        </svg>);
    })}
  </svg>);
}

export default HexagonGrid