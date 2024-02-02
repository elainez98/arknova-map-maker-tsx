import { useState } from "react"
import './Brushbox.css';
import { Icon, IconMap } from '../Model/icon';
import { BrushSelection } from "../context";

interface BrushBoxProps {
  setBrushSelection: (selection: BrushSelection) => void;
}


const BrushBox = (props: BrushBoxProps) => {
  const {setBrushSelection} = props
  const iconList: JSX.Element[] = [];
  const [clicked, setClicked] = useState(-2)
  const [value, setValue] = useState("0")

  function onClickIcon(icon: Icon) {
    setClicked(icon);
    setBrushSelection({icon});
  }
  
  function onClickDelete() {
    setClicked(-1)
    setBrushSelection({deleteIcon: true})
  }

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
    const selected = clicked == key ? "selected" : "";
    iconList.push(
      <div key={key} className={`icon-button ${selected}`} onClick={()  => onClickIcon(key)}>
        <div style={iconStyle} className="icon-brushbox">
          {child}
        </div>
      </div>
    )
  })

  const selectDelete = clicked === -1 ? "selected delete" : "";
  return (
    <div className='icon-box'>
      {iconList}
      {clicked}
      <button className={`icon-button ${selectDelete}`} onClick={onClickDelete}>Delete</button>
      <label>
        <input name="value" value={value} onChange={e => setValue(e.target.value)}/>
      </label>
    </div>
  )
}

export default BrushBox
