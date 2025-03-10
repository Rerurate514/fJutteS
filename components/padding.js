import { View } from "../core/interface/view.js";

export class Padding extends View {
    constructor({
        child,
        all,
        top = "0px",
        right = "0px",
        bottom = "0px",
        left = "0px"
    }){
        if (all !== undefined) {
            top = right = bottom = left = all;
        }

        const validatePadding = (value, direction) => {
            const valid = /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw)$/.test(value);
            if (!valid) {
                throw TypeError(`Paddingコンポーネントの${direction}プロパティには、有効なCSSの長さ単位が必要です。\n渡された値: ${value}`);
            }
        };

        validatePadding(top, 'top');
        validatePadding(right, 'right');
        validatePadding(bottom, 'bottom');
        validatePadding(left, 'left');

        super({
            child,
            padding: {
                top,
                right,
                bottom,
                left
            }
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.paddingTop = this.props.padding.top;
        element.style.paddingRight = this.props.padding.right;
        element.style.paddingBottom = this.props.padding.bottom;
        element.style.paddingLeft = this.props.padding.left;

        return element;
    }

    build(){
        return this.props.child;
    }
}
