export class Player {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 266;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.position = {
            x: 100,
            y: this.game.height - this.height * 1.05
        }
        this.velocity = 0;
        this.image = new Image();
        this.image.src = 'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png';
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
      
       
    }
    draw(ctx) {
        ctx.save();

        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 10);

        // if (this.velocity < 0) {
        //     ctx.scale(-1, 1); // Flip horizontally
        // }
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.width / 2, -this.height / 2, this.width, this.height);
        
        if (this.gameFrame % (this.staggerFrames * 3) == 0) {
            if (this.frameX < 4)
                this.frameX += 1
            else this.frameX = 0
        }
        this.gameFrame++;
        ctx.restore();
    }
  
}