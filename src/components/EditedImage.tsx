
import * as React from 'react';
import { ImageType } from '..App';
import { Pixel } from '../models/Pixel';
import { useEffect, useRef } from 'react';

export interface ImageProps {
    pixels: Pixel[][];
    imageType: ImageType;
    factor: number;
}

const EditedImage = (props: ImageProps): JSX.Element => {
    const imageCanvas = useRef<HTMLCanvasElement>();
    
    const drawImage = (): void => {
        const context = imageCanvas.current.getContext("2d");
        const newImageData: number[] = props.pixels.reduce((accumulation: number[], currentPixelRow: Pixel[]) => {
            for (const pixel of currentPixelRow) {
                accumulation.push(pixel.getRedChannel());
                accumulation.push(pixel.getGreenChannel());
                accumulation.push(pixel.getBlueChannel());
                accumulation.push(pixel.getAlphaChannel());
            }
            return accumulation;
        }, []);
        
        const pixelDataForImage = new ImageData(Uint8ClampedArray.from(newImageData), props.pixels.length, props.pixels.length);
        context.putImageData(pixelDataForImage, 0, 0);
    }

    useEffect(drawImage, [props.pixels]);

    return (<canvas width={800} height={800} ref={imageCanvas}></canvas>);
};

export default EditedImage;