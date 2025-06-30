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
        super();
        this.provider = provider;
        this.min = min;
        this.max = max;
        this.value = value;
        this.step = step;
        this.name = name;
        this.onChange = onChange;
        this.isDisplay = isDisplay;
        this.baseCSS = baseCSS;
    }

    createWrapView(){
        return document.createElement("input");
    }

    styledView(element){
        element.type = "range";
        element.min = this.min;
        element.max = this.max;
        element.value = this.value;
        element.step = this.step;
        element.name = this.name;
        
        if(!this.isDisplay) element.style.display = "none";

        element = this.baseCSS.applyCSS(element);

        return element;
    }

    embedScriptToView(element){
        this._setEventListenerToSlider(element);
        return element;
    }

    _setEventListenerToSlider(sliderElement) {
        sliderElement.addEventListener("input", (e) => {   
            this.onChange(e.target.value, sliderElement, e);
            
            if(!this.provider) return;
            this.provider.update(() => {
                return e.target.value;
            });
        });
    }
}
