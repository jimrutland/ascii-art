import * as React from 'react';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { PixelGridType } from './components/PixelComponents/PixelGrid';

export type ImageType = "pixelated";

const App = (): JSX.Element => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [imageType, setImageType] = useState<ImageType>(null);
    const [gridType, setGridType] = useState<PixelGridType>(null);
    const [pixelFactor, setPixelFactor] = useState<number>(1);


    const setImageTypeOnly = (imageType: ImageType): void => {
        setGridType(null);
        setImageType(imageType);
    }

    const setGridTypeOnly = (gridType: PixelGridType): void => {
        setImageType(null);
        setGridType(gridType);
    }

    return (
        <div id="appContainer">
            <PictureCanvas
                factor={pixelFactor}
                image={image} 
                imageType={imageType}
                gridType={gridType} />
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <input type="number" placeholder="Factor"  onInput={(e) => setPixelFactor(parseInt(e.target.value))}/>
                <button onClick={() => setImageTypeOnly("pixelated")}> Pixelate </button>
                <button onClick={() => setGridTypeOnly("asciiGray")}> Ascii Grayscale </button>
                <button onClick={() => setGridTypeOnly(null)}> Clear </button>
            </div>
        </div>
    );
};

export default App;