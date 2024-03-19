import FormSelectInput from "../FormSelectInput";
import {forwardRef} from "react";
import {useContactFormContext} from "../../store/contexts-provider";

const InputFactory = forwardRef(function Input({ required, type, labelText, options, placeHolder, id, formValidate, contactContent}, ref) {
    let input = null;
    let objectName = `${id}Error`;
    const {invalidFields, onFormValidation} = useContactFormContext();

    switch (type) {
        case "EMAIL":
            input = <input onBlur={() => onFormValidation(invalidFields, () => formValidate("email"))} onChange={() => onFormValidation(invalidFields, () => formValidate("email"))} type="email" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXT":
            input = <input onBlur={() => onFormValidation(invalidFields, () => formValidate("name"))} onChange={() => onFormValidation(invalidFields, () => formValidate("name"))} type="text" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXTAREA":
            input = <textarea onBlur={() => onFormValidation(invalidFields, () => formValidate("message"))} onChange={() => onFormValidation(invalidFields, () => formValidate("message"))} placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "SELECT":
            input = <FormSelectInput options={options} id={id} ref={ref} />;
            break;
        default:
            input = <input value="Input type was not defined" />;
    }

    return (
        <div className="form-input">
            <label htmlFor={id} required={!!required}>
                {labelText}
            </label>
            {input}
            {invalidFields[objectName] ? <p className="error-message">{contactContent[objectName]}</p> : ""}
        </div>
    );
});

export default InputFactory;