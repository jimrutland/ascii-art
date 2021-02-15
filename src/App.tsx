import * as React from 'react';
import { useState } from 'react';
import EditedImage from './components/EditedImage';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { Pixel } from './models/Pixel';
import { getPixelatedImage } from './services/PixelationService';
import { getInvertedColorImage } from './services/PixelColorInversionService';
import { getColorShiftedImage } from './services/PixelColorShiftingService';
import { getGrayscaledImage } from './services/PixelGrayscaleService';

export type ImageType = "pixelated" | "grayscale" | "invert" | "flip" | "shift" | "clear";

const App = (): JSX.Element => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [pixelFactor, setPixelFactor] = useState<number>(1);
    const [editedPixels, setEditedPixels] = useState<Pixel[][]>([]);
    const [rawPixelMatrix, setRawPixelMatrix] = useState<Pixel[][]>([]);

    const drawEditedImage = (imageType: ImageType) => {
        const pixelsToEdit = (editedPixels.length) ? editedPixels : rawPixelMatrix;
        switch(imageType)  {
            case "pixelated":
                setEditedPixels(getPixelatedImage(pixelsToEdit, pixelFactor));
                break;
            case "grayscale":
                setEditedPixels(getGrayscaledImage(pixelsToEdit));
                break;
            case "invert":
                setEditedPixels(getInvertedColorImage(pixelsToEdit));
                break;
            case "shift":
                setEditedPixels(getColorShiftedImage(pixelsToEdit));
                break;
            case "flip":
                setEditedPixels(pixelsToEdit.map(pixelRow => pixelRow.reverse()));
                break;
            case "clear":
                setEditedPixels([]);
                break;
            default:
                break;
        }
    };

    return (
        <div id="appContainer">
            <div id="artContainer">
                <PictureCanvas
                    image={image} 
                    setRawPixelMatrix={setRawPixelMatrix}/>
                {editedPixels.length ? <EditedImage pixels={editedPixels} /> : null}
            </div>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <input type="number" placeholder="Factor" value={pixelFactor} onInput={(e) => setPixelFactor(parseInt(e.target.value))}/>
                <button onClick={() => drawEditedImage("pixelated")}> Pixelate </button>
                <button onClick={() => drawEditedImage("grayscale")}> Grayscale </button>
                <button onClick={() => drawEditedImage("invert")}> Invert Color </button>
                <button onClick={() => drawEditedImage("flip")}> Flip Image </button>
                <button onClick={() => drawEditedImage("shift")}> Shift Image Color </button>
                <button onClick={() => { }}> Download </button>
                <button onClick={() => drawEditedImage("clear")}> Clear </button>
            </div>
        </div>
    );
};

export default App;