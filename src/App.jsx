import { useState } from 'react'
import './App.css'
import Clicker from "./components/Clicker/Clicker"
import ColorClicker from "./components/ColorClicker/ColorClicker"
import ToDoList from "./components/ToDoList/ToDoList"


function App() {
const [click, setClick] = useState(0);
  return (
    <>
    {/* <Clicker
    counter={click} 
    setCounter={setClick}/>
    <ColorClicker/> */}
    <ToDoList/>
    </>
  )
};

export default App;
