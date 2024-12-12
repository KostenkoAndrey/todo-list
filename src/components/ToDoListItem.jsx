import s from "./ToDoList.module.css";

const ToDoListItem = ({id, todo, completed})=>{
    return (
        <><li className={s.todoItem}>
            <p className={s.todotext}>{todo}</p>
            <button className={s.todoBtn}>Delete</button></li></>
    )
};

export default ToDoListItem;