# THIS IS PURE JS FRAMEWORK
## fJutteSとは
`fJutteS`とは基本的なJavaScriptのみで構成された宣言型コンポーネントUI型のフレームワークです。  
HTMLとCSSとJavaScriptのファイルのみが許されている特殊な環境下(ReactやVueも入れられない環境)でFlutterのようなコンポーネント型プログラミングをしたいときに最適なフレームワークです。`fJutteS`には様々なコンポーネントが提供されていますが、これも詰まるところ私が作成したウィジェットであり、ユーザ自身が自由にウィジェットを作成する事ができます。結局のところ、ただのJavaScriptなので！  
そして、状態管理に`fJutteS`に最適化された自己ライブラリ`Jiperes`を採用しており、状態管理ライブラリを選定する必要はもうありません。しかし、それと引き換えにsetState、useStateを失っています。これはウィジェット単体で状態を変更することはできないことを意味しています。これも一つの設計思想として捉えてもらえると幸いです。  
- 現行バージョン -> fjuttes@2.4.0

<h6>公式サイト : https://rerurate514.github.io/fJutteS-Wiki/</h6>

![NPM Version](https://img.shields.io/npm/v/fjuttes)
![NPM Unpacked Size : mjs and js](https://img.shields.io/npm/unpacked-size/fjuttes)
![NPM Last Update](https://img.shields.io/npm/last-update/fjuttes)
![NPM Downloads](https://img.shields.io/npm/dw/fjuttes)
![NPM License](https://img.shields.io/npm/l/fjuttes)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/fjuttes)
![GitHub repo size](https://img.shields.io/github/repo-size/rerurate514/fjuttes)
![GitHub branch status](https://img.shields.io/github/checks-status/rerurate514/fjuttes/develop)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rerurate514/fjuttes)
![GitHub last commit](https://img.shields.io/github/last-commit/rerurate514/fjuttes)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Frerurate)

<div align="center">
	</br>
	</br>
	<img src="src/fjuttes-official-logo.svg" width="25%">	
	</br>
	</br>
	<strong>fJutteS</strong>
</div>
</br>
</br>

## インポート方法
### npm
npm経由で`fjuttes`を使用するには`npm install fjuttes`をコンソールで実行してから`node_modules`で使用します。
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
	
    <script type="module">
        import { assembleView, Text } from './node_modules/fjuttes/dist/index.mjs';

        assembleView(new Text("Hello World!"));
    </script>
</body>
</html>
```

### CDN
CDN形式でnpmを使用せずに`fJutteS`の機能を使用するには`unpkg`を使用することができます。
以下にコード例を示します。
```html
<script src="https://unpkg.com/fjuttes@2.4.0/dist/index.mjs"></script>
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
	
    <script type="importmap">
        {
            "imports": {
                "fjuttes": "https://unpkg.com/fjuttes@2.4.0/dist/index.mjs"
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
import { assembleView, Text } from "fjuttes";

assembleView(new Text("Hello World!"));
```
このコードで`<div id="fJutteS-Container"></div>`以下に`assemble`関数に渡した`View`が描画されます。

### ウィジェットの作成
#### Viewの継承
まず、このフレームワークには全てのウィジェットの根幹となる`View`インターフェースが提供されています。
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
引数には関数オブジェクトを渡し、その中で初期値を`return`で返却します。これはプリミティブな数値を管理、保持、監視するProviderです。ただし、なんの設定もしていないと値の変更の監視はできません。

#### Providerの使用-ProviderScope-read
Providerの値の変更を監視するためにはView単位で行います。
`fJutteS`では、値の変更を自動的に監視し、再描画を行う`ProviderScope`というインターフェースを提供しています。
`ProviderScope`を継承してウィジェットを作成します。
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

#### Providerの使用-ProviderScope-update
Providerの値を変更してウィジェットを再描画するには`Provider`クラスの`update`メソッドを使用します。
今回は`ElevatedButton`を押したら`counter`の値をインクリメントして、`Text`に反映されるコードを作成してみます。
```js
import { 
    assembleView, 
    Text, 
    Card, 
    Column,
    ElevatedButton,
    BaseCSS,
    SpaceBox,
    Center, 
    TextCSS, 
    FontCSS, 
    Provider, 
    ProviderObserver, 
    ProviderScope,
    ShadowLevel,
} from './node_modules/fjuttes/dist/index.mjs';

const counter = Provider.createProvider((ref) => {
    return 0;
}, "counter");

class ProviderExample extends ProviderScope {
    constructor(){
        super({
            watchingProviders: [ counter ]
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.height = "90vh";

        return element;
    }

    build(){
        counter.read()

        return new Center(
            new Card({
                radius:"16px",
                padding: "15px",
                background: "wheat",
                elevation: ShadowLevel.LVL5,
                child: new Column({
                    children: [
                        new ElevatedButton({
                            child: new Text("CLICK!"),
                            baseCSS: new BaseCSS({
                                height: "32px",
                            }),
                            onClick: () => {
                                counter.update((value) => {
                                    return value + 1;
                                })
                            }
                        }),
                        new SpaceBox({height: "16px"}),
                        new Text("click count : " + counter.read()),
                    ]
                }),
            })
        );
    }
}

assembleView(
    new ProviderExample()
);
```
`ElevatedButton`コンポーネントの`onClick`プロパティにて`Provider`の`update`を実行しています。
`update`にはその`Provider`の現在の値が渡されるので、その値にインクリメントをして`return`で返却し値を変更しています。
その結果、`ProviderScope`を継承したウィジェット自身が`Provider`内の値の変更を検知し自身を再描画します。

全てのコードを見る場合はこちらから確認することができます。
https://github.com/Rerurate514/fJutteS/blob/main/example-code/providerExample.html

#### Provider例-依存関係
`Provider`クラスには依存関係を管理する機能があります。
ここでは簡単なユーザを管理する`Provider`を作成します。
```js
//プロバイダーを作成
const userProvider = Provider.createProvider(ref => {
    return { name: "Jhon", age: 25 };
});
```

そして`userProvider`内の`age`を監視するには以下のように`ref`を使用して`provider`を作成します。
```js
const userAgeProvider = Provider.createProvider(ref => {
    ref.watch(userProvider, (user, currentValue) => {
        return user.age;
    });
    return ref.read(userProvider).age;
});
```
このように記述すると、自動的に`userProvider`がリッスン状態になり、`userProvider`の`age`が変更された際に`userAgeProvider`の値を自動的に変更します。これは`watch`または`ProviderScope`で`userAgeProvider`の変更を監視することができます。

#### LimitedProviderScope
`ProviderScope`インターフェースは`View`を継承しなければならず、さらに`watch`している`provider`の値が変更されるたびに再描画されてパフォーマンスが下がってしまいます。
これを解決するために`fJutteS`はその`rebuild`のスコープを狭めてくれる`LimitedProviderScope`コンポーネントを提供しています。
```js
import { 
    assembleView, 
	View,
    Text, 
    Column,
    ElevatedButton,
    BaseCSS,
    SpaceBox,
    Center, 
    TextCSS, 
    FontCSS, 
    Provider, 
    ProviderObserver, 
} from './node_modules/fjuttes/dist/index.mjs';

const counter = Provider.createProvider((ref) => {
    return 0;
}, "counter");

class ProviderExample extends View {
    constructor(){
        super();
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.height = "90vh";

        return element;
    }

    build(){
        return new Center(
            new Column({
                children: [
                new ElevatedButton({
                    child: new Text("CLICK!"),
                    baseCSS: new BaseCSS({
                        padding: "32px",
                    }),
                    onClick: () => {
                        counter.update((value) => {
                            return value + 1;
                        })
                    }
                }),
                new SpaceBox({height: "16px"}),
                new LimitedProviderScope({
                    watchingProviders: [ counter ],
                    build: (providerValue) => {
                        return new Text("click count : " + providerValue[0]);
                    }
                })
            ]
            }),
        );
    }
}

assembleView(
    new ProviderExample()
);
```
通常の`ProviderScope`を継承したやり方では、この`ProviderExample`ウィジェット全体が再描画されてしまいます。しかし、この`LimitedProviderScope`を使用したやり方では`Text`コンポーネントのみが再描画されます。この`build`関数オブジェクトの引数ですが、`provider`を`watchingProviders`で格納した順番でそれぞれの`Provider`の値が格納された配列が返されます。

#### ProviderObserverによる値の変更確認
`Jiperes`には`ProviderObserver`という`Provider`の値の変更履歴や依存関係を記録するクラスが実装されています。

そして、以下のコードを使用してログを確認することができます。  
##### `Provider`の更新時、依存関係構築時にログを出力する。
```js
new ProviderObserver().outLogs()
```  
  
##### `Provider`の更新履歴  
```js
console.log(new ProviderObserver().getAllUpdateHistory());
```  
  
##### 特定の`Provider`の更新履歴  
```js
console.log(new ProviderObserver().getFilteredUpdateHistory(userProvider));
```  
  
##### `Provider`の依存関係を表示  
```js
console.log(new ProviderObserver().getDependencyGraph());
```  

## 用語集
- View(ビュー)：`View`クラスまたはその他UI構築クラスから継承して作成されたUI部品
- コンポーネント：`fJutterS`側から提供されるViewのこと
- ウィジェット：`fJutteS`使用者がコンポーネントを組み合わせて作成したViewのこと
- インターフェース：`fJutteS`が提供している継承することで機能を使用できるクラスのこと。(`View`や`ProviderScope`など)

## 最後に余談
//TODO

## ライセンス
MIT
