import * as React from 'react';
import { Pixel } from '../../models/Pixel';

export interface GridPixelProps {
    pixel: Pixel;
    factor: number;
}

const GridPixel = (props: GridPixelProps): JSX.Element => {
    const gridPixelStyle = {
        backgroundColor: `rgba(${props.pixel.getRedChannel()},${props.pixel.getGreenChannel()},${props.pixel.getBlueChannel()},${props.pixel.getAlphaChannel()})`
    };
    return (<span className="pixel" style={gridPixelStyle}></span>);
};

export default GridPixel;