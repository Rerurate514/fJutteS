export class RelativePositions {
    static TOP = new RelativePositions('top');
    static TOP_RIGHT = new RelativePositions('top-right');
    static RIGHT = new RelativePositions('right');
    static BOTTOM_RIGHT = new RelativePositions('bottom-right');
    static BOTTOM = new RelativePositions('bottom');
    static BOTTOM_LEFT = new RelativePositions('bottom-left');
    static LEFT = new RelativePositions('left');
    static TOP_LEFT = new RelativePositions('top-left');
    static CENTER = new RelativePositions('center');

    constructor(value){
        this.value = value;
    }

    applyCSS(element) {
        switch (this.value) {
            case 'center': {
                element.style.margin = "auto";

                return element;
            }
            case 'top': {
                element.style.margin = "auto";
                element.style.marginTop = "0";

                return element;
            }
            case 'top-right': {
                element.style.margin = "auto";
                element.style.marginTop = "0";
                element.style.marginRight = "0";

                return element;
            }
            case 'right': {
                element.style.margin = "auto";
                element.style.marginRight = "0";

                return element;
            }
            case 'bottom-right': {
                element.style.margin = "auto";
                element.style.marginRight = "0";
                element.style.marginBottom = "0";

                return element;
            }
            case 'bottom': {
                element.style.margin = "auto";
                element.style.marginBottom = "0";

                return element;
            }
            case 'bottom-left': {
                element.style.margin = "auto";
                element.style.marginLeft = "0";
                element.style.marginBottom = "0";

                return element;
            }
            case 'left': {
                element.style.margin = "auto";
                element.style.marginLeft = "0";

                return element;
            }
            case 'top-left': {
                element.style.margin = "auto";
                element.style.marginTop = "0";
                element.style.marginLeft = "0";

                return element;
            }
            default: {
                throw new Error("RelativePositions must created by static method, RelativePositions.TOP, RelativePositions.BOTTOM, RelativePositions.RIGHT, etc");
            }
        }
    }
}
