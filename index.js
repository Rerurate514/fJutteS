function assembleView(viewArg){
    let view = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    container.appendChild(view);
}

module.exports = assembleView;
module.exports.default = assembleView;
