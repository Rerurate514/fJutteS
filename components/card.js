import { View } from "../core/interface/view.js";
import { ShadowLevel } from '../enums/shadowLevel.js';
import { BaseCSS } from "../enums/baseCSS.js";
import { WebkitCSS } from "../enums/webkitCSS.js";

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

        super({
            child,
            radius, 
            baseCSS,
            background,
            elevation,
            webkitCSS
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = this.props.radius;
        if(this.props.background) element.style.background = this.props.background;
        element.style.boxShadow = this.props.elevation;

        element = this.props.baseCSS.applyCSS(element);
        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
