export function assembleView(viewArg) {
    let view = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    container.appendChild(view);
}

export default assembleView;

export { default as View } from './interface/view.js';

export { default as Card } from './components/card.js';
export { default as Center } from './components/center.js';
export { default as Column } from './components/column.js';
export { default as DynamicProviderScope } from './components/dynamicProviderScope.js';
export { default as Padding } from './components/padding.js';
export { default as Position } from './components/position.js';
export { default as ProviderScope } from './components/providerScope.js';
export { default as Row } from './components/row.js';
export { default as SpaceBox } from './components/spaceBox.js';
export { default as Stack } from './components/stack.js';
export { default as Text } from './components/text.js';

export { default as BoxShadow } from './enums/boxShadow.js';

export * from './errors/errors.js';

export { ProviderObserver } from './jiperes/observer.js';
export { Provider } from './jiperes/provider.js';
