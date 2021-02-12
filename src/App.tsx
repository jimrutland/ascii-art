import * as React from 'react';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { PixelGridType } from './components/PixelComponents/PixelGrid';

export type ImageType = "pixelated" | "grayscale";

const App = (): JSX.Element => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [imageType, setImageType] = useState<ImageType>(null);
    const [pixelFactor, setPixelFactor] = useState<number>(1);

    return (
        <div id="appContainer">
            <PictureCanvas
                factor={pixelFactor}
                image={image} 
                imageType={imageType}/>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <input type="number" placeholder="Factor"  onInput={(e) => setPixelFactor(parseInt(e.target.value))}/>
                <button onClick={() => setImageType("pixelated")}> Pixelate </button>
                <button onClick={() => setImageType("grayscale")}> Grayscale </button>
                <button onClick={() => setImageType(null)}> Clear </button>
            </div>
        </div>
    );
};

export default App;