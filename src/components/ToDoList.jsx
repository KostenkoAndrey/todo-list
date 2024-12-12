import s from "./ToDoList.module.css";
import ToDojson from "./toDoList.json";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ()=>{
    return (
        <div className={s.outerCont}>
            <div className={s.innerCont}>
                <input className={s.addItem} type="text" placeholder="Pls input toDo task..."/>
                <button className={s.addItembtn}>Add</button>
            </div>
            <ul className={s.todoList}>
                {ToDojson.map( i => 
                <ToDoListItem key={i.id} {...i}/>
                )}
            </ul>
        </div>
    )
};

export default ToDoList;