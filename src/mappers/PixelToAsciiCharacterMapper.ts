const brightnessChars = ' .`^",:;Il!i><~+_-?][}{1)(|tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

export function convertToAscii(pixels: number[][]): string[][] {
    const asciiMatrix: string[][] = [];
    for (const row of pixels) {
        const asciiRow = []
        for(const p of row){
            asciiRow.push(`${brightnessChars.substr(Math.floor(p * brightnessChars.length / 255), 1)}`);
        }
        asciiMatrix.push(asciiRow);
    }
    return asciiMatrix;
}