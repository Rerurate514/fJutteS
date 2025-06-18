import { View } from "../../core/interface/view.js";

export class Margin extends View {
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

        const validateMargin = (value, direction) => {
            const valid = /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw)$/.test(value);
            if (!valid) {
                throw TypeError(`Marginコンポーネントの${direction}プロパティには、有効なCSSの長さ単位が必要です。\n渡された値: ${value}`);
            }
        };

        validateMargin(top, 'top');
        validateMargin(right, 'right');
        validateMargin(bottom, 'bottom');
        validateMargin(left, 'left');

        super();
        this.child = child;
        this.margin = {
            top,
            right,
            bottom,
            left
        };
    }

    styledView(element){
        element.style.marginTop = this.margin.top;
        element.style.marginRight = this.margin.right;
        element.style.marginBottom = this.margin.bottom;
        element.style.marginLeft = this.margin.left;

        return element;
    }

    build(){
        return this.child;
    }
}
