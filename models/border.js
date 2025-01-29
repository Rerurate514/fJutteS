export class Border {
    constructor(
        borderSize = "0px", 
        borderProperty = "solid",
        color = "transparent",
        isTop = true,
        isLeft = true,
        isRight = true,
        isBottom = true
    ){
        this.borderSize = borderSize;
        this.borderProperty = borderProperty;
        this.color = color;

        this.isTop = isTop;
        this.isLeft = isLeft;
        this.isRight = isRight;
        this.isBottom = isBottom;
    }

    assembleCSS(){
        return this.borderSize + " " + this.borderProperty + " " + this.color;
    }
}
