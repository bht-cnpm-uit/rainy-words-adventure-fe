export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 7920;
        this.spriteHeight = 1580;
        this.width = this.game.width;
        this.height = this.game.height;
        this.image = new Image();
        this.image.src = '../assets/Asset/LevelMap_Day.png';
        this.xImage = 0;
        this.xImageCut = 0;
        this.x = 0;
        this.y = 0;
        this.scaleY = this.height / this.spriteHeight;
        this.widthScaleBg = this.spriteWidth * this.scaleY;
        this.widthCut = (this.spriteWidth * this.scaleY - this.width) / this.scaleY;
    }

    updateSlide() {
        if (this.xImageCut + this.game.deltaTime / this.scaleY < this.xImage) {
            this.xImageCut += this.game.deltaTime / this.scaleY;
        }
        else if (this.xImageCut - this.game.deltaTime / this.scaleY > this.xImage) {
            this.xImageCut -= this.game.deltaTime / this.scaleY;
        }
        else {
            this.xImageCut = this.xImage
            this.game.slide = false;
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
        this.xImage += this.game.levels.maxWidthSlice * direct / this.scaleY;
        if (this.xImage - this.widthCut > 0) {
            this.xImage = this.widthCut
        }
        else if (this.xImage < 0) {
            this.xImage = 0;
        }
    }
}
