import { FontCSS } from "./fontCSS.js";
import { WebkitCSS } from "./webkitCSS.js";

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
        textOrientation = null,
        webkitCSS = new WebkitCSS()
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
            textOrientation,
            webkitCSS
        };
    }

    applyCSS(element) {
        if (this.#properties.letterSpacing) element.style.letterSpacing = this.#properties.letterSpacing;
        if (this.#properties.textAlign) element.style.textAlign = this.#properties.textAlign;
        if (this.#properties.textAlignLast) element.style.textAlignLast = this.#properties.textAlignLast;
        if (this.#properties.textIndent) element.style.textIndent = this.#properties.textIndent;
        if (this.#properties.textTransform) element.style.textTransform = this.#properties.textTransform;
        if (this.#properties.lineBreak) element.style.lineBreak = this.#properties.lineBreak;
        if (this.#properties.textOverflow) element.style.textOverflow = this.#properties.textOverflow;
        if (this.#properties.textWrap) element.style.textWrap = this.#properties.textWrap;
        if (this.#properties.wordBreak) element.style.wordBreak = this.#properties.wordBreak;
        if (this.#properties.textDecoration) element.style.textDecoration = this.#properties.textDecoration;
        if (this.#properties.textEmphasis) element.style.textEmphasis = this.#properties.textEmphasis;
        if (this.#properties.textShadow) element.style.textShadow = this.#properties.textShadow;
        if (this.#properties.writingMode) element.style.writingMode = this.#properties.writingMode;
        if (this.#properties.textCombineUpright) element.style.textCombineUpright = this.#properties.textCombineUpright;
        if (this.#properties.textOrientation) element.style.textOrientation = this.#properties.textOrientation;

        if (this.#properties.fontCSS) this.#properties.fontCSS.applyCSS(element);
        if (this.#properties.webkitCSS) this.#properties.webkitCSS.applyCSS(element);

        return element;
    }

    // get fontCSS() { return this.#properties.fontCSS; }
    // get letterSpacing() { return this.#properties.letterSpacing; }
    // get textAlign() { return this.#properties.textAlign; }
    // get textAlignLast() { return this.#properties.textAlignLast; }
    // get textIndent() { return this.#properties.textIndent; }
    // get textTransform() { return this.#properties.textTransform; }
    // get lineBreak() { return this.#properties.lineBreak; }
    // get textOverflow() { return this.#properties.textOverflow; }
    // get textWrap() { return this.#properties.textWrap; }
    // get wordBreak() { return this.#properties.wordBreak; }
    // get textDecoration() { return this.#properties.textDecoration; }
    // get textEmphasis() { return this.#properties.textEmphasis; }
    // get textShadow() { return this.#properties.textShadow; }
    // get writingMode() { return this.#properties.writingMode; }
    // get textCombineUpright() { return this.#properties.textCombineUpright; }
    // get textOrientation() { return this.#properties.textOrientation; }
    // get webkitCSS() { return this.#properties.webkitCSS; }

    // getAllProperties() {
    //     return { ...this.#properties };
    // }
}
