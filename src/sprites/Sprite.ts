import { Drawable } from "../canvas/Drawable";

export class Sprite implements Drawable {
    public x = 0;
    public y = 0;
    public scaleX = 1;
    public scaleY = 1;
    public alpha = 1;
    public rotation = 0;
    public image = new Image();

    constructor(imageSrc: string) {
        this.image.src = imageSrc;
    }
}
