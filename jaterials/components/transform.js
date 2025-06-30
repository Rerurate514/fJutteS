import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

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
        super();
        this.child = child;
        this.baseCSS = baseCSS;
        this.properties = {
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
            skewY
        };
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);
        
        element = this._applyTransformCSS(element);
        
        return element;
    }

    _applyTransformCSS(element) {
        const transforms = [];

        if (this.properties.translateX !== 0 || this.properties.translateY !== 0 || this.properties.translateZ !== 0) {
            transforms.push(`translate3d(${this.properties.translateX}px, ${this.properties.translateY}px, ${this.properties.translateZ}px)`);
        }
        
        if (this.properties.rotateX !== 0) {
            transforms.push(`rotateX(${this.properties.rotateX}deg)`);
        }
        if (this.properties.rotateY !== 0) {
            transforms.push(`rotateY(${this.properties.rotateY}deg)`);
        }
        if (this.properties.rotateZ !== 0) {
            transforms.push(`rotateZ(${this.properties.rotateZ}deg)`);
        }

        if (this.properties.scaleX !== 1 || this.properties.scaleY !== 1 || this.properties.scaleZ !== 1) {
            transforms.push(`scale3d(${this.properties.scaleX}, ${this.properties.scaleY}, ${this.properties.scaleZ})`);
        }
        
        if (this.properties.skewX !== 0 || this.properties.skewY !== 0) {
            transforms.push(`skew(${this.properties.skewX}deg, ${this.properties.skewY}deg)`);
        }
        
        if (transforms.length > 0) {
            element.style.transform = transforms.join(' ');
        }
        
        element.style.transformOrigin = 'center center';

        return element;
    }
    
    animate(properties, duration = 500, easing = 'ease') {
        if (!this.view) return this;
        
        Object.assign(this.properties, properties);
        
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
        return this.child;
    }
}
