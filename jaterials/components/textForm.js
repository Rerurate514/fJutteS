import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class TextForm extends View {
    constructor({
        provider = null,
        minLength = null,
        maxLength = null,
        value = null,
        placeholder = "",
        required = "",
        pattern = "",
        baseCSS = new BaseCSS(),
    }){
        super();
        this.provider = provider;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.value = value;
        this.placeholder = placeholder;
        this.required = required;
        this.pattern = pattern;
        this.baseCSS = baseCSS;
    }

    createWrapView(){
        const textForm = document.createElement("input");
        textForm.type = "text";
        return textForm;
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);

        element.value = this.value || '';
        element.placeholder = this.placeholder;
        if(this.minLength) element.minLength = this.minLength;
        if(this.maxLength) element.maxLength = this.maxLength;
        element.required = this.required !== "";
        element.pattern = this.pattern;

        return element;
    }

    embedScriptToView(element) {
        element.addEventListener('input', () => {
            const currentValue = element.value;
            this.updateProvider(currentValue);
        });
        
        return element;
    }
    
    updateProvider(value) {
        if (!this.provider) return;

        this.provider.update(() => {
            return value;
        });
    }
}
