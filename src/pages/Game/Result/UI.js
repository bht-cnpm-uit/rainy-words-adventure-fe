export class BonusItems {
    constructor(scaleY, x, y, bonus) {
        this.scaleY = scaleY;
        this.x = x;
        this.y = y;
        this.spriteWidth0 = 192;
        this.spriteHeight0 = 112;
        this.width0 = this.spriteWidth0 * this.scaleY / 1.5;
        this.height0 = this.spriteHeight0 * this.scaleY / 1.5;
        this.noItems0 = bonus.item1;
        this.imagebonus0 = new Image();
        this.imagebonus0.src = '../assets/Asset/Asset/bonusItem/0.png';
        this.spriteWidth1 = 171;
        this.spriteHeight1 = 84;
        this.width1 = this.spriteWidth1 * this.scaleY / 1.5;
        this.height1 = this.spriteHeight1 * this.scaleY / 1.5;
        this.noItems1 = bonus.item0;
        this.imagebonus1 = new Image();
        this.imagebonus1.src = '../assets/Asset/Asset/bonusItem/1.png';
        this.spriteWidth2 = 136;
        this.spriteHeight2 = 94;
        this.width2 = this.spriteWidth2 * this.scaleY / 1.5;
        this.height2 = this.spriteHeight2 * this.scaleY / 1.5;
        this.noItems2 = bonus.item2;
        this.imagebonus2 = new Image();
        this.imagebonus2.src = '../assets/Asset/Asset/bonusItem/2.png';
    }
    update() {
    }

    draw(context) {
        context.font = "50px fontgame";
        context.fillStyle = 'brown';
        context.textAlign = "center";
        context.textBaseline = "middle";

        let totalWidth = 0;
        let spacing = 0; // Adjust spacing between items as needed

        if (this.noItems0) {
            let textWidth0 = context.measureText(`x ${this.noItems0}`).width;
            totalWidth += textWidth0 + this.width0 + spacing;
        }
        if (this.noItems1) {
            let textWidth1 = context.measureText(`x ${this.noItems1}`).width;
            totalWidth += textWidth1 + this.width1 + spacing;
        }
        if (this.noItems2) {
            let textWidth2 = context.measureText(`x ${this.noItems2}`).width;
            totalWidth += textWidth2 + this.width1; // width1 used for item 2 image
        }

        let startX = this.x - totalWidth / 2;

        if (this.noItems0) {
            let textWidth = context.measureText(`x ${this.noItems0}`).width;
            context.drawImage(this.imagebonus0, startX, this.y - this.height0 / 2, this.width0, this.height0);
            context.fillText(`x ${this.noItems0}`, startX + this.width0 / 2, this.y + this.height0 / 2 + 20); // Adjust Y position of text as needed
            startX += textWidth + this.width0 + spacing;
        }
        if (this.noItems1) {
            let textWidth = context.measureText(`x ${this.noItems1}`).width;
            context.drawImage(this.imagebonus1, startX, this.y - this.height1 / 2, this.width1, this.height1);
            context.fillText(`x ${this.noItems1}`, startX + this.width1 / 2, this.y + this.height1 / 2 + 20); // Adjust Y position of text as needed
            startX += textWidth + this.width1 + spacing;
        }
        if (this.noItems2) {
            let textWidth = context.measureText(`x ${this.noItems2}`).width;
            context.drawImage(this.imagebonus2, startX, this.y - this.height2 / 2, this.width1, this.height2);
            context.fillText(`x ${this.noItems2}`, startX + this.width1 / 2, this.y + this.height2 / 2 + 20); // Adjust Y position of text as needed
        }
    }

}
class Button {
    constructor(game, image, x, y, width, height, spriteWidth, spriteHeight) {
        this.image = new Image();
        this.game = game;
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

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
            this.height
        );
    }
    onClick() {
        window.location.href = '/level'
    }
}
class StaticUI {
    constructor(image, x, y, width, height, spriteWidth, spriteHeight) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }
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
            this.height
        );
    }
}
class Player {
    constructor(game, image, x, y, width, height, spriteWidth, spriteHeight, frameX, frameY, type) {
        this.game = game;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = width;
        this.height = height;
        this.position = {
            x: x,
            y: y
        }
        this.image = new Image();
        this.image.src = image;
        this.frameX = frameX;
        this.frameY = frameY;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.type = type
    }
    draw(ctx) {
        if (this.type === "boy") {
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.width, 0, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
        }
    }

}

class Text {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center') {
        context.font = font;
        context.fillStyle = 'brown'
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, this.x, this.y);
    }
}

export class BoardResult {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidthBoard = 1151;
        this.spriteHeightBoard = 667;
        this.widthBoard = this.spriteWidthBoard * this.scaleY;
        this.heightBoard = this.spriteHeightBoard * this.scaleY;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.widthScore = this.spriteWidthScore * this.scaleY;
        this.heightScore = this.spriteHeightScore * this.scaleY;
        this.spriteWidthPlayerGirl = 883;
        this.spriteHeightPlayerGirl = 611;
        this.widthPlayerGirl = this.spriteWidthPlayerGirl * this.scaleY;
        this.heightPlayerGirl = this.spriteHeightPlayerGirl * this.scaleY;
        this.spriteWidthPlayerBoy = 653;
        this.spriteHeightPlayerBoy = 800;
        this.widthPlayerBoy = this.spriteWidthPlayerBoy * this.scaleY;
        this.heightPlayerBoy = this.spriteHeightPlayerBoy * this.scaleY;

        this.spriteWidthBtn = 437;
        this.spriteHeightBtn = 129;
        this.widthBtn = this.spriteWidthBtn * this.scaleY / 1.2;
        this.heighBtn = this.spriteHeightBtn * this.scaleY / 1.2;

        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_0.png',
                (this.game.width - this.widthBoard) / 2, (this.game.height - this.heightBoard) / 2,
                this.widthBoard, this.heightBoard,
                this.spriteWidthBoard,
                this.spriteHeightBoard
            ),
            score: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_6.png',
                (this.game.width - this.widthScore) / 2, (this.game.height - this.heightBoard - this.heightScore) / 2,
                this.widthScore, this.heightScore,
                this.spriteWidthScore,
                this.spriteHeightScore
            )
        }
        this.buttonNext = new Button(
            this.game,
            "../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png",
            (this.game.width - this.widthBtn) / 2, this.staticUI.board.y + this.heightBoard - this.heighBtn / 2,
            this.widthBtn, this.heighBtn,
            this.spriteWidthBtn, this.spriteHeightBtn
        );
        this.player = {
            catGirl: new Player(
                this,
                '../assets/Asset/TeacherCatSprite(Blink).png',
                this.staticUI.board.x - this.widthPlayerGirl / 1.5, this.game.height - this.heightPlayerGirl,
                this.widthPlayerGirl, this.heightPlayerGirl,
                this.spriteWidthPlayerGirl, this.spriteHeightPlayerGirl,
                0, 0, 'girl'
            ),
            catBoy: new Player(
                this,
                '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                this.staticUI.board.x + this.widthBoard - this.widthPlayerBoy / 4, this.game.height - this.heightPlayerBoy,
                this.widthPlayerBoy, this.heightPlayerBoy,
                this.spriteWidthPlayerBoy, this.spriteHeightPlayerBoy,
                0, 1, 'boy'

            )
        }
        this.text = {
            scoreText: new Text(
                this.staticUI.score.x + this.widthScore / 2, this.staticUI.score.y + this.heightScore / 10
            ),
            difficulty: new Text(
                this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard / 4
            ),
            word: new Text(
                this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 1.5 / 4
            ),
            scoreBonus: new Text(
                this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 2 / 4
            ),
            next: new Text(
                this.buttonNext.x + this.widthBtn / 2, this.buttonNext.y + this.heighBtn / 2
            )
        }
        this.bonusItem = new BonusItems(
            this.scaleY,
            this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 2.8 / 4,
            this.game.result.bonus
        )
    }

    update() {
    }

    draw(context) {

        context.save();
        // Draw your board and score here
        this.staticUI.board.draw(context);
        this.staticUI.score.draw(context);
        this.buttonNext.draw(context);
        this.player.catGirl.draw(context);
        this.player.catBoy.draw(context);
        this.bonusItem.draw(context);

        this.text.difficulty.writeText(context, "Độ khó : x1");
        this.text.word.writeText(context, `Số từ: ${this.game.result.noWords}`);
        this.text.scoreText.writeText(context, `${this.game.result.score}`, "70px fontgame");
        this.text.scoreBonus.writeText(context, `Điểm thưởng: ${this.game.result.score}`);
        this.text.next.writeText(context, "TIẾP THEO")

        context.restore();
    }
}
