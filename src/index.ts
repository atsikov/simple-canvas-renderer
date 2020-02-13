import { CanvasRenderer } from "./canvas/CanvasRenderer";
import { Sprite } from "./sprites/Sprite";
import { Drawable } from "./canvas/Drawable";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);

let frames = 0;
let firstFrameTimestamp = Date.now();

updateFPS();

function updateFPS() {
    if (Date.now() - firstFrameTimestamp > 1000) {
        document.querySelector("#fps")!.innerHTML = `FPS: ${frames}`;
        frames = 0;
        firstFrameTimestamp += 1000;
    }
    frames += 1;
    requestAnimationFrame(updateFPS);
}

function transform(sprite: Drawable) {
    const currentTimestamp = Date.now()
    sprite.rotation += 0.01;
    sprite.alpha = Math.abs(Math.cos(Date.now() / 360));
    sprite.scaleX = Math.cos(Date.now() / 480);
}

for (let i = 0; i < 100; i++) {
    const sprite = new Sprite("assets/gitlab.svg");
    sprite.x = Math.round(Math.random() * 800);
    sprite.y = Math.round(Math.random() * 500);
    renderer.addDrawable(sprite);
    setInterval(transform, 0, sprite);
}
