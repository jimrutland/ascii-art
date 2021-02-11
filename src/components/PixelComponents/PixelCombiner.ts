import { Pixel } from "../../models/Pixel";

export function createCombinedPixel(pixelsToCombine: Pixel[]): Pixel {
    const redChannels = [];
    const blueChannels = [];
    const greenChannels = [];
    for (const pixel of pixelsToCombine){
        redChannels.push(pixel.getRedChannel());
        greenChannels.push(pixel.getGreenChannel());
        blueChannels.push(pixel.getBlueChannel());
    }
    return getCombinedPixel(redChannels, greenChannels, blueChannels);
}

function getCombinedPixel(reds: number[], greens: number[], blues: number[]): Pixel {
    const redAverage = getAverageColor(reds);
    const greenAverage = getAverageColor(greens);
    const blueAverage = getAverageColor(blues);
    return new Pixel(redAverage, greenAverage, blueAverage, 1);
}

function getAverageColor(colors: number[]): number {
    return colors.reduce((channelAccumulation: number, colorChannelValue: number): number => {
        return channelAccumulation += colorChannelValue;
    }, 0) / colors.length;
}