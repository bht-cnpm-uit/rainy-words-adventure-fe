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
    update() { }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Logo {
    constructor(game, x, y, width, height, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
    }
    update() { }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Text {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    writeText(context, text, font = "15px Bold Arial", textAlign = 'center', fillStyle = 'brown') {
        context.font = font;
        context.textAlign = textAlign;
        context.fillStyle = fillStyle;
        context.textBaseline = "middle";
        context.fillText(text, this.x, this.y);
    }
}
class Button {
    constructor(x, y, width, height, spriteWidth, spriteHeight, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight
        this.image = new Image();
        this.image.src = image;
    }
    update() { }
    draw(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }
    onClick(context) { }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;

        this.spriteWidthDoan = 1113;
        this.spriteHeightDoan = 1288;
        this.widthDoan = this.spriteWidthDoan * this.game.scale / 8;
        this.heightDoan = this.spriteHeightDoan * this.game.scale / 8;

        this.spriteWidthDoi = 661;
        this.spriteHeightDoi = 665;
        this.widthDoi = this.spriteWidthDoi * this.game.scale / 4.5;
        this.heightDoi = this.spriteHeightDoi * this.game.scale / 4.5;

        this.spriteWidthTruong = 313;
        this.spriteHeightTruong = 259;
        this.widthTruong = this.spriteWidthTruong * this.game.scale / 2;
        this.heightTruong = this.spriteHeightTruong * this.game.scale / 2;

        this.spriteWidthBan = 2146;
        this.spriteHeightBan = 2146;
        this.widthBan = this.spriteWidthBan * this.game.scale / 14;
        this.heightBan = this.spriteHeightBan * this.game.scale / 14;

        this.spriteWidthGame = 922;
        this.spriteHeightGame = 653;
        this.widthGame = this.spriteWidthGame * this.game.scale;
        this.heightGame = this.spriteHeightGame * this.game.scale;

        this.spriteWidthBtn = 437;
        this.spriteHeightBtn = 129;
        this.widthBtn = this.spriteWidthBtn * this.game.scale / 1.5;
        this.heightBtn = this.spriteHeightBtn * this.game.scale / 1.5;

        this.maxHeight = Math.max(
            this.heightDoan,
            this.heightDoi,
            this.heightTruong,
            this.heightBan
        );

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
        this.logoGame = new Logo(
            this,
            this.game.width / 2, this.game.height / 2 - this.heightGame / 2,
            this.widthGame, this.heightGame,
            this.spriteWidthGame, this.spriteHeightGame,
            '../assets/Asset/Logo.png',
        )
        this.buttonStart = new Button(
            this.logoGame.x + this.widthGame / 2.8, this.logoGame.y + this.heightGame + this.heightBtn / 2,
            this.widthBtn, this.heightBtn,
            this.spriteWidthBtn, this.spriteHeightBtn,
            '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png'
        )
        this.logoLeft = {
            logoDoan: new Logo(
                this,
                (this.width - this.widthDoan) / 2 - this.widthDoan / 2, this.maxHeight - this.heightDoan,
                this.widthDoan, this.heightDoan,
                this.spriteWidthDoan, this.spriteHeightDoan,
                '/assets/Asset/Logo/LogoDoan.png'
            ),
            logoDoi: new Logo(
                this,
                (this.width - this.widthDoan) / 2 + this.widthDoan / 2, this.maxHeight - this.heightDoi,
                this.widthDoi, this.heightDoi,
                this.spriteWidthDoi, this.spriteHeightDoi,
                '/assets/Asset/Logo/LogoDoi.png'
            )
        }
        this.logoRight = {
            logoDoan: new Logo(
                this,
                (this.width * 4.2 / 3 - this.widthDoan) / 2 - this.widthDoan / 2, this.maxHeight - this.heightDoan,
                this.widthDoan, this.heightDoan,
                this.spriteWidthDoan, this.spriteHeightDoan,
                '/assets/Asset/Logo/LogoDoan.png'
            ),
            logoTruong: new Logo(
                this,
                (this.width * 4.2 / 3 - this.widthDoan) / 2 + this.widthDoan / 2, this.maxHeight - this.heightTruong,
                this.widthTruong, this.heightTruong,
                this.spriteWidthTruong, this.spriteHeightTruong,
                '/assets/Asset/Logo/LogoTruong.png',
            ),
            logoBan: new Logo(
                this,
                (this.width * 4.2 / 3 - this.widthDoan) / 2 + this.widthDoan / 2 + this.widthTruong, this.maxHeight - this.heightBan,
                this.widthBan, this.heightBan,
                this.spriteWidthBan, this.spriteHeightBan,
                '/assets/Asset/Logo/LogoBan.png',
            )
        }
        this.text = {
            textThuDuc: new Text(
                this.logoLeft.logoDoan.x + (this.logoLeft.logoDoi.x + this.widthDoi - this.logoLeft.logoDoan.x) / 2,
                this.maxHeight * 1.2
            ),
            textTruong: new Text(
                this.logoRight.logoDoan.x + (this.logoRight.logoBan.x + this.widthBan - this.logoRight.logoDoan.x) / 2,
                this.maxHeight * 1.2
            ),
            textStart: new Text(
                this.buttonStart.x + this.widthBtn / 2,
                this.buttonStart.y + this.heightBtn / 2
            )
        }

        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
    }
    onResize() {
        this.width = this.game.width;
        this.height = this.game.height;
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
        let widthCut = Math.ceil((this.spriteWidth * this.game.scale - this.width) / this.game.scale);
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
        this.logoLeft.logoDoan.draw(context);
        this.logoLeft.logoDoi.draw(context);
        this.logoRight.logoDoan.draw(context);
        this.logoRight.logoTruong.draw(context);
        this.logoRight.logoBan.draw(context);
        this.text.textThuDuc.writeText(context, "THÀNH PHỐ THỦ ĐỨC")
        this.text.textTruong.writeText(context, "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN")
        this.logoGame.draw(context)
        this.buttonStart.draw(context);
        this.text.textStart.writeText(context, "BẮT ĐẦU", "20px Bold Arial")
        context.save();
    }
}