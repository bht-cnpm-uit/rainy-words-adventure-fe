class Button {
    constructor(game, currentBoard, image, spriteWidth, spriteHeight, type) {
        this.game = game;
        this.currentBoard = currentBoard;
        this.image = new Image();
        this.image.src = image;
        this.x = null;
        this.y = null;
        this.width = spriteWidth * this.game.scale;
        this.height = spriteHeight * this.game.scale;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.type = type;
        if (type == 'close') {
            this.x = this.currentBoard.staticUI.board.width - this.width / 1.5;
            this.y = -this.height / 3;
        }
        else if (type == 'increase') {
            this.x = this.currentBoard.staticUI.board.width - this.width;
            this.y = this.currentBoard.staticUI.board.height / 2 + this.height / 4;
        }
        else if (type == 'decrease') {
            this.x = this.currentBoard.staticUI.board.width / 2;
            this.y = this.currentBoard.staticUI.board.height / 2 + this.height / 4;
        }
        else {
            this.width = this.spriteWidth * this.game.scale * 0.8
            this.x = (this.currentBoard.staticUI.board.width - this.width) / 2;
            this.y = this.currentBoard.staticUI.board.height - this.height * 1.2;
        }
    }

    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        if (this.type == 'close') {
            this.x = this.currentBoard.staticUI.board.width - this.width / 1.5;
            this.y = -this.height / 3;
        }
        else if (this.type == 'increase') {
            this.x = this.currentBoard.staticUI.board.width - this.width;
            this.y = this.currentBoard.staticUI.board.height / 2 + this.height / 4;
        }
        else if (this.type == 'decrease') {
            this.x = this.currentBoard.staticUI.board.width / 2;
            this.y = this.currentBoard.staticUI.board.height / 2 + this.height / 4;
        }
        else {
            this.width = this.spriteWidth * this.game.scale * 0.8
            this.x = (this.currentBoard.staticUI.board.width - this.width) / 2;
            this.y = this.currentBoard.staticUI.board.height - this.height * 1.2;
        }
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
    writeText(context, content) {
        context.textAlign = 'center';
        context.font = Math.floor(60 * this.game.scale) + "px Arial";
        context.fillText(content, this.x + this.width / 2, this.y + this.height / 1.5, this.width)
    }
}
class StaticUI {
    constructor(game, currentBoard, image, spriteWidth, spriteHeight, type) {
        this.game = game;
        this.currentBoard = currentBoard;
        this.image = new Image();
        this.image.src = image;
        this.x = null;
        this.y = null;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = spriteWidth * this.game.scale;
        this.height = spriteHeight * this.game.scale;
        this.type = type;
        this.scalePlayer = 1;
        if (type == 'board') {
            this.x = 0;
            this.y = 0;
        }
        else if (type == 'score') {
            this.x = (this.currentBoard.spriteWidthBoard * this.game.scale - this.width) / 2;
            this.y = this.height / 4;
        }
        else {
            this.x = -this.width / 4;
            this.y = this.height / 4;
            this.scalePlayer = 0.6
        }

    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        if (this.type == 'board') {
            this.x = 0;
            this.y = 0;
        }
        else if (this.type == 'score') {
            this.x = (this.currentBoard.spriteWidthBoard * this.game.scale - this.width) / 2;
            this.y = this.height / 4;
        }
        else {
            this.x = -this.width / 4;
            this.y = this.height / 4;
            this.scalePlayer = 0.6
        }
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
            this.width * this.scalePlayer,
            this.height * this.scalePlayer
        );
    }
    writeText(context, content) {
        context.textAlign = 'center';
        context.font = Math.floor(100 * this.game.scale) + "px fontgame";
        context.fillText(content, this.x + this.width / 2, this.y + this.height / 5, this.width)
    }
}

class Text {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y
    }
    writeText(context, text, font = "Arial", textAlign = 'center', color = 'brown') {
        context.font = Math.floor(60 * this.game.scale) + "px " + font;
        context.textAlign = "center";
        context.fillStyle = color;
        context.fillText(text, this.x, this.y);
    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class LevelSetting {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
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
        this.currentDiffLevel = 0;
        this.staticUI = {
            board: new StaticUI(
                this.game,
                this,
                '../assets/Asset/PanelAtlas_cuts/image_3.png',
                this.spriteWidthBoard,
                this.spriteHeightBoard,
                'board'
            ),
            score: new StaticUI(
                this.game,
                this,
                '../assets/Asset/PanelAtlas_cuts/image_6.png',
                this.spriteWidthScore,
                this.spriteHeightScore,
                'score'
            ),
            player: new StaticUI(
                this.game,
                this,
                '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                this.spriteWidthPlayer,
                this.spriteHeightPlayer,
                'player'
            ),
        }
        this.buttons = {
            close: new Button(
                this.game,
                this,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_19.png',
                this.spriteWidthBtnClose,
                this.spriteHeightBtnClose,
                'close'
            ),
            increase: new Button(
                this.game,
                this,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png',
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext,
                'increase'
            ),
            decrease: new Button(
                this.game,
                this,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png',
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext,
                'decrease'
            ),
            play: new Button(
                this.game,
                this,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthPlay,
                this.spriteHeightPlay,
                'play'
            ),
        };
        this.text = {
            levelText: new Text(
                this.game,
                this.staticUI.board.width / 2, this.staticUI.score.height * 1.3
            ),
            diffLevel: new Text(
                this.game,
                this.staticUI.board.width * 3 / 4, this.staticUI.board.height / 2
            ),
            numDiffLevel: new Text(
                this.game,
                this.staticUI.board.width * 3 / 4, this.buttons.increase.y + this.buttons.increase.height / 1.5
            )

        }
        this.translateX = this.width * 2 / 3;
        this.translateY = this.height * 1 / 5;
    }
    updatePosition() {
        this.width = this.game.width;
        this.height = this.game.height;
        this.staticUI.board.updatePosition();
        this.staticUI.score.updatePosition();
        this.staticUI.player.updatePosition();
        this.buttons.close.updatePosition();
        this.buttons.decrease.updatePosition();
        this.buttons.increase.updatePosition();
        this.buttons.play.updatePosition();
        this.translateX = this.width * 2 / 3;
        this.translateY = this.height * 1 / 5;
        this.text.levelText.updatePosition(this.staticUI.board.width / 2, this.staticUI.score.height * 1.3);
        this.text.diffLevel.updatePosition(this.staticUI.board.width * 3 / 4, this.staticUI.board.height / 2);
        this.text.numDiffLevel.updatePosition(this.staticUI.board.width * 3 / 4, this.buttons.increase.y + this.buttons.increase.height / 1.5)
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
            this.staticUI.score.writeText(context, Math.max(...this.currentLevel.score));
            this.buttons.close.draw(context);
            this.buttons.increase.draw(context);
            this.buttons.decrease.draw(context);
            this.buttons.play.draw(context);
            this.buttons.play.writeText(context, "Chơi")
            this.text.levelText.writeText(context, "Level " + this.currentLevel.level.toString(), "fontgame");
            this.text.numDiffLevel.writeText(context, this.currentDiffLevel + 1);
            this.text.diffLevel.writeText(context, "Độ khó");
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
        this.currentLevel = JSON.parse(JSON.stringify(lv));
        this.hidden = false;
    }
    updateDifficultyLevel(d) {
        let newLevel = this.currentDiffLevel + d;
        if (newLevel >= 0 && newLevel <= 2) {
            if (newLevel == 1 && this.currentLevel.difficulty_level[0]) {
                this.currentDiffLevel = newLevel;
            }
            else if (newLevel == 2 && this.currentLevel.difficulty_level[0] && this.currentLevel.difficulty_level[1]) {
                this.currentDiffLevel = newLevel;
            }
            else if (newLevel == 0) {
                this.currentDiffLevel = newLevel;
            }
        }
    }


}
