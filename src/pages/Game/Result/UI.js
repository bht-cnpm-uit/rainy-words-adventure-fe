const imgbuttonNext = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png'
const imgBoard = 'src/assets/Asset/PanelAtlas_cuts/image_0.png'
const imgScore = 'src/assets/Asset/PanelAtlas_cuts/image_6.png'
const imgPlayer = 'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png'

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
        this.translateX = this.game.width * 1 / 3;
        this.translateY = this.game.height * 1 / 3;
        this.spriteWidthBoard = 1151;
        this.spriteHeightBoard = 667;
        this.spriteWidthTeacher = 653;
        this.spriteHeightTeacher = 800;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.spriteWidthBtnNext = 437;
        this.spriteHeightBtnNext = 129;

        this.buttons = {
            next: new Button(
                this.game,
                imgbuttonNext,
                this.spriteWidthBoard / 2 - this.spriteWidthBtnNext*this.scaleY/4,
                this.spriteHeightBtnNext,
                this.spriteWidthBtnNext / 2,
                this.spriteHeightBtnNext / 2,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext
            ),

        };
        this.staticUI = {
            board: new StaticUI(
                imgBoard,
                0, 0, this.spriteWidthBoard / 1.5, this.spriteHeightBoard / 1.5,
                this.spriteWidthBoard,
                this.spriteHeightBoard
            ),
            score: new StaticUI(
                imgScore,
                (this.spriteWidthBoard - this.spriteWidthScore) / 2.1, -40, this.spriteWidthScore / 2, this.spriteHeightScore / 2,
                this.spriteWidthScore,
                this.spriteHeightScore
            ),
            teacher: new StaticUI(
                imgPlayer,
                this.spriteWidthTeacher - 100, this.spriteHeightTeacher / 20 - 35, this.spriteWidthTeacher / 1.5, this.spriteHeightTeacher / 1.5,
                this.spriteWidthTeacher,
                this.spriteHeightTeacher
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
        this.translateX = this.width / 4;
        this.translateY = this.height / 5;
    }

    update() {
    }

    draw(context) {

        context.save();
        context.translate(this.translateX, this.translateY);
        // Draw your board and score here
        this.staticUI.board.draw(context);
        this.staticUI.score.draw(context);
        this.staticUI.teacher.draw(context);
        this.buttons.next.draw(context);

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
