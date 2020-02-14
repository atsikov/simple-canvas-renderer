import { Drawable } from "./Drawable";

export class ImagesCache {
    private cache: { [path: string]: HTMLCanvasElement; } = {};

    public getCachedImage(image: CanvasImageSource) {
        let imageId = "";
        if (image instanceof Image) {
            imageId = image.src.replace(/[\:\/\%\.]/g, "-");
        }

        if (this.cache[imageId]) {
            return this.cache[imageId];
        }

        const cacheCanvas = this.createCacheCanvas(image);
        this.cache[imageId] = cacheCanvas;

        return cacheCanvas;
    }

    private createCacheCanvas(image: CanvasImageSource) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width as number;
        canvas.height = image.height as number;

        if (image instanceof Image) {
            const onImageLoad = () => {
                image.removeEventListener("load", onImageLoad);
                canvas.getContext("2d")!.drawImage(
                    image,
                    0,
                    0,
                );
            }
            image.addEventListener("load", onImageLoad);
        }
            
        return canvas;
    }
}
