class Button {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
    }
    update() {}
    draw(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth / 3,
            this.spriteHeight / 3,
        );
    }

    drawLogin(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth / 3,
            this.spriteHeight / 3,
        );
    }
    onClick(context) {}
}

export class btnSignIn extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_24.png';
        this.spriteWidth = 433;
        this.spriteHeight = 279;
        this.x = 100;
        this.y = -10;
        // this.translateX = this.game.width * 1 / 2;
        // this.translateY = this.game.height * 1 / 2;
    }
    draw(context) {
        super.draw(context);
        context.font = '25px Comic Sans MS';
        context.fillStyle = 'brown';
        context.textAlign = 'center';
        context.fillText(
            'Đăng ký',
            -this.x * 2.5 + this.spriteWidth / 1.03,
            this.y + this.spriteHeight / 3.5,
        );
    }
}

export class btnLogin extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png';
        this.spriteWidth = 437;
        this.spriteHeight = 129;
        this.scaleX = this.width / this.spriteWidth;
        this.x = this.game.width / 1.48;
        this.y = this.height / 1.23;
    }
    drawLogin(context) {
        super.drawLogin(context);
        context.font = 'bold 20px Arial';
        context.fillStyle = 'brown';
        context.fontWeight = 'bolder';
        context.textAlign = 'center';
        context.fillText(
            'ĐĂNG NHẬP',
            this.x + this.spriteWidth / 5.9,
            this.y + this.spriteHeight / 4.1,
        );
    }
}
