import { isFunction, times } from "lodash"
import { useEffect, useState } from "react"

import Hexagon from "react-hexagon"
import { TextureMap } from "../Model/texture";

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

function tryInvoke(
  func: (arg0: Object) => any, params: number[] = [],
  defaultValue?: Object
) {
  return isFunction(func) ? func(params) : defaultValue;
};

interface HexagonGridProps {
  hexagons: any[];
  gridHeight: number;
  gridWidth: number;
  renderHexagonContent: any;
  hexProps: any;
  icon: any;
  texture: any;
  x: number;
  y: number;
}

function HexagonGrid(props: HexagonGridProps) {
  const {
    hexagons,
    gridHeight,
    gridWidth,
    renderHexagonContent,
    hexProps,
    x,
    y,
    icon,
    texture
  } = props;

  const [hexInfo, setHexInfo] = useState(getGridDimensions())
  const [textureStyle, setTextureStyle] = useState({ fill: "beige" })
  let skipped = 0

  useEffect(() => {
    if (hexagons.length) {
      setHexInfo(getGridDimensions());
    }
  }, [hexagons]);

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
      width: gridWidth,
      marginLeft: `${(hexInfo.hexSize) * 3}px`,
      marginTop: 0
    };
    if (row % 2 === 0) {
      dimensions = {
        y: `${row * (hexInfo.hexSize * (Math.sqrt(3) / 2))}px`,
        height: `${hexInfo.hexHeight}px`,
        width: gridWidth,
        marginLeft: `${(hexInfo.hexSize / 2) * 3}px`,
        marginTop: 0
      };
    }
    return dimensions;
  };

  function testOnClick(hexagon: number) {
    console.log("clicked! now", hexagon);
    setTextureStyle({ fill: TextureMap.get(texture) || "beige" });
  }

  return (<svg width={gridWidth} height={gridHeight} x={x} y={y}>
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
            if (row % 2 === 0 && col === columns - 1) {
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
                <Hexagon {..._hexProps} flatTop onClick={() => testOnClick(hexagon)} style={textureStyle}>
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