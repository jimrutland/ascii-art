
export class Pixel {
    private red;
    private green;
    private blue;
    private alpha;
    private width;
    private height;
    private static brightnessChars = ' .`^",:;Il!i><~+_-?][}{1)(|tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

    constructor(red: number, green: number, blue: number, alpha: number, width: number, height: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.width = width;
        this.height = height;
    }

    public getRedChannel(): number {
        return this.red;
    }

    public getBlueChannel(): number {
        return this.blue;
    }

    public getGreenChannel(): number {
        return this.green;
    }

    public getAlphaChannel(): number {
        return this.alpha;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getIntensity(): number {
        return (this.red + this.green + this.blue) / 3;
    }

    public getAsciiCharacter(): string{
        return `${Pixel.brightnessChars.substr(Math.floor((this.getIntensity() * Pixel.brightnessChars.length) / 255), 1)}`;
    }
}