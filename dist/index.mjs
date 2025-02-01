function generateUUID() {    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {        const r = Math.random() * 16 | 0;        const v = c === 'x' ? r : (r & 0x3 | 0x8);        return v.toString(16);    });}

class View {    isLogOut = false;    constructor(props = {}) {        if (this.constructor === View) {            throw new TypeError('このクラスをインスタンス化しないでください。');        }        this._isViewBuilt = false;        this.props = props;        this._createId();        this.initialize();        this.preBuild();        let child = this.build();        this.postBuild();        this.terminate();        let embededView = this._assembleWrapView();        this.viewCache = embededView.cloneNode(true);        this._inputViewData(child, embededView);        this._attributeViewNameToDataset();        this._isViewBuilt = true;    }    _assembleWrapView() {        let wrapView = this.createWrapView();        this._checkHTMLElement(wrapView, "createWrapView");        let styledView = this.styledView(wrapView);        this._checkHTMLElement(styledView, "styledView");        let embededView = this.embedScriptToView(styledView);        this._checkHTMLElement(embededView, "embedScriptToView");        return embededView;    }    _checkHTMLElement(child, msg) {        if (!(child instanceof HTMLElement)) {            throw new TypeError(msg + "には必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child)        }    }    getBuildCompletionState() {        return this._isViewBuilt;    }    createWrapView() {        throw new TypeError("createWrapViewメソッドを必ずオーバーライドして、HTMLElement型を返り値に設定してください。");    }    styledView(element) {        return element;    }    embedScriptToView(element) {        return element;    }    build() {        return undefined;    }    preBuild() {    }    postBuild() {    }    initialize() {    }    terminate() {    }    onDispose() {    }    _dispose() {        this.onDispose();    }    rebuild(props) {        if (props !== undefined) this.props = props;        this.preBuild();        let thisView = document.getElementById(`${this.view.id}`);        if (thisView == null) return;        this._inputViewData(this.build(), this.viewCache.cloneNode(true));        thisView.replaceWith(this.view);        this._log("rebuildされました : View name => " + this.constructor.name + "\nViewID => " + this.view.id);        this.postBuild();    }    _inputViewData(child, embededView) {        if (child instanceof Array) {            this._inputMultiView(child, embededView);        }        else {            this._inputSingleView(child, embededView);        }        this._attributeId();    }    _inputSingleView(child, embededView) {        this.view = embededView;        if (child !== undefined) {            this.view.appendChild(child.view);        }    }    _inputMultiView(child, embededView) {        if (!this.view) this.view = embededView;        child.forEach(child => {            this.view.appendChild(child.view);        });    }    _createId() {        this.props.id = generateUUID();    }    _attributeId() {        this.view.id = this.props.id;    }    _attributeViewNameToDataset() {        this.view.dataset.viewClassName = this.constructor.name;    }    _log(message){        if(!this.isLogOut) return;        console.log("[" + this.constructor.name + "] " + message);    }}

class ProviderScope extends View {    constructor({child, props = {}, watchingProviders = []}) {        props.providers = watchingProviders;        props.child = child;        super(props);        this._iterateProviders();    }    _iterateProviders() {        this.props.providers.forEach(provider => {            this._watch(provider);        });    }    _watch(provider) {        provider.watch(() => {            this.rebuild();        },        { immediate: false });    }}

class ProviderObserver {    constructor(isLogOut = false) {        if (!ProviderObserver.instance) {            ProviderObserver.instance = this;            this.dependencyGraph = new Map();            this.updateHistory = [];        }        this._isLogOut = isLogOut;        return ProviderObserver.instance;    }    addDependency(childProvider, parentProvider) {        if (!this.dependencyGraph.has(childProvider)) {            this.dependencyGraph.set(childProvider, new Set());        }        this.dependencyGraph.get(childProvider).add(parentProvider);        this.log(`Dependency added: ${this._getProviderInfo(childProvider)} depends on ${this._getProviderInfo(parentProvider)}`);    }    deleteDependency(childProvider, parentProvider){        if (!this.dependencyGraph.has(childProvider)) {            this.dependencyGraph.get(childProvider).delete(parentProvider);        }        this.log(`Dependency deleted: ${this._getProviderInfo(childProvider)} unsubscribed ${this._getProviderInfo(parentProvider)}`);    }    logUpdate(provider, oldValue, newValue) {        const updateInfo = {            timestamp: new Date(),            provider: this._getProviderInfo(provider),            oldValue,            newValue,            stackTrace: this._getStackTrace()        };        this.updateHistory.push(updateInfo);        this.log(`Update: ${updateInfo.provider} changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);    }    getDependencyGraph() {        const graph = {};        this.dependencyGraph.forEach((dependencies, provider) => {            graph[this._getProviderInfo(provider)] = Array.from(dependencies).map(dep => this._getProviderInfo(dep));        });        return graph;    }    getAllUpdateHistory() {        return this.updateHistory;    }    getFilteredUpdateHistory(provider) {        return this.updateHistory.filter((history) =>             history.provider === this._getProviderInfo(provider)        );    }    _getProviderInfo(provider) {        return provider.constructor.name + '_' + this._getObjectId(provider);    }    _getObjectId(obj) {        if (!obj.__id) {            obj.__id = Math.random().toString(36).substr(2, 9);        }        return obj.__id;    }    _getStackTrace() {        const error = new Error();        return error.stack;    }    log(message) {        if(!this._isLogOut) return;        console.log(`[ProviderObserver] ${message}`);    }    static clearInstance() {        ProviderObserver.instance = null;    }}

class Provider {    constructor(createFn) {        this._dependencies = new Map();        this._listeners = new Set();        this._core = new ProviderCore(createFn);    }    static createProvider(createFn) {        return new Provider(createFn);    }    read() {        if (!this._core.isInitialized) {            const ref = this._createRef();            this._core.value = this._core.create(ref);            this._core.isInitialized = true;        }        return this._core.value;    }    watch(listener, { immediate = true } = {}) {        this._listeners.add(listener);        if (immediate) {            listener(this.read());        }        return () => {            this._listeners.delete(listener);        };    }    update(updateFn) {        const currentValue = this.read();        const newValue = updateFn(currentValue);        const observer = new ProviderObserver();        observer.logUpdate(this, currentValue, newValue);        this._core.value = newValue;        this._notifyListeners(newValue);    }    _notifyListeners(newValue) {        this._listeners.forEach(listener => listener(newValue));    }    _createRef() {        const observer = new ProviderObserver();        const ref = {            read: otherProvider => {                return otherProvider.read();            },            update: updateFn => {                const oldValue = this.read();                this.update(updateFn);                const newValue = this.read();                observer.logUpdate(this, oldValue, newValue);            },            watch: (otherProvider, updateFn) => {                const observer = new ProviderObserver();                observer.addDependency(this, otherProvider);                this._dependencies.set(                    otherProvider,                    new Dependency(otherProvider, this, updateFn)                );            },        };        return ref;    }    unsubscribedDependency(parentProvider){        const observer = new ProviderObserver();        this._dependencies[parentProvider].unsubscribedParent();        this._dependencies.delete(parentProvider);        observer.deleteDependency(this.parentProvider);    }}class ProviderCore {    constructor(createFn) {        this.create = createFn;        this.value = null;        this.isInitialized = false;    }}class Dependency {    constructor(parentProvider, provider, updateFn) {        this.parentProvider = parentProvider;        this.provider = provider;        this._listenParent(updateFn);    }    printDependency() {        console.log(this.provider + ' depends on ' + this.parentProvider);    }    _listenParent(updateFn) {        this._unsubscribed = this.parentProvider.watch(            parentValue => {                this.provider.update(currentValue => {                    return updateFn(parentValue, currentValue);                });            },            { immediate: false }        );    }    unsubscribedParent(){        this._unsubscribed();    }}

class DynamicProviderScope extends View {    constructor({child, props = {}}){        props.child = child;        props.providers = [];        super(props);    }    createProvider(initialValue){        let provider = Provider.createProvider((ref) => {            return initialValue;        });        this.props.providers.push(provider);        return provider;    }    refreshProviders(){        if(!this.getBuildCompletionState()){           throw new IllegalPreBuildDoSomothingError("Viewの構築プロセスが終了するまでrefreshProvidersメソッドを呼び出さないでください。\nView構築プロセス状態 >>> isViewAssembleProccessesCompleted = " +  this.getBuildCompletionState());        }        this.rebuild(this.props);    }}

class ShadowLevel {  static LVL0 = new ShadowLevel('none');  static LVL1 = new ShadowLevel('0 2px 4px rgba(0,0,0,0.1)');  static LVL2 = new ShadowLevel('0 4px 8px rgba(0,0,0,0.12)');  static LVL3 = new ShadowLevel('0 8px 16px rgba(0,0,0,0.14)');  static LVL4 = new ShadowLevel('0 12px 24px rgba(0,0,0,0.16)');  static LVL5 = new ShadowLevel('0 16px 32px rgba(0,0,0,0.18)');  constructor(value) {    this.value = value;  }  toString() {    return this.value;  }}

class Border {    constructor(        borderSize = "0px",         borderProperty = "solid",        color = "transparent",        isTop = true,        isLeft = true,        isRight = true,        isBottom = true    ){        this.borderSize = borderSize;        this.borderProperty = borderProperty;        this.color = color;        this.isTop = isTop;        this.isLeft = isLeft;        this.isRight = isRight;        this.isBottom = isBottom;    }    assembleCSS(){        return this.borderSize + " " + this.borderProperty + " " + this.color;    }}

class Card extends View {    constructor({        child,        radius = "0px",         padding = "0px",        background = "transparent",        elevation = ShadowLevel.LVL0,        border = new Border()    }){        if(!(elevation instanceof ShadowLevel)){            throw TypeError("CardコンポーネントのElevationプロパティには、ShadowLevelクラスのみ受け付けています。\n渡された型:" + typeof elevation);        }        if(!(border instanceof Border)){            throw TypeError("Cardコンポーネントのborderプロパティには、Borderクラスのみ受け付けています。\n渡された型:" + typeof elevation);        }        super({            child: child,            radius: radius,             padding: padding,            background: background,            elevation: elevation,            border: border.assembleCSS()        });    }    createWrapView(){        let card = document.createElement("div");        return card;    }    styledView(element){        element.style.borderRadius = this.props.radius;        element.style.background = this.props.background;        element.style.boxShadow = this.props.elevation;        element.style.border = this.props.border;        element.style.padding = this.props.padding;        element.style.width = "fit-content";        element.style.height = "fit-content";        return element;    }    build(){        return this.props.child;    }}

class Center extends View {    constructor(child){        super({child: child});    }    createWrapView(){        let center = document.createElement("div");        return center;    }    styledView(element){        element.style.width = "100%";        element.style.height = "100%";        element.style.textAlign = "center";        element.style.justifyContent = "center";        element.style.display = "flex";        element.style.alignItems = "center";        return element;    }    build(){        return new _Center(this.props.child);    }}class _Center extends View {    constructor(child){        super({child: child});    }    createWrapView(){        let center = document.createElement("div");        return center;    }    styledView(element){        element.style.width = "fit-content";        element.style.height = "fit-content";        element.style.margin = "auto";        return element;    }    build(){        return this.props.child;    }}

class Column extends View {    constructor(children){        super({children: children});    }    createWrapView(){        let col = document.createElement("div");        return col;    }    styledView(element){        element.style.display = "flex";        element.style.flexDirection = "column";        return element;     }    build(){        return this.props.children;    }}

class Padding extends View {    constructor({        child,        all,        top = "0px",        right = "0px",        bottom = "0px",        left = "0px"    }){        if (all !== undefined) {            top = right = bottom = left = all;        }        const validatePadding = (value, direction) => {            const valid = /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw)$/.test(value);            if (!valid) {                throw TypeError(`Paddingコンポーネントの${direction}プロパティには、有効なCSSの長さ単位が必要です。\n渡された値: ${value}`);            }        };        validatePadding(top, 'top');        validatePadding(right, 'right');        validatePadding(bottom, 'bottom');        validatePadding(left, 'left');        super({            child: child,            padding: {                top,                right,                bottom,                left            }        });    }    createWrapView(){        let padding = document.createElement("div");        return padding;    }    styledView(element){        element.style.paddingTop = this.props.padding.top;        element.style.paddingRight = this.props.padding.right;        element.style.paddingBottom = this.props.padding.bottom;        element.style.paddingLeft = this.props.padding.left;        return element;    }    build(){        return this.props.child;    }}

class Position extends View {    constructor({        child,         top = 0,         left = 0    }){        super({child: child, top: top, left: left});    }    createWrapView(){        let posWrapper = document.createElement("div");        return posWrapper;    }    styledView(element){        element.className = "pos-wrapper";        element.style.width = "100%";        element.style.height = "100%";        return element;    }    build(){        return new _PositionChild({            child: this.props.child,            top: this.props.top,            left: this.props.left        })    }}class _PositionChild extends View {    constructor({child, top = 0, left = 0}){        super({child: child, top: top, left: left});    }    createWrapView(){        let pos = document.createElement("div");        return pos;    }    styledView(element){        element.className = "pos-wrapper";        element.style.width = "100%";        element.style.height = "100%";        element.style.position = "relative";        element.className = "pos";        element.style.top = this.props.top + "px";        element.style.left = this.props.left + "px";        return element;    }    build(){        return this.props.child;    }}

class Row extends View {    constructor(        children, {         isAlignCenter = false,         isJustifySpaceAround = false    }){        super({            children: children,             isAlignCenter: isAlignCenter,             isJustifySpaceAround: isJustifySpaceAround        });    }    createWrapView(){        let row = document.createElement("div");        return row;    }    styledView(element){        element.className = "row-container";        element.style.display = "flex";        if(this.props.isAlignCenter) element.style.justifyContent = "center";        if(this.props.isJustifySpaceAround) element.style.justifyContent = "space-around";        return element;    }    build(){        return this.props.children;    }}

class SpaceBox extends View {    constructor({        width = "0px",         height = "0px"    }){        super({width: width, height: height});    }    createWrapView(){        let box = document.createElement("div");        return box;    }    styledView(element){        element.style.width = this.props.width;        element.style.height = this.props.height;        return element;    }}

class Stack extends View {    constructor(children){        super({children: children});    }        createWrapView(){        let stack = document.createElement("div");        return stack;    }    styledView(element){        element.style.position = "relative";        return element;    }    preBuild(){        this.props.children.forEach(com => {            com.view.style.position = "absolute";        });    }    build(){        return this.props.children;    }}

class Text extends View{    constructor(        text, {        color = "black",         isFontWeight = false    }){        super({text: text, color: color, isFontWeight: isFontWeight});    }    createWrapView(){        let p = document.createElement("p");        return p;    }    styledView(element){        element.textContent = this.props.text;        element.style.margin = "0";        element.style.color = this.props.color;        if(this.props.isFontWeight) element.style.fontWeight = 'bold';        return element;    }}

class Box extends View {    constructor({        width = "0px",         height = "0px",        border = new Border()    }){        super({            width: width,             height: height,             border: border        });    }    createWrapView(){        let box = document.createElement("div");        return box;    }    styledView(element){        element.style.width = this.props.width;        element.style.height = this.props.height;        element = this._styleBorder(element);        return element;    }    _styleBorder(element){        let border = this.props.border;        if(border.isTop){            element.style.borderTop = border.assembleCSS();        }        if(border.isLeft){            element.style.borderLeft= border.assembleCSS();        }        if(border.isRight){            element.style.borderRight = border.assembleCSS();        }        if(border.isBottom){            element.style.borderBottom = border.assembleCSS();        }        return element;    }}

class Image extends View {    constructor({        width = "auto",         height = "auto",         src: src = "",        alt: alt = "",        title: title = ""    }){        super({            width: width,             height: height,             src: src,            alt: alt,            title: title        });    }    createWrapView(){        let img = document.createElement("img");        return img;    }    styledView(element){        element.style.width = this.props.width;        element.style.height = this.props.height;        element.src = this.props.src;        element.alt = this.props.alt;        element.title = this.props.title;        return element;    }}

class CustomError extends Error {    constructor(message) {        super(message);        this.name = this.constructor.name;        Error.captureStackTrace(this, this.constructor);    }}class OverridePreBuildMethodInProviderScopeError extends CustomError {    constructor(viewName){        super("In " + viewName + "クラス, ProviderScopeを継承したクラス内ではpreBuildメソッドが継承できません。\n代わりに同じ動作を持つpreBuildScopeメソッドを継承してください。");        this.viewName = viewName;    }}class CreateIllegalInstanceError extends CustomError {    constructor(classType){        super("このクラス(" + classType + ")はインスタンス化してはいけません。");        this.classType = classType;    }}let IllegalPreBuildDoSomothingError$1 = class IllegalPreBuildDoSomothingError extends CustomError {    constructor(ms){        super("Viewの構築プロセスが終了するまで以下の操作を行ってはなりません。\n\n"+  ms + "\n\nまたViewの構築プロセスが終了したかはgetBuildCompletionStateメソッドにて取得することができます。\n\n" + "stackTrace:");    }};

function assembleView(viewArg) {    let view = viewArg.view;    let container = document.getElementById("fJutteS-Container");    if(container != null) container.appendChild(view);    return view;}

export { Border, Box, Card, Center, Column, CreateIllegalInstanceError, CustomError, DynamicProviderScope, IllegalPreBuildDoSomothingError$1 as IllegalPreBuildDoSomothingError, Image, OverridePreBuildMethodInProviderScopeError, Padding, Position, Provider, ProviderObserver, ProviderScope, Row, ShadowLevel, SpaceBox, Stack, Text, View, assembleView, assembleView as default, generateUUID };
