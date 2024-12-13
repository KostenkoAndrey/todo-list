import { useState, useEffect } from 'react'
import './App.css'
import Clicker from "./components/Clicker/Clicker"
import ColorClicker from "./components/ColorClicker/ColorClicker"
import ToDoList from "./components/ToDoList/ToDoList"
import Modal from './components/Modal/Modal'


function App() {
const [click, setClick] = useState(0);
const [isOpen, setIsOpen] = useState(false);

const BtnChange = () =>{
  setIsOpen(!isOpen);
}


useEffect(()=>{
  console.log("Mount");
  console.log("update event");
  },[isOpen])

  return (
    <>
    {/* <Clicker
    counter={click} 
    setCounter={setClick}/>
    <ColorClicker/>
    <ToDoList/> */}
    {!isOpen && <button onClick={BtnChange}>Open Modal</button>}
    {isOpen && <Modal value={isOpen} update={setIsOpen}/>}
    
    </>
  )
};

export default App;
