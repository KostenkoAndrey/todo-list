import { useState, useEffect } from "react";
import s from "./ToDoList.module.css";
import ToDojson from "./../ToDoList/toDoList.json";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ()=>{
const [toDoJob, setToDoJob] = useState((JSON.parse(localStorage.getItem("toDoList"))?.length) ? JSON.parse(localStorage.getItem("toDoList")) : ToDojson);
const [newValue, setNewValue] = useState("");

const addJob = () => {
setToDoJob(prev => [...prev, {
    id: crypto.randomUUID(),
    todo: newValue,
    completed: false
}]);

setNewValue(""); 
}

const DeleteToDo = id => setToDoJob(p => p.filter(i => i.id !== id));

useEffect(()=> localStorage.setItem("toDoList", JSON.stringify(toDoJob)),[toDoJob]);

    return (
        <div className={s.outerCont}>
            <div className={s.innerCont}>
                <input value={newValue} onInput={(e)=> setNewValue(e.target.value)} className={s.addItem} type="text" placeholder="Pls input toDo task..."/>
                <button onClick={addJob} className={s.addItembtn}>Add</button>
            </div>
            <ul className={s.todoList}>
                {toDoJob.map( i => 
                <ToDoListItem onDelete={DeleteToDo} key={i.id} {...i}/>
                )}
            </ul>
        </div>
    )
};

export default ToDoList;