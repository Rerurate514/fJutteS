import { Border } from "../models/border.js";

export class BaseCSS {
    #properties = {};

    constructor({
        width = null,
        height = null,
        margin = null,
        padding = null,
        border = null
    } = {}){
        let assembledBorder = null;
        if(border) assembledBorder = border.assembleCSS();

        this.#properties = {
            width,
            height,
            margin,
            padding,
            assembledBorder
        }
    }

    applyCSS(element){
        if(this.#properties.width) element.style.width = this.#properties.width;
        if(this.#properties.height) element.style.height = this.#properties.height;
        if(this.#properties.margin) element.style.margin = this.#properties.margin;
        if(this.#properties.padding) element.style.padding = this.#properties.padding;
        if(this.#properties.assembledBorder) element.style.border = this.#properties.assembledBorder;
    
        return element;
    }

    // get width() { return this.#properties.width }
    // get height() { return this.#properties.height }
    // get margin() { return this.#properties.margin }
    // get padding() { return this.#properties.padding }
    // get assembledBorder() { return this.#properties.assembledBorder }
}
