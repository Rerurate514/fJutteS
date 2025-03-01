import { View } from "../interface/view.js";

export class ClippingText extends View {
  constructor({
    child,
    background = null
  }){
    super({
      child,
      background
    });
  }

  createWrapView(){
    return document.createElement("div");
  }

  styledView(element){
    element.style.width = "100%";
    element.style.height = "100%";

    element.style.webkitBackgroundClip = "text";

    if(this.props.background) element.style.background = this.props.background;

    return element;
  }

  build(){
    return this.props.child;
  }
}
