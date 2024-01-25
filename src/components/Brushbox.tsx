import { useState } from "react"
import './Brushbox.css';
import { Icon, IconMap } from '../Model/icon';


const BrushBox = ({brushSelection, setBrushSelection}) => {
  const IconList: any[] = [];
  const [clicked, setClicked] = useState(-1)

  function onClickIcon(icon: Icon) {
    setClicked(icon);
    let newBrush = brushSelection
    if (newBrush.hasOwnProperty("icon")) {
      newBrush.icon = JSON.parse(JSON.stringify( icon )) as Icon 
    } else {
      Object.defineProperty(newBrush, "icon", { value:  JSON.parse(JSON.stringify(icon)) , writable: true })
    }
    setBrushSelection(newBrush);
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
    IconList.push(
      <div key={key} className={`icon-button ${selected}`} onClick={()  => onClickIcon(key)}>
        <div style={iconStyle} className="icon-brushbox">
          {child}
        </div>
      </div>
    )
  })

  return (
    <div className='icon-box'>
      {IconList}
      {clicked}
    </div>
  )
}

export default BrushBox
