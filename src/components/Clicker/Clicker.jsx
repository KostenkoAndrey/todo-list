import s from "./Clicker.module.css";
import { useState } from 'react'

const Clicker = ({counter, setCounter}) => {
const [step, setStep] = useState(1);

const handleAhead =(evt)=> {
setCounter((p)=> p + step);
evt.target.blur();
}
const handleAstern =(evt)=> {
setCounter((p)=> p - step);
evt.target.blur();
}
const handReset =(evt)=> {
setCounter(0);
evt.target.blur();
}
const handleStepChange = (evt) => {
    const value = +evt.target.value;
    setStep(value);
}
    return  <div className={s.container}>
            <h2 className={s.title}>{counter}</h2>
            <input className={s.inputs} onInput={handleStepChange} placeholder="Pls Input Number..." type="number"/>
            <div className={s.innercont}>
                <button className={s.btn} onClick={handleAhead}>Start</button>
                <button className={s.btn} onClick={handleAstern}>End</button>
                <button className={s.btn} onClick={handReset}>Reset</button></div>
        </div>
};

export default Clicker;