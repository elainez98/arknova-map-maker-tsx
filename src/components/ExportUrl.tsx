import React from 'react';
import './ExportUrl.css';

import { HexData, stringify } from '../Model/hex';

import { Terrain } from '../Model/terrain';
import { useState } from 'react';

interface ExportUrlProps {
  hexagons: HexData[],
};

function isDefaultHex(hex: HexData) {
  const { terrain, buildUpgrade, bonus } = hex;
  return (terrain === Terrain.NORMAL || !terrain) && !buildUpgrade && !bonus;
}

function ExportUrl(props: ExportUrlProps) {
  const { hexagons } = props;
  const [showHint, setShowHint] = useState(false);
  let url = window.location.href.replace(/\?.*/, "");
  const hexes = hexagons
    .filter(hex => !isDefaultHex(hex))
    .map(stringify)
    .join(',');
  const newUrl = `${url}?hexes=${hexes}`;

  function copyToClipboard() {
    navigator.clipboard.writeText(newUrl);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 1500);
  }

  const hint = showHint ?
    <div className="hint">Copied to clipboard!</div> :
    <></>;

  return <div>
    <div className="share">
      Share this map!
      <input value={newUrl} onClick={copyToClipboard}></input>
    </div>
    {hint}
  </div>;
}

export default ExportUrl;