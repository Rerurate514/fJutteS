export function assembleView(viewArg, idName = "fJutteS-Container") {
    viewArg.assemble();
    let element = viewArg.view;
    let container = document.getElementById(idName);

    if(container) container.appendChild(element);

    viewArg.assembleComplete();

    return element;
}
