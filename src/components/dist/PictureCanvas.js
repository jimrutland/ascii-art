"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var PixelationService_1 = require("../services/PixelationService");
var CanvasToPixels_1 = require("../services/CanvasToPixels");
var EditedImage_1 = require("./EditedImage");
var PixelGrayscaleService_1 = require("../services/PixelGrayscaleService");
var PictureCanvas = function (props) {
    var canvasRef = react_1.useRef(null);
    var _a = react_1.useState([]), rawPixelMatrix = _a[0], setRawPixelMatrix = _a[1];
    var _b = react_1.useState([]), editedPixels = _b[0], setEditedPixels = _b[1];
    var drawImage = function () {
        if (props.image) {
            var canvas = canvasRef.current;
            var canvasContext = canvas.getContext('2d');
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            drawImageOnCanvas().then(function () {
                getPixelsFromCanvas();
            });
        }
    };
    var drawImageOnCanvas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, resizedImage, xOffset, yOffset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = canvasRef.current;
                    return [4 /*yield*/, getResizedImageToCanvas()];
                case 1:
                    resizedImage = _a.sent();
                    xOffset = resizedImage.width < canvas.width ? ((canvas.width - resizedImage.width) / 2) : 0;
                    yOffset = resizedImage.height < canvas.height ? ((canvas.height - resizedImage.height) / 2) : 0;
                    canvasRef.current.getContext('2d').drawImage(resizedImage, xOffset, yOffset, resizedImage.width, resizedImage.height);
                    return [2 /*return*/];
            }
        });
    }); };
    var getResizedImageToCanvas = function () {
        var wrh = props.image.width / props.image.height;
        var canvas = canvasRef.current;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }
        return createImage(props.image.src, newWidth, newHeight);
    };
    var createImage = function (src, width, height) {
        var newImg = new Image(width, height);
        newImg.src = src;
        return new Promise(function (resolve) {
            newImg.onload = function () {
                resolve(newImg);
            };
        });
    };
    var getPixelsFromCanvas = function () {
        var asciiArtMatrix = CanvasToPixels_1.getPixelsForCanvas(canvasRef.current);
        setRawPixelMatrix(asciiArtMatrix);
    };
    var drawResultingPixels = function () {
        switch (props.imageType) {
            case "pixelated":
                setEditedPixels(PixelationService_1.getPixelatedImage(rawPixelMatrix, props.factor));
                break;
            case "grayscale":
                setEditedPixels(PixelGrayscaleService_1.getGrayscaledImage(rawPixelMatrix));
        }
    };
    react_1.useEffect(drawImage, [props.image]);
    react_1.useEffect(drawResultingPixels, [props.imageType]);
    return (React.createElement("div", { style: { display: "flex" } },
        React.createElement("canvas", { ref: canvasRef, width: 800, height: 800, id: "canvas" }),
        React.createElement("div", { id: "artContainer" }, (props.imageType && editedPixels.length) ?
            React.createElement(EditedImage_1["default"], { pixels: editedPixels, imageType: props.imageType, factor: props.factor })
            : null)));
};
exports["default"] = PictureCanvas;
