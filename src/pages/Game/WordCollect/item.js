class Word {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
        this.image = new Image(); // Initialize image here
    }

    update(deltaTime, gameState) {
        // Update logic for Word
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            -this.spriteWidth / 3,
            -this.spriteHeight / 3,
            this.spriteWidth / 1.5,
            this.spriteHeight / 1.5
        );
        ctx.restore();
    }
}

export class Item extends Word {
    constructor(game) {
        super(game);
        this.spriteWidth = 287;
        this.spriteHeight = 236;
        this.vy = Math.random() * 0.001 + 0.1;
        this.y = 0 - this.spriteHeight;
        this.x = Math.random() * (this.game.width - 2 * this.spriteWidth) + this.spriteWidth;
        this.image.src = "src/assets/Asset/GameObject/object2.png";
        this.frameX = Math.floor(Math.random() * 13);
        this.frameY = Math.floor(Math.random() * 0);
        this.spinSpeed = Math.PI / 10000;
        this.angle = (Math.random() * 20 - 10) * Math.PI / 180;
    }

    update(deltaTime, gameState) {
        super.update(deltaTime, gameState);
        this.y += this.vy * deltaTime;
        if (this.y > this.game.height) this.markedForDeletion = true;

        // Adjust rotation logic
        this.angle += this.spinSpeed * 10;
        if (this.angle > 10 * Math.PI / 180 || this.angle < -10 * Math.PI / 180) {
            this.spinSpeed *= -1;
        }
    }

    draw(ctx) {
        super.draw(ctx);
    }
}
