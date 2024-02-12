import { useState } from "react";
import './Brushbox-textures.css';
import { Terrain } from "../Model/terrain";
import { BrushSelection } from "../context";
import classNames from "classnames";


interface BrushBoxProps {
  setBrushSelection: (selection: BrushSelection) => void;
  brushSelection: BrushSelection;
}

const BrushBoxTextures = (props: BrushBoxProps) => {
  const { setBrushSelection, brushSelection } = props

  const onClickIcon = (terrain: Terrain) => {
    setBrushSelection({ terrain });
  }

  function btnClass(terrain: Terrain) {
    return classNames({
      "icon-button": true,
      "selected": brushSelection.terrain === terrain,
      "water": terrain === Terrain.WATER,
      "rock": terrain === Terrain.ROCK,
    })
  }

  return (
    <div className='icon-box' >
      <div
        className={btnClass(Terrain.NORMAL)}
        onClick={() => onClickIcon(Terrain.NORMAL)}
      >
        <div className='brushbox-texture' >
          default
        </div>
      </div>
      <div
        className={btnClass(Terrain.WATER)}
        onClick={() => onClickIcon(Terrain.WATER)}
      >
        <div className='brushbox-texture water' >
          water
        </div>
      </div>
      <div
        className={btnClass(Terrain.ROCK)}
        onClick={() => onClickIcon(Terrain.ROCK)}>
        <div className='brushbox-texture rock' >
          mountain
        </div>
      </div>
    </div>
  )
}

export default BrushBoxTextures