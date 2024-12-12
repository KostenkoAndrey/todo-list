import { useState } from 'react'
import './App.css'
import Clicker from "./components/Clicker"
import ColorClicker from "./components/ColorClicker"

function App() {
const [click, setClick] = useState(0);

  return (
    <>
    <Clicker
    counter={click} 
    setCounter={setClick}/>
    <ColorClicker/>
    </>
  )
};

export default App;
