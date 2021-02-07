import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { CanvasToAsciiService } from '../services/CanvasToAsciiService';

interface PictureCanvasProps {
    image: HTMLImageElement;
    shouldGenerateAsciiArt: boolean;
    setShouldGenerateAsciiArt(): void;
}

const PictureCanvas = (props: PictureCanvasProps) => {
    
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    const [asciiMatrix, setAsciiMatrix] = useState<string[][]>([]);
    const drawImage = () => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        drawImageOnCanvas();
   };

   const drawImageOnCanvas = async () => {
        const canvas = canvasRef.current;
        const resizedImage = await getResizedImageToCanvas();
        const xOffset = resizedImage.width < canvas.width ? ((canvas.width - resizedImage.width) / 2) : 0;
        const yOffset = resizedImage.height < canvas.height ? ((canvas.height - resizedImage.height) / 2) : 0;
        canvasRef.current.getContext('2d').drawImage(resizedImage, xOffset, yOffset, resizedImage.width, resizedImage.height);
   }

    const getResizedImageToCanvas = (): Promise<HTMLImageElement> => {
        const wrh = props.image.width / props.image.height;
        const canvas = canvasRef.current;
        let newWidth = canvas.width;
        let newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }
        return createImage(props.image.src, newWidth, newHeight);
    }

    const createImage = (src: string, width: number, height: number): Promise<HTMLImageElement> => {
        const newImg = new Image(width, height);
        newImg.src = src;
        return new Promise<HTMLImageElement>(resolve => {
            newImg.onload = () => {
                resolve(newImg);
            }
        }); 
    }

    const drawTextMatrixOnCanvas = (asciiMatrix: string[][]): void => {
        setAsciiMatrix(asciiMatrix);
    }

    const generateAsciiArt = () => { 
        if (props.shouldGenerateAsciiArt) {
            const asciiGenerator: CanvasToAsciiService = new CanvasToAsciiService(canvasRef.current);
            const asciiArtMatrix = asciiGenerator.getAsciiArtFromCanvas();
            drawTextMatrixOnCanvas(asciiArtMatrix);
            props.setShouldGenerateAsciiArt(false);
        }
    };

    useEffect(drawImage, [props.image]);
    useEffect(generateAsciiArt, [props.shouldGenerateAsciiArt]);

    return (
        <div style={{display: "flex"}}>
            <canvas 
                ref={canvasRef}
                width={800}
                height={800}
                style={{textRendering: "optimizeLegibility"}}
                id="canvas">
            </canvas>
            <div id="artContainer">
                {asciiMatrix.map(asciiRow => <div className="pixelRow">{asciiRow.map(asciiChar => <div className="pixel">{asciiChar}</div>)}</div>)} 
            </div>
        </div>
    );
};

export default PictureCanvas;