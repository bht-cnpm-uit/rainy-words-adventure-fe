class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.image = new Image();
        this.image.src = src;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.x = 0;
        this.y = 0;
    }
    update() { }
    draw(context, isTrue = false) {
        if (isTrue) {
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x + this.game.width, this.y, this.game.width, this.game.height);
        }
        else {
            context.drawImage(this.image, 0, 0, this.spriteWidth - this.game.widthCut, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
        }
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 2920;
        this.spriteHeight = 1080;
        this.mode = localStorage.getItem('theme') || 'light';
        this.layerImage1 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            this.mode === 'light'
                ? '../assets/Asset/Map1/ScrollBG.png'
                : '../assets/Asset/Map3/RollBackground.png'
        );
        this.layerImage2 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            this.mode === 'light'
                ? '../assets/Asset/Map1/StableBG.png'
                : '../assets/Asset/Map3/StableBG.png'
        );
        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
        this.animateBg();
    }
    updatePosition() {

    }
    draw(context) {
        this.layerImage1.draw(context, true);
        this.layerImage2.draw(context);
        context.save();
    }
    animateBg() {
        let animateHandle;
        let self = this;
        function animate() {
            if (self.game.gameState != 2) {
                if (self.game.gameState) {
                    let gameSpeed = 5;
                    self.speed = gameSpeed * self.speedModifier;
                    if (self.layerImage1.x <= -self.game.width) {
                        self.layerImage1.x = 0;
                    }
                    self.layerImage1.x = self.layerImage1.x - self.speed;
                }
                animateHandle = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animateHandle)
                return;
            }
        }
        animate();
    }
}
