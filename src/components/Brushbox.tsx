import { useState } from "react"
import './Brushbox.css';
import { Icon, IconMap } from '../Model/icon';
import { BrushSelection, BrushSelectionContext } from "../context";

interface BrushBoxProps {
  setBrushSelection: (selection: BrushSelection) => void;
  brushSelection: BrushSelection;
}


const BrushBox = (props: BrushBoxProps) => {
  const {setBrushSelection, brushSelection} = props
  const iconList: JSX.Element[] = [];

  function onClickIcon(icon: Icon) {
    setBrushSelection({
      value: brushSelection.value,
      icon,
    });
  }
  
  function onClickDelete() {
    setBrushSelection({deleteIcon: true})
  }

  const handleInputChange = (event) => {
    setBrushSelection({
      ...brushSelection,
      value: Number(event.target.value),
    })
  };

  IconMap.forEach((value, key) => {
    let iconStyle: Record<string, string> = {
      backgroundPosition: `${value.x}% ${value.y}%`,
      backgroundSize: `${value.size}%`,
    };
    let child = <></>
    if (key === Icon.Money) {
      child = <span className="icon-value">{5}</span>
      iconStyle = {
        ...iconStyle,
        borderRadius: '14px',
      };
    }
    const selected = brushSelection.icon === key ? "selected" : "";
    iconList.push(
      <div
        key={key}
        className={`icon-button ${selected}`}
        onClick={() => onClickIcon(key)}
      >
        <div style={iconStyle} className="icon-brushbox">
          {child}
        </div>
      </div>
    )
  })

  const selectDelete = brushSelection.deleteIcon ? "selected delete" : "";
  return (
    <div className='icon-box'>
      {iconList}
      Icon: {brushSelection.icon}
      value: {brushSelection.value}
      <button
        className={`icon-button ${selectDelete}`}
        onClick={onClickDelete}
      >
          Delete
      </button>
      <label>
        <input
          type="number"
          name="value"
          onInput={handleInputChange}
          placeholder="Enter a value"
        />
      </label>
    </div>
  )
}

export default BrushBox
