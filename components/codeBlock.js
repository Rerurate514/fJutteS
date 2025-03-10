import { View } from "../interface/view.js";

export class CodeBlock extends View {
  constructor({ code, language, showLineNumbers }) {
    super({ code, language, showLineNumbers });
  }

  createWrapView() {
    return document.createElement("div");
  }

  build(){
    return new _Pre({
      code: this.props.code,
      language: this.props.language
    });
  }
}


class _Pre extends View {
  constructor({
    code, 
    language
  }){
    super({ code, language });
  }

  createWrapView(){
    return document.createElement("pre");
  }

  styledView(element){
    element.style.whiteSpace = "pre-wrap";

    return element;
  }

  build(){
    return new _Code(this.props);
  }
}

class _Code extends View {
  constructor({
    code, 
    language
  }){
    super({ code, language });
  }


  createWrapView(){
    return document.createElement("code");
  }

  styledView(element){
    element.classList.add(`lang-${this.props.language}`);
    element.classList.add(`${this.props.language}`);

    element.innerHTML = this.props.code;
    return element;
  }
}
