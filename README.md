# THIS IS PURE JS FRAMEWORK
これは基本的なJavaScriptのみで構成された宣言型コンポーネントUI型のフレームワークです。
状態管理に`fJuttes`に最適化された自己ライブラリ`Jiperes`を採用しており、状態管理ライブラリを選定する必要はもうありません。

## インストール方法
//TODO

## 使用方法 - チュートリアル
### ウィジェットの作成
#### Viewの継承
まず、このフレームワークには全てのウィジェットの根幹となる`View`コンポーネントが提供されています。
このクラスを継承するのが、ウィジェット作成の第一段階です。
```js
class SampleWidget extends View {
	...
}
```

#### Viewコンストラクタの呼び出し
そして、`View`クラス側でウィジェットを描画するのに必要な処理を行うために`View`のコンストラクタを呼び出します。
```js
class SampleWidget extends View {
	constructor(){
		super();
	}
}
```

#### ウィジェットの要素定義
次にこのウィジェットの`HTMLElement`要素を定義します。
これには`View`クラスで定義されている`createWrapView`をオーバーライドして作成します。
これにはJSで使用できる`document.createElement`メソッドを使用して`HTMLElement`を作成できます。
```js
class SampleWidget extends View {
	constructor(){
		super();
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}
}
```
因みにこの`createWrapView`はオーバーライド必須で、オーバーライドしないとエラーが出てしまいます。
```error
throw new TypeError("createWrapViewメソッドを必ずオーバーライドして、HTMLElement型を返り値に設定してください。");
```

#### ウィジェットのスタイル定義
`createWrapView`で作成した`HTMLElement`要素に対してスタイルを適用するには`styledView`メソッドをオーバーライドします。
```js
class SampleWidget extends View {
	constructor(){
		super();
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}

	styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}
}
```
`styledView`メソッドには引数として、`createWrapView`で作成した`HTMLElement`が渡されます。
スタイルの適用の詳細には`HTMLElement`を参照してください。
このメソッドの最後で必ずスタイルを適用した要素を`return`で返却してください。
返却しない場合、以下のエラーが返されます。
```error
throw new TypeError("styledViewには必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child);
```

なお、このメソッドに用がない場合、オーバーライドせずに無視してもらっても構いません。
#### embedScriptToView
もしウィジェットに何らかのJSで標準用意されているスクリプトを埋め込みたいなら`embedScriptToView`内で行ってください。
例えば、ラジオボタンのイベントの発火などです。
```js
    embedScriptToView(element){
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    _setEventListenerToRadioBtn(radioBtn) {
        radioBtn.addEventListener("change", (e) => {   
            if (e.target.checked) {
                //イベントの発火により動作するコード
            }
        });
    }
```
このメソッドでも最後に要素を`return`で返却してください。
返却しない場合、以下のエラーが返されます。
```error
throw new TypeError("embedScriptToViewには必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child);
```

なお、このメソッドに用がない場合、オーバーライドせずに無視してもらっても構いません。

#### ウィジェットの子要素を作成する。
`createWrapView`で作成した要素の中に子要素を入れていくには`build`メソッドをオーバーライドして使用します。
ここには自身で作成したウィジェットやfJutteSで用意されているコンポーネントが使用できます。
```js
class SampleWidget extends View {
	constructor(){
		super();
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}

	styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

	build(){
		return new Text("Hello World");
	}
}
```
ここでは`Text`コンポーネントを使用して文字を表示してみます。
このとき必ず、コンポーネントやウィジェットを`return`で返却してください。
これで一つの基本的なウィジェットを作成することができました。

### ウィジェットに値の受け渡し
例えば、ウィジェットに子要素を渡して、それを子要素でビルドして欲しい時や親要素のプロパティを子要素に渡して表示して欲しい時があるかもしれません。
その際のやり方をこのセクションでは解説します。

まず皆さんが親要素から渡された文字列を`Text`コンポーネントで表示したいとき、このように書くかもしれません。
```js
class SampleWidget extends View {
	constructor(text){
		super();
		this.text = text;//ここでSampleWidgetのインスタンス変数に格納
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}

	styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

	build(){
		return new Text(this.text);//ここで使用
	}
}
```
しかし、これを実行してみると`undefined`と表示されてしまいます。
これは`View`クラス側で、`createWrapView`や`build`メソッドがコンストラクタで実行されているのが原因です。そのため、`build`が実行し終わってから`this.text = text`のコードを実行してしまいます。

この問題を回避するため、`View`クラスのコンストラクタには`props`という引数を渡すことができます。

`props`を使用して、もう一度上のコードを書き直してみます。
```js
class SampleWidget extends View {
	constructor(text){
		super({text: text});
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}

	styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

	build(){
		return new Text(this.props.text);//ここで使用
	}
}
```
`props`はオブジェクトとして渡します。
これは`View`クラスのインスタンス変数として`createWrapView`などのメソッドが実行される前に格納されるので、`build`メソッドなどで値が使用可能になります。

同様に子要素を渡された場合でも、
```js
class SampleWidget extends View {
	constructor(child){
		super({child: child});
	}

	createWrapView(){
		let div = document.createElement("div");
		return div;
	}

	styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

	build(){
		return this.props.child;
	}
}
```
と書くことで、簡単に子要素を描画することができます。

### Providerによる状態管理
この`fJutteS`フレームワークには`Jiperes`という状態管理ライブラリが付属しています。
値が変更されたことによって、ウィジェットをリビルド、再描画したい際にはProviderを使用して行います。
#### Providerの作成
Provider

## 用語集
- View(ビュー)：`View`クラスまたはその他UI構築クラスから継承して作成されたUI部品
- コンポーネント：`fJutterS`側から提供されるViewのこと
- ウィジェット：`fJutteS`使用者がコンポーネントを組み合わせて作成したViewのこと

## 最後に余談
//TODO

## ライセンス
//TODO
