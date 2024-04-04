class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.image = new Image();
        this.image.src = src;
        this.x = 0;
        this.y = 0;
    }
    update() {
        // Add update logic if needed
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 2920;
        this.spriteHeight = 1080;
        this.width = this.game.width;
        this.height = this.game.height;
        this.layerImage1 = new Layer(this.game, this.spriteWidth, this.spriteHeight, '../src/assets/Asset/Map1/ScrollBG.png');
        this.layerImage2 = new Layer(this.game, this.spriteWidth, this.spriteHeight, '../src/assets/Asset/Map1/StableBG_game.png');
        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
    }
    update() {
        let gameSpeed = 5;
        this.speed = gameSpeed * this.speedModifier;
        if (this.layerImage1.x <= -this.width) {
            this.layerImage1.x = 0;
        }
        this.layerImage1.x = this.layerImage1.x - this.speed;
    }
    draw(context) {
        context.drawImage(this.layerImage1.image, 0, 0, this.spriteWidth, this.spriteHeight, this.layerImage1.x, 0, this.width, this.height);
        context.drawImage(this.layerImage1.image, 0, 0, this.spriteWidth, this.spriteHeight, this.layerImage1.x + this.width, 0, this.width, this.height);
        context.drawImage(this.layerImage2.image, 0, 0, this.spriteWidth, this.spriteHeight, this.layerImage2.x, 0, this.width, this.height);
    }
}
