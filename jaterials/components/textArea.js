import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class TextArea extends View {
    constructor({
        provider = null,
        value = "",
        placeholder = "",
        maxLength = null,
        rows = null,
        cols = null,
        wrap = "soft",
        spellcheck = false,
        readonly = false,
        disabled = false,
        baseCSS = new BaseCSS(),
    }) {
        super();
        this.provider = provider;
        this.value = value;
        this.placeholder = placeholder;
        this.maxLength = maxLength;
        this.rows = rows;
        this.cols = cols;
        this.wrap = wrap;
        this.spellcheck = spellcheck;
        this.readonly = readonly;
        this.disabled = disabled;
        this.baseCSS = baseCSS;
    }

    createWrapView() {
        return document.createElement("textarea");
    }

    styledView(element) {
        element = this.baseCSS.applyCSS(element);

        element.value = this.value;
        element.placeholder = this.placeholder;

        if(this.maxLength) element.maxLength = this.maxLength;
        if(this.rows) element.rows = this.rows;
        if(this.cols) element.cols = this.cols;

        element.wrap = this.wrap;
        element.spellcheck = this.spellcheck;
        element.readOnly = this.readonly;
        element.disabled = this.disabled;

        return element;
    }

    embedScriptToView(element) {
        element.addEventListener('input', () => {
            const currentValue = element.value;
            this.updateProvider(currentValue);
        });

        return element;
    }

    updateProvider(value) {
        if (!this.provider) return;

        this.provider.update(() => {
            return value;
        });
    }
}
