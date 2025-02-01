import { View } from "../interface/view.js";

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

        super({
            child: child,
            margin: {
                top,
                right,
                bottom,
                left
            }
        });
    }

    createWrapView(){
        let margin = document.createElement("div");
        return margin;
    }

    styledView(element){
        element.style.marginTop = this.props.margin.top;
        element.style.marginRight = this.props.margin.right;
        element.style.marginBottom = this.props.margin.bottom;
        element.style.marginLeft = this.props.margin.left;

        return element;
    }

    build(){
        return this.props.child;
    }
}
