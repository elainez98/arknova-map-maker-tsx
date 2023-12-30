import { useState, useEffect } from "react"
import { isFunction, times } from "lodash"
import Hexagon from "react-hexagon"
import Bonus from "./Bonus";
import { Icon } from '../Model/icon';


const getGridDimensions = (gridWidth: number, gridHeight: number, N: number) => {
  const a = (5 * gridHeight) / (gridWidth * Math.sqrt(2));
  const b = gridHeight / (2 * gridWidth) - 2;

  const columns = 5

  const hexSize = 60;//Math.floor(gridWidth / (3 * columns + 0.5));
  const rows = 13;

  return {
    columns,
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3)),
    rows
  };
};

const tryInvoke = (func: (arg0: Object) => any, params: number[] = [], defaultValue?: Object) => {
  return isFunction(func) ? func(params) : defaultValue;
};

const HexagonGrid = (props: { hexagons: any[]; gridHeight: number; gridWidth: number; renderHexagonContent: any; hexProps: any; x: number; y: number; }) => {
  const {
    hexagons,
    gridHeight,
    gridWidth,
    renderHexagonContent,
    hexProps,
    x,
    y
  } = props;

  const [hexInfo, setHexInfo] = useState({ columns: 1, hexSize: 1, hexWidth: 1, hexHeight: 1, rows: 0 })
  let skipped = 0

  useEffect(() => {
    if (hexagons.length > 0 && gridWidth > 0 && gridHeight > 0) {
      setHexInfo(getGridDimensions(gridWidth, gridHeight, hexagons.length));
    }
  }, [hexagons, gridWidth, gridHeight]);

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

  const getRowDimensions = (row: number) => {
    row = row
    var dimensions;
    dimensions = {
      y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
      height: `${hexInfo.hexHeight}px`,
      width: gridWidth,
      marginLeft: `${(hexInfo.hexSize) * 3}px`
    };
    if (row % 2 === 0) {
      dimensions = {
        y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
        height: `${hexInfo.hexHeight}px`,
        width: gridWidth,
        marginLeft: `${(hexInfo.hexSize / 2) * 3}px`
      };
    }
    return dimensions;
  };


  return (<svg width={gridWidth} height={gridHeight} x={x} y={y}>
    <>Hello!</>
    {times(hexInfo.rows, (row) => {
      const columns = hexInfo.columns;
      const rowDim = getRowDimensions(row);
      return (
        <svg
          key={row}
          width={rowDim.width}
          height={rowDim.height}
          y={rowDim.y}
        >
          {times(columns, (col) => {
            if (row % 2 === 0 && col == columns - 1) {
              skipped++
              return <></>
            }
            const iHexagon = (row * hexInfo.columns + col) - skipped;
            const hexagon = hexagons[iHexagon];
            const hexDim = getHexDimensions(row, col);
            const _hexProps = tryInvoke(hexProps, [hexagon], hexProps);
            return (
              <svg
                key={iHexagon}
                height={hexDim.height}
                width={hexDim.width}
                x={`${hexDim.x}px`}
              >
                <Hexagon {..._hexProps} flatTop>
                  {tryInvoke(renderHexagonContent, [hexagon], <tspan />)}
                  
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