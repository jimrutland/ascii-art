import { Pixel } from "../models/Pixel";
import { convertToAscii } from "../mappers/PixelToAsciiCharacterMapper";

export class CanvasToAsciiService {
    private canvas: HTMLCanvasElement;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public getAsciiArtFromCanvas(): string[][] {
        const pixelAverages = this.getPixelChannelAverages();
        const intensityMatrix = this.getIntensityMatrix(pixelAverages);
        return convertToAscii(intensityMatrix);
    }

    private getIntensityMatrix(pixelAverages: number[]): number[][] {
        const intensityMatrix: number[][] = [];
        let count = 0;
        let row: number[] = [];
        
        for (const pixelAverage of pixelAverages) {
            if (count === this.canvas.width) {
                count = 0;
                intensityMatrix.push([...row]);
                row = [pixelAverage];
            } else {
                row.push(pixelAverage);
            }
            count++;
        }
        return intensityMatrix;
    }

    private getPixelChannelAverages(): number[] {
        const ctx = this.canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        const imageRGBPixels: number[] = [];
        for (let index = 0; index < imageData.length; index += 4) {
            const red = imageData[index];
            const green = imageData[index + 1];
            const blue = imageData[index + 2];
            const pixel = new Pixel(red, green, blue);
            imageRGBPixels.push(Math.floor(pixel.getAverageIntensity()));
        }
        return imageRGBPixels;
    }
}