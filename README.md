# THIS IS PURE JS FRAMEWORK
This is a declarative component UI framework built with pure JavaScript.
It uses a custom library called `Jiperes` optimized for `fJuttes` for state management, so you no longer need to select a state management library.
- latest version -> fjuttes@1.0.7
![fJutteS-official-logo](src/fjuttes-official-logo.svg)

- 日本語バージョンはこちら -> https://github.com/Rerurate514/fJutteS/blob/main/README-ja.md

## Import Method
You can use `unpkg` to utilize `fJutteS` functionality in CDN format without using npm.
Here's a code example:
```html
<script src="https://unpkg.com/fjuttes@1.0.7/dist/index.mjs"></script>
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
                "fjuttes": "https://unpkg.com/fjuttes@1.0.7/dist/index.mjs"
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

First, you might write something like this when you want to display text passed from a parent element using the `Text` component:
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

## Glossary
- View: UI components created by inheriting from the `View` class or other UI construction classes
- Component: Views provided by `fJutterS`
- Widget: Views created by `fJutteS` users by combining components

## Final Notes
//TODO

## License
MIT
