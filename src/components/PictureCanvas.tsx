import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Pixel } from '../models/Pixel';
import { getPixelsForCanvas } from '../services/CanvasToPixels';

interface PictureCanvasProps {
    image: HTMLImageElement;
    shouldGenerateAsciiArt: boolean;
    shouldGenerateColorAsciiArt: boolean;
    shouldGenerateBlurryImage: boolean;
}

const PictureCanvas = (props: PictureCanvasProps) => {

    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    const [pixelMatrix, setPixelMatrix] = useState<Pixel[][]>([]);

    const drawImage = () => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        drawImageOnCanvas().then(() => {
            getPixelsFromCanvas();
        });
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
        setPixelMatrix(asciiArtMatrix);
    };

    const createAsciiMatrix = () => {
        return (pixelMatrix.map(pixelRow => {
            return (<div className="pixelRow">{pixelRow.map(pixel => {
                    return (<div className="pixel">{pixel.getAsciiCharacter()}</div>);
                })}
            </div>)
        }));
    }

    const createColorAsciiMatrix = () => {
        return (pixelMatrix.map((pixelRow: Pixel[]) => {
            return <div className="pixelRow">{
                pixelRow.map((pixel: Pixel) => {
                    return <div className="pixel" style={{color: `rgb(${pixel.getRedChannel()}, ${pixel.getGreenChannel()}, ${pixel.getBlueChannel()})`}}>
                        {pixel.getAsciiCharacter()}
                    </div>;
                })
            }
            </div>
        }));
    };

    const getBlurryPixels = (pixelMatrixToBlur: Pixel[][]) => {
        const blurryPixels: Pixel[][] = [];
        for (let i = 0; i < pixelMatrixToBlur.length; i += 4) {
            const currentPixelRow = pixelMatrixToBlur[i];
            const oneRowDown = pixelMatrixToBlur[i + 1];
            const twoRowsDown = pixelMatrixToBlur[i + 2];
            const threeRowsDown = pixelMatrixToBlur[i + 3];
            if (!oneRowDown || !twoRowsDown || !threeRowsDown) {
                break;
            }
            const blurryRow: Pixel[] = [];
            for(let j = 0; j < currentPixelRow.length; j += 4) {
                let accumulativeRedValue = 0;
                let accumulativeGreenValue = 0;
                let accumulativeBlueValue = 0;
                let accumulativeAlphaValue = 0;
                const pixelsToAverage = [   
                    currentPixelRow[j],
                    currentPixelRow[j + 1],
                    oneRowDown[j],
                    oneRowDown[j + 1],
                    twoRowsDown[j],
                    twoRowsDown[j + 1],
                    threeRowsDown[j],
                    threeRowsDown[j + 1]
                ];
                for (const pixel of pixelsToAverage) {
                    accumulativeRedValue += pixel.getRedChannel();
                    accumulativeGreenValue += pixel.getGreenChannel();
                    accumulativeBlueValue += pixel.getBlueChannel();
                    accumulativeAlphaValue += pixel.getAlphaChannel();
                }
                const blurryPixel = new Pixel(accumulativeRedValue / pixelsToAverage.length, accumulativeGreenValue / pixelsToAverage.length, accumulativeBlueValue / pixelsToAverage.length, accumulativeAlphaValue / pixelsToAverage.length, pixelsToAverage.length / 2, pixelsToAverage.length / 2);                
                blurryRow.push(blurryPixel);
            }
           blurryPixels.push(blurryRow); 
        }
        return blurryPixels;
    };

    const createBlurryImage = () => {
        const pixelsToRender = getBlurryPixels(pixelMatrix);
        return (pixelsToRender.map((pixelRow: Pixel[]) => {
            return <div className="pixelRow" style={{maxHeight:`${pixelRow[0].getHeight()}px`}}>{
                pixelRow.map((pixel: Pixel) => {
                    return <div className="pixel" style={{width: `${pixel.getWidth()}px`, height:`${pixel.getHeight()}px`, backgroundColor: `rgba(${pixel.getRedChannel()}, ${pixel.getGreenChannel()}, ${pixel.getBlueChannel()}, ${pixel.getAlphaChannel()})`}}></div>;
                })
            }
            </div>
        }));
    };

    useEffect(drawImage, [props.image]);

    return (
        <div style={{display: "flex"}}>
            <canvas 
                ref={canvasRef}
                width={800}
                height={800}
                id="canvas">
            </canvas>
            <div id="artContainer">
                { props.shouldGenerateAsciiArt && createAsciiMatrix() }
                { props.shouldGenerateColorAsciiArt && createColorAsciiMatrix() }
                { props.shouldGenerateBlurryImage && createBlurryImage() }
            </div>
        </div>
    );
};

export default PictureCanvas;