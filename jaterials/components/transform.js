import { BaseCSS } from "../cssKit/baseCSS.js";
import { View } from "../core/interface/view.js";

export class Transform extends View {
    constructor({
        child,
        baseCSS = new BaseCSS(),
        translateX = 0,
        translateY = 0,
        translateZ = 0,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        scaleX = 1,
        scaleY = 1,
        scaleZ = 1,
        skewX = 0,
        skewY = 0,
    } = {}){
        super({
            child,
            baseCSS,
            translateX,
            translateY,
            translateZ,
            rotateX,
            rotateY,
            rotateZ,
            scaleX,
            scaleY,
            scaleZ,
            skewX,
            skewY,
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);
        
        element = this._applyTransformCSS(element);
        
        return element;
    }

    _applyTransformCSS(element) {
        const transforms = [];

        if (this.props.translateX !== 0 || this.props.translateY !== 0 || this.props.translateZ !== 0) {
            transforms.push(`translate3d(${this.props.translateX}px, ${this.props.translateY}px, ${this.props.translateZ}px)`);
        }
        
        if (this.props.rotateX !== 0) {
            transforms.push(`rotateX(${this.props.rotateX}deg)`);
        }
        if (this.props.rotateY !== 0) {
            transforms.push(`rotateY(${this.props.rotateY}deg)`);
        }
        if (this.props.rotateZ !== 0) {
            transforms.push(`rotateZ(${this.props.rotateZ}deg)`);
        }

        if (this.props.scaleX !== 1 || this.props.scaleY !== 1 || this.props.scaleZ !== 1) {
            transforms.push(`scale3d(${this.props.scaleX}, ${this.props.scaleY}, ${this.props.scaleZ})`);
        }
        
        if (this.props.skewX !== 0 || this.props.skewY !== 0) {
            transforms.push(`skew(${this.props.skewX}deg, ${this.props.skewY}deg)`);
        }
        
        if (transforms.length > 0) {
            element.style.transform = transforms.join(' ');
        }
        
        element.style.transformOrigin = 'center center';

        return element;
    }
    
    animate(properties, duration = 500, easing = 'ease') {
        if (!this.view) return this;
        
        Object.assign(this.props, properties);
        
        this.view.style.transition = `transform ${duration}ms ${easing}`;
        
        this.view.addEventListener('transitionend', () => {
            this.view.style.transition = '';
            this._applyTransformCSS(this.view);
        }, { once: true });
        
        requestAnimationFrame(() => {
            this._applyTransformCSS(this.view);
        });
    
        return this;
    }
    
    build(){
        return this.props.child;
    }
}
