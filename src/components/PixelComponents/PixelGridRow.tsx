
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pixel } from '../../models/Pixel'
import AsciiColorPixel from './AsciiColorPixel';
import AsciiPlainPixel from './AsciiPlainPixel';
import GridPixel from './GridPixel';
import ImagePixel from './ImagePixel';
import { PixelGridType } from './PixelGrid';

export interface PixelGridRowProps {
    pixels: Pixel[];
    gridType: PixelGridType;
    factor: number;
}



const PixelGridRow = (props: PixelGridRowProps): JSX.Element => {
    const createGridRow = () => {
        switch(props.gridType) {
            case "asciiColor":
                return props.pixels.map((pixel: Pixel, pixelIndex: number) => {
                    return <AsciiColorPixel key={pixelIndex} pixel={pixel} />;
                });
            case "asciiGray":
                return props.pixels.map((pixel: Pixel, pixelIndex: number) => {
                    return <AsciiPlainPixel key={pixelIndex} pixel={pixel} />;
                });
            case "pixelated":
                return props.pixels.map((pixel: Pixel, pixelIndex: number) => {
                    return <GridPixel key={pixelIndex} pixel={pixel} factor={props.factor} />;
                });
                break;
            case "clear":
                break;
            default:
                break;
        }
    };
    return (<div className="pixelGridRow" style={{height: `${props.factor}px`}}>
        {createGridRow()}
    </div>);
};

export default PixelGridRow;