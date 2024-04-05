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
        this.buttons = {
            close: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_19.png',
                this.spriteWidthBoard / 2 - this.spriteWidthBtnClose / 3,
                - this.spriteHeightBtnClose / 6,
                this.spriteWidthBtnClose / 2,
                this.spriteHeightBtnClose / 2,
                this.spriteWidthBtnClose,
                this.spriteHeightBtnClose
            ),
            next: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png',
                this.spriteWidthBoard * 1 / 3 + this.spriteWidthBtnNext / 6,
                this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 6,
                this.spriteWidthBtnNext / 3,
                this.spriteHeightBtnNext / 3,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext
            ),
            back: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png',
                this.spriteWidthBoard * 1 / 3 - this.spriteWidthBtnNext / 2,
                this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 6,
                this.spriteWidthBtnNext / 3,
                this.spriteHeightBtnNext / 3,
                this.spriteWidthBtnNext,
                this.spriteHeightBtnNext
            ),
            play: new Button(
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard / 4 - this.spriteWidthPlay / 6,
                this.spriteHeightBoard / 2 - this.spriteHeightPlay / 1.5,
                this.spriteWidthPlay / 3,
                this.spriteHeightPlay / 3,
                this.spriteWidthPlay,
                this.spriteHeightPlay
            )
        };
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_3.png',
                0, 0, this.spriteWidthBoard / 2, this.spriteHeightBoard / 2,
                this.spriteWidthBoard,
                this.spriteHeightBoard
            ),
            score: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_6.png',
                (this.spriteWidthBoard - this.spriteWidthScore) / 4, this.spriteHeightScore / 5, this.spriteWidthScore / 2, this.spriteHeightScore / 2,
                this.spriteWidthScore,
                this.spriteHeightScore
            ),
            player: new StaticUI(
                '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                -this.spriteWidthPlayer / 8, this.spriteHeightPlayer / 6, this.spriteWidthPlayer / 4, this.spriteHeightPlayer / 4,
                this.spriteWidthPlayer,
                this.spriteHeightPlayer
            ),
        }
        this.text = {
            scoreText: new Text(
                this.spriteWidthBoard / 4, this.spriteHeightScore / 3
            ),
            playText: new Text(
                this.spriteWidthBoard / 4, this.spriteHeightBoard / 2 - this.spriteHeightPlay / 2.25
            ),
            levelText: new Text(
                this.spriteWidthBoard / 4, this.spriteHeightScore / 1.4
            ),
            diffLevel: new Text(
                this.spriteWidthBoard * 2 / 6, this.spriteHeightBoard / 3.8
            ),
            numDiffLevel: new Text(
                this.spriteWidthBoard / 3, this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 2.5
            )

        }
        this.translateX = this.width * 2 / 3;
        this.translateY = this.height * 1 / 4;
    }

    update() {
        // Add update logic if needed
    }

    draw(context) {
        if (!this.hidden) {
            context.save();
            context.translate(this.translateX, this.translateY);
            // Draw your board and score here
            this.staticUI.board.draw(context);
            this.staticUI.score.draw(context);
            this.buttons.close.draw(context);
            this.buttons.next.draw(context);
            this.buttons.back.draw(context);
            this.buttons.play.draw(context);
            this.text.playText.writeText(context, "Chơi");
            this.text.levelText.writeText(context, "Level 1");
            this.text.numDiffLevel.writeText(context, "1");
            this.text.diffLevel.writeText(context, "Độ khó");
            this.text.scoreText.writeText(context, "1080", "50px Arial");
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
    open(lv, context) {
        if (lv.state === 'Unblock') {
            this.game.player.updatePosition(lv.position)
            this.hidden = false;
        }
        else if (this.game.player.maxCurrentLevel + 1 == lv.level) {
            // this.frameCount = 0;
            // this.frameX = 1;
            // this.animateUnblockLevel(lv, context);
            this.game.levels.updateStateLevel(lv);
            this.game.player.updateMaxCurrentLevel(lv.level);
        }
    }

    // animateUnblockLevel(lv, context) {
    //     this.frameCount++;
    //     if (this.frameCount % 100 == 0) {
    //         this.game.levels.drawAnimateUnBlockLevel(context, this.frameX, lv);
    //         // this.frameX++;
    //     } else if (this.frameCount > 2000) {
    //         this.frameCount = 0;
    //         window.cancelAnimationFrame(this.animationId);
    //     }
    //     this.animationId = window.requestAnimationFrame(() => this.animateUnblockLevel(lv, context));
    //     return;
    //     // context.clearRect(0, 0, canvas.width, canvas.height);
    // }

}
