import './Bonus.css';

import { Icon, IconConfig, IconMap } from "../Model/icon";
import React from 'react';

export interface BonusProps {
  icon: Icon,
  value?: string,
  hideTile?: boolean
}

function Bonus(
  props: BonusProps
) {
  const { icon, value, hideTile } = props;
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