import { View } from "../../core/interface/view.js";

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
            const valid = /^(?:(\d+(\.\d+)?)(px|rem|em|%|vh|vw)|initial)$/.test(value);
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

    styledView(element){
        this.child.view.style.paddingTop = this.props.padding.top;
        this.child.view.style.paddingRight = this.props.padding.right;
        this.child.view.style.paddingBottom = this.props.padding.bottom;
        this.child.view.style.paddingLeft = this.props.padding.left;

        return element;
    }

    build(){
        return this.props.child;
    }
}
