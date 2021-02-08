import * as React from 'react';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';


const App = () => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [shouldGenerateAsciiArt, setShouldGenerateAsciiArt] = useState<boolean>(false);
    const [shouldGenerateColorAsciiArt, setShouldGenerateColorAsciiArt] = useState<boolean>(false);
    const [shouldGenerateBlurryImage, setShouldGenerateBlurryImage] = useState<boolean>(false);
    const artTypes: Map<string, (bool: boolean) => void> = new Map([
         ["grayAscii", setShouldGenerateAsciiArt],
         ["colorAscii", setShouldGenerateColorAsciiArt],
         ["blurry", setShouldGenerateBlurryImage]
    ]);

    const setArtState = (activeArtType: string): void => {
        artTypes.forEach((setArtType, currentArtType) => {
            setArtType(activeArtType === currentArtType);
        })
    };

    return (
        <div id="appContainer">
            <PictureCanvas 
                image={image} 
                shouldGenerateAsciiArt={shouldGenerateAsciiArt}
                shouldGenerateColorAsciiArt={shouldGenerateColorAsciiArt} 
                shouldGenerateBlurryImage={shouldGenerateBlurryImage}/>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <button onClick={() => setArtState("blurry")}> Blurry </button>
                <button onClick={() => setArtState("grayAscii")}> Ascii Grayscale </button>
                <button onClick={() => setArtState("colorAscii")}> Ascii Color</button>
            </div>
        </div>
    );
};

export default App;