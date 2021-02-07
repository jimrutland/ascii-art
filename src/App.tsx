import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import FileUpload from './components/FileUpload';
import PictureCanvas from './components/PictureCanvas';

const App = () => {
    const [image, setImage] = useState<HTMLImageElement>(null);
    const [shouldGenerateAsciiArt, setShouldGenerateAsciiArt] = useState<boolean>(false);
    
    return (
        <div id="appContainer">
            <PictureCanvas 
                image={image} 
                shouldGenerateAsciiArt={shouldGenerateAsciiArt}
                setShouldGenerateAsciiArt={setShouldGenerateAsciiArt} />
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <button onClick={() => setShouldGenerateAsciiArt(true)}> Ascii Artify </button>
            </div>
        </div>
    );
};

export default App;