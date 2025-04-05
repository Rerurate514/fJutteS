import { generateRandomColor } from '../logic/generateColor.js';
import { generateUUID } from '../logic/generateUUID.js';

/**
 * Viewクラス - abstruct ---
 * 必ずcreateWrapViewをオーバーライドしてViewをカスタマイズしてください。
 * もしViewクラス内のログを出力する際には継承先でthis.isLogOutをtrueにしてください。
 */
export class View {
    /**
     * Description placeholder
     *
     * @type {boolean}
     */
    isLogOut = false;
    isTestMode = true;

    constructor(props = {}) {
        if (this.constructor === View) {
            throw new TypeError('Please do not instantiate this class.');
        }

        this._isViewBuilt = false;

        this.props = props;

        this._createId();

        this.initialize();
        this.preBuild();
        let child = this.build();
        this.child = child;
        this.postBuild();
        this.terminate();

        let embededView = this._assembleWrapView();

        if(this.isTestMode) embededView = this._generateTestNode(embededView);

        this.viewCache = embededView.cloneNode(true);

        this._inputViewData(child, embededView);

        this._isViewBuilt = true;
    }

    /**
     * Description placeholder
     *
     * @returns {HTMLElenment} 
     */
    _assembleWrapView() {
        let wrapView = this.createWrapView();
        this._checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this._checkHTMLElement(styledView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this._checkHTMLElement(embededView, "embedScriptToView");

        return embededView;
    }

    _generateTestNode(embededView){
        let text = embededView.textContent;
        embededView.textContent = "";

        let color = generateRandomColor();

        let elementNameDiv = document.createElement("div");
        elementNameDiv.style.background = color;
        elementNameDiv.textContent = this.constructor.name;

        embededView.style.background = color;

        embededView.appendChild(elementNameDiv);
        if(elementNameDiv) embededView.appendChild(document.createTextNode(text));

        return embededView;
    }

    /** Description placeholder */
    addPseudoElement() {
        if (this.child instanceof View) this.child.addPseudoElement();
        if (this.child instanceof Array) {
            this.child.forEach((child) => {
                child.addPseudoElement();
            });
        }

        let before = this.createBeforeElement();
        let after = this.createAfterElement();

        if (before) {
            this._checkHTMLElement(before, "createBeforeElement");
            this.view.before(before);
        }
        if (after) {
            this._checkHTMLElement(after, "createAfterElement");
            this.view.after(after);
        }
    }

    /**
     * Description placeholder
     *
     * @returns {*} 
     */
    createBeforeElement() {
        return null;
    }

    /**
     * Description placeholder
     *
     * @returns {*} 
     */
    createAfterElement() {
        return null;
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} msg 
     */
    _checkHTMLElement(child, msg) {
        if (!(child instanceof HTMLElement)) {
            throw new TypeError(msg + "must contain an HTMLElenment object. Type passed:", typeof child);
        }
    }

    /**
     * Description placeholder
     *
     * @returns {boolean} 
     */
    getBuildCompletionState() {
        return this._isViewBuilt;
    }

    /**
     * このcreateWrapViewをオーバーライドしてViewのコンテナを設定してください
     * @returns HTMLElement
     */
    createWrapView() {
        return document.createElement("div");
    }

    /**
     * @param {HTMLElenment} element
     * 
     * ここで引数にスタイルを設定してください
     */
    styledView(element) {
        return element;
    }

    /**
     * @param {HTMLElenment} element
     * 
     * ここでスクリプトを埋め込んでください
     */
    embedScriptToView(element) {
        return element;
    }

    /**
     * @returns {View}
     * 
     * buildメソッドでは、FlutterのようにViewを組み合わせてレンダリングすることができます。
     * ただし、その場合はcreateWrapViewで作成されたelementがそのViewのトップレベルです。
     * つまり、ここに書いたView群がcreateWrapViewで作成されたelementの子要素になるということです。
     */
    build() {
        return undefined;
    }

    /**
     * Build関数の実行前に実行される関数
     * さらにrebuild時にも実行される。
     */
    preBuild() {

    }

    /**
     * Build関数の実行後に実行される関数
     * さらにrebuild時にも実行される。
     */
    postBuild() {

    }

    /**
     * Build関数の実行前に実行される関数
     * rebuild時には実行されない。
     */
    initialize() {

    }

    /**
     * Build関数の実行後に実行される関数
     * rebuild時には実行されない。
     */
    terminate() {

    }

    /**
     * Viewの破棄時に実行される関数、またはViewが破棄されるときに実行される関数
     * Viewそのものを破棄する関数は_dispose関数にて実装されています。
     */
    onDispose() {

    }

    /**
     * Viewを完全に破棄する際に実行される関数
     * 基本的には状態管理辺りの処理で必要となるため実装
     * この関数はオーバーライド不可で、dispose時に処理が必要な場合はonDiseposeを使用してください。
     */
    _dispose() {
        if (this.child instanceof View) this.child._dispose();
        if (this.child instanceof Array) {
            this.child.forEach((child) => {
                child._dispose();
            });
        }

        this.onDispose();
    }

    onRendered() {

    }

    /** Description placeholder */
    _rendered() {
        if (this.child instanceof View) this.child._rendered();
        if (this.child instanceof Array) {
            this.child.forEach((child) => {
                child._rendered();
            });
        }
        this.onRendered();
    }

    /**
     * Description placeholder
     *
     * @param {{ props?: any; builtView?: any; }} [param0={}] 
     * @param {*} [param0.props=null] 
     * @param {*} [param0.builtView=null] 
     */
    rebuild({
        props = null,
        builtView = null
    } = {}) {
        if (props) this.props = props;

        this.preBuild();

        let thisView = document.getElementById(`${this.view.id}`);
        if (thisView == null) return;

        this._inputViewData(builtView ?? this.build(), this.viewCache.cloneNode(true));

        thisView.replaceWith(this.view);

        this._log("rebuilded : View name => " + this.constructor.name + "\nViewID => " + this.view.id);

        this.postBuild();
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} embededView 
     */
    _inputViewData(child, embededView) {
        if (child instanceof Array) {
            this._inputMultiView(child, embededView);
        }
        else {
            this._inputSingleView(child, embededView);
        }

        this._attributeId();
        this._attributeViewNameToDataset();
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} embededView 
     */
    _inputSingleView(child, embededView) {
        this.view = embededView;
        if (child instanceof View) this.view.appendChild(child.view);
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} embededView 
     */
    _inputMultiView(child, embededView) {
        if (!this.view) this.view = embededView;

        child.forEach(child => {
            if (!child) return;
            this.view.appendChild(child.view);
        });
    }

    /** Description placeholder */
    _createId() {
        this.props.id = generateUUID();
    }

    /** Description placeholder */
    _attributeId() {
        this.view.id = this.props.id;
    }

    /** Description placeholder */
    _attributeViewNameToDataset() {
        this.view.dataset.viewClassName = this.constructor.name;
    }

    /**
     * Description placeholder
     *
     * @param {*} message 
     */
    _log(message) {
        if (!this.isLogOut) return;
        console.log("[" + this.constructor.name + "] " + message);
    }
}
