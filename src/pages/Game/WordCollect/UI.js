class UI {
    constructor(game) {
        this.game = game;
    }
    draw(context) {
        // Base class draw method, can be overridden by child classes
    }
}

export class Score extends UI {
    constructor(game) {
        super(game); // Call the constructor of the parent class
        this.fontSize = 65;
        this.fontFamily = 'Georgia, serif';
    }
    draw(context) {
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillStyle = 'blue';
        context.fillText(this.game.score, this.game.width / 2, this.fontSize * 1.5);
    }
}

export class BonusItems extends UI {
    constructor(game) {
        super(game);
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.x = 10;
        this.y = 10;
        this.maxItems = 5;
        this.noItems = 0;
        this.image = new Image();
        this.image.src = "src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_11.png";
    }
    update() {
    }
    draw(context) {
        for (let i = 0; i < this.noItems; i++) {
            context.drawImage(this.image, this.x + i * this.spriteWidth / 1.5, this.y, this.spriteWidth / 1.5, this.spriteHeight / 1.5);
        }
    }
    addNewItem() {
        if (this.noItems < this.maxItems) {
            this.noItems++;
        }
    }
}
