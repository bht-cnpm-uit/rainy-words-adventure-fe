class Button {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY
        this.width = this.game.width;
        this.height = this.game.height;
    }
    update() {

    }
    draw(context) {
        if (this.image.complete)
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);

    }
}

class ButtonSliceMap extends Button {
    constructor(game) {
        super(game);
        this.spriteWidth = 60;
        this.spriteHeight = 71;
        this.width = this.spriteWidth * this.scaleY * 2;
        this.height = this.spriteHeight * this.scaleY * 2;
        this.hidden = false;
    }
    update() {
    }
    draw(context) {
        if (!this.hidden) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    onclick(context) {
    }
}
export class BtnNextMap extends ButtonSliceMap {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_28.png';
        this.x = this.game.width - this.spriteWidth * 2;
        this.y = this.game.height / 2 - this.spriteHeight / 2;
        this.MoveX = 100;
    }
}
export class BtnBackMap extends ButtonSliceMap {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_29.png';
        this.x = this.spriteWidth;
        this.y = this.game.height / 2 - this.spriteHeight / 2;
        this.MoveX = -100;
        this.hidden = true;
    }
}

export class Guide extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_24.png';
        this.spriteWidth = 433;
        this.spriteHeight = 279;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = this.width * 0.25;
        this.y = -this.height *0.1;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width/2, this.height/2);
        context.font = "30px Arial";
        context.fillStyle = "brown";
        context.textAlign = "center";
        context.fillText("Hướng dẫn", this.x + this.width / 4, this.y + this.height * 3.5 / 8.5)
    }
}

export class Library extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_17.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.x = this.game.width - this.spriteWidth * 2;
        this.y = this.spriteHeight / 5;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class Achievement extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_20.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.x = this.game.width - this.spriteWidth * 1.5;
        this.y = this.spriteHeight / 5;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class Account extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_10.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.x = this.game.width - this.spriteWidth;
        this.y = this.spriteHeight / 5;
    }
    draw(context) {
        if (this.image.complete)
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}