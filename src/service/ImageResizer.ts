export class ImageResizer {
    private image;
    
    constructor(image: HTMLImageElement) {
        this.image = image;
    }

    public async resizeImage(maxPixels: number): Promise<HTMLImageElement> {
        const img = new Image();
        if(this.image.style.width > this.image.style.height) {
            img.width = maxPixels;
        } else {
            img.height = maxPixels;
        }
        img.src = this.image.src;
        return new Promise(resolve => {
            img.onload = () => {
                return resolve(img);
            };
        });
    }
}