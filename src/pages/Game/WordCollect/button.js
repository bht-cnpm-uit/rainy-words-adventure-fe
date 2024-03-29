class Button {
    constructor(game) {
        this.game = game;
    }
    update() {

    }
    draw(context) {
    }
}
export class BtnGameState extends Button {
    constructor(game) {
        super(game); // Call the parent class constructor
        this.width = 100;
        this.height = 100;
        this.imageBtnStart = new Image();
        this.imageBtnStart.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_14.png';
        this.imageBtnPause = new Image();
        this.imageBtnPause.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_18.png';
        this.x = this.game.width - this.width * 1.5;
        this.y = this.height * 0.5;
    }
    draw(context) {
        context.drawImage(this.imageBtnStart, this.x, this.y, this.width, this.height);
    }
}
