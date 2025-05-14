export function assembleView(viewArg, idName = "fJutteS-Container") {
    let element = viewArg.view;
    viewArg.isTestMode = true;
    let container = document.getElementById(idName);
    
    if(container != null) container.appendChild(element);
    //viewArg.addPseudoElement();

    //viewArg._rendered();

    return element;
}
