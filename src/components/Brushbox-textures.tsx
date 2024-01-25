import { useState } from "react";
import './Brushbox-textures.css';
import { Terrain } from "../Model/terrain";

const BrushBoxTextures = ({ brushSelection, setBrushSelection }) => {
    const [clicked, setClicked] = useState(-1)
    const [key, setKey] = useState(0)

    const onClickIcon = (terrain: Terrain) => { 
        let newBrush = brushSelection
        if (newBrush.hasOwnProperty("terrain")) {
            newBrush.terrain = JSON.parse(JSON.stringify(terrain))
        } else {
            Object.defineProperty(newBrush, "terrain", { value: JSON.parse(JSON.stringify(terrain)), writable: true })
        }
        setBrushSelection(newBrush)
        setClicked(terrain)
    }

    const selected = clicked == key ? "selected" : "";

    return (
        <div className='icon-box' >
            <div className={`icon-button ${clicked == 0 ? "selected" : ""}`} onClick={() => onClickIcon(0)}>
                <div className='brushbox-texture' >
                    default
                </div>
            </div>
            <div id='2' className={`icon-button ${clicked == 1 ? "selected" : ""} water`} onClick={() => onClickIcon(1)}>
                <div className='brushbox-texture water' >
                    water
                </div>
            </div>
            <div className={`icon-button ${clicked == 2 ? "selected" : ""} mountain`} onClick={() => onClickIcon(2)}>
                <div className='brushbox-texture mountain' >
                    mountain
                </div>
            </div>
        </div>
    )
}

export default BrushBoxTextures