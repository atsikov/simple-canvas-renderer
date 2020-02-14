import { CanvasRenderer } from "./canvas/CanvasRenderer";
import { Sprite } from "./sprites/Sprite";
import { Drawable } from "./canvas/Drawable";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);

let sprites: Drawable[] = [];
for (let i = 0; i < 100; i++) {
    const sprite = new Sprite("assets/gitlab.svg");

    sprite.x = Math.round(Math.random() * 800);
    sprite.y = Math.round(Math.random() * 500);
    renderer.addDrawable(sprite);

    sprites.push(sprite);

}

requestAnimationFrame(transformSprites);

function transformSprites() {
    const now = Date.now();
    for (const sprite of sprites) {
        sprite.rotation += 0.1;
        sprite.alpha = Math.abs(Math.cos(now / 360));
        sprite.scaleX = Math.cos(now / 480);
    }

    requestAnimationFrame(transformSprites);
}
