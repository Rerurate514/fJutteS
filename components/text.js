import { View } from "../interface/view.js";
import { TextCSS } from "../enums/textCSS.js";

export class Text extends View{
    constructor(
        text, 
        { textCSS = new TextCSS() }
    ){
        super({text: text, textCSS: textCSS});
    }

    createWrapView(){
        let p = document.createElement("p");
        return p;
    }

    styledView(element) {
        element.textContent = this.props.text;
        element.style.margin = "0";

        if(this.textCSS.fontCSS.color) element.style.color = this.textCSS.fontCSS.color;
        if(this.textCSS.fontCSS.fontStyle) element.style.fontStyle = this.textCSS.fontCSS.fontStyle;
        if(this.textCSS.fontCSS.fontWeight) element.style.fontWeight = this.textCSS.fontCSS.fontWeight;
        if(this.textCSS.fontCSS.fontSize) element.style.fontSize = this.textCSS.fontCSS.fontSize;
        if(this.textCSS.fontCSS.lineHeight) element.style.lineHeight = this.textCSS.fontCSS.lineHeight;
        if(this.textCSS.fontCSS.fontFamily) element.style.fontFamily = this.textCSS.fontCSS.fontFamily;

        if(this.textCSS.letterSpacing) element.style.letterSpacing = this.textCSS.letterSpacing;
        if(this.textCSS.textAlign) element.style.textAlign = this.textCSS.textAlign;
        if(this.textCSS.textAlignLast) element.style.textAlignLast = this.textCSS.textAlignLast;
        if(this.textCSS.textIndent) element.style.textIndent = `${this.textCSS.textIndent}px`;
        if(this.textCSS.textTransform) element.style.textTransform = this.textCSS.textTransform;
        if(this.textCSS.lineBreak) element.style.lineBreak = this.textCSS.lineBreak;
        if(this.textCSS.textOverflow) element.style.textOverflow = this.textCSS.textOverflow;
        if(this.textCSS.wordBreak) element.style.wordBreak = this.textCSS.wordBreak;
        if(this.textCSS.textDecoration) element.style.textDecoration = this.textCSS.textDecoration;
        if(this.textCSS.textEmphasis) element.style.textEmphasis = this.textCSS.textEmphasis;
        if(this.textCSS.textShadow) element.style.textShadow = this.textCSS.textShadow;
        if(this.textCSS.writingMode) element.style.writingMode = this.textCSS.writingMode;
        if(this.textCSS.textCombineUpright) element.style.textCombineUpright = this.textCSS.textCombineUpright;
        if(this.textCSS.textOrientation) element.style.textOrientation = this.textCSS.textOrientation;

        return element;
    }
}
