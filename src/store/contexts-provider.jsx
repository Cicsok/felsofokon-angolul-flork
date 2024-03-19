import {useContext} from "react";
import {HeaderContext} from "./header-context";
import {ContactFormContext} from "./contact-form-context";

export const useHeaderContext = () => {
    return useContext(HeaderContext);
};

export const useContactFormContext = () => {
    return useContext(ContactFormContext);
};