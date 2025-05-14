// export class RelativePositions {
//     static TOP = new RelativePositions('top');
//     static TOP_RIGHT = new RelativePositions('top-right');
//     static RIGHT = new RelativePositions('right');
//     static BOTTOM_RIGHT = new RelativePositions('bottom-right');
//     static BOTTOM = new RelativePositions('bottom');
//     static BOTTOM_LEFT = new RelativePositions('bottom-left');
//     static LEFT = new RelativePositions('left');
//     static TOP_LEFT = new RelativePositions('top-left');
//     static CENTER = new RelativePositions('center');

//     constructor(value){
//         this.value = value;
//     }

//     applyCSS(element) {
//         switch (this.value) {
//             case 'center': {
//                 element.style.margin = "auto";

//                 return element;
//             }
//             case 'top': {
//                 element.style.margin = "auto";
//                 element.style.marginTop = "0%";

//                 return element;
//             }
//             case 'top-right': {
//                 element.style.margin = "auto";
//                 element.style.marginTop = "0%";
//                 element.style.marginRight = "0%";

//                 return element;
//             }
//             case 'right': {
//                 element.style.margin = "auto";
//                 element.style.marginRight = "0%";

//                 return element;
//             }
//             case 'bottom-right': {
//                 element.style.margin = "auto";
//                 element.style.marginRight = "0%";
//                 element.style.marginBottom = "0%";

//                 return element;
//             }
//             case 'bottom': {
//                 element.style.margin = "auto";
//                 element.style.marginBottom = "0%";

//                 return element;
//             }
//             case 'bottom-left': {
//                 element.style.margin = "auto";
//                 element.style.marginLeft = "0%";
//                 element.style.marginBottom = "0%";

//                 return element;
//             }
//             case 'left': {
//                 element.style.margin = "auto";
//                 element.style.marginLeft = "0%";

//                 return element;
//             }
//             case 'top-left': {
//                 element.style.margin = "auto";
//                 element.style.marginTop = "0%";
//                 element.style.marginLeft = "0%";

//                 return element;
//             }
//             default: {
//                 throw new Error("RelativePositions must created by static method, RelativePositions.TOP, RelativePositions.BOTTOM, RelativePositions.RIGHT, etc");
//             }
//         }
//     }
// }

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

    constructor(value) {
        this.value = value;
    }

    applyCSS(element) {
        element.style.position = "absolute";
        
        switch (this.value) {
            case 'center': {
                element.style.top = "50%";
                element.style.left = "50%";
                element.style.transform = "translate(-50%, -50%)";
                break;
            }
            case 'top': {
                element.style.top = "0";
                element.style.left = "50%";
                element.style.transform = "translateX(-50%)";
                break;
            }
            case 'top-right': {
                element.style.top = "0";
                element.style.right = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case 'right': {
                element.style.top = "50%";
                element.style.right = "0";
                element.style.transform = "translateY(-50%)";
                break;
            }
            case 'bottom-right': {
                element.style.bottom = "0";
                element.style.right = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case 'bottom': {
                element.style.bottom = "0";
                element.style.left = "50%";
                element.style.transform = "translateX(-50%)";
                break;
            }
            case 'bottom-left': {
                element.style.bottom = "0";
                element.style.left = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case 'left': {
                element.style.top = "50%";
                element.style.left = "0";
                element.style.transform = "translateY(-50%)";
                break;
            }
            case 'top-left': {
                element.style.top = "0";
                element.style.left = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            default: {
                throw new Error("RelativePositions must created by static method, RelativePositions.TOP, RelativePositions.BOTTOM, RelativePositions.RIGHT, etc");
            }
        }
        
        return element;
    }
}
