# THIS IS PURE JS FRAMEWORK
これは基本的なJavaScriptのみで構成された宣言型コンポーネントUI型のフレームワークです。
状態管理に`fJutteS`に最適化された自己ライブラリ`Jiperes`を採用しており、状態管理ライブラリを選定する必要はもうありません。
- 現行バージョン -> fjuttes@1.0.1

## インポート方法
CDN形式でnpmを使用せずに`fJutteS`の機能を使用するには`unpkg`を使用することができます。
以下にコード例を示します。
```html
<script src="https://unpkg.com/fjuttes@1.0.2/dist/index.mjs"></script>
```

詳細は後述しますが、使用するには以下のようにすることができます。
```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="fJutteS-Container"></div>

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="fJutteS-Container"></div>
	
    <script type="importmap">
        {
            "imports": {
                "fjuttes": "https://unpkg.com/fjuttes@1.0.1/dist/index.mjs"
            }
        }
    </script>
    <script type="module" src="./script.js"></script>
</body>
</html>
```

```js
//script.js
import { assembleView, Text } from "fjuttes";

assembleView(new Text("Hello World!"));
```
このように書くとただ単にテキストが表示されます。

## 使用方法 - チュートリアル
### ウィジェットを描画する
最初に`fJutteS`の`View`を描画する方法について解説します。
まず、`index.html`などのhtmlファイルに以下のidの`div`要素を用意します。
```html
<div id="fJutteS-Container"></div>
```

そして、`js`ファイルで以下の処理を行います。
```js
const assemble = require('assembleView');
const view = new Text("何らかのView");

assemble(view);
```
このコードで`<div id="fJutteS-Container"></div>`以下に`assemble`関数に渡した`View`が描画されます。

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
Providerを作成するには`Provider`クラスのファクトリメソッド`createProvider()`を使用して行います。
以下に試しに作成してみます。
```js
const sampleProvider = Provider.createProvider(() => {
	return 0;
})
```
引数には関数オブジェクトを渡し、その中で初期値を`return`で返却します。
（これは基本的な数値を管理するProviderであり、Providerには依存関係などの機能もあります。）

#### Providerの使用-ProviderScope-read
Providerの値の変更を監視するためにはView単位で行います。
`ProviderScope`コンポーネントを継承してウィジェットを作成します。
```js
class SampleWidget extends ProviderScope {
	constructor(child){
		super({
			child: child,
			watchingProviders: [ sampleProvider ]
		});
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
		let num = sampleProvider.read();

		return Row([
			this.props.child,
			new Text(num)
		]);
	}
}
```
`ProviderScope`クラスにはコンストラクタとして、三つのプロパティを渡すことができます。
`props`と`watchingProvider`、`child`です。
`props`には`View`と同じ役割を持ちます。
`watchingProvider`には、Providerの配列を渡します。
`ProviderScope`に渡されたProviderは自動的にリッスン状態になり、配列のProviderの一つでも値が変更されると、`ProviderScope`を継承したウィジェットが再ビルドされます。

ここでは`Provider`クラスの`read`メソッドを使用して値を読み取っています。
`read`メソッドはただ値を読み取るためのメソッドです。

## 用語集
- View(ビュー)：`View`クラスまたはその他UI構築クラスから継承して作成されたUI部品
- コンポーネント：`fJutterS`側から提供されるViewのこと
- ウィジェット：`fJutteS`使用者がコンポーネントを組み合わせて作成したViewのこと

## 最後に余談
//TODO

## ライセンス
MIT
