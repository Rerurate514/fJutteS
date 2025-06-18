import { View } from "../../core/interface/view.js";

export class CodeBlock extends View {
  constructor({ code, language, showLineNumbers }) {
    super();
    this.code = code;
    this.language = language || "plaintext";
    this.showLineNumbers = showLineNumbers || false;
  }


  build(){
    return new _Pre({
      code: this.code,
      language: this.language
    });
  }
}


class _Pre extends View {
  constructor({
    code, 
    language
  }){
    super();
    this.code = code;
    this.language = language || "plaintext";
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
    element.classList.add(`lang-${this.language}`);
    element.classList.add(`${this.language}`);

    element.innerHTML = this.code;
    return element;
  }
}
