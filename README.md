# THIS IS PURE JS FRAMEWORK
`fJutteS` is a declarative component UI framework built purely with JavaScript. It's the perfect framework when you want to do Flutter-like component-based programming in specialized environments where only HTML, CSS, and JavaScript files are allowed (environments where you can't use React or Vue). While `fJutteS` comes with various pre-built components, these are ultimately just widgets that I created, and users can freely create their own widgets - after all, it's just JavaScript!
For state management, `fJutteS` uses its own library called `Jiperes` that's been optimized specifically for the framework, eliminating the need to choose a state management library. However, this comes with a trade-off: the loss of setState and useState. This means that individual widgets cannot modify their state independently. We hope you'll understand this as one of our core design philosophies.
- latest version -> fjuttes@2.7.2
- 日本語バージョンはこちら -> https://github.com/Rerurate514/fJutteS/blob/main/README-ja.md

<h6>OFFICIAL WIKI : https://rerurate514.github.io/fJutteS-Wiki/</h6>

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

## Installations
### npm
To use `fjuttes` via npm, run `npm install fjuttes` in the console and then use it in `node_modules`.
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
You can use `unpkg` to utilize `fJutteS` functionality in CDN format without using npm.
Here's a code example:
```html
<script src="https://unpkg.com/fjuttes@2.7.2/dist/index.mjs"></script>
```

While more details will be explained later, you can use it as follows:
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
                "fjuttes": "https://unpkg.com/fjuttes@2.7.2/dist/index.mjs"
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
Writing code this way will simply display text.

## Usage - Tutorial
### Rendering Widgets
First, let's explain how to render a `fJutteS` `View`.
Start by preparing a `div` element with the following id in your HTML file (e.g., `index.html`):
```html
<div id="fJutteS-Container"></div>
```

Then, in your `js` file, do the following:
```js
import { assembleView, Text } from "fjuttes";

assembleView(new Text("Hello World!"));
```
This code will render the `View` passed to the `assemble` function within `<div id="fJutteS-Container"></div>`.

### Creating Widgets
#### Inheriting from View
First, this framework provides a `View` component that serves as the foundation for all widgets.
Inheriting from this class is the first step in creating a widget.
```js
class SampleWidget extends View {
    ...
}
```

#### Calling the View Constructor
Next, call the `View` constructor to perform necessary rendering operations on the widget side.
```js
class SampleWidget extends View {
    constructor(){
        super();
    }
}
```

#### Defining Widget Elements
Next, define the `HTMLElement` for this widget.
This is done by overriding `createWrapView` defined in the `View` class.
You can create `HTMLElement`s using the `document.createElement` method available in JS.
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
Note that `createWrapView` must be overridden, or you'll get this error:
```error
throw new TypeError("createWrapView method must be overridden and return an HTMLElement type.");
```

#### Defining Widget Styles
To apply styles to the `HTMLElement` created in `createWrapView`, override the `styledView` method.
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
The `styledView` method receives the `HTMLElement` created by `createWrapView` as an argument.
Refer to `HTMLElement` documentation for styling details.
Make sure to return the styled element at the end of this method.
If you don't return it, you'll get this error:
```error
throw new TypeError("styledView must contain an HTMLElement object. Type passed:", typeof child);
```

If you don't need this method, you can ignore it without overriding.

#### embedScriptToView
If you want to embed standard JS scripts into your widget, do it in `embedScriptToView`.
For example, for radio button event firing:
```js
    embedScriptToView(element){
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    _setEventListenerToRadioBtn(radioBtn) {
        radioBtn.addEventListener("change", (e) => {   
            if (e.target.checked) {
                //Code that executes when event fires
            }
        });
    }
```
Make sure to return the element at the end of this method too.
If you don't return it, you'll get this error:
```error
throw new TypeError("embedScriptToView must contain an HTMLElement object. Type passed:", typeof child);
```

If you don't need this method, you can ignore it without overriding.

#### Creating Child Elements for Widgets
To add child elements to the element created in `createWrapView`, override and use the `build` method.
You can use both your custom widgets and components provided by fJutteS here.
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
Here we're using the `Text` component to display text.
Make sure to return the component or widget with `return`.
Now you've created a basic widget.

### Passing Values to Widgets
Sometimes you might want to pass child elements to a widget for building, or pass parent properties to child elements for display.
This section explains how to do that.

If you were using the Text component to display a string passed from a parent element, you would write.
```js
class SampleWidget extends View {
    constructor(text){
        super();
        this.text = text;//Store in SampleWidget's instance variable here
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
        return new Text(this.text);//Use it here
    }
}
```
However, running this will display `undefined`.
This is because in the `View` class, `createWrapView` and `build` methods are executed in the constructor, so `build` finishes executing before `this.text = text`.

To avoid this problem, you can pass `props` as an argument to the `View` class constructor.

Let's rewrite the above code using `props`:
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
        return new Text(this.props.text);//Use it here
    }
}
```
`props` is passed as an object.
Since it's stored as an instance variable of the `View` class before methods like `createWrapView` are executed, the values become available in methods like `build`.

Similarly, when passing child elements:
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
This makes it easy to render child elements.

### State Management with Provider
The `fJutteS` framework comes with a state management library called `Jiperes`.
When you want to rebuild and re-render widgets due to value changes, use Provider.

#### Creating a Provider
Create a Provider using the `Provider` class's factory method `createProvider()`.
Let's try creating one:
```js
const sampleProvider = Provider.createProvider(() => {
    return 0;
})
```
Pass a function object as an argument and return the initial value inside it.
(This is a basic Provider for managing numerical values; Providers also have dependency relationship features.)

#### Using Provider - ProviderScope - read
To monitor Provider value changes, do it on a View-by-View basis.
`fJutteS` provides an interface called `ProviderScope` that automatically monitors value changes and redraws them.
Create a widget by inheriting from the `ProviderScope` component:
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
The `ProviderScope` class constructor can take three properties:
`props`, `watchingProvider`, and `child`.
`props` serves the same role as in `View`.
`watchingProvider` takes an array of Providers.
Providers passed to `ProviderScope` automatically enter listening state, and if any Provider in the array changes value, the widget inheriting from `ProviderScope` will be rebuilt.

Here we're using the Provider class's `read` method to read values.
The `read` method is simply for reading values.

#### Using Providers - ProviderScope - Updates
To modify a Provider's value and trigger widget redrawing, use the `update` method of the `Provider` class.
Let's create code that increments a `counter` value when an `ElevatedButton` is pressed and reflects this change in a `Text` widget.

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

The Provider's `update` is executed in the `onClick` property of the `ElevatedButton` component.
You can view the complete code here:
https://github.com/Rerurate514/fJutteS/blob/main/example-code/providerExample.html

#### Provider Example - Dependencies
The `Provider` class includes functionality to manage dependencies.
Here's how to create a simple Provider to manage user data:

```js
// Create provider
const userProvider = Provider.createProvider(ref => {
    return { name: "Jhon", age: 25 };
});
```

To monitor the `age` within `userProvider`, create a provider using `ref` like this:

```js
const userAgeProvider = Provider.createProvider(ref => {
    ref.watch(userProvider, (user, currentValue) => {
        return user.age;
    });
    return ref.read(userProvider).age;
});
```

#### LimitedProviderScope
The `ProviderScope` interface must inherit from `View`, and furthermore, performance degrades as it triggers a re-render every time a watched provider's value changes. To solve this issue, `fJutteS` provides the `LimitedProviderScope` component that narrows the rebuild scope.

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

With the traditional approach of inheriting from `ProviderScope`, the entire `ProviderExample` widget would be re-rendered. However, using `LimitedProviderScope`, only the `Text` component gets re-rendered. Regarding the `build` function object's arguments, they are provided as an array containing the values of each Provider in the same order as they were stored in `watchingProviders`.

With this setup, `userProvider` automatically enters a listening state, and when the `age` in `userProvider` changes, it automatically updates the value in `userAgeProvider`. These changes can be monitored using either `watch` or `ProviderScope`.

#### Tracking Value Changes with ProviderObserver
`Jiperes` implements a `ProviderObserver` class that records Provider value change history and dependencies.
To use this class, first enable log output:

```js
new ProviderObserver().outLogs()
```

Once logging is enabled, you can check logs using these methods:
- View all Provider update history: `console.log(new ProviderObserver().getAllUpdateHistory());`
- View update history for a specific Provider: `console.log(new ProviderObserver().getFilteredUpdateHistory(userProvider));`
- Display Provider dependency graph: `console.log(new ProviderObserver().getDependencyGraph());`

## Glossary
- View: UI components created by inheriting from the `View` class or other UI construction classes
- Component: Views provided by `fJutterS`
- Widget: Views created by `fJutteS` users by combining components

## Final Notes
//TODO

## License
MIT
