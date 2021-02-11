import * as React from 'react';
import { Pixel } from '../../models/Pixel';

export interface AsciiColorPixelProps {
    pixel: Pixel;
}

const AsciiPlainPixel = (props: AsciiColorPixelProps): JSX.Element => {
    const asciiColorPixelStyle = {
        maxWidth: "1px",
        maxHeight: "1px",
        minWidth: "1px",
        minHeight: "1px",
        fontSize: "3px",
        color: "black"
    };
    return (<span className="pixel" style={asciiColorPixelStyle}>{props.pixel.getAsciiCharacter()}</span>);
};

export default AsciiPlainPixel;