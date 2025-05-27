import s from "./UserForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomField from "./CustomField";

const initialValues ={
  username:"",
  user:"",
  password:""
}

const UserForm = () => {

  const handleOnSubmit = (value, actions)=> console.log(value);
  
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleOnSubmit}
    // validationSchema={}
    >
      <Form className={s.formUser}>
      <CustomField label="username" type="text" name="username"/>
      <CustomField label="user" type="text" name="user"/>
      <CustomField label="password" type="password" name="password"/>
      <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
    
}

export default UserForm;
