import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Pixel } from '../models/Pixel';
import { getPixelsForCanvas } from '../services/CanvasToPixels';

export interface PictureCanvasProps {
    image: HTMLImageElement;
    setRawPixelMatrix: (pixels: Pixel[][]) => void;
}

const PictureCanvas = (props: PictureCanvasProps): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    
    const drawImage = () => {
        if (props.image) {
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
            drawImageOnCanvas().then(() => {
                getPixelsFromCanvas();
            });
        }
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

    const getPixelsFromCanvas = () => { 
        const asciiArtMatrix = getPixelsForCanvas(canvasRef.current);
        props.setRawPixelMatrix(asciiArtMatrix);
    };

    useEffect(drawImage, [props.image]);

    return (
        <canvas 
            ref={canvasRef}
            width={800}
            height={800}
            id="canvas">
        </canvas>
    );
};

export default PictureCanvas;