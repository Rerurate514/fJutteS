export default class Text extends View{
    constructor(text, color = "black", isFontWeight = false){
        super({text: text, color: color, isFontWeight: isFontWeight});
    }

    createWrapView(){
        let p = document.createElement("p");
        return p;
    }

    styledView(element){
        element.textContent = this.props.text;
        element.style.margin = "0";
        element.style.color = this.props.color;
        if(this.props.isFontWeight) element.style.fontWeight = 'bold';
        return element;
    }
}
