class Button {
    constructor(game, image, x, y, width, height, spriteWidth, spriteHeight) {
        this.image = new Image();
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width * this.scaleY;
        this.height = height * this.scaleY;
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
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
        }

        // if (this.gameFrame % (this.staggerFrames * 3) == 0) {
        //     if (this.frameX < 4)
        //         this.frameX += 1
        //     else this.frameX = 0
        // }
        // this.gameFrame++;
    }

}

class Text {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center') {
        context.font = font;
        context.textAlign = "center";
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
        this.spriteWidthBtnNext = 437;
        this.spriteHeightBtnNext = 129;

        this.buttons = {
            next: new Button(
                this.game,
                "../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png",
                this.spriteWidthBoard / 2 - this.spriteWidthBtnNext * this.scaleY / 4,
                this.spriteHeightBtnNext,
                this.spriteWidthBtnNext / 2,
                this.spriteHeightBtnNext / 2,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext
            ),

        };
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
                this.spriteWidthBoard / 2.9, this.spriteHeightScore / 10
            ),
            difficulty: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightBoard / 2.2 - this.spriteHeightBoard / 4
            ),
            word: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightScore / 1.2
            ),
            wordSuccess: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightScore / 0.98
            ),
            scoreBonus: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightBoard / 3 + this.spriteHeightBtnNext / 2
            ),
            next: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightBoard / 1.95 + this.spriteHeightBtnNext / 5
            )

        }
    }

    update() {
    }

    draw(context) {

        context.save();
        // Draw your board and score here
        this.staticUI.board.draw(context);
        this.staticUI.score.draw(context);
        this.buttons.next.draw(context);
        this.player.catGirl.draw(context);
        this.player.catBoy.draw(context);

        this.text.difficulty.writeText(context, "Độ khó : x1");
        this.text.word.writeText(context, "Số từ: 53");
        this.text.wordSuccess.writeText(context, "Thành công: 53");
        this.text.scoreText.writeText(context, "1080", "70px Arial");
        this.text.scoreBonus.writeText(context, "Điểm thưởng: 4/5");
        this.text.next.writeText(context, "TIẾP THEO")

        context.restore();
        // context.save();
        // context.translate(this.translateX, this.translateY);
        // // context.restore();
        // context.save();
        // context.restore();
    }
}
