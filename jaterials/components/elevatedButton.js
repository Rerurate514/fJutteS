import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";
import { Center } from "./center.js";
import { Hover } from "./hover.js";
import { Padding } from "./padding.js";

export class ElevatedButton extends View {
    constructor({
        child,
        radius = "inherit",
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super({
            child,
            radius,
            baseCSS,
            onClick
        });
    }



    styledView(element){
        element.style.borderRadius = this.props.radius;
        element = this.props.baseCSS.applyCSS(element);

        element.style.padding = "0px";
        
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.props.onClick);
        
        return element;
    }

    build(){
        return new Center(
            new Hover({
                radius: this.props.radius,
                onClickEffect: true,
                child: new Padding({
                    all: this.props.baseCSS.padding,
                    child: this.props.child
                })
            })
        );
    }
}

// class _ElevatedButton extends View {
//     constructor({
//         child,
//         baseCSS,
//         onClick: onClick = () => {},
//     }){
//         super({
//             child: child,
//             baseCSS: baseCSS,
//             onClick: onClick
//         });
//     }

//     styledView(element){
//         element.style.borderRadius = "inherit";
//         element = this.props.baseCSS.applyCSS(element);
        
//         return element;
//     }

//     build(){
//         return this.props.child;
//     }
// }
