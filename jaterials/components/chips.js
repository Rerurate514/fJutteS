import { View } from "../../core/interface/view.js";
import { Text } from "./text.js";
import { Card } from "./card.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { BorderCSS } from "../../cssKit/borderCSS.js";

export class Chips extends View {
    constructor({
        text,
        background = null,
        borderCSS = new BorderCSS()
    }){
        super();
        this.text = text;
        this.background = background;
        this.borderCSS = borderCSS;
    }

    styledView(element){
        element.style.borderRadius = "32px";

        element.style.paddingLeft = "16px";
        element.style.paddingRight = "16px";

        element.style.overflow = "hidden";

        element.style.boxShadow = ShadowLevel.LVL3;

        if(this.background) element.style.background = this.background;

        element = this.borderCSS.applyCSS(element);

        return element;
    }

    build(){
        return new Card({
            background: this.background ?? "transparent",
            child: new Text(this.text)
        });
    }
}
