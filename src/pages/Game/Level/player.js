export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.width = 109;
        this.height = 134;
        this.position = {
            x: null,
            y: null
        }
        this.velocity = 0;
        this.image = new Image();
        this.image.src = '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png';
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.currentPostionLevel = 3;
        this.maxCurrentLevel = 3;
        this.positionNext = this.position.x;
    }
    draw(ctx) {
        ctx.save();
        // this.game.levels.levels.forEach(element => {
        //     if (element.level == this.currentPostionLevel) {
        //         ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, element.x - this.spriteWidth / 25, element.y - this.spriteHeight / 7.5, this.spriteWidth / 5, this.spriteHeight / 5);
        //     }
        // });
        // ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0, 0, this.spriteWidth / 5, this.spriteHeight / 5);

        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x - this.spriteWidth / 25, this.position.y - this.spriteHeight / 10, this.spriteWidth / 5, this.spriteHeight / 5);
    }
    update(deltaTime) {
        this.gameFrame++;
        if (this.gameFrame % this.staggerFrames == 0) {
            if (this.frameX == 4) {
                if (this.gameFrame % (this.staggerFrames * 20) == 0)
                    this.frameX = 0;
            }
            else
                this.frameX++;
        }
        if (this.position.x + deltaTime < this.positionNext) {
            this.position.x += deltaTime;
        }
        else if (this.position.x - deltaTime > this.positionNext) {
            this.position.x -= deltaTime;
        }
        else {
            this.position.x = this.positionNext
        }
    }
    updateCurrentLayer(level) {
        if (level.level <= this.maxCurrentLevel) {
            this.currentPostionLevel = level.level;
            this.position.x = level.position.x;
            this.position.y = level.position.y;
            this.positionNext = level.position.x;
        }
    }
    updateMaxCurrentLevel(lv) {
        this.maxCurrentLevel = lv;
    }
    updatePosition(level) {
        this.position.x = level.position.x;
        this.position.y = level.position.y;
        this.positionNext = level.position.x;
        this.currentPostionLevel = level.level;
    }

}
