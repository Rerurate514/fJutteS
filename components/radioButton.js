import { ProviderScope } from "../jiperes/interface/providerScope.js";

export class RadioButton extends ProviderScope {
    constructor({
        labelText,
        name = "",
        checkedRadioButton = () => {},
        providers = null,
        isDisplay = true,
        isChecked = false
    }){
        super({
            watchingProviders: providers ?? [],
            props : {
                labelText,
                name,
                checkedRadioButton,
                isDisplay,
                isChecked
            },
        });
    }

    createWrapView(){
        let label = document.createElement("label");
        let radio = document.createElement("input");
        label.appendChild(radio);

        const labelTextDiv = document.createTextNode(this.props.labelText);
        label.appendChild(labelTextDiv);

        return label;
    }

    styledView(element){
        element.firstElementChild.type = "radio";
        element.firstElementChild.name = this.props.name;
        if(!this.props.isDisplay) element.firstElementChild.style.display = "none";
        element.firstElementChild.checked = this.props.isChecked;

        return element;
    }

    embedScriptToView(element){
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    _setEventListenerToRadioBtn(radioBtn) {
        radioBtn.addEventListener("change", (e) => {   
            if (e.target.checked) {
                this.props.checkedRadioButton(radioBtn, e);
            }
        });
    }
}
