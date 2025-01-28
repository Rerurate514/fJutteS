export function assembleView(viewArg) {
    let view = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    container.appendChild(view);
}

export default assembleView;

export { View } from './interface/view.js';

export { Card } from './components/card.js';
export { Center } from './components/center.js';
export { Column } from './components/column.js';
export { DynamicProviderScope } from './components/dynamicProviderScope.js';
export { Padding } from './components/padding.js';
export { Position } from './components/position.js';
export { ProviderScope } from './components/providerScope.js';
export { Row } from './components/row.js';
export { SpaceBox } from './components/spaceBox.js';
export { Stack } from './components/stack.js';
export { Text } from './components/text.js';

export { default as BoxShadow } from './enums/boxShadow.js';

export * from './errors/errors.js';

export { ProviderObserver } from './jiperes/observer.js';
export { Provider } from './jiperes/provider.js';
