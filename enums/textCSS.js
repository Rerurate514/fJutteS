import { FontCSS } from "./fontCSS.js";

export class TextCSS {
    #properties = {};

    constructor({
        fontCSS = new FontCSS(),
        letterSpacing = null,
        textAlign = null,
        textAlignLast = null,
        textIndent = null,
        textTransform = null,
        lineBreak = null,
        textOverflow = null,
        textWrap = null,
        wordBreak = null,
        textDecoration = null,
        textEmphasis = null,
        textShadow = null,
        writingMode = null,
        textCombineUpright = null,
        textOrientation = null
    } = {}) {
        this.#properties = {
            fontCSS,
            letterSpacing,
            textAlign,
            textAlignLast,
            textIndent,
            textTransform,
            lineBreak,
            textOverflow,
            textWrap,
            wordBreak,
            textDecoration,
            textEmphasis,
            textShadow,
            writingMode,
            textCombineUpright,
            textOrientation
        };
    }

    get fontCSS() { return this.#properties.fontCSS; }
    get letterSpacing() { return this.#properties.letterSpacing; }
    get textAlign() { return this.#properties.textAlign; }
    get textAlignLast() { return this.#properties.textAlignLast; }
    get textIndent() { return this.#properties.textIndent; }
    get textTransform() { return this.#properties.textTransform; }
    get lineBreak() { return this.#properties.lineBreak; }
    get textOverflow() { return this.#properties.textOverflow; }
    get textWrap() { return this.#properties.textWrap; }
    get wordBreak() { return this.#properties.wordBreak; }
    get textDecoration() { return this.#properties.textDecoration; }
    get textEmphasis() { return this.#properties.textEmphasis; }
    get textShadow() { return this.#properties.textShadow; }
    get writingMode() { return this.#properties.writingMode; }
    get textCombineUpright() { return this.#properties.textCombineUpright; }
    get textOrientation() { return this.#properties.textOrientation; }

    getAllProperties() {
        return { ...this.#properties };
    }
}
