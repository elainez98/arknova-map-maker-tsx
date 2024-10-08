import React from 'react';
import './Bonus.css';

import { IconMap, VALUE_ICONS } from "../Model/icon";

import { BonusData } from '../Model/hex';

function Bonus(
  props: {
    bonusData: BonusData
  }
) {
  const { icon, value, hideContainer } = props.bonusData;


  const hasValue = VALUE_ICONS.includes(icon);
  const config = IconMap.get(icon)!;
  let iconStyle = {
    backgroundPosition: `${config.x}% ${config.y}%`,
    backgroundSize: `${config.size}%`,
  }
  const innerIcon =
    <div style={iconStyle} className="icon">
      {hasValue ? (<span className="icon-value">{value}</span>) : <></>}
    </div>;
  if (hideContainer) {
    return innerIcon
  }
  return <div className="icon-container">
    {innerIcon}
  </div>;
}

export default Bonus;