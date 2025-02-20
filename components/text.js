import { View } from "../interface/view.js";
import { TextCSS } from "../enums/textCSS.js";

export class Text extends View{
    constructor(
        text, 
        textCSS = new TextCSS(),
    ){
        super({text: text, textCSS: textCSS});
    }

    createWrapView(){
        return document.createElement("p");
    }

    styledView(element) {
        element.textContent = this.props.text;
        element.style.margin = "0";

        element = this.props.textCSS.applyCSS(element);

        if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);
        

        return element;
    }
}
