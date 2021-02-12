"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var FileUpload_1 = require("./components/FileUpload");
var PictureCanvas_1 = require("./components/PictureCanvas");
var App = function () {
    var _a = react_1.useState(null), image = _a[0], setImage = _a[1];
    var _b = react_1.useState(null), imageType = _b[0], setImageType = _b[1];
    var _c = react_1.useState(1), pixelFactor = _c[0], setPixelFactor = _c[1];
    return (React.createElement("div", { id: "appContainer" },
        React.createElement(PictureCanvas_1["default"], { factor: pixelFactor, image: image, imageType: imageType }),
        React.createElement("div", { id: "buttons" },
            React.createElement(FileUpload_1["default"], { setImage: setImage }),
            React.createElement("input", { type: "number", placeholder: "Factor", onInput: function (e) { return setPixelFactor(parseInt(e.target.value)); } }),
            React.createElement("button", { onClick: function () { return setImageType("pixelated"); } }, " Pixelate "),
            React.createElement("button", { onClick: function () { return setImageType("grayscale"); } }, " Grayscale "),
            React.createElement("button", { onClick: function () { return setImageType(null); } }, " Clear "))));
};
exports["default"] = App;
