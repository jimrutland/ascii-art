import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import FileUpload from './components/FileUpload';

const App = () => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    const [image, setImage] = useState<HTMLImageElement>(null);

    const asciiButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillText("Clicked the button", 10, 10);
    };

    const scalePreserveAspectRatio = (imgW: number, imgH: number, maxW: number, maxH: number) => {
        return(Math.min((maxW/imgW),(maxH/imgH)));
    };

    useEffect(() => {
        if (image) {
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
            const wrh = image.width / image.height;
            let newWidth = canvas.width;
            let newHeight = newWidth / wrh;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * wrh;
            }
            const xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
            const yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

            canvasContext.drawImage(image, xOffset, yOffset, newWidth, newHeight)
        }
    }, [image]);

    return (
        <div id="appContainer">
            <canvas 
                ref={canvasRef}
                width={800}
                height={800}
                id="canvas">
            </canvas>
            <div id="buttons">
                <FileUpload setImage={setImage}/>
                <button onClick={asciiButtonClick}>ASCII Artify</button>
            </div>
        </div>
    );
};

export default App;