export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 7920;
        this.spriteHeight = 1580;
        this.width = this.game.width;
        this.height = this.game.height;
        this.image = new Image();
        this.image.src = 'src/assets/Asset/LevelMap_Day.png';
        this.x = 0;
        this.y = 0;
    }
    update() {
    }
    draw(context) {
        // let scaleY = this.height / this.spriteHeight;
        // let scaledWidth = this.spriteWidth * scaleY;
        context.drawImage(this.image, 0, 0, this.width, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}