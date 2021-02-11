import * as React from 'react';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';
import { PixelGridType } from './components/PixelComponents/PixelGrid';


const App = () => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [gridType, setGridType] = useState<PixelGridType>(null);
    const [pixelFactor, setPixelFactor] = useState<number>(1);

    return (
        <div id="appContainer">
            <PictureCanvas
                blurFactor={pixelFactor}
                image={image} 
                gridType={gridType} />
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <input type="number" placeholder="Blur Factor"  onInput={(e) => setPixelFactor(parseInt(e.target.value))}/>
                <button onClick={() => setGridType("pixelated")}> Blurry </button>
                <button onClick={() => setGridType("asciiGray")}> Ascii Grayscale </button>
                <button onClick={() => setGridType("asciiColor")}> Ascii Color</button>
            </div>
        </div>
    );
};

export default App;