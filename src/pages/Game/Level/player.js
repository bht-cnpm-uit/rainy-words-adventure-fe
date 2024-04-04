export class Player {
    constructor(game) {
        this.game = game;
        this.width = 109;
        this.height = 134;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.position = {
            x: this.game.width * 0.25 / 3,
            y: this.game.height * 0.76 / 2 - this.height * 0.7
        }
        this.velocity = 0;
        this.image = new Image();
        this.image.onload = () => {
            // Call the draw method when the image is loaded
            this.draw(this.game.ctx, this.position);
        };
        this.image.src = '../src/assets/Asset/GameObject/SunflowerCatSprite_Night2WalkBlink.png';
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
    }
    draw(ctx, position) {
        ctx.save();
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, position.x - this.width / 4.1, position.y - this.height / 1.35, this.width, this.height);
    }
    update() {
        this.gameFrame++;
        if (this.gameFrame % this.staggerFrames == 0) {
            if (this.frameX < 4)
                this.frameX += 1
            else this.frameX = 0
        }
    }
}
