import React from 'react';
import './Brushbox-textures.css';

import { BrushSelection } from "../context";
import { Terrain } from "../Model/terrain";
import classNames from "classnames";
import { useState } from 'react';

interface BrushBoxProps {
  setBrushSelection: (selection: BrushSelection) => void;
  brushSelection: BrushSelection;
}

const BrushBoxTextures = (props: BrushBoxProps) => {
  const { setBrushSelection, brushSelection } = props
  const [buildUpgrade, setBuildUpgrade] = useState(false);

  const onClickIcon = (terrain: Terrain) => {
    setBrushSelection({ terrain, buildUpgrade });
  }

  function toggleBuildUpgrade() {
    setBuildUpgrade(!buildUpgrade);
    if (brushSelection.terrain !== undefined) {
      setBrushSelection({
        terrain: brushSelection.terrain,
        buildUpgrade
      });
    }
  }

  function btnClass(terrain: Terrain) {
    return classNames({
      "icon-button": true,
      "selected": brushSelection.terrain === terrain,
      "water": terrain === Terrain.WATER,
      "rock": terrain === Terrain.ROCK,
      "build-upgrade": buildUpgrade,
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
      <div className="build">
        <label htmlFor="buildII">Require Upgraded Build?</label>
        <input type="checkbox" id="buildII"
          checked={buildUpgrade}
          onChange={toggleBuildUpgrade} />
      </div>
    </div>
  )
}

export default BrushBoxTextures