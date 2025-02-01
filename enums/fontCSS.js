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

    get color() { return this.#properties.color; }
    get fontStyle() { return this.#properties.fontStyle; }
    get fontWeight() { return this.#properties.fontWeight; }
    get fontSize() { return this.#properties.fontSize; }
    get lineHeight() { return this.#properties.lineHeight; }
    get fontFamily() { return this.#properties.fontFamily; }

    getAllProperties() {
        return { ...this.#properties } 
    }
}
