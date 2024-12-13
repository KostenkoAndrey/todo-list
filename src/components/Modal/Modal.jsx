import s from "./Modal.module.css";
import { CgAddR } from "react-icons/cg";

const Modal = ({value, update}) => {
    const Wrap = (e) =>{
        if(e.target === e.currentTarget){
            update(!value)
        }
    }
return (
    <div onClick={Wrap} className={s.Wrapper}>
    <div className={s.innerWrapper}>   
    <CgAddR onClick={()=>update(!value)} className={s.ModalTopRight}/>
    <h1 className={s.modalTitle}>Modal Window</h1>
    <p className={s.modalText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt veniam dicta, illo doloribus odio quasi magnam voluptates a earum. Quam dolores, fugit architecto magnam facilis, tempore dignissimos delectus, saepe assumenda possimus culpa fuga? Culpa ut, porro aperiam rem illum totam saepe alias impedit, incidunt rerum omnis, inventore nobis eveniet. Rerum quod natus mollitia molestiae! Distinctio quas quasi adipisci. Praesentium veritatis delectus labore repudiandae cumque minima doloremque rerum inventore, velit aspernatur eveniet asperiores facere? Cum, id delectus quibusdam quia eius obcaecati animi expedita sunt autem. Esse qui iusto error. Exercitationem quaerat ad est iste? Quasi quibusdam iure vitae corrupti, a officiis.</p>
    <button onClick={()=>update(!value)} className={s.ModalDownbtn}>Exit</button>
    </div>
    </div>
)
};
export default Modal;