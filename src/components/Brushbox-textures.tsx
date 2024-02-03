import { useState } from "react";
import './Brushbox-textures.css';
import { Terrain } from "../Model/terrain";
import { BrushSelection } from "../context";

interface BrushBoxProps {
  setBrushSelection: (selection: BrushSelection) => void;
  brushSelection: BrushSelection;
}

const BrushBoxTextures = (props: BrushBoxProps) => {
  const { setBrushSelection, brushSelection } = props

  const onClickIcon = (terrain: Terrain) => {
    setBrushSelection({ terrain });
  }

  return (
    <div className='icon-box' >
      <div
        className={`icon-button ${brushSelection.terrain === Terrain.NORMAL ? "selected" : ""}`}
        onClick={()=> onClickIcon(Terrain.NORMAL)}
      >
        <div className='brushbox-texture' >
          default
        </div>
      </div>
      <div 
        className={`icon-button ${brushSelection.terrain === Terrain.WATER ? "selected" : ""} water`} 
        onClick={()=> onClickIcon(Terrain.WATER)}
      >
        <div className='brushbox-texture water' >
          water
        </div>
      </div>
      <div
        className={`icon-button ${brushSelection.terrain === Terrain.ROCK ? "selected" : ""} rock`}
        onClick={() => onClickIcon(Terrain.ROCK)}>
        <div className='brushbox-texture rock' >
          mountain
        </div>
      </div>
    </div>
  )
}

export default BrushBoxTextures