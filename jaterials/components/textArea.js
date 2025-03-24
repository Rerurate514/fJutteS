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
        super({
            provider,
            value,
            placeholder,
            maxLength,
            rows,
            cols,
            wrap,
            spellcheck,
            readonly,
            disabled,
            baseCSS
        });
    }

    createWrapView() {
        return document.createElement("textarea");
    }

    styledView(element) {
        element = this.props.baseCSS.applyCSS(element);

        element.value = this.props.value;
        element.placeholder = this.props.placeholder;

        if(this.props.maxLength) element.maxLength = this.props.maxLength;
        if(this.props.rows) element.rows = this.props.rows;
        if(this.props.cols) element.cols = this.props.cols;

        element.wrap = this.props.wrap;
        element.spellcheck = this.props.spellcheck;
        element.readOnly = this.props.readonly;
        element.disabled = this.props.disabled;

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
        if (!this.props.provider) return;

        this.props.provider.update(() => {
            return value;
        });
    }
}
