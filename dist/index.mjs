function assembleView(viewArg) {
    let view = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    container.appendChild(view);
}

export { assembleView, assembleView as default };
