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
        super({
            provider,
            minLength,
            maxLength,
            value,
            placeholder,
            required,
            pattern,
            baseCSS
        });
    }

    createWrapView(){
        const textForm = document.createElement("input");
        textForm.type = "text";
        return textForm;
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);

        element.value = this.props.value || '';
        element.placeholder = this.props.placeholder;
        if(this.props.minLength) element.minLength = this.props.minLength;
        if(this.props.maxLength) element.maxLength = this.props.maxLength;
        element.required = this.props.required !== "";
        element.pattern = this.props.pattern;

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
        if (!this.props.provider) return;

        this.props.provider.update(() => {
            return value;
        });
    }
}
