import { BaseCSS } from "../../cssKit/baseCSS.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { View } from "../../core/interface/view.js";
import { Center } from "./center.js";
import { ElevatedButton } from "./elevatedButton.js";
import { Text } from "./text.js";

export class FloatingActionButton extends View {
    constructor({
       onClick: onClick = () => {}
    } = {}){
        super();
        this.onClick = onClick;
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        return element;
    }

    build(){
        return new _FlotingActionButton(
            this.onClick
        );
    }
}

class _FlotingActionButton extends View {
    constructor(onClick){
        super();
        this.onClick = onClick;
    }

    styledView(element){
        element.style.width = "64px";
        element.style.height = "64px";
        element.style.boxShadow = ShadowLevel.LVL4;
        element.style.borderRadius = "1024px";

        return element;
    }

    build(){
        return new ElevatedButton({
            onClick: this.onClick,
            baseCSS: new BaseCSS({
                width: "64px",
                height: "64px"
            }),
            radius: "1024px",
            child: new Center(
                new Text("+")
            )
        });
    }
}
