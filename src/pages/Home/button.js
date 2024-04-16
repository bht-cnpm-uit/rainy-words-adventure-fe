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
            this.spriteWidth / 2,
            this.spriteHeight / 2,
        );
    }
    onClick(context) {}
}

// export class Guide extends Button {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_24.png';
//         this.spriteWidth = 433;
//         this.spriteHeight = 279;
//         this.x = 30;
//         this.y = -10;
//         // this.translateX = this.game.width * 1 / 2;
//         // this.translateY = this.game.height * 1 / 2;
//     }
//     draw(context) {
//         super.draw(context);
//         context.font = '30px Comic Sans MS';
//         context.fillStyle = 'brown';
//         context.textAlign = 'center';
//         context.fillText(
//             'Hướng dẫn',
//             -this.x * 2.7 + this.spriteWidth / 2,
//             this.y + this.spriteHeight / 2.5,
//         );
//     }
// }

export class start extends Button {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png';
        this.spriteWidth = 437;
        this.spriteHeight = 129;
        this.x = this.width / 1.55;
        this.y = this.height / 1.25;
    }
    draw(context) {
        super.draw(context);
        context.font = 'bold 30px Arial';
        context.fillStyle = 'brown';
        context.fontWeight = 'bolder';
        context.textAlign = 'center';
        context.fillText('BẮT ĐẦU', this.x + this.spriteWidth / 4, this.y + this.spriteHeight / 3);
    }
}
