class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image();
        this.image.src = src;
        this.x = 0;
        this.y = 0;
    }
    update() {}
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
        this.text1 = "THÀNH PHỐ THỦ ĐỨC";
        this.text2 = `TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN`;
        this.textColor = "black";
        this.textSize = this.game.width / 90;
        this.textX1 = this.game.width /1.9;
        this.textX2 = this.game.width /1.33;
        this.textY1 = this.game.height / 5;
        this.textY2 = this.game.height / 5;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
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

    drawtext(context){
        context.fillStyle = `${this.textColor}`;
        context.font = `bold ${this.textSize}px Arial`;
        context.fillText(this.text1, this.textX1, this.textY1);
        context.fillText(this.text2, this.textX2, this.textY2);
    
    }
}

export class LogoGame {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 552;
        this.spriteWidth = 922;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Logo.png',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 2.5,
            this.layerLogo.y + this.height / 4,
            this.width / 2,
            this.height / 2,
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
            'public/assets/Asset/Logo/Logo Đoàn.png',
        );
    }
    update() {}
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
            this.width / 8,
            this.height / 8,
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
            'public/assets/Asset/Logo/Logo Đoàn.png',
        );
    }
    update() {}
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
            this.width / 8,
            this.height / 8,
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
            'public/assets/Asset/Logo/logo-doi.png',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 2.1,
            this.layerLogo.y + this.height / 25,
            this.width / 9,
            this.height / 9,
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
            'public/assets/Asset/Logo/Logo Trường.png',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 1.47,
            this.layerLogo.y + this.height / 20,
            this.width / 10,
            this.height / 10,
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
            'public/assets/Asset/Logo/Logo Ban.png',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 1.37,
            this.layerLogo.y + this.height / 25,
            this.width / 9,
            this.height / 9,
        );
        context.save();
    }
}

