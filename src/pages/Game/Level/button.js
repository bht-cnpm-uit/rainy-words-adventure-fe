class Button {
    constructor(game) {
        this.game = game;
    }
    update() {

    }
    draw(context) {
        context.drawImage(this.image,
            0, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.spriteWidth * this.game.scale, this.spriteHeight * this.game.scale);
    }
}

class ButtonSliceMap extends Button {
    constructor(game) {
        super(game);
        this.spriteWidth = 60;
        this.spriteHeight = 71;
        this.width = this.spriteWidth * this.game.scale * 2;
        this.height = this.spriteHeight * this.game.scale * 2;
        this.hidden = false;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale * 2;
        this.height = this.spriteHeight * this.game.scale * 2;
    }
    update() {
    }
    draw(context) {
        if (!this.hidden) {
            context.drawImage(this.image, this.x, this.y, this.spriteWidth * this.game.scale * 2, this.spriteHeight * this.game.scale * 2);
        }
    }
    onclick(context) {
    }
}
export class BtnNextMap extends ButtonSliceMap {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_3r.png';
        this.x = this.game.width - this.width - this.width * 0.5;
        this.y = (this.game.height - this.height) / 2;
        this.MoveX = 100 * this.game.scale;
    }
    updatePosition() {
        super.updatePosition()
        this.x = this.game.width - this.width - this.width * 0.5;
        this.y = (this.game.height - this.height) / 2;
    }
}
export class BtnBackMap extends ButtonSliceMap {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_3l.png';
        this.x = this.width * 0.5;
        this.y = (this.game.height - this.height) / 2;
        this.MoveX = -100 * this.game.scale;
        this.hidden = true;
    }
    updatePosition() {
        super.updatePosition();
        this.x = this.width * 0.5;
        this.y = (this.game.height - this.height) / 2;
    }
}

export class Guide extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_2.png';
        this.spriteWidth = 433;
        this.spriteHeight = 279;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.width * 0.25;
        this.y = -this.height * 0.1;
    }
    draw(context) {
        context.drawImage(this.image,
            0, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
        context.font = "bold italic " + Math.floor(50 * this.game.scale) + "px sans-serif";
        context.fillStyle = "brown";
        context.textAlign = "center";
        context.fillText("HƯỚNG DẪN", this.x + this.width / 2, this.y + this.height / 1.2)
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.width * 0.25;
        this.y = -this.height * 0.1;
    }
}

export class Library extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_4_lib.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 4;
        this.y = this.height / 2;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 4;
        this.y = this.height / 2;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
}

export class Achievement extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_4_achi.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 2.75;
        this.y = this.height / 2;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 2.75;
        this.y = this.height / 2;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class Account extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '/Asset/Button/btn_4_set.png';
        this.spriteWidth = 139;
        this.spriteHeight = 138;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 1.5;
        this.y = this.height / 2;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.x = this.game.width - this.width * 1.5;
        this.y = this.height / 2;
    }
    draw(context) {
        if (this.image.complete)
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}