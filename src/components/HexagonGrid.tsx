import { times } from "lodash"
import { useContext, useState } from "react"

import Hexagon from "react-hexagon"
import { Terrain, TerrainMap } from "../Model/terrain";
import { HexData } from "../Model/hex";
import Bonus from "./Bonus";
import { BrushSelection, BrushSelectionContext } from "../context";
import { Icon } from "../Model/icon";

function getGridDimensions(
  hexSize = 60,
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
  setHexagons: (hexagons: HexData[]) => void;
}

function HexagonGrid(props: HexagonGridProps) {
  const {
    hexagons,
    setHexagons
  } = props;
  const gridWidth = 1000; // TODO: get rid of this
  const brushSelection: BrushSelection = useContext(BrushSelectionContext);

  const [hexInfo] = useState(getGridDimensions())
  let skipped = 0

  function getXYIndex(index) {
    const row = Math.floor(index / 9);
    const rowIdx = index % 9;
    const column: number = rowIdx > 3 ? (rowIdx - 4) * 2 :
      (rowIdx) * 2 + 1;
    return `${row}, ${column}`;
  }

  const getHexDimensions = (row: number, col: number) => {
    row++
    const dimensions = {
      width: `${hexInfo.hexWidth}px`,
      height: `${hexInfo.hexHeight}px`,
      x: col * hexInfo.hexSize * 3
    };
    if (row % 2 === 1) {
      dimensions.x += hexInfo.hexSize * (3 / 2);
    }
    return dimensions;
  };

  function getRowDimensions(row: number) {
    var dimensions = {
      y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
      height: `${hexInfo.hexHeight}px`,
      marginLeft: `${(hexInfo.hexSize) * 3}px`,
      marginTop: 0
    };
    if (row % 2 === 0) {
      dimensions = {
        y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
        height: `${hexInfo.hexHeight}px`,
        marginLeft: `${(hexInfo.hexSize / 2) * 3}px`,
        marginTop: 0
      };
    }
    return dimensions;
  };

  function testOnClick(hexagon: HexData) {
    console.log("clicked! now", hexagon,"theme", brushSelection);
    const newHexagon = hexagons.find(hex => hex.index === hexagon.index) || { index: hexagon.index } as HexData
    if (brushSelection.icon !== undefined) {
      newHexagon.bonus = {
        ...newHexagon.bonus,
        icon: brushSelection.icon
      }
    }
    if (brushSelection.terrain !== undefined) {
      newHexagon.terrain = brushSelection.terrain;
    }
    const foundIndex = hexagons.findIndex(hex => hex.index === hexagon.index);
    if (foundIndex >= 0) {
      hexagons[foundIndex] = {
        ...hexagons[foundIndex],
        ...newHexagon
      };
    } else {
      hexagons.push(newHexagon);
    }
    setHexagons([...hexagons]);
  }

  return (<svg width="1000" height="750">
    {times(hexInfo.rows, (row) => {
      const columns = hexInfo.columns;
      const rowDim = getRowDimensions(row);
      return (
        <svg
          key={row}
          width={gridWidth}
          height={rowDim.height}
          y={rowDim.y}
        >
          {times(columns, (col) => {
            if (row % 2 === 0 && col === columns - 1) {
              skipped++
              return <></>
            }
            const iHexagon = (row * hexInfo.columns + col) - skipped;
            const hexagon = hexagons.find(hex => hex.index === iHexagon) || {
              index: iHexagon,
              terrain: Terrain.NORMAL,
            };
            const hexDim = getHexDimensions(row, col);
            const bonus = hexagon.bonus ? <Bonus bonusData={hexagon.bonus} /> : null;
            return (
              <svg
                key={iHexagon}
                height={hexDim.height}
                width={hexDim.width}
                x={`${hexDim.x}px`}
              >
                <Hexagon style={getHexStyle(hexagon)} flatTop onClick={() => testOnClick(hexagon)}>
                  <foreignObject width={200} height={200} x="29%" y="30%" style={{ pointerEvents: 'none' }}>
                    {bonus}
                  </foreignObject>
                </Hexagon>
              </svg>
            );
          })}
        </svg>
      );
    })}
  </svg>);
}

export default HexagonGrid