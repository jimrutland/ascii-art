
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pixel } from '../../models/Pixel'
import AsciiPlainPixel from './AsciiPlainPixel';
import GridPixel from './GridPixel';
import { PixelGridType } from './PixelGrid';

export interface PixelGridRowProps {
    pixels: Pixel[];
    gridType: PixelGridType;
    factor: number;
}



const PixelGridRow = (props: PixelGridRowProps): JSX.Element => {
    const createGridRow = () => {
        switch(props.gridType) {
            case "asciiGray":
                return props.pixels.map((pixel: Pixel, pixelIndex: number) => {
                    return <AsciiPlainPixel key={pixelIndex} pixel={pixel} />;
                });
            case "pixelated":
                return props.pixels.map((pixel: Pixel, pixelIndex: number) => {
                    return <GridPixel key={pixelIndex} pixel={pixel} factor={props.factor} />;
                });
            default:
                break;
        }
    };
    return (<div className="pixelGridRow">
        {createGridRow()}
    </div>);
};

export default PixelGridRow;