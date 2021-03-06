import { Drawable } from "./Drawable";
import { ImagesCache } from "./ImagesCache";

export class CanvasRenderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawables: Drawable[] = [];
    private renderAnimationFrame: number | undefined;
    private cache = new ImagesCache();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Cannot init canvas renderer");
        }

        this.context = context;

        this.updateCanvasSize();
        window.addEventListener("resize", this.updateCanvasSize);
    }

    public addDrawable(drawable: Drawable) {
        if (!this.drawables.length) {
            this.renderAnimationFrame = requestAnimationFrame(this.render);
        }

        this.drawables.push(drawable);
    }

    public dispose() {
        if (this.renderAnimationFrame) {
            cancelAnimationFrame(this.renderAnimationFrame);
        }

        window.removeEventListener("resize", this.updateCanvasSize);
    }

    private updateCanvasSize = () => {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    private render = () => {
        const context = this.context;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.imageSmoothingEnabled = true;

        this.drawables.forEach(drawable => {
            context.save();

            const cachedImage = this.cache.getCachedImage(drawable.image);

            if (context.globalAlpha !== drawable.alpha) {
                context.globalAlpha = drawable.alpha;
            }

            const width = cachedImage.width;
            const height = cachedImage.height;

            context.translate(drawable.x + width / 2, drawable.y + height/ 2);
            if (drawable.rotation !== 0) {
                context.rotate(drawable.rotation);
            }
            if (drawable.scaleX !== 1 || drawable.scaleY !== 1) {
                context.scale(drawable.scaleX, drawable.scaleY);
            }
            context.drawImage(
                cachedImage,
                -width / 2,
                -height / 2,
                width,
                height,
            );

            context.restore();
        });

        this.renderAnimationFrame = requestAnimationFrame(this.render);
    }
}
