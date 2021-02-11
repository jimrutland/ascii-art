import * as React from 'react';
import { Pixel } from '../../models/Pixel';

export interface AsciiColorPixelProps {
    pixel: Pixel;
}

const AsciiColorPixel = (props: AsciiColorPixelProps): JSX.Element => {
    const asciiColorPixelStyle = {
        maxWidth: "1px",
        maxHeight: "1px",
        minWidth: "1px",
        minHeight: "1px",
        fontSize: "3px",
        color: `rgba(${props.pixel.getRedChannel()},${props.pixel.getGreenChannel()},${props.pixel.getBlueChannel()},${props.pixel.getAlphaChannel()})`
    };
    return (<span className="pixel" style={asciiColorPixelStyle}>{props.pixel.getAsciiCharacter()}</span>);
};

export default AsciiColorPixel;