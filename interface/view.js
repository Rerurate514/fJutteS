import { generateUUID } from '../utils/generateUUID.js';

/**
 * Viewクラス - abstruct ---
 * 必ずcreateWrapViewをオーバーライドしてViewをカスタマイズしてください。
 * もしViewクラス内のログを出力する際には継承先でthis.isLogOutをtrueにしてください。
 */
export class View {
    isLogOut = false;

    constructor(props = {}) {
        if (this.constructor === View) {
            throw new TypeError('このクラスをインスタンス化しないでください。');
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
        this.viewCache = embededView.cloneNode(true);

        this._inputViewData(child, embededView);

        this._isViewBuilt = true;
    }

    _assembleWrapView() {
        let wrapView = this.createWrapView();
        this._checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this._checkHTMLElement(styledView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this._checkHTMLElement(embededView, "embedScriptToView");

        return embededView;
    }

    addPseudoElement(){
        if(this.child instanceof View) this.child.addPseudoElement();
        if(this.child instanceof Array){
            this.child.forEach((child) => {
                child.addPseudoElement();
            });
        }

        let before = this.createBeforeElement();
        let after = this.createAfterElement();

        if(before) {
            this._checkHTMLElement(before, "createBeforeElement");
            this.view.before(before);
        }
        if(after) {
            this._checkHTMLElement(after, "createAfterElement");
            this.view.after(after);
        }
    }

    createBeforeElement(){
        return null;
    }

    createAfterElement(){
        return null;
    }

    _checkHTMLElement(child, msg) {
        if (!(child instanceof HTMLElement)) {
            throw new TypeError(msg + "には必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child)
        }
    }

    getBuildCompletionState() {
        return this._isViewBuilt;
    }

    /**
     * 必ずこのcreateWrapViewをオーバーライドしてViewのコンテナを設定してください
     * @returns HTMLElement
     */
    createWrapView() {
        throw new TypeError("createWrapViewメソッドを必ずオーバーライドして、HTMLElement型を返り値に設定してください。");
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
        if(this.child) this.child._dispose();
        this.onDispose();
    }

    onRendered(){

    }
    
    _rendered(){
        if(this.child) this.child._rendered();
        this.onRendered();
    }

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

        this._log("rebuildされました : View name => " + this.constructor.name + "\nViewID => " + this.view.id);

        this.postBuild();
    }

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

    _inputSingleView(child, embededView) {
        this.view = embededView;
        if (child instanceof View) this.view.appendChild(child.view);
    }

    _inputMultiView(child, embededView) {
        if (!this.view) this.view = embededView;

        child.forEach(child => {
            if(!child) return;
            this.view.appendChild(child.view);
        });
    }

    _createId() {
        this.props.id = generateUUID();
    }

    _attributeId() {
        this.view.id = this.props.id;
    }

    _attributeViewNameToDataset() {
        this.view.dataset.viewClassName = this.constructor.name;
    }

    _log(message){
        if(!this.isLogOut) return;
        console.log("[" + this.constructor.name + "] " + message);
    }
}
