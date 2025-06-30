import { View } from "../../core/interface/view.js";

export class ClippingText extends View {
  constructor({
    child,
    background = null
  }){
    super();
    this.child = child;
    this.background = background;
  }

  styledView(element){
    element.style.width = "100%";
    element.style.height = "100%";

    element.style.webkitBackgroundClip = "text";

    if(this.background) element.style.background = this.background;

    return element;
  }

  build(){
    return this.child;
  }
}
