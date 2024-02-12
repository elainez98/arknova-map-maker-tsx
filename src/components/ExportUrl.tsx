import { HexData, stringify } from '../Model/hex';

import { useLocation } from 'react-router-dom';

interface ExportUrlProps {
  hexagons: HexData[],
};

function ExportUrl(props: ExportUrlProps) {
  const { hexagons } = props;
  const location = useLocation();
  const hexes = hexagons.map(stringify).join(',');

  return <textarea>{hexes}</textarea>
}

export default ExportUrl;