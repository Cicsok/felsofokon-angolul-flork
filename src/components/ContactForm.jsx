import {useEffect, useRef} from "react";
import InputFactory from "./Factory/InputFactory";
import {useContactFormContext, useHeaderContext} from "../store/contexts-provider";

export default function ContactForm({contactContent}) {
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const levelSelect = useRef();
    const causeSelect = useRef();
    const contactFormContext = useContactFormContext();
    const {currentLanguage, currentPage} = useHeaderContext();
    const inputFields ={
        nameInput,
        emailInput,
        messageInput,
        levelSelect,
        causeSelect,
        currentLanguage
    }

    useEffect(() => {
        contactFormContext.onFormReload();
        // eslint-disable-next-line
    }, [currentPage]);

    function validateForm(toValidate) {
        let errors = {}
        let messageInputValue = messageInput.current.value.trim();
        let nameInputValue = nameInput.current.value.trim();
        let emailInputValue = emailInput.current.value.trim();

        switch (toValidate) {
            case "message":
                errors.messageTextareaError = !messageInputValue;
                break;
            case "name":
                errors.nameInputError = !nameInputValue;
                break;
            case "email":
                if (!emailInputValue) {
                    errors.emailInputError = true;
                } else {
                    let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    let emailFormatIsValid = emailInputValue.match(regex);
                    if (!emailFormatIsValid) {
                        errors.emailInputError = true;
                    } else {
                        errors.emailInputError = false;
                    }
                }
                break;
            default:
                console.log("Input type was not provided");
        }
        return errors;
    }

    function detectContactFormContent() {
        if (contactFormContext.isSending) {
            return <div className="feedback-form-content">{`${contactContent.sendButtonText}...`}</div>
        }
        else if (contactFormContext.isFormSent){
            return <div className="feedback-form-content">{contactContent.successfulSendText}</div>
        }
        else if(contactFormContext.isFormSent === false){
            return <div className="feedback-form-content">{contactContent.unsuccessfulSendText}</div>
        }
        return <div className="form-content">
                <div className="flex-row">
                    <InputFactory required type="TEXT" labelText={contactContent.name}
                                  placeHolder={contactContent.namePlaceholder} id="nameInput" ref={nameInput}
                                  formValidate={validateForm} contactContent={contactContent}/>
                    <InputFactory required type="EMAIL" labelText={contactContent.email}
                                  placeHolder={contactContent.emailPlaceholder} id="emailInput" ref={emailInput}
                                  formValidate={validateForm} contactContent={contactContent}/>
                </div>
                <div className="flex-row">
                    <InputFactory required type="SELECT" labelText={contactContent.level} id="levelSelect"
                                  options={contactContent.levelOptions} contactContent={contactContent} ref={levelSelect}/>
                    <InputFactory required type="SELECT" labelText={contactContent.contactCause} id="contactCauseSelect"
                                  options={contactContent.contactCauseOptions} contactContent={contactContent}
                                  ref={causeSelect}/>
                </div>
                <div className="flex-row">
                    <InputFactory required type="TEXTAREA" labelText={contactContent.message}
                                  placeHolder={contactContent.messagePlaceHolder} id="messageTextarea" ref={messageInput}
                                  formValidate={validateForm} contactContent={contactContent}/>
                </div>
                <button disabled={!contactFormContext.isFormSendable(contactFormContext)}
                        title={contactFormContext.isFormSendable(contactFormContext) ? '' : contactContent.disabledButtonText}
                        type="submit">{contactContent.sendButtonText}</button>
            </div>
    }

    return <form noValidate className="contact-form" onSubmit={(event) => {
        contactFormContext.onFormSubmit(event, inputFields)}}>
            {detectContactFormContent()}
            </form>
}