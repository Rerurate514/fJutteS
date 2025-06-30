import { generateRandomColor } from '../logic/generateRandomColor.js';
import { generateUUID } from '../logic/generateUUID.js';
import { devMode } from '../logic/setupDevMode.js';

/**
 * View抽象クラス
 * ## OverView
 * fTutteSフレームワークにおける全てのウィジェットの基底となる抽象クラスです。
 * UI要素の作成、スタイリング、スクリプトの埋め込み、そして子ウィジェットの構築と管理のための
 * コアなライフサイクルメソッドとロジックを提供します。
 * このクラスは直接インスタンス化することはできません。
 *
 * `devMode` が有効な場合、各 View のコンテナには、そのウィジェットの名前とランダムな背景色が追加され、
 * デバッグ時の視覚的な識別を助けます。
 */
export class View {
    constructor() {
        if (this.constructor === View) {
            throw new TypeError("このクラスをインスタンス化しないでください。");
        }

        this.id = generateUUID();
        this._view = document.createElement("div");
        this.viewCache = document.createElement("div");
        this.viewChild = undefined;
    }

    get view() {
        return this._view;
    }

    assemble() {
        this.initialize();
        this.preBuild();
        this.viewChild = this.build();
        this.postBuild();
        this.terminate();
        
        let view = this.assembleWrapView();
        if(devMode) view = this.generateTestNode(view);
        this.viewCache = this.embedScriptToView(view.cloneNode(true));
        
        this.assembleViewData(this.viewChild, this.viewCache);

        return this.view;
    }

    /**
     * createWrapViewをオーバーライドしてViewのコンテナを設定してください
     * @returns HTMLElement
     */
    createWrapView() {
        return document.createElement("div");
    }

    /**
     * @param {HTMLElement} element
     * 
     * ここで引数にスタイルを設定してください
     */
    styledView(element) {
        return element;
    }

    /**
     * @param {HTMLElement} element
     * 
     * ここでスクリプトを埋め込んでください
     */
    embedScriptToView(element) {
        return element;
    }

    generateTestNode(view) {
        let text = view.textContent;
        view.textContent = "";

        let color = generateRandomColor();

        let elementNameDiv = document.createElement("div");
        elementNameDiv.style.background = color;
        elementNameDiv.textContent = this.constructor.name;

        view.style.background = color;

        view.appendChild(elementNameDiv);
        if(elementNameDiv) view.appendChild(document.createTextNode(text ?? ""));

        return view;
    }

    assembleWrapView() {
        let wrapView = this.createWrapView();
        this.checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this.checkHTMLElement(styledView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this.checkHTMLElement(embededView, "embedScriptToView");

        return embededView;
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} msg 
     */
    checkHTMLElement(child, msg) {
        if (!(child instanceof HTMLElement)) {
            throw new TypeError(msg + "must contain an HTMLElenment object. Type passed:" + typeof child);
        }
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
     * Description placeholder
     */
    rebuild() {
        this.preBuild();

        let thisView = document.getElementById(`${this._view.id}`);
        if (thisView == null) return;

        this.viewChild = this.build();

        this.assembleViewData(this.viewChild, this.viewCache);

        while (thisView.firstChild) {
            thisView.removeChild(thisView.firstChild);
        }

        if(this.viewChild instanceof View){
            thisView.appendChild(this.viewChild.view);
        }
        else if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                thisView.appendChild(child.view);
            });
        }
        
        this.postBuild();
        this.assembleComplete();
    }

    /**
     * Viewのスタイルを部分的に更新します。
     * 不要な再レンダリングを避けるために、必要なCSSプロパティのみを直接DOM要素に適用します。
     * このメソッドは、ViewがDOMにアタッチされた後（assembleComplete後）に呼び出すことを想定しています。
     *
     * @param {Object} stylePatch 更新したいCSSプロパティのオブジェクト
     */
    updateStyle(stylePatch) {
        if (!this._view || !this._view.isConnected) {
            console.warn("ViewはまだDOMにアタッチされていないか、デタッチされた後です。", this._view, this._view.isConnected);
            return;
        }

        const readOnlyProperties = new Set([
            "length",
            "parentRule",
            "cssText",
        ]);

        for (const key in stylePatch) {
            if (Object.prototype.hasOwnProperty.call(stylePatch, key)) {
                const value = stylePatch[key];

                if (readOnlyProperties.has(key)) continue;

                if (value !== undefined) {
                    this._view.style[key] = value;
                }
            }
        }
    }

    assembleComplete() {
        this.onAssembleComplete();

        if (this.viewChild instanceof View) {
            this.viewChild.assembleComplete();
        } else if (this.viewChild instanceof Array) {
            this.viewChild.forEach(child => {
                if (child) {
                    child.assembleComplete();
                }
            });
        }
    }

    /**
     * Viewのビルドが終了して、完全にレンダリングされた後に実行される関数
     */
    onAssembleComplete() {
        
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
     * Viewそのものを破棄する関数はdispose関数にて実装されています。
     */
    onDispose() {

    }

    /**
     * Viewを完全に破棄する際に実行される関数
     * 基本的には状態管理辺りの処理で必要となるため実装
     * この関数はオーバーライド不可で、dispose時に処理が必要な場合はonDiseposeを使用してください。
     */
    dispose() {
        if (this.viewChild instanceof View) this.viewChild.dispose();
        if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                child.dispose();
            });
        }

        this.onDispose();
    }

    assembleViewData(child, embededView) {
        if (child instanceof Array) {
            this.assembleMultiView(child, embededView);
        }
        else if(child instanceof View){
            this.assembleSingleView(child, embededView);
        }
        else{
            this._view = embededView;
        }

        this.attributeId();
        this.attributeViewNameToDataset();
    }

    assembleSingleView(child, embededView) {
        child.assemble();
        embededView.appendChild(child.view);
        this._view = embededView;
    }

    assembleMultiView(children, embededView) {
        children.forEach(child => {
            if (!child) return;
            child.assemble();
            embededView.appendChild(child.view);
        });
        this._view = embededView;
    }

    attributeId() {
        this._view.id = this.id;
    }

    attributeViewNameToDataset() {
        this._view.dataset.viewClassName = this.constructor.name;
    }

    // JSファイルにのみ存在するメソッド（そのまま保持）
    
    /** Description placeholder */
    addPseudoElement() {
        if (this.viewChild instanceof View) this.viewChild.addPseudoElement();
        if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                child.addPseudoElement();
            });
        }

        let before = this.createBeforeElement();
        let after = this.createAfterElement();

        if (before) {
            this.checkHTMLElement(before, "createBeforeElement");
            this.view.before(before);
        }
        if (after) {
            this.checkHTMLElement(after, "createAfterElement");
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

    onRendered() {

    }

    /** Description placeholder */
    _rendered() {
        if (this.viewChild instanceof View) this.viewChild._rendered();
        if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                child._rendered();
            });
        }
        this.onRendered();
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
     * Description placeholder
     *
     * @param {*} message 
     */
    _log(message) {
        if (!this.isLogOut) return;
        console.log("[" + this.constructor.name + "] " + message);
    }
}
