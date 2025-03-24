export class FontCSS {
    #properties = {};

    constructor({
        color = null,
        fontStyle = null,
        fontWeight = null,
        fontSize = null,
        lineHeight = null,
        fontFamily = null
    } = {}) {
        this.#properties = {
            color,
            fontStyle,
            fontWeight,
            fontSize,
            lineHeight,
            fontFamily
        };
    }
    
    applyCSS(element) {
        if (this.#properties.color) element.style.color = this.#properties.color;
        if (this.#properties.fontStyle) element.style.fontStyle = this.#properties.fontStyle;
        if (this.#properties.fontWeight) element.style.fontWeight = this.#properties.fontWeight;
        if (this.#properties.fontSize) element.style.fontSize = this.#properties.fontSize;
        if (this.#properties.lineHeight) element.style.lineHeight = this.#properties.lineHeight;
        if (this.#properties.fontFamily) element.style.fontFamily = this.#properties.fontFamily;

        return element;
    }

    // get color() { return this.#properties.color; }
    // get fontStyle() { return this.#properties.fontStyle; }
    // get fontWeight() { return this.#properties.fontWeight; }
    // get fontSize() { return this.#properties.fontSize; }
    // get lineHeight() { return this.#properties.lineHeight; }
    // get fontFamily() { return this.#properties.fontFamily; }

    // getAllProperties() {
    //     return { ...this.#properties } 
    // }
}
