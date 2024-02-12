import { BrushSelection, BrushSelectionContext } from "../context";
import { Terrain, TerrainMap } from "../Model/terrain";
import { useContext, useState } from "react"

import Bonus from "./Bonus";
import { HexData } from "../Model/hex";
import Hexagon from "react-hexagon"
import { VALUE_ICONS } from "../Model/icon";
import { times } from "lodash"

function getGridDimensions(
  hexSize = 60,
  columns = 5,
  rows = 13,
) {
  return {
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3)),
    columns,
    rows,
  };
};

function getHexStyle(hexagon: HexData) {
  return {
    fill: TerrainMap.get(hexagon.terrain || Terrain.NORMAL),
    stroke: "black",
    strokeWidth: 2,
    margin: 0,
  };
}

interface HexagonGridProps {
  hexagons: HexData[];
  setHexagons: (hexagons: HexData[]) => void;
}

function HexagonGrid(props: HexagonGridProps) {
  const {
    hexagons,
    setHexagons,
  } = props;
  const gridWidth = 1000; // TODO: get rid of this
  const brushSelection: BrushSelection = useContext(BrushSelectionContext);

  const [hexInfo] = useState(getGridDimensions())
  let skipped = 0

  const getHexDimensions = (row: number, col: number) => {
    row++
    const dimensions = {
      width: `${hexInfo.hexWidth}px`,
      height: `${hexInfo.hexHeight}px`,
      x: col * hexInfo.hexSize * 3,
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
      marginTop: 0,
    };
    if (row % 2 === 0) {
      dimensions = {
        y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
        height: `${hexInfo.hexHeight}px`,
        marginLeft: `${(hexInfo.hexSize / 2) * 3}px`,
        marginTop: 0,
      };
    }
    return dimensions;
  };

  function updateHexagon(hexagon: HexData) {
    const hex = hexagons.find(hex => hex.index === hexagon.index)

    if (!hex) {
      const newHexagon: HexData = {
        index: hexagon.index,
        terrain: brushSelection.terrain,
        bonus: brushSelection.icon ? { icon: brushSelection.icon, value: brushSelection.value } : undefined,
      }
      hexagons.push(newHexagon)
    } else {
      hex.terrain = brushSelection.terrain !== undefined
        ? brushSelection.terrain
        : hex.terrain

      if (brushSelection.icon !== undefined) {
        hex.bonus = {
          ...hex.bonus,
          icon: brushSelection.icon,
          value: VALUE_ICONS.includes(brushSelection.icon) ? brushSelection.value : undefined,
        }
      }

      if (brushSelection.deleteIcon) {
        hex.bonus = undefined;
      }
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
                <Hexagon style={getHexStyle(hexagon)} flatTop onClick={() => updateHexagon(hexagon)}>
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