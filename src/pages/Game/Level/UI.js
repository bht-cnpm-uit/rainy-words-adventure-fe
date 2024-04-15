class Button {
    constructor(image, x, y, width, height, spriteWidth, spriteHeight, scaleY) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width * scaleY;
        this.height = height * scaleY;
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
    constructor(image, x, y, width, height, spriteWidth, spriteHeight, scaleY) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width * scaleY;
        this.height = height * scaleY;
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
    writeText(context, text, font = "30px Arial", textAlign = 'center', color = 'brown') {
        context.font = font;
        context.textAlign = "center";
        context.fillStyle = color;
        context.fillText(text, this.x, this.y);
    }
}

export class LevelSetting {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidthBoard = 693;
        this.spriteHeightBoard = 843;
        this.spriteWidthBtnClose = 139;
        this.spriteHeightBtnClose = 138;
        this.spriteWidthBtnNext = 139;
        this.spriteHeightBtnNext = 138;
        this.spriteWidthPlay = 437;
        this.spriteHeightPlay = 129;
        this.spriteWidthPlayer = 653;
        this.spriteHeightPlayer = 800;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.hidden = true;
        this.frameCount = 0;
        this.frameX = 1;
        this.currentLevel = null;
        this.buttons = {
            close: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_19.png',
                this.spriteWidthBoard * this.scaleY - this.spriteWidthBtnClose * this.scaleY * 2 / 3,
                - this.spriteHeightBtnClose * this.scaleY / 6,
                this.spriteWidthBtnClose,
                this.spriteHeightBtnClose,
                this.spriteWidthBtnClose,
                this.spriteHeightBtnClose,
                this.scaleY
            ),
            increase: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png',
                this.spriteWidthBoard * this.scaleY / 2 + this.spriteWidthBtnNext * this.scaleY * 0.8 * 1.5,
                this.spriteHeightBoard * this.scaleY / 2 + this.spriteHeightBtnNext * 0.8 * this.scaleY / 4,
                this.spriteWidthBtnNext * 0.8,
                this.spriteHeightBtnNext * 0.8,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext,
                this.scaleY
            ),
            decrease: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png',
                this.spriteWidthBoard * this.scaleY / 2,
                this.spriteHeightBoard * this.scaleY / 2 + this.spriteHeightBtnNext * 0.8 * this.scaleY / 4,
                this.spriteWidthBtnNext * 0.8,
                this.spriteHeightBtnNext * 0.8,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext,
                this.scaleY
            ),
            play: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard * this.scaleY / 2 - this.spriteWidthPlay * this.scaleY / 3,
                this.spriteHeightBoard * this.scaleY - this.spriteHeightPlay * this.scaleY * 1.1,
                this.spriteWidthPlay * 2 / 3,
                this.spriteHeightPlay * 0.9,
                this.spriteWidthPlay,
                this.spriteHeightPlay,
                this.scaleY
            ),
        };
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_3.png',
                0, 0,
                this.spriteWidthBoard, this.spriteHeightBoard,
                this.spriteWidthBoard,
                this.spriteHeightBoard,
                this.scaleY
            ),
            score: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_6.png',
                (this.spriteWidthBoard * this.scaleY - this.spriteWidthScore * this.scaleY) / 4, this.spriteHeightScore * this.scaleY / 4,
                this.spriteWidthScore, this.spriteHeightScore,
                this.spriteWidthScore,
                this.spriteHeightScore,
                this.scaleY
            ),
            player: new StaticUI(
                '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                -this.spriteWidthPlayer * this.scaleY / 4, this.spriteHeightPlayer * this.scaleY / 4,
                this.spriteWidthPlayer / 1.6, this.spriteHeightPlayer / 1.6,
                this.spriteWidthPlayer,
                this.spriteHeightPlayer,
                this.scaleY
            ),
        }
        this.text = {
            scoreText: new Text(
                (this.spriteWidthBoard * this.scaleY - this.spriteWidthScore * this.scaleY) / 4 + this.staticUI.score.width / 2, this.spriteHeightScore * this.scaleY / 4 + this.staticUI.score.height * 1 / 4,
            ),
            playText: new Text(
                this.spriteWidthBoard * this.scaleY / 2,
                this.spriteHeightBoard * this.scaleY - this.spriteHeightPlay * this.scaleY * 1.1 + this.spriteHeightPlay * this.scaleY / 2,
            ),
            levelText: new Text(
                (this.spriteWidthBoard * this.scaleY - this.spriteWidthScore * this.scaleY) / 4 + this.staticUI.score.width / 2, this.spriteHeightScore * this.scaleY / 4 + this.staticUI.score.height * 1.1,
            ),
            diffLevel: new Text(
                this.spriteWidthBoard * this.scaleY * 3 / 4 - this.spriteWidthBtnNext * this.scaleY / 5, this.spriteHeightBoard * this.scaleY / 2
            ),
            numDiffLevel: new Text(
                this.spriteWidthBoard * this.scaleY * 3 / 4 - this.spriteWidthBtnNext * 0.8 * this.scaleY / 3, this.spriteHeightBoard * this.scaleY / 2 + this.spriteHeightBtnNext * 0.8 * this.scaleY / 4 + this.spriteHeightBtnNext * 0.8 * this.scaleY / 1.3,
            )

        }
        this.translateX = this.width * 2 / 3;
        this.translateY = this.height * 1 / 5;
    }

    update() {
        // Add update logic if needed
    }

    draw(context) {
        if (!this.hidden && this.currentLevel) {
            context.save();
            context.translate(this.translateX, this.translateY);
            // Draw your board and score here
            this.staticUI.board.draw(context);
            this.staticUI.score.draw(context);
            this.buttons.close.draw(context);
            this.buttons.increase.draw(context);
            this.buttons.decrease.draw(context);
            this.buttons.play.draw(context);
            this.text.playText.writeText(context, "Chơi");
            this.text.levelText.writeText(context, "Level " + this.currentLevel.level.toString(), "30px fontgame");
            this.text.numDiffLevel.writeText(context, this.currentLevel.difficulty_level);
            this.text.diffLevel.writeText(context, "Độ khó");
            this.text.scoreText.writeText(context, "1080", "55px fontgame");
            context.restore();
            context.save();
            context.translate(this.translateX, this.translateY);
            context.rotate(-(8 * Math.PI) / 180); // Rotate 45 degrees
            // Draw your player here
            this.staticUI.player.draw(context);
            context.restore();
            context.save();
            context.translate(this.width * 2 / 3, this.height * 1 / 4);
            context.font = "50px Arial blue";
            context.textAlign = "center";
            // Draw your score here
            context.restore();
        }
    }
    close() {
        this.hidden = true;
    }
    open(lv) {
        this.currentLevel = lv;
        this.hidden = false;
    }
    updateDifficultyLevel(d) {
        var newLevel = this.currentLevel.difficulty_level + d;
        if (newLevel >= 0 && newLevel <= this.currentLevel.max_difficulty_level) {
            this.currentLevel.difficulty_level = newLevel;
        }
    }


}
