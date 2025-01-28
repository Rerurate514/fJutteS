'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function assembleView(viewArg) {
    let view = viewArg.view;
    let container = document.getElementById("fJutteS-Container");
    container.appendChild(view);
}

exports.assembleView = assembleView;
exports.default = assembleView;
