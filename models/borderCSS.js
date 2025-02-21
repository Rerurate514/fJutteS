export class BorderCSS {
    constructor({
        borderSize = "0px", 
        borderProperty = "solid",
        color = "transparent",
        radius = "0px",
        isTop = true,
        isLeft = true,
        isRight = true,
        isBottom = true
    
    } = {}){
        this.borderSize = borderSize;
        this.borderProperty = borderProperty;
        this.color = color;
        this.radius = radius;

        this.isTop = isTop;
        this.isLeft = isLeft;
        this.isRight = isRight;
        this.isBottom = isBottom;
    }

    applyCSS(element){
        const borderValue = this.assembleCSS();
        
        if (this.isTop) element.style.borderTop = borderValue;
        if (this.isRight) element.style.borderRight = borderValue;
        if (this.isBottom) element.style.borderBottom = borderValue;
        if (this.isLeft) element.style.borderLeft = borderValue;
        
        if (this.radius) element.style.borderRadius = this.radius;
        
        return element;
    }
}
