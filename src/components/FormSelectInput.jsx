import {forwardRef, useState} from "react";

const FormSelectInput = forwardRef(function FormSelectInput({options, ...props}, ref){
    const [selectState, setSelectState] = useState({value:options[0], isOpened:false})

    function handelSelectClick(){
        setSelectState(prevState =>{
            return {...prevState, isOpened: !prevState.isOpened}
        })
    }

    function handelOptionClick(clickedOption){
        setSelectState(prevState =>{
            return {...prevState, value: clickedOption, isOpened: false, optionIndex: options.indexOf(clickedOption)}
        })
    }

    function getSelectedButtonText(){
        let textToDisplay = options[0];
        if (options[options.indexOf(selectState.value)]){
            textToDisplay = options[options.indexOf(selectState.value)];
        }
        else if(options[selectState.optionIndex]){
            textToDisplay = options[selectState.optionIndex];
        }
        return textToDisplay;
    }

    return <>
        <button {...props} ref={ref} className="select-button" type="button" onClick={handelSelectClick}>{getSelectedButtonText()}</button>
        {selectState.isOpened ? <div className="select-options-container">{
            options.map(contactCauseOption =>
                <option key={contactCauseOption} onClick={() => handelOptionClick(contactCauseOption)}
                    value={contactCauseOption} className="select-option">{contactCauseOption}</option>)

        }</div> : ""}
    </>
})

export default FormSelectInput;
