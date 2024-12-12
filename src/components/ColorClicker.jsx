import { useState } from "react";
import s from "./ColorClicker.module.css";
import color from "./color.json";

const ColorClicker = ()=> {
    const [currentColor, setCurrentColor] = useState('white');

    return (<div className={s.colorContainer} style={{backgroundColor:currentColor}}>
        <h1>{currentColor}</h1>
        <ul className={s.colorList}>
           {color.map( i => (
            <li className={s.colorItem} onClick={()=> setCurrentColor(i.color)} key={i.id}>{i.color}</li>
           ))}
        </ul>
    </div>)
};

export default ColorClicker;