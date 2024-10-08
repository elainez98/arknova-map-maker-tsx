import React from 'react';
import { BrushSelection, BrushSelectionContext } from "../context";
import { Terrain, TerrainMap } from "../Model/terrain";
import { useContext, useState } from "react"

import Bonus from "./Bonus";
import { HexData } from "../Model/hex";
import Hexagon from "react-hexagon"
import { VALUE_ICONS } from "../Model/icon";
import { times } from "lodash"

function getGridDimensions(
  hexSize = 63.5,
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
    stroke: hexagon.buildUpgrade ? "red" : "black",
    strokeWidth: hexagon.buildUpgrade ? 5 : 2,
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

  function updateHexagon(hexagon: HexData) {
    const hex = hexagons.find(hex => hex.index === hexagon.index)

    if (!hex) {
      const newHexagon: HexData = {
        index: hexagon.index,
        terrain: brushSelection.terrain,
        buildUpgrade: brushSelection.buildUpgrade || undefined,
        bonus: brushSelection.icon ? { icon: brushSelection.icon, value: brushSelection.value } : undefined,
      }
      hexagons.push(newHexagon)
    } else {
      hex.terrain = brushSelection.terrain !== undefined
        ? brushSelection.terrain
        : hex.terrain
      hex.buildUpgrade = brushSelection.buildUpgrade || undefined;

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

  export default HexagonGrid;