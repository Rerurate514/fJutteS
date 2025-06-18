import { ProviderScope } from "../../jiperes/interface/providerScope.js";

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
        });
        this.labelText = labelText;
        this.name = name;
        this.checkedRadioButton = checkedRadioButton;
        this.isDisplay = isDisplay;
        this.isChecked = isChecked;
    }

    createWrapView(){
        let label = document.createElement("label");
        let radio = document.createElement("input");
        label.appendChild(radio);

        const labelTextDiv = document.createTextNode(this.labelText);
        label.appendChild(labelTextDiv);

        return label;
    }

    styledView(element){
        element.firstElementChild.type = "radio";
        element.firstElementChild.name = this.name;
        if(!this.isDisplay) element.firstElementChild.style.display = "none";
        element.firstElementChild.checked = this.isChecked;

        return element;
    }

    embedScriptToView(element){
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    _setEventListenerToRadioBtn(radioBtn) {
        radioBtn.addEventListener("change", (e) => {   
            if (e.target.checked) {
                this.checkedRadioButton(radioBtn, e);
            }
        });
    }
}
