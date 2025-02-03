import { BaseCSS } from "../enums/baseCSS.js";
import { FontCSS } from "../enums/fontCSS.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { TextCSS } from "../enums/textCSS.js";
import { View } from "../interface/view.js";
import { Border } from "../models/border.js";
import { Card } from "./card.js";
import { Center } from "./center.js";
import { Column } from "./column.js";
import { ElevatedButton } from "./elevatedButton.js";
import { Margin } from "./margin.js";
import { Padding } from "./padding.js";
import { Row } from "./row.js";
import { SpaceBox } from "./spaceBox.js";
import { Text } from "./text.js";

export class ExpandsPanel extends View {
    constructor({
        title,
        child,
        duration = 300,
        panelItemBackGround = "white"
    }){
        super({
            title: title,
            child: child,
            duration: duration,
            panelItemBackGround: panelItemBackGround
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "100%";
        return element;
    }

    build(){
        const exItem = new _ExpandsPenelItem({
            duration: this.props.duration,
            child: new Card({
                background: this.props.panelItemBackGround,
                baseCSS: new BaseCSS({
                    width: "100%"
                }),
                elevation: ShadowLevel.LVL3,
                child: new Padding({
                    all: "32px",
                    child: this.props.child
                })
            })
        })
        
        return new Column([
            new Card({
                baseCSS: new BaseCSS({
                    width: "100%"
                }),
                elevation: ShadowLevel.LVL3,
                child: new Padding({
                    all: "32px",
                    child: new Row([
                        new Margin({
                            left: "32px",
                            child: new Center(
                                new Text(
                                    this.props.title,
                                    new TextCSS({
                                        fontCSS: new FontCSS({
                                            fontWeight: "bold"
                                        })
                                    })
                                ),
                            )
                        }),
                        new Margin({
                            right: "32px",
                            child: new Card({
                                radius: "16px",
                                child: new ElevatedButton({
                                    child: new Text("∨"),
                                    radius: "128px",
                                    baseCSS: new BaseCSS({
                                        padding: "8px"
                                    }),
                                    onClick: () => {
                                        this._slideToggle(
                                            document.getElementById(exItem.props.id),
                                            500
                                        )
                                    }
                                })
                            })
                        }),
                    ],{
                        isJustifySpaceBetween: true
                    })
                })
            }),
            exItem
        ])
    }

    _slideToggle(element){
        element.classList.toggle("open"); 

        if(element.classList.contains("open")){
           element.style.height = element.scrollHeight + 'px';
        }
        else{
           element.style.height = "0";
        }
    }
}

class _ExpandsPenelItem extends View {
    constructor({child, duration}){
        super({
            child: child,
            duration: duration
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.height = "0";
        element.style.overflow = "hidden";
        element.style.transition = "all " + this.props.duration + "ms";

        return element;
    }

    build(){
        return this.props.child;
    }
}
