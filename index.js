export function assembleView(viewArg) {
    let element = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    
    if(container != null) container.appendChild(element);
    viewArg.addPseudoElement();

    return element;
}

export default assembleView;

export { View } from './interface/view.js';
export { ProviderScope } from './interface/providerScope.js';
export { DynamicProviderScope } from './interface/dynamicProviderScope.js';

export { Card } from './components/card.js';
export { Center } from './components/center.js';
export { Column } from './components/column.js';
export { Padding } from './components/padding.js';
export { Position } from './components/position.js';
export { Row } from './components/row.js';
export { SpaceBox } from './components/spaceBox.js';
export { Stack } from './components/stack.js';
export { Text } from './components/text.js';
export { Box } from './components/box.js';
export { Image } from './components/image.js';
export { Link } from './components/link.js';
export { ElevatedButton } from './components/elevatedButton.js';
export { Margin } from './components/margin.js';
export { RadioButton } from './components/radioButton.js';
export { Chips } from './components/chips.js';
export { Hover } from './components/hover.js';

export { ShadowLevel } from './enums/shadowLevel.js';
export { TextCSS } from './enums/textCSS.js';
export { FontCSS } from './enums/fontCSS.js';
export { BaseCSS } from './enums/baseCSS.js';

export { Border } from './models/border.js';

export * from './errors/errors.js';

export { ProviderObserver } from './jiperes/observer.js';
export { Provider } from './jiperes/provider.js';

export { generateUUID } from './utils/generateUUID.js';
