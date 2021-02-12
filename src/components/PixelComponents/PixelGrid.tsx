import * as React from 'react';
import { Pixel } from '../../models/Pixel';
import PixelGridRow from "./PixelGridRow";
import { getPixelatedImage } from '../../services/PixelationService';

export type PixelGridType = "pixelated" | "asciiGray" | "asciiColor";

interface PixelGridProps {
    pixels: Pixel[][];
    gridType: PixelGridType;
    factor: number;
}

const PixelGrid = (props: PixelGridProps): JSX.Element => {
    const createPixelRows = (): JSX.Element => {
        const pixelsToRender = props.gridType === "pixelated" ? getPixelatedImage(props.pixels, props.factor) : props.pixels;
        return (<>
            {pixelsToRender.map((pixelRow: Pixel[], index: number) => {
                return <PixelGridRow key={index} pixels={pixelRow} factor={props.factor} gridType={props.gridType}/>;
            })}
        </>);
    }

    return props.pixels && props.gridType && createPixelRows();
};

export default PixelGrid;