
export class Pixel {
    private red;
    private green;
    private blue;
    
    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public getAverageIntensity(): number {
        return (this.red + this.green + this.blue) / 3;
    }
}