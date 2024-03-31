
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 266;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.position = {
            x: this.game.width * 0.25 / 3,
            y: this.game.height * 0.76 / 2 - this.height * 0.7
        }
        this.velocity = 0;
        this.image = new Image();
        this.image.src = 'src/assets/Asset/GameObject/SunflowerCatSprite_Night2WalkBlink.png';
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
    }
    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
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