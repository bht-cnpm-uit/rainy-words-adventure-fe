class Word {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update(deltaTime, gameState) {

    }
    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}
export class Item extends Word {
    constructor(game) {
        super(game);
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.vy = Math.random() * 0.01 + 0.1;
        this.y = 0 - this.spriteHeight;
        this.x = Math.random() * (this.game.width - 2 * this.spriteWidth) + this.spriteWidth;
        this.image = new Image;
        this.image.src = "./src/assets/Asset/Map1/GameObject_cut/tile000.png";
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.y += this.vy * deltaTime;
        if (this.y > this.game.height) this.markedForDeletion = true;

    }
    draw(ctx) {
        super.draw(ctx);
    }
}