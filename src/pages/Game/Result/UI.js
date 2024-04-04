class Button {
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

export class ShowResult {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteWidthBoard = 1151;
        this.spriteHeightBoard = 667;
        this.spriteWidthTeacher =653;
        this.spriteHeightTeacher = 800;
        this.spriteWidthPlayer = 653;
        this.spriteHeightPlayer = 800;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.spriteWidthBtnNext = 437;
        this.spriteHeightBtnNext = 129;

        this.buttons = {
            next: new Button(
                'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard / 2 - this.spriteWidthBtnNext+ 150,
                this.spriteHeightBtnNext*2.5,
                this.spriteWidthBtnNext/2,
                this.spriteHeightBtnNext/2,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext
            ),
           
        };
        this.staticUI = {
            board: new StaticUI(
                'src/assets/Asset/PanelAtlas_cuts/image_0.png',
                0, 0, this.spriteWidthBoard/1.5 , this.spriteHeightBoard/1.5 ,
                this.spriteWidthBoard,
                this.spriteHeightBoard
            ),
            score: new StaticUI(
                'src/assets/Asset/PanelAtlas_cuts/image_6.png',
                (this.spriteWidthBoard - this.spriteWidthScore) / 2.1, -40, this.spriteWidthScore / 2, this.spriteHeightScore / 2,
                this.spriteWidthScore,
                this.spriteHeightScore
            ),
            player: new StaticUI(
                'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                -this.spriteWidthPlayer/2.4, this.spriteHeightPlayer/26, this.spriteWidthPlayer/1.5, this.spriteHeightPlayer/1.6,
                this.spriteWidthPlayer,
                this.spriteHeightPlayer
            ),
            teacher: new StaticUI(
                'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                this.spriteWidthTeacher - 100, this.spriteHeightTeacher/20-35, this.spriteWidthTeacher / 1.5, this.spriteHeightTeacher / 1.5,
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
                this.spriteWidthBoard/ 2.9, this.spriteHeightScore / 0.98
            ),
            scoreBonus: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightBoard / 3 + this.spriteHeightBtnNext / 2
            ),
            next: new Text(
                this.spriteWidthBoard / 2.9, this.spriteHeightBoard / 1.95 + this.spriteHeightBtnNext / 5
            )

        }
        this.translateX = this.width /4;
        this.translateY = this.height /5;
    }

    update() {
        // Add update logic if needed
    }

    draw(context) {
        
            context.save();
            context.translate(this.translateX, this.translateY);
            // Draw your board and score here
            this.staticUI.board.draw(context);
            this.staticUI.score.draw(context);
            // this.staticUI.player.draw(context);
            this.staticUI.teacher.draw(context);

            this.buttons.next.draw(context);
            
            this.text.difficulty.writeText(context, "Độ khó : x1");
            this.text.word.writeText(context, "Số từ: 53");
            this.text.wordSuccess.writeText(context, "Thành công: 53");
            this.text.scoreText.writeText(context, "1080", "70px Arial");
            this.text.scoreBonus.writeText(context, "Điểm thưởng: 4/5");
            this.text.next.writeText(context,"TIẾP THEO")

            context.restore();
            context.translate(this.translateX, this.translateY);
            context.save();
            context.restore();
    }
}
