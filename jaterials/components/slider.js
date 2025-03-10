import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Slider extends View {
    constructor({
        provider = null,
        min = 0,
        max = 100,
        value = 50,
        step = 1,
        name = "",
        onChange = () => {},
        isDisplay = true,
        baseCSS = new BaseCSS()
    } = {}){
        super({
            provider,
            min,
            max,
            value,
            step,
            name,
            onChange,
            isDisplay,
            baseCSS
        });
    }

    createWrapView(){
        return document.createElement("input");
    }

    styledView(element){
        element.type = "range";
        element.min = this.props.min;
        element.max = this.props.max;
        element.value = this.props.value;
        element.step = this.props.step;
        element.name = this.props.name;
        
        if(!this.props.isDisplay) element.style.display = "none";

        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    embedScriptToView(element){
        this._setEventListenerToSlider(element);
        return element;
    }

    _setEventListenerToSlider(sliderElement) {
        sliderElement.addEventListener("input", (e) => {   
            this.props.onChange(e.target.value, sliderElement, e);
            
            if(!this.props.provider) return;
            this.props.provider.update(() => {
                return e.target.value;
            });
        });
    }
}
