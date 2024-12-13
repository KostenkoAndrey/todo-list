import s from "./ToDoList.module.css";

const ToDoListItem = ({ onDelete, id, todo, completed })=>{
    return (
        <><li className={s.todoItem}>
            <p className={s.todotext}>{todo}</p>
            <button onClick={() => onDelete(id)} className={s.todoBtn}>Delete</button></li></>
    )
};  

export default ToDoListItem;