export class BaseCSS {
    #properties = {};

    constructor({
        width = null,
        height = null,
        margin = null,
        padding = null,
        borderCSS = null
    } = {}){
        this.#properties = {
            width,
            height,
            margin,
            padding,
            borderCSS
        };
    }

    applyCSS(element){
        if(this.#properties.width) element.style.width = this.#properties.width;
        if(this.#properties.height) element.style.height = this.#properties.height;
        if(this.#properties.margin) element.style.margin = this.#properties.margin;
        if(this.#properties.padding) element.style.padding = this.#properties.padding;
        if(this.#properties.borderCSS) element = this.#properties.borderCSS.applyCSS(element);
    
        return element;
    }

    get width() { return this.#properties.width; }
    get height() { return this.#properties.height; }
    get margin() { return this.#properties.margin; }
    get padding() { return this.#properties.padding; }
    get assembledBorder() { return this.#properties.assembledBorder; }
}
