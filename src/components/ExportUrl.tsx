import { HexData, stringify } from '../Model/hex';

interface ExportUrlProps {
  hexagons: HexData[],
};

function ExportUrl(props: ExportUrlProps) {
  const { hexagons } = props;
  const hexes = hexagons.map(stringify).join(',');

  return <textarea>{hexes}</textarea>
}

export default ExportUrl;