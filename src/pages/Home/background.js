class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.image = new Image();
        this.image.src = src;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.x = 0;
        this.y = 0;
    }
    update() { }
    draw(context, isTrue = false) {
        if (isTrue) {
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x + this.game.width, this.y, this.game.width, this.game.height);
        }
        else {
            context.drawImage(this.image, 0, 0, this.spriteWidth - this.game.widthCut, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
        }
    }
}
class Button {
    constructor(game, x, y, spriteWidth, spriteHeight, image) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight
        this.image = new Image();
        this.image.src = image;
        this.width = this.spriteWidth * this.game.scale / 1.5;
        this.height = this.spriteHeight * this.game.scale / 1.5;
    }
    update() { }
    draw(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height,
        );
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = this.game.scale * 40 + 'px Arial';
        context.fillStyle = 'brown'
        context.fillText(
            "BẮT ĐẦU",
            this.x,
            this.y,
            this.width / 2
        )
    }
    onResize(game, x, y) {
        this.game = game
        this.x = x;
        this.y = y;
        this.width = this.spriteWidth * this.game.scale / 1.5;
        this.height = this.spriteHeight * this.game.scale / 1.5;
        if (this.width * 2.2 > this.game.width) {
            this.game.scale = 2 * this.spriteWidth / this.game.width
        }
    }
    onClick(context) { }
}
class LogoGame extends Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        super();
        this.game = game;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.checkResize(this.game.scale, this.game.width);
        this.image = new Image();
        this.image.src = src;
        this.x = this.game.width / 2;
        this.y = this.game.height - this.spriteHeight * this.game.scale * 1.1;
        this.spriteWidthBtn = 437;
        this.spriteHeightBtn = 129;
        this.buttonStart = new Button(
            this.game,
            this.x + this.spriteWidth * this.game.scale / 2, this.y + this.spriteHeight * this.game.scale,
            this.spriteWidthBtn, this.spriteHeightBtn,
            '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png'
        );
    }
    update() { }
    draw(context) {
        context.drawImage(this.image,
            0, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.spriteWidth * this.game.scale, this.spriteHeight * this.game.scale
        );
        this.buttonStart.draw(context);
    }
    onResize(game) {
        this.game = game;
        this.checkResize(this.game.scale, this.game.width);
        this.x = this.game.width / 2;
        this.y = this.game.height - this.spriteHeight * this.game.scale * 1.1;
        this.buttonStart.onResize(game, this.x + this.spriteWidth * this.game.scale / 2,
            this.y + this.spriteHeight * this.game.scale)
    }
    checkResize(scale, width) {
        if (this.spriteWidth * scale > width / 2) {
            this.game.scale = width / (2.5 * this.spriteWidth)
        }
    }
}
class LogoBar {
    constructor(game) {
        this.game = game;
        this.spriteWidthDoan = 1113;
        this.spriteHeightDoan = 1288;
        this.widthDoan = this.spriteWidthDoan * this.game.scale / 6.5;
        this.heightDoan = this.spriteHeightDoan * this.game.scale / 6.5;

        this.spriteWidthDoi = 661;
        this.spriteHeightDoi = 665;
        this.widthDoi = this.spriteWidthDoi * this.game.scale / 3.6;
        this.heightDoi = this.spriteHeightDoi * this.game.scale / 3.6;

        this.spriteWidthTruong = 313;
        this.spriteHeightTruong = 259;
        this.widthTruong = this.spriteWidthTruong * this.game.scale / 1.6;
        this.heightTruong = this.spriteHeightTruong * this.game.scale / 1.6;

        this.spriteWidthBan = 2146;
        this.spriteHeightBan = 2146;
        this.widthBan = this.spriteWidthBan * this.game.scale / 12.5;
        this.heightBan = this.spriteHeightBan * this.game.scale / 12.5;

        this.maxHeight = Math.max(
            this.heightDoan,
            this.heightDoi,
            this.heightTruong,
            this.heightBan
        );
        this.img_logo_doan = new Image();
        this.img_logo_doan.src = "/assets/Asset/Logo/LogoDoan.png";
        this.img_logo_doi = new Image();
        this.img_logo_doi.src = "/assets/Asset/Logo/LogoDoi.png";
        this.img_logo_truong = new Image();
        this.img_logo_truong.src = "/assets/Asset/Logo/LogoTruong.png";
        this.img_logo_ban = new Image();
        this.img_logo_ban.src = "/assets/Asset/Logo/LogoBan.png";

        this.x = this.game.width / 2;
    }
    update() { }
    draw(context) {
        // context.imageSmoothingQuality = "high";
        context.drawImage(this.img_logo_doan,
            0, 0, this.spriteWidthDoan, this.spriteHeightDoan,
            this.game.width / 2, this.maxHeight - this.heightDoan, this.widthDoan, this.heightDoan);
        context.drawImage(this.img_logo_doi,
            0, 0, this.spriteWidthDoi, this.spriteHeightDoi,
            this.game.width / 2 + this.widthDoan, this.maxHeight - this.heightDoi, this.widthDoi, this.heightDoi);
        context.font = this.game.scale * 24 + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText("THÀNH PHỐ THỦ ĐỨC", this.game.width / 2 + this.widthDoan / 2 + this.widthDoi / 2, this.maxHeight * 1.1, (this.widthDoan + this.widthDoi) / 1.1);

        context.drawImage(this.img_logo_doan,
            0, 0, this.spriteWidthDoan, this.spriteHeightDoan,
            this.game.width / 2 + (this.widthDoan + this.widthDoi) * 1.2, this.maxHeight - this.heightDoan, this.widthDoan, this.heightDoan);
        context.drawImage(this.img_logo_truong,
            0, 0, this.spriteWidthTruong, this.spriteHeightTruong,
            this.game.width / 2 + (this.widthDoan + this.widthDoi) * 1.2 + this.widthDoan, this.maxHeight - this.heightTruong, this.widthTruong, this.heightTruong);
        context.drawImage(this.img_logo_ban,
            0, 0, this.spriteWidthBan, this.spriteHeightBan,
            this.game.width / 2 + (this.widthDoan + this.widthDoi) * 1.2 + this.widthDoan + this.widthTruong, this.maxHeight - this.heightBan, this.widthBan, this.heightBan);

        context.fillText("TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN",
            this.game.width / 2 + (this.widthDoan + this.widthDoi) * 1.2 + this.widthDoan / 2 + this.widthDoi / 2 + this.widthBan / 2, this.maxHeight * 1.1, (this.widthDoan + this.widthDoi + this.widthBan) / 1.1);
    }
    onResize(game) {
        this.game = game;
        this.widthDoan = this.spriteWidthDoan * this.game.scale / 6.5;
        this.heightDoan = this.spriteHeightDoan * this.game.scale / 6.5;

        this.widthDoi = this.spriteWidthDoi * this.game.scale / 3.6;
        this.heightDoi = this.spriteHeightDoi * this.game.scale / 3.6;

        this.widthTruong = this.spriteWidthTruong * this.game.scale / 1.6;
        this.heightTruong = this.spriteHeightTruong * this.game.scale / 1.6;

        this.widthBan = this.spriteWidthBan * this.game.scale / 12.5;
        this.heightBan = this.spriteHeightBan * this.game.scale / 12.5;
        this.maxHeight = Math.max(
            this.heightDoan,
            this.heightDoi,
            this.heightTruong,
            this.heightBan
        );
    }
}

class Player {
    constructor(game, src) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.position = {
            x: this.game.width / 60,
            y: this.game.height / 6,
        };
        this.image = new Image();
        this.image.src = src;
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
    }
    draw(ctx) {
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 3);

        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            (this.game.width / 2 - this.spriteWidth * 1.2 * this.game.scale) / 20,
            this.game.height - this.spriteHeight * 1.05 * this.game.scale,
            this.spriteWidth * this.game.scale,
            this.spriteHeight * this.game.scale
        );

        if (this.gameFrame % (this.staggerFrames * 3) == 0) {
            if (this.frameX < 4) this.frameX += 1;
            else this.frameX = 0;
        }
        this.gameFrame++;
        ctx.restore();
    }
    onResize(game) {
        this.game = game;
        if (this.spriteWidth * this.game.scale > this.game.width / 2) {
            this.game.scale = this.game.width / (2.5 * this.spriteWidth)
        }
    }
}


export class Background {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;

        this.spriteWidthGame = 922;
        this.spriteHeightGame = 653;
        this.widthGame = this.spriteWidthGame * this.game.scale;
        this.heightGame = this.spriteHeightGame * this.game.scale;

        this.spriteWidthBtn = 437;
        this.spriteHeightBtn = 129;
        this.widthBtn = this.spriteWidthBtn * this.game.scale / 1.5;
        this.heightBtn = this.spriteHeightBtn * this.game.scale / 1.5;



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
        this.player = new Player(
            this.game,
            '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png'
        )
        this.logoGame = new LogoGame(
            this.game,
            this.spriteWidthGame,
            this.spriteHeightGame,
            '../assets/Asset/Logo.png'
        )
        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
        this.logos = new LogoBar(game);
    }
    onResize(game) {
        this.game = game;
        this.logoGame.onResize(game);
        this.player.onResize(game);
        this.logos.onResize(game);
    }
    update() {
        this.layerImage1.x = -this.game.gameFrame % this.game.width;
    }
    draw(context) {
        this.layerImage1.draw(context, true);
        this.layerImage2.draw(context);
        this.player.draw(context);
        this.logoGame.draw(context)
        this.logos.draw(context);
        context.save();
    }
}