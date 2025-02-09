"use strict";function generateUUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}Object.defineProperty(exports,"__esModule",{value:!0});class View{isLogOut=!1;constructor(e={}){if(this.constructor===View)throw new TypeError("このクラスをインスタンス化しないでください。");this._isViewBuilt=!1,this.props=e,this._createId(),this.initialize(),this.preBuild();let t=this.build();this.child=t,this.postBuild(),this.terminate();let r=this._assembleWrapView();this.viewCache=r.cloneNode(!0),this._inputViewData(t,r),this._attributeViewNameToDataset(),this._isViewBuilt=!0}_assembleWrapView(){let e=this.createWrapView();this._checkHTMLElement(e,"createWrapView");let t=this.styledView(e);this._checkHTMLElement(t,"styledView");let r=this.embedScriptToView(t);return this._checkHTMLElement(r,"embedScriptToView"),r}addPseudoElement(){this.child instanceof View&&this.child.addPseudoElement(),this.child instanceof Array&&this.child.forEach((e=>{e.addPseudoElement()}));let e=this.createBeforeElement(),t=this.createAfterElement();e&&(this._checkHTMLElement(e,"createBeforeElement"),this.view.before(e)),t&&(this._checkHTMLElement(t,"createAfterElement"),this.view.after(t))}createBeforeElement(){return null}createAfterElement(){return null}_checkHTMLElement(e,t){if(!(e instanceof HTMLElement))throw new TypeError(t+"には必ずHTMLElenmentオブジェクトを格納してください。 渡された型:",typeof e)}getBuildCompletionState(){return this._isViewBuilt}createWrapView(){throw new TypeError("createWrapViewメソッドを必ずオーバーライドして、HTMLElement型を返り値に設定してください。")}styledView(e){return e}embedScriptToView(e){return e}build(){}preBuild(){}postBuild(){}initialize(){}terminate(){}onDispose(){}_dispose(){this.onDispose()}rebuild(e){void 0!==e&&(this.props=e),this.preBuild();let t=document.getElementById(`${this.view.id}`);null!=t&&(this._inputViewData(this.build(),this.viewCache.cloneNode(!0)),t.replaceWith(this.view),this._log("rebuildされました : View name => "+this.constructor.name+"\nViewID => "+this.view.id),this.postBuild())}_inputViewData(e,t){e instanceof Array?this._inputMultiView(e,t):this._inputSingleView(e,t),this._attributeId()}_inputSingleView(e,t){this.view=t,e&&this.view.appendChild(e.view)}_inputMultiView(e,t){this.view||(this.view=t),e.forEach((e=>{e&&this.view.appendChild(e.view)}))}_createId(){this.props.id=generateUUID()}_attributeId(){this.view.id=this.props.id}_attributeViewNameToDataset(){this.view.dataset.viewClassName=this.constructor.name}_log(e){this.isLogOut&&console.log("["+this.constructor.name+"] "+e)}}class ProviderScope extends View{constructor({child:e,props:t={},watchingProviders:r=[]}){t.providers=r,t.child=e,super(t),this._iterateProviders()}_iterateProviders(){this.props.providers.forEach((e=>{this._watch(e)}))}_watch(e){e.watch((()=>{this.rebuild()}),{immediate:!1})}}class ProviderObserver{constructor(){return ProviderObserver.instance||(ProviderObserver.instance=this,this.dependencyGraph=new Map,this.updateHistory=[]),ProviderObserver.instance}outLogs(e=!0){this._isOutedLog=e}addDependency(e,t){this.dependencyGraph.has(e)||this.dependencyGraph.set(e,new Set),this.dependencyGraph.get(e).add(t),this.log(`Dependency added: ${this._getProviderInfo(e)} depends on ${this._getProviderInfo(t)}`)}deleteDependency(e,t){this.dependencyGraph.has(e)||this.dependencyGraph.get(e).delete(t),this.log(`Dependency deleted: ${this._getProviderInfo(e)} unsubscribed ${this._getProviderInfo(t)}`)}logUpdate(e,t,r){const s={timestamp:new Date,provider:e.name,oldValue:t,newValue:r,stackTrace:this._getStackTrace()};this.updateHistory.push(s),this.log(`Update: ${s.provider} changed from ${JSON.stringify(t)} to ${JSON.stringify(r)}`)}getDependencyGraph(){const e={};return this.dependencyGraph.forEach(((t,r)=>{e[this._getProviderInfo(r)]=Array.from(t).map((e=>this._getProviderInfo(e)))})),e}getAllUpdateHistory(){return this.updateHistory}getFilteredUpdateHistory(e){return this.updateHistory.filter((t=>t.provider===this._getProviderInfo(e)))}_getProviderInfo(e){return e.constructor.name+":"+e.name}_getStackTrace(){return(new Error).stack}log(e){this._isOutedLog&&console.log(`[ProviderObserver] ${e}`)}static clearInstance(){ProviderObserver.instance=null}}class Provider{constructor(e){this._dependencies=new Map,this._listeners=new Set,this._core=new ProviderCore(e)}static createProvider(e,t=null){let r=new Provider(e);return r._setName(t),r}_setName(e){this.name=e||Math.random().toString(36).substr(2,9)}read(){if(!this._core.isInitialized){const e=this._createRef();this._core.value=this._core.create(e),this._core.isInitialized=!0}return this._core.value}watch(e,{immediate:t=!0}={}){return this._listeners.add(e),t&&e(this.read()),()=>{this._listeners.delete(e)}}update(e){const t=this.read(),r=e(t);(new ProviderObserver).logUpdate(this,t,r),this._core.value=r,this._notifyListeners(r)}_notifyListeners(e){this._listeners.forEach((t=>t(e)))}_createRef(){const e=new ProviderObserver;return{read:e=>e.read(),update:t=>{const r=this.read();this.update(t);const s=this.read();e.logUpdate(this,r,s)},watch:(e,t)=>{(new ProviderObserver).addDependency(this,e),this._dependencies.set(e,new Dependency(e,this,t))}}}unsubscribedDependency(e){const t=new ProviderObserver;this._dependencies[e].unsubscribedParent(),this._dependencies.delete(e),t.deleteDependency(this.parentProvider)}}class ProviderCore{constructor(e){this.create=e,this.value=null,this.isInitialized=!1}}class Dependency{constructor(e,t,r){this.parentProvider=e,this.provider=t,this._listenParent(r)}printDependency(){console.log(this.provider+" depends on "+this.parentProvider)}_listenParent(e){this._unsubscribed=this.parentProvider.watch((t=>{this.provider.update((r=>e(t,r)))}),{immediate:!1})}unsubscribedParent(){this._unsubscribed()}}class ShadowLevel{static LVL0=new ShadowLevel("none");static LVL1=new ShadowLevel("0px 0px 4px rgba(0,0,0,0.1)");static LVL2=new ShadowLevel("0px 0px 8px rgba(0,0,0,0.12)");static LVL3=new ShadowLevel("0px 0px 16px rgba(0,0,0,0.14)");static LVL4=new ShadowLevel("0px 0px 24px rgba(0,0,0,0.16)");static LVL5=new ShadowLevel("0px 0px 32px rgba(0,0,0,0.18)");static LVL6=new ShadowLevel("0px 0px 40px rgba(0,0,0,0.20)");static LVL7=new ShadowLevel("0px 0px 48px rgba(0,0,0,0.22)");static LVL8=new ShadowLevel("0px 0px 56px rgba(0,0,0,0.24)");static LVL9=new ShadowLevel("0px 0px 64px rgba(0,0,0,0.26)");static LVL10=new ShadowLevel("0px 0px 72px rgba(0,0,0,0.28)");constructor(e){this.value=e}toString(){return this.value}}class Border{constructor({borderSize:e="0px",borderProperty:t="solid",color:r="transparent",isTop:s=!0,isLeft:i=!0,isRight:o=!0,isBottom:n=!0}={}){this.borderSize=e,this.borderProperty=t,this.color=r,this.isTop=s,this.isLeft=i,this.isRight=o,this.isBottom=n}assembleCSS(){return this.borderSize+" "+this.borderProperty+" "+this.color}}class BaseCSS{#e={};constructor({width:e=null,height:t=null,margin:r=null,padding:s=null,border:i=null}={}){let o=null;i&&(o=i.assembleCSS()),this.#e={width:e,height:t,margin:r,padding:s,assembledBorder:o}}applyCSS(e){return this.#e.width&&(e.style.width=this.#e.width),this.#e.height&&(e.style.height=this.#e.height),this.#e.margin&&(e.style.margin=this.#e.margin),this.#e.padding&&(e.style.padding=this.#e.padding),this.#e.assembledBorder&&(e.style.border=this.#e.assembledBorder),e}get width(){return this.#e.width}get height(){return this.#e.height}get margin(){return this.#e.margin}get padding(){return this.#e.padding}get assembledBorder(){return this.#e.assembledBorder}}class Card extends View{constructor({child:e,radius:t="inherit",baseCSS:r=new BaseCSS({width:"inherit",height:"inherit"}),background:s=null,elevation:i=ShadowLevel.LVL0,border:o=new Border}){if(!(i instanceof ShadowLevel))throw TypeError("CardコンポーネントのElevationプロパティには、ShadowLevelクラスのみ受け付けています。\n渡された型:"+typeof i);if(!(o instanceof Border))throw TypeError("Cardコンポーネントのborderプロパティには、Borderクラスのみ受け付けています。\n渡された型:"+typeof i);super({child:e,radius:t,baseCSS:r,background:s,elevation:i,border:o.assembleCSS()})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.borderRadius=this.props.radius,this.props.background&&(e.style.background=this.props.background),e.style.boxShadow=this.props.elevation,e.style.border=this.props.border,e=this.props.baseCSS.applyCSS(e)}build(){return this.props.child}}class Center extends View{constructor(e){super({child:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width="100%",e.style.height="100%",e.style.textAlign="center",e.style.justifyContent="center",e.style.display="flex",e.style.alignItems="center",e.style.borderRadius="inherit",e}build(){return new _Center(this.props.child)}}class _Center extends View{constructor(e){super({child:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width="fit-content",e.style.height="fit-content",e.style.margin="auto",e.style.borderRadius="inherit",e}build(){return this.props.child}}class Column extends View{constructor(e){super({children:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.display="flex",e.style.flexDirection="column",e}build(){return this.props.children}}class _PositionChild extends View{constructor({child:e,top:t=0,left:r=0}){super({child:e,top:t,left:r})}createWrapView(){return document.createElement("div")}styledView(e){return e.className="pos-wrapper",e.style.width="100%",e.style.height="100%",e.style.position="relative",e.className="pos",e.style.top=this.props.top+"px",e.style.left=this.props.left+"px",e}build(){return this.props.child}}class Row extends View{constructor(e,{isAlignCenter:t=!1,isJustifySpaceAround:r=!1,isJustifySpaceBetween:s=!1}={}){super({children:e,isAlignCenter:t,isJustifySpaceAround:r,isJustifySpaceBetween:s})}createWrapView(){return document.createElement("div")}styledView(e){return e.className="row-container",e.style.display="flex",this.props.isAlignCenter&&(e.style.justifyContent="center"),this.props.isJustifySpaceAround&&(e.style.justifyContent="space-around"),this.props.isJustifySpaceBetween&&(e.style.justifyContent="space-between"),e}build(){return this.props.children}}class FontCSS{#e={};constructor({color:e=null,fontStyle:t=null,fontWeight:r=null,fontSize:s=null,lineHeight:i=null,fontFamily:o=null}={}){this.#e={color:e,fontStyle:t,fontWeight:r,fontSize:s,lineHeight:i,fontFamily:o}}get color(){return this.#e.color}get fontStyle(){return this.#e.fontStyle}get fontWeight(){return this.#e.fontWeight}get fontSize(){return this.#e.fontSize}get lineHeight(){return this.#e.lineHeight}get fontFamily(){return this.#e.fontFamily}getAllProperties(){return{...this.#e}}}class TextCSS{#e={};constructor({fontCSS:e=new FontCSS,letterSpacing:t=null,textAlign:r=null,textAlignLast:s=null,textIndent:i=null,textTransform:o=null,lineBreak:n=null,textOverflow:p=null,textWrap:l=null,wordBreak:d=null,textDecoration:a=null,textEmphasis:h=null,textShadow:c=null,writingMode:u=null,textCombineUpright:w=null,textOrientation:x=null}={}){this.#e={fontCSS:e,letterSpacing:t,textAlign:r,textAlignLast:s,textIndent:i,textTransform:o,lineBreak:n,textOverflow:p,textWrap:l,wordBreak:d,textDecoration:a,textEmphasis:h,textShadow:c,writingMode:u,textCombineUpright:w,textOrientation:x}}get fontCSS(){return this.#e.fontCSS}get letterSpacing(){return this.#e.letterSpacing}get textAlign(){return this.#e.textAlign}get textAlignLast(){return this.#e.textAlignLast}get textIndent(){return this.#e.textIndent}get textTransform(){return this.#e.textTransform}get lineBreak(){return this.#e.lineBreak}get textOverflow(){return this.#e.textOverflow}get textWrap(){return this.#e.textWrap}get wordBreak(){return this.#e.wordBreak}get textDecoration(){return this.#e.textDecoration}get textEmphasis(){return this.#e.textEmphasis}get textShadow(){return this.#e.textShadow}get writingMode(){return this.#e.writingMode}get textCombineUpright(){return this.#e.textCombineUpright}get textOrientation(){return this.#e.textOrientation}getAllProperties(){return{...this.#e}}}class Text extends View{constructor(e,t=new TextCSS){super({text:e,textCSS:t})}createWrapView(){return document.createElement("p")}styledView(e){return e.textContent=this.props.text,e.style.margin="0",this.props.textCSS.fontCSS.color&&(e.style.color=this.props.textCSS.fontCSS.color),this.props.textCSS.fontCSS.fontStyle&&(e.style.fontStyle=this.props.textCSS.fontCSS.fontStyle),this.props.textCSS.fontCSS.fontWeight&&(e.style.fontWeight=this.props.textCSS.fontCSS.fontWeight),this.props.textCSS.fontCSS.fontSize&&(e.style.fontSize=this.props.textCSS.fontCSS.fontSize),this.props.textCSS.fontCSS.lineHeight&&(e.style.lineHeight=this.props.textCSS.fontCSS.lineHeight),this.props.textCSS.fontCSS.fontFamily&&(e.style.fontFamily=this.props.textCSS.fontCSS.fontFamily),this.props.textCSS.letterSpacing&&(e.style.letterSpacing=this.props.textCSS.letterSpacing),this.props.textCSS.textAlign&&(e.style.textAlign=this.props.textCSS.textAlign),this.props.textCSS.textAlignLast&&(e.style.textAlignLast=this.props.textCSS.textAlignLast),this.props.textCSS.textIndent&&(e.style.textIndent=`${this.props.textCSS.textIndent}px`),this.props.textCSS.textTransform&&(e.style.textTransform=this.props.textCSS.textTransform),this.props.textCSS.lineBreak&&(e.style.lineBreak=this.props.textCSS.lineBreak),this.props.textCSS.textOverflow&&(e.style.textOverflow=this.props.textCSS.textOverflow),this.props.textCSS.wordBreak&&(e.style.wordBreak=this.props.textCSS.wordBreak),this.props.textCSS.textDecoration&&(e.style.textDecoration=this.props.textCSS.textDecoration),this.props.textCSS.textEmphasis&&(e.style.textEmphasis=this.props.textCSS.textEmphasis),this.props.textCSS.textShadow&&(e.style.textShadow=this.props.textCSS.textShadow),this.props.textCSS.writingMode&&(e.style.writingMode=this.props.textCSS.writingMode),this.props.textCSS.textCombineUpright&&(e.style.textCombineUpright=this.props.textCSS.textCombineUpright),this.props.textCSS.textOrientation&&(e.style.textOrientation=this.props.textCSS.textOrientation),e}}class Hover extends View{constructor({child:e,radius:t="inherit",shadow:r=ShadowLevel.LVL5,clickEffect:s=!1}){super({child:e,radius:t,shadow:r,clickEffect:s})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.display="inline-block",e.style.width="fit-content",e.style.height="fit-content",e.style.position="relative",e.style.background="transparent",e.style.borderRadius=this.props.radius,e}build(){return new _Hover(this.props)}}class _Hover extends View{constructor({child:e,radius:t="inherit",shadow:r=ShadowLevel.LVL5,clickEffect:s=!1}){super({child:e,radius:t,shadow:r,clickEffect:s})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.display="inline-block",e.style.width="fit-content",e.style.height="fit-content",e.style.borderRadius=this.props.radius,e.style.background="transparent",e}createAfterElement(){let e=document.createElement("div");return e.content="",e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.background="rgb(0, 0, 0, 0)",e.style.mixBlendMode="difference",e.style.transition="background-color 0.4s",e.style.zIndex=999,e.style.borderRadius=parseInt(this.props.radius,10)+"px",e.style.width="100%",e.style.height="100%",e.addEventListener("mouseenter",(()=>{e.style.background="rgb(100, 100, 100, 0.4)",this.entered=!0})),e.addEventListener("mouseleave",(()=>{e.style.background="rgb(0, 0, 0, 0)",this.entered=!1})),this.props.clickEffect?(e.addEventListener("click",(()=>{e.style.background="rgb(100, 100, 100, 0.9)",this.isExecutable=!1,setInterval((()=>{this.entered?e.style.background="rgb(100, 100, 100, 0.4)":e.style.background="rgb(0, 0, 0, 0)",this.isExecutable=!0}),1e3)})),e):e}build(){return this.props.child}}class ElevatedButton extends View{constructor({child:e,radius:t="inherit",baseCSS:r=new BaseCSS,onClick:s=()=>{}}){super({child:e,radius:t,baseCSS:r,onClick:s})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.borderRadius=this.props.radius,e}embedScriptToView(e){return e.addEventListener("click",this.props.onClick),e}build(){return new Hover({radius:this.props.radius,child:new _ElevatedButton(this.props)})}}class _ElevatedButton extends View{constructor({child:e,baseCSS:t=new BaseCSS,onClick:r=()=>{}}){super({child:e,baseCSS:t,onClick:r})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.borderRadius="inherit",e=this.props.baseCSS.applyCSS(e)}embedScriptToView(e){return e}build(){return this.props.child}}class _FlotingActionButton extends View{constructor(e){super({onClick:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width="64px",e.style.height="64px",e.style.boxShadow=ShadowLevel.LVL4,e.style.borderRadius="1024px",e}build(){return new ElevatedButton({onClick:this.props.onClick,baseCSS:new BaseCSS({width:"64px",height:"64px"}),radius:"1024px",child:new Center(new Text("+"))})}}class CustomError extends Error{constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}function assembleView(e){let t=e.view,r=document.getElementById("fJutteS-Container");return null!=r&&r.appendChild(t),e.addPseudoElement(),t}exports.BaseCSS=BaseCSS,exports.Border=Border,exports.Box=class extends View{constructor({width:e="0px",height:t="0px",border:r=new Border,child:s=null}){super({width:e,height:t,border:r,child:s})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width=this.props.width,e.style.height=this.props.height,e=this._styleBorder(e)}_styleBorder(e){let t=this.props.border;return t.isTop&&(e.style.borderTop=t.assembleCSS()),t.isLeft&&(e.style.borderLeft=t.assembleCSS()),t.isRight&&(e.style.borderRight=t.assembleCSS()),t.isBottom&&(e.style.borderBottom=t.assembleCSS()),e}build(){return this.props.child}},exports.Card=Card,exports.Center=Center,exports.Chips=class extends View{constructor({text:e,background:t=null,border:r=new Border}){super({text:e,background:t,border:r.assembleCSS()})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.borderRadius="32px",e.style.paddingLeft="16px",e.style.paddingRight="16px",e.style.border=this.props.border,e.style.overflow="hidden",e.style.boxShadow=ShadowLevel.LVL3,this.props.background&&(e.style.background=this.props.background),e}build(){return new Card({background:this.props.background??"transparent",child:new Text(this.props.text)})}},exports.Clip=class extends View{constructor({child:e,baseCSS:t=new BaseCSS}){super({child:e,baseCSS:t})}createWrapView(){return document.createElement("div")}styledView(e){return(e=this.props.baseCSS.applyCSS(e)).style.overflow="hidden",e}build(){return this.props.child}},exports.Column=Column,exports.CreateIllegalInstanceError=class extends CustomError{constructor(e){super("このクラス("+e+")はインスタンス化してはいけません。"),this.classType=e}},exports.CustomError=CustomError,exports.DropDownMenu=class extends View{constructor({item:e=[],baseCSS:t=new BaseCSS,provider:r}){super({item:e,baseCSS:t,provider:r})}createWrapView(){return document.createElement("select")}styledView(e){return e=this.props.baseCSS.applyCSS(e)}embedScriptToView(e){return e.addEventListener("change",(e=>{this.props.provider.update((()=>e.target.value))})),e}build(){return this.props.item}},exports.DropDownMenuItem=class extends View{constructor({text:e,value:t}){super({text:e,value:t})}createWrapView(){return document.createElement("option")}styledView(e){return e.textContent=this.props.text,e.value=this.props.value,e}},exports.DynamicProviderScope=class extends View{constructor({child:e,props:t={}}){t.child=e,t.providers=[],super(t)}createProvider(e){let t=Provider.createProvider((t=>e));return this.props.providers.push(t),t}refreshProviders(){if(!this.getBuildCompletionState())throw new IllegalPreBuildDoSomothingError("Viewの構築プロセスが終了するまでrefreshProvidersメソッドを呼び出さないでください。\nView構築プロセス状態 >>> isViewAssembleProccessesCompleted = "+this.getBuildCompletionState());this.rebuild(this.props)}},exports.ElevatedButton=ElevatedButton,exports.FloatingActionButton=class extends View{constructor({onClick:e=()=>{}}={}){super({onClick:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width="fit-content",e.style.height="fit-content",e}build(){return new _FlotingActionButton(this.props.onClick)}},exports.FontCSS=FontCSS,exports.Hover=Hover,exports.IllegalPreBuildDoSomothingError=class extends CustomError{constructor(e){super("Viewの構築プロセスが終了するまで以下の操作を行ってはなりません。\n\n"+e+"\n\nまたViewの構築プロセスが終了したかはgetBuildCompletionStateメソッドにて取得することができます。\n\nstackTrace:")}},exports.Image=class extends View{constructor({src:e="",alt:t="",title:r="",baseCSS:s=new BaseCSS}){super({src:e,alt:t,title:r,baseCSS:s})}createWrapView(){return document.createElement("img")}styledView(e){return(e=this.props.baseCSS.applyCSS(e)).src=this.props.src,e.alt=this.props.alt,e.title=this.props.title,e}},exports.Link=class extends View{constructor({child:e,href:t,rel:r=null,target:s=null,isDownload:i=!1}){super({child:e,href:t,rel:r,target:s,isDownload:i})}createWrapView(){return document.createElement("a")}styledView(e){return e.href=this.props.href,this.props.isDownload&&(e.download="download"),this.props.rel&&(e.rel=this.props.rel),this.props.target&&(e.target=this.props.target),e}build(){return this.props.child}},exports.Margin=class extends View{constructor({child:e,all:t,top:r="0px",right:s="0px",bottom:i="0px",left:o="0px"}){void 0!==t&&(r=s=i=o=t);const validateMargin=(e,t)=>{if(!/^(\d+(\.\d+)?)(px|rem|em|%|vh|vw)$/.test(e))throw TypeError(`Marginコンポーネントの${t}プロパティには、有効なCSSの長さ単位が必要です。\n渡された値: ${e}`)};validateMargin(r,"top"),validateMargin(s,"right"),validateMargin(i,"bottom"),validateMargin(o,"left"),super({child:e,margin:{top:r,right:s,bottom:i,left:o}})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.marginTop=this.props.margin.top,e.style.marginRight=this.props.margin.right,e.style.marginBottom=this.props.margin.bottom,e.style.marginLeft=this.props.margin.left,e}build(){return this.props.child}},exports.OverridePreBuildMethodInProviderScopeError=class extends CustomError{constructor(e){super("In "+e+"クラス, ProviderScopeを継承したクラス内ではpreBuildメソッドが継承できません。\n代わりに同じ動作を持つpreBuildScopeメソッドを継承してください。"),this.viewName=e}},exports.Padding=class extends View{constructor({child:e,all:t,top:r="0px",right:s="0px",bottom:i="0px",left:o="0px"}){void 0!==t&&(r=s=i=o=t);const validatePadding=(e,t)=>{if(!/^(\d+(\.\d+)?)(px|rem|em|%|vh|vw)$/.test(e))throw TypeError(`Paddingコンポーネントの${t}プロパティには、有効なCSSの長さ単位が必要です。\n渡された値: ${e}`)};validatePadding(r,"top"),validatePadding(s,"right"),validatePadding(i,"bottom"),validatePadding(o,"left"),super({child:e,padding:{top:r,right:s,bottom:i,left:o}})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.paddingTop=this.props.padding.top,e.style.paddingRight=this.props.padding.right,e.style.paddingBottom=this.props.padding.bottom,e.style.paddingLeft=this.props.padding.left,e}build(){return this.props.child}},exports.Position=class extends View{constructor({child:e,top:t=0,left:r=0}){super({child:e,top:t,left:r})}createWrapView(){return document.createElement("div")}styledView(e){return e.className="pos-wrapper",e.style.width="100%",e.style.height="100%",e}build(){return new _PositionChild({child:this.props.child,top:this.props.top,left:this.props.left})}},exports.Provider=Provider,exports.ProviderObserver=ProviderObserver,exports.ProviderScope=ProviderScope,exports.RadioButton=class extends ProviderScope{constructor({labelText:e,name:t="",checkedRadioButton:r=()=>{},providers:s=null,isDisplay:i=!0,isChecked:o=!1}){super({watchingProviders:s??[],props:{labelText:e,name:t,checkedRadioButton:r,isDisplay:i,isChecked:o}})}createWrapView(){let e=document.createElement("label"),t=document.createElement("input");e.appendChild(t);const r=document.createTextNode(this.props.labelText);return e.appendChild(r),e}styledView(e){return e.firstElementChild.type="radio",e.firstElementChild.name=this.props.name,this.props.isDisplay||(e.firstElementChild.style.display="none"),e.firstElementChild.checked=this.props.isChecked,e}embedScriptToView(e){return this._setEventListenerToRadioBtn(e),e}_setEventListenerToRadioBtn(e){e.addEventListener("change",(t=>{t.target.checked&&this.props.checkedRadioButton(e,t)}))}},exports.Row=Row,exports.ShadowLevel=ShadowLevel,exports.SimpleDialog=class extends View{constructor({child:e,cancelText:t,okText:r,onCancelClickedFn:s=()=>{},onOkClickedFn:i=()=>{}}){super({child:e,cancelText:t,okText:r,onCancelClickedFn:s,onOkClickedFn:i})}createWrapView(){return document.createElement("dialog")}styledView(e){return e}build(){return new Column([this.props.child,new Row([new ElevatedButton({child:this.props.cancelText??new Text("cancel"),onClick:()=>{this.props.onCancelClickedFn(),this.closeModal()}}),new ElevatedButton({child:this.props.okText??new Text("ok"),onClick:()=>{this.props.onOkClickedFn(),this.closeModal()}})],{isAlignCenter:!0})])}openModal(){document.body.appendChild(this.view),this.view.showModal(),this.addPseudoElement()}closeModal(){this.view.close()}},exports.SpaceBox=class extends View{constructor({width:e="0px",height:t="0px"}){super({width:e,height:t})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.width=this.props.width,e.style.height=this.props.height,e}},exports.Stack=class extends View{constructor(e){super({children:e})}createWrapView(){return document.createElement("div")}styledView(e){return e.style.position="relative",e}preBuild(){this.props.children.forEach((e=>{e.view.style.position="absolute"}))}build(){return this.props.children}},exports.Text=Text,exports.TextArea=class extends View{constructor({provider:e=null,value:t="",placeholder:r="",maxLength:s=null,rows:i=null,cols:o=null,wrap:n="soft",spellcheck:p=!1,readonly:l=!1,disabled:d=!1,baseCSS:a=new BaseCSS}){super({provider:e,value:t,placeholder:r,maxLength:s,rows:i,cols:o,wrap:n,spellcheck:p,readonly:l,disabled:d,baseCSS:a})}createWrapView(){return document.createElement("textarea")}styledView(e){return(e=this.props.baseCSS.applyCSS(e)).value=this.props.value,e.placeholder=this.props.placeholder,this.props.maxLength&&(e.maxLength=this.props.maxLength),this.props.rows&&(e.rows=this.props.rows),this.props.cols&&(e.cols=this.props.cols),e.wrap=this.props.wrap,e.spellcheck=this.props.spellcheck,e.readOnly=this.props.readonly,e.disabled=this.props.disabled,e}embedScriptToView(e){return e.addEventListener("input",(()=>{const t=e.value;this.updateProvider(t)})),e}updateProvider(e){this.props.provider&&this.props.provider.update((()=>e))}},exports.TextCSS=TextCSS,exports.TextForm=class extends View{constructor({provider:e=null,minLength:t=null,maxLength:r=null,value:s=null,placeholder:i="",required:o="",pattern:n="",baseCSS:p=new BaseCSS}){super({provider:e,minLength:t,maxLength:r,value:s,placeholder:i,required:o,pattern:n,baseCSS:p})}createWrapView(){const e=document.createElement("input");return e.type="text",e}styledView(e){return(e=this.props.baseCSS.applyCSS(e)).value=this.props.value||"",e.placeholder=this.props.placeholder,e.minLength=this.props.minLength,e.maxLength=this.props.maxLength,e.required=""!==this.props.required,e.pattern=this.props.pattern,e}embedScriptToView(e){return e.addEventListener("input",(()=>{const t=e.value;this.updateProvider(t)})),e}updateProvider(e){this.props.provider&&this.props.provider.update((()=>e))}},exports.View=View,exports.assembleView=assembleView,exports.default=assembleView,exports.generateUUID=generateUUID;
