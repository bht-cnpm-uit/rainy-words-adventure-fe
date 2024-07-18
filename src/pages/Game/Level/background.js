export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 7920;
        this.spriteHeight = 1580;
        this.image_morning = new Image();
        this.image_afternoon = new Image();
        this.image_night = new Image();
        this.image_morning.src = '../assets/Asset/LevelMap_Day.png';
        this.image_afternoon.src = '../assets/Asset/LevelMap_Night.png';
        this.image_night.src = '../assets/Asset/LevelMap_Night2.png'
        this.xImage = 0;
        this.xImageCut = 0;
        this.x = 0;
        this.y = 0;
        this.widthScaleBg = this.spriteWidth * this.game.scale;
    }
    updatePosition() {
        this.widthScaleBg = this.spriteWidth * this.game.scale;
    }

    updateSlide() {
        if (this.xImageCut + this.game.deltaTime / this.game.scale < this.xImage) {
            this.xImageCut += this.game.deltaTime / this.game.scale;
        }
        else if (this.xImageCut - this.game.deltaTime / this.game.scale > this.xImage) {
            this.xImageCut -= this.game.deltaTime / this.game.scale;
        }
        else {
            this.xImageCut = this.xImage
            this.game.slide = false;
        }
    }
    draw(context) {
        if (this.game.mode == 'morning') {
            context.drawImage(
                this.image_morning,
                this.xImageCut,
                0,
                this.spriteWidth - this.game.widthCut,
                this.spriteHeight,
                this.x,
                this.y,
                this.game.width,
                this.game.height
            );
        }
        else if (this.game.mode == 'night') {
            context.drawImage(
                this.image_night,
                this.xImageCut,
                0,
                this.spriteWidth - this.game.widthCut,
                this.spriteHeight,
                this.x,
                this.y,
                this.game.width,
                this.game.height
            );
        }
        else {
            context.drawImage(
                this.image_afternoon,
                this.xImageCut,
                0,
                this.spriteWidth - this.game.widthCut,
                this.spriteHeight,
                this.x,
                this.y,
                this.game.width,
                this.game.height
            );
        }
    }

    onclick(direct) {
        this.xImage += this.game.levels.maxWidthSlice * direct;
        if (this.xImage - this.game.widthCut > 0) {
            this.xImage = this.game.widthCut
        }
        else if (this.xImage < 0) {
            this.xImage = 0;
        }
    }
}
