import './Bonus.css';

import { IconMap } from "../Model/icon";
import { BonusData } from '../Model/hex';

function Bonus(
  props: {
    bonusData: BonusData
  }
) {
  const { icon, value, hideContainer } = props.bonusData;
  const config = IconMap.get(icon)!;
  let iconStyle = {
    backgroundPosition: `${config.x}% ${config.y}%`,
    backgroundSize: `${config.size}%`,
  }
  return <div className="icon-container">
    <div style={iconStyle} className="icon">
      <span className="icon-value">{value}</span>
    </div>
  </div>;
}

export default Bonus;