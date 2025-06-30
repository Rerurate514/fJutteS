import { View } from "../../core/interface/view.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { BaseCSS } from "../../cssKit/baseCSS.js";
import { WebkitCSS } from "../../cssKit/webkitCSS.js";

export class Card extends View {
    constructor({
        child,
        radius = "inherit", 
        baseCSS = new BaseCSS({
            width: "inherit",
            height: "inherit"
        }),
        background = null,
        elevation = ShadowLevel.LVL0,
        webkitCSS = new WebkitCSS()
    }){
        if(!(elevation instanceof ShadowLevel)){
            throw TypeError("CardコンポーネントのElevationプロパティには、ShadowLevelクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        if(!(webkitCSS instanceof WebkitCSS)){
            throw TypeError("CardコンポーネントのwebkitCSSプロパティには、WebkitCSSクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        super();

        this.child = child;
        this.radius = radius;
        this.baseCSS = baseCSS;
        this.background = background;
        this.elevation = elevation;
        this.webkitCSS = webkitCSS;
    }

    styledView(element){
        element.style.borderRadius = this.radius;
        if(this.background) element.style.background = this.background;
        element.style.boxShadow = this.elevation;

        element = this.baseCSS.applyCSS(element);
        element = this.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.child;
    }
}
