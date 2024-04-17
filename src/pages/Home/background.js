class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image();
        this.image.src = src;
        this.x = 0;
        this.y = 0;
    }
    update() { }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // drawLogo(context) {
    //     context.drawImage(this.image, this.x,this.y, this.width/1.5, this.height/1.5);
    //     context.save();
    // }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.scaleX = this.width / this.spriteWidth;
        this.text1 = "THÀNH PHỐ THỦ ĐỨC";
        this.text2 = `TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN`;
        this.textColor = "brown";
        this.textSize = this.game.width / 90;
        this.textX1 = this.game.width / 2 + this.scaleX * 40;
        this.textX2 = this.game.width / 1.37 + this.scaleX * 40;
        this.textY1 = this.game.height / this.scaleY / 6.5;
        this.textY2 = this.game.height / this.scaleY / 6.5;
        this.layerImage1 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Map1/ScrollBG.png',
        );
        this.layerImage2 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Map1/StableBG.png',
        );
        // this.layerLogo = new Layer(this.game, this.spriteWidth,this.spriteHeight,'../assets/Asset/Logo.png' );
        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
    }
    update() {
        let gameSpeed = 5;
        this.speed = gameSpeed * this.speedModifier;
        if (this.layerImage1.x <= -this.width) {
            this.layerImage1.x = 0;
        }
        this.layerImage1.x = this.layerImage1.x - this.speed;
    }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerImage1.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.layerImage1.x,
            0,
            this.width,
            this.height,
        );
        context.drawImage(
            this.layerImage1.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.layerImage1.x + this.width,
            0,
            this.width,
            this.height,
        );
        context.drawImage(
            this.layerImage2.image,
            0,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerImage2.x,
            0,
            this.width,
            this.height,
        );
        context.save();
    }

    drawtext(context) {
        context.fillStyle = `${this.textColor}`;
        context.font = `bold ${this.textSize}px Arial`;
        context.fillText(this.text1, this.textX1, this.textY1);
        context.fillText(this.text2, this.textX2, this.textY2);

    }
}

export class LogoGame {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 653;
        this.spriteWidth = 922;
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.scaleY = this.height / this.spriteHeight;
        this.scaleX = this.width / this.spriteWidth;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Logo.png',
        );
        ;
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleX - this.width) / this.scaleX);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.width / 2.2,
            this.height / 3.5,
            this.spriteWidth / 1.65,
            this.spriteHeight / 1.8,
        );
    }
}

export class LogoDoan {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 1113;
        this.spriteHeight = 1288;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '/assets/Asset/Logo/LogoDoan.png',
        );
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 2.5,
            this.layerLogo.y + this.height / 35,
            this.width / this.scaleY / 13,
            this.height / this.scaleY / 13,
        );
        context.save();
    }
}

export class LogoDoan2 {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 1113;
        this.spriteHeight = 1288;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '/assets/Asset/Logo/LogoDoan.png',
        );
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 1.7,
            this.layerLogo.y + this.height / 35,
            this.width / this.scaleY / 13,
            this.height / this.scaleY / 13,
        );
    }
}

export class LogoDoi {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 661;
        this.spriteHeight = 665;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '/assets/Asset/Logo/LogoDoi.png',
        );
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 2.05,
            this.layerLogo.y + this.height / 25,
            this.width / this.scaleY / 8,
            this.height / this.scaleY / 8,
        );
        context.save();
    }
}

export class LogoTruong {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 313;
        this.spriteHeight = 259;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '/assets/Asset/Logo/LogoTruong.png',
        );
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 1.45,
            this.layerLogo.y + this.height / 25,
            this.width / this.scaleY / 3,
            this.height / this.scaleY / 3,
        );
        context.save();
    }
}

export class LogoBan {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 2146;
        this.spriteHeight = 2146;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '/assets/Asset/Logo/LogoBan.png',
        );
    }
    update() { }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 1.31,
            this.layerLogo.y + this.height / 30,
            this.width / this.scaleY / 23,
            this.height / this.scaleY / 23,
        );
        context.save();
    }
}

