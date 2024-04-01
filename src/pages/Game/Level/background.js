export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 7920;
        this.spriteHeight = 1580;
        this.width = this.game.width;
        this.height = this.game.height;
        this.image = new Image();
        this.image.src = 'src/assets/Asset/LevelMap_Day.png';
        this.xImage = 0;
        this.xImageCut = 0;
        this.x = 0;
        this.y = 0;
        this.scaleY = this.height / this.spriteHeight;
        this.ratioTranslate = this.spriteWidth * this.scaleY / this.width;
        this.widthScaleBg = this.spriteWidth * this.scaleY;
        this.widthCut = (this.spriteWidth * this.scaleY - this.width) / this.scaleY;
    }

    update(deltaTime) {
        if (this.xImageCut + deltaTime * this.ratioTranslate < this.xImage) {
            this.xImageCut += deltaTime * this.ratioTranslate;
        }
        else if (this.xImageCut - deltaTime * this.ratioTranslate > this.xImage) {
            this.xImageCut -= deltaTime * this.ratioTranslate;
        }
        else {
            this.xImageCut = this.xImage
        }
    }

    draw(context) {
        context.save();
        let widthCut = (this.spriteWidth * this.scaleY - this.width) / this.scaleY;
        if (this.image.complete)
            context.drawImage(
                this.image,
                this.xImageCut,
                0,
                this.spriteWidth - widthCut,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        context.restore();
    }

    onclick(direct) {
        this.xImage += 800 * this.ratioTranslate * direct;
        if (this.xImage - this.widthCut > 0) {
            this.xImage = this.widthCut
        }
        else if (this.xImage < 0) {
            this.xImage = 0;
        }
    }
}
