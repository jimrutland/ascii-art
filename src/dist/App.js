"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var EditedImage_1 = require("./components/EditedImage");
var FileUpload_1 = require("./components/FileUpload");
var PictureCanvas_1 = require("./components/PictureCanvas");
var PixelationService_1 = require("./services/PixelationService");
var PixelColorInversionService_1 = require("./services/PixelColorInversionService");
var PixelColorShiftingService_1 = require("./services/PixelColorShiftingService");
var PixelGrayscaleService_1 = require("./services/PixelGrayscaleService");
var App = function () {
    var _a = react_1.useState(null), image = _a[0], setImage = _a[1];
    var _b = react_1.useState(1), pixelFactor = _b[0], setPixelFactor = _b[1];
    var _c = react_1.useState([]), editedPixels = _c[0], setEditedPixels = _c[1];
    var _d = react_1.useState([]), rawPixelMatrix = _d[0], setRawPixelMatrix = _d[1];
    var drawEditedImage = function (imageType) {
        var pixelsToEdit = (editedPixels.length) ? editedPixels : rawPixelMatrix;
        switch (imageType) {
            case "pixelated":
                setEditedPixels(PixelationService_1.getPixelatedImage(pixelsToEdit, pixelFactor));
                break;
            case "grayscale":
                setEditedPixels(PixelGrayscaleService_1.getGrayscaledImage(pixelsToEdit));
                break;
            case "invert":
                setEditedPixels(PixelColorInversionService_1.getInvertedColorImage(pixelsToEdit));
                break;
            case "shift":
                setEditedPixels(PixelColorShiftingService_1.getColorShiftedImage(pixelsToEdit));
                break;
            case "flip":
                setEditedPixels(pixelsToEdit.map(function (pixelRow) { return pixelRow.reverse(); }));
                break;
            case "clear":
                setEditedPixels([]);
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { id: "appContainer" },
        React.createElement("div", { id: "artContainer" },
            React.createElement(PictureCanvas_1["default"], { image: image, setRawPixelMatrix: setRawPixelMatrix }),
            editedPixels.length ? React.createElement(EditedImage_1["default"], { pixels: editedPixels }) : null),
        React.createElement("div", { id: "buttons" },
            React.createElement(FileUpload_1["default"], { setImage: setImage }),
            React.createElement("input", { type: "number", placeholder: "Factor", value: pixelFactor, onInput: function (e) { return setPixelFactor(parseInt(e.target.value)); } }),
            React.createElement("button", { onClick: function () { return drawEditedImage("pixelated"); } }, " Pixelate "),
            React.createElement("button", { onClick: function () { return drawEditedImage("grayscale"); } }, " Grayscale "),
            React.createElement("button", { onClick: function () { return drawEditedImage("invert"); } }, " Invert Color "),
            React.createElement("button", { onClick: function () { return drawEditedImage("flip"); } }, " Flip Image "),
            React.createElement("button", { onClick: function () { return drawEditedImage("shift"); } }, " Shift Image Color "),
            React.createElement("button", { onClick: function () { } }, " Download "),
            React.createElement("button", { onClick: function () { return drawEditedImage("clear"); } }, " Clear "))));
};
exports["default"] = App;
