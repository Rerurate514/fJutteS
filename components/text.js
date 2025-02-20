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

        if(this.props.textCSS.fontCSS.color) element.style.color = this.props.textCSS.fontCSS.color;
        if(this.props.textCSS.fontCSS.fontStyle) element.style.fontStyle = this.props.textCSS.fontCSS.fontStyle;
        if(this.props.textCSS.fontCSS.fontWeight) element.style.fontWeight = this.props.textCSS.fontCSS.fontWeight;
        if(this.props.textCSS.fontCSS.fontSize) element.style.fontSize = this.props.textCSS.fontCSS.fontSize;
        if(this.props.textCSS.fontCSS.lineHeight) element.style.lineHeight = this.props.textCSS.fontCSS.lineHeight;
        if(this.props.textCSS.fontCSS.fontFamily) element.style.fontFamily = this.props.textCSS.fontCSS.fontFamily;

        if(this.props.textCSS.letterSpacing) element.style.letterSpacing = this.props.textCSS.letterSpacing;
        if(this.props.textCSS.textAlign) element.style.textAlign = this.props.textCSS.textAlign;
        if(this.props.textCSS.textAlignLast) element.style.textAlignLast = this.props.textCSS.textAlignLast;
        if(this.props.textCSS.textIndent) element.style.textIndent = `${this.props.textCSS.textIndent}px`;
        if(this.props.textCSS.textTransform) element.style.textTransform = this.props.textCSS.textTransform;
        if(this.props.textCSS.lineBreak) element.style.lineBreak = this.props.textCSS.lineBreak;
        if(this.props.textCSS.textOverflow) element.style.textOverflow = this.props.textCSS.textOverflow;
        if(this.props.textCSS.wordBreak) element.style.wordBreak = this.props.textCSS.wordBreak;
        if(this.props.textCSS.textDecoration) element.style.textDecoration = this.props.textCSS.textDecoration;
        if(this.props.textCSS.textEmphasis) element.style.textEmphasis = this.props.textCSS.textEmphasis;
        if(this.props.textCSS.textShadow) element.style.textShadow = this.props.textCSS.textShadow;
        if(this.props.textCSS.writingMode) element.style.writingMode = this.props.textCSS.writingMode;
        if(this.props.textCSS.textCombineUpright) element.style.textCombineUpright = this.props.textCSS.textCombineUpright;
        if(this.props.textCSS.textOrientation) element.style.textOrientation = this.props.textCSS.textOrientation;

        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }
}
