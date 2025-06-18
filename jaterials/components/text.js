import { View } from "../../core/interface/view.js";
import { TextCSS } from "../../cssKit/textCSS.js";

export class Text extends View{
    constructor(
        text, 
        textCSS = new TextCSS(),
    ){
        super();
        this.text = text;
        this.textCSS = textCSS;
    }

    createWrapView(){
        return document.createElement("p");
    }

    styledView(element) {
        element.textContent = this.text;
        element.style.margin = "0";

        element = this.textCSS.applyCSS(element);

        if(this.textCSS.webkitCSS) element = this.textCSS.webkitCSS.applyCSS(element);
        

        return element;
    }
}
