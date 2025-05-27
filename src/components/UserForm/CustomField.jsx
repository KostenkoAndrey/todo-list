import { Field, ErrorMessage } from "formik";
import { useId } from "react";

const CustomField = ({ label, type="text", name }) => {
    const nameId = useId();
return (
    <>
    <label htmlFor={nameId}>{label}</label>
    <Field id={nameId} type={type} name={name}/>
    <ErrorMessage name={name} component="span"/>
    </>
)
}

export default CustomField;
