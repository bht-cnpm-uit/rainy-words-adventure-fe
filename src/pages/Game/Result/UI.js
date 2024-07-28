import { useNavigate } from "react-router-dom";
class BonusItems {
    constructor(game, x, y, bonus) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.spriteShapeBonusItems = [[192, 112], [171, 84], [136, 94], [96, 62], [65, 68], [145, 114]]
        // Initialize bonus item 0
        const bonusItem0 = bonus[0];
        this.scaleSprite = bonusItem0.itemId === 1 ? 1.5 : 1;
        this.spriteWidth0 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][0];
        this.spriteHeight0 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][1];
        this.width0 = this.spriteWidth0 * this.game.scale / this.scaleSprite;
        this.height0 = this.spriteHeight0 * this.game.scale / this.scaleSprite;
        this.noItems0 = bonusItem0.quantity;
        this.imagebonus0 = new Image();
        this.imagebonus0.src = `../assets/Asset/item/${bonusItem0.itemId}.png`;

        // Initialize bonus item 1
        const bonusItem1 = bonus[1];
        this.spriteWidth1 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][0];
        this.spriteHeight1 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][1];
        this.width1 = this.spriteWidth1 * this.game.scale / this.scaleSprite;
        this.height1 = this.spriteHeight1 * this.game.scale / this.scaleSprite;
        this.noItems1 = bonusItem1.quantity;
        this.imagebonus1 = new Image();
        this.imagebonus1.src = `../assets/Asset/item/${bonusItem1.itemId}.png`;

        // Initialize bonus item 2
        const bonusItem2 = bonus[2];
        this.spriteWidth2 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][0];
        this.spriteHeight2 = this.spriteShapeBonusItems[bonusItem0.itemId - 1][1];
        this.width2 = this.spriteWidth2 * this.game.scale / this.scaleSprite;
        this.height2 = this.spriteHeight2 * this.game.scale / this.scaleSprite;
        this.noItems2 = bonusItem2.quantity;
        this.imagebonus2 = new Image();
        this.imagebonus2.src = `../assets/Asset/item/${bonusItem2.itemId}.png`;
    }
    updatePosition(x, y) {
        this.width0 = this.spriteWidth0 * this.game.scale / this.scaleSprite;
        this.height0 = this.spriteHeight0 * this.game.scale / this.scaleSprite;
        this.width1 = this.spriteWidth1 * this.game.scale / this.scaleSprite;
        this.height1 = this.spriteHeight1 * this.game.scale / this.scaleSprite;
        this.width2 = this.spriteWidth2 * this.game.scale / this.scaleSprite;
        this.height2 = this.spriteHeight2 * this.game.scale / this.scaleSprite;
        this.x = x;
        this.y = y;
    }
    update() {
    }

    draw(context) {
        context.font = Math.floor(50 * this.game.scale) + "px fontgame";
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

        let startX = this.x - totalWidth / 2.5;

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
    constructor(game, image, x, y, spriteWidth, spriteHeight) {
        this.image = new Image();
        this.game = game;
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * this.game.scale / 1.2;
        this.height = this.spriteHeight * this.game.scale / 1.2;
    }
    updatePosition(x, y) {
        this.width = this.spriteWidth * this.game.scale / 1.2;
        this.height = this.spriteHeight * this.game.scale / 1.2;
        this.x = x;
        this.y = y;
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
        context.font = Math.floor(40 * this.game.scale) + "px Arial";
        context.fillStyle = 'brown';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(content, this.x + this.width / 2, this.y + this.height / 2)
    }
}
class StaticUI {
    constructor(game, image, x, y, spriteWidth, spriteHeight) {
        this.game = game;
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = spriteWidth * this.game.scale;
        this.height = spriteHeight * this.game.scale;
    }
    draw(context, isScore = false) {
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
        if (isScore) {
            context.font = Math.floor(100 * this.game.scale) + "px fontgame";
            context.fillStyle = 'brown';
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(`${this.game.result.score}`, this.x + this.width / 2, this.y + this.height / 10);
        }

    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
    }
}
class Player {
    constructor(game, image, x, y, spriteWidth, spriteHeight, frameX, frameY, type) {
        this.game = game;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.position = {
            x: x,
            y: this.game.height - this.height
        }
        this.image = new Image();
        this.image.src = image;
        this.frameX = frameX;
        this.frameY = frameY;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.type = type
    }
    updatePosition(x) {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.position.x = x;
        this.position.y = this.game.height - this.height;
    }
    draw(ctx) {
        if (this.type === "boy") {
            ctx.save();
            ctx.translate(this.position.x, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.width, this.position.y, this.width, this.height);
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
        this.spriteWidthBoard = 1151;
        this.spriteHeightBoard = 667;
        this.widthBoard = this.spriteWidthBoard * this.game.scale;
        this.heightBoard = this.spriteHeightBoard * this.game.scale;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.widthScore = this.spriteWidthScore * this.game.scale;
        this.heightScore = this.spriteHeightScore * this.game.scale;
        this.spriteWidthPlayerGirl = 883;
        this.spriteHeightPlayerGirl = 611;
        this.widthPlayerGirl = this.spriteWidthPlayerGirl * this.game.scale;
        this.heightPlayerGirl = this.spriteHeightPlayerGirl * this.game.scale;
        this.spriteWidthPlayerBoy = 653;
        this.spriteHeightPlayerBoy = 800;
        this.widthPlayerBoy = this.spriteWidthPlayerBoy * this.game.scale;
        this.heightPlayerBoy = this.spriteHeightPlayerBoy * this.game.scale;

        this.spriteWidthBtn = 437;
        this.spriteHeightBtn = 129;
        this.widthBtn = this.spriteWidthBtn * this.game.scale / 1.2;
        this.heighBtn = this.spriteHeightBtn * this.game.scale / 1.2;

        this.staticUI = {
            board: new StaticUI(
                this.game,
                '../assets/Asset/PanelAtlas/image_0.png',
                (this.game.width - this.widthBoard) / 2, (this.game.height - this.heightBoard) / 2,
                this.spriteWidthBoard,
                this.spriteHeightBoard
            ),
            score: new StaticUI(
                this.game,
                '../assets/Asset/PanelAtlas/image_6.png',
                (this.game.width - this.widthScore) / 2, (this.game.height - this.heightBoard - this.heightScore) / 2,
                this.spriteWidthScore,
                this.spriteHeightScore
            )
        }
        this.buttonNext = new Button(
            this.game,
            "../assets/Asset/ButtonAtlas/image_25.png",
            (this.game.width - this.widthBtn) / 2, this.staticUI.board.y + this.heightBoard - this.heighBtn / 2,
            this.spriteWidthBtn, this.spriteHeightBtn
        );
        this.player = {
            catGirl: new Player(
                this.game,
                '../assets/Asset/GameObject/TeacherCatSprite(Blink).png',
                this.staticUI.board.x - this.widthPlayerGirl / 1.5, this.game.height - this.heightPlayerGirl,
                this.spriteWidthPlayerGirl, this.spriteHeightPlayerGirl,
                0, 0, 'girl'
            ),
            catBoy: new Player(
                this.game,
                '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
                this.staticUI.board.x + this.widthBoard - this.widthPlayerBoy / 4, this.game.height - this.heightPlayerBoy,
                this.spriteWidthPlayerBoy, this.spriteHeightPlayerBoy,
                0, 1, 'boy'

            )
        }
        this.bonusItem = new BonusItems(
            this.game,
            this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 2.8 / 4,
            this.game.result.bonusItems
        )
    }
    updatePosition() {
        this.widthScore = this.spriteWidthScore * this.game.scale;
        this.heightScore = this.spriteHeightScore * this.game.scale;
        this.widthBoard = this.spriteWidthBoard * this.game.scale;
        this.heightBoard = this.spriteHeightBoard * this.game.scale;
        this.widthBtn = this.spriteWidthBtn * this.game.scale / 1.2;
        this.heighBtn = this.spriteHeightBtn * this.game.scale / 1.2;
        this.staticUI.board.updatePosition((this.game.width - this.widthBoard) / 2, (this.game.height - this.heightBoard) / 2);
        this.staticUI.score.updatePosition((this.game.width - this.widthScore) / 2, (this.game.height - this.heightBoard - this.heightScore) / 2);
        this.player.catBoy.updatePosition(this.staticUI.board.x + this.widthBoard - this.spriteWidthPlayerBoy * this.game.scale / 4);
        this.player.catGirl.updatePosition(this.staticUI.board.x - this.spriteWidthPlayerGirl * this.game.scale / 1.5);
        this.buttonNext.updatePosition((this.game.width - this.widthBtn) / 2, this.staticUI.board.y + this.heightBoard - this.heighBtn / 2)
        this.bonusItem.updatePosition(this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 2.8 / 4);
    }
    update() {
    }

    draw(context) {

        context.save();
        // Draw your board and score here
        this.staticUI.board.draw(context);
        this.staticUI.score.draw(context, true);
        this.buttonNext.draw(context);
        this.player.catGirl.draw(context);
        this.player.catBoy.draw(context);
        this.bonusItem.draw(context);

        // this.text.next.writeText(context, "TIẾP THEO")
        context.font = Math.floor(55 * this.game.scale) + "px Arial";
        context.fillStyle = 'brown'
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Độ khó : x1", this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard / 4);
        context.fillText(`Số từ: ${this.game.result.noWords}`, this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 1.5 / 4);
        context.fillText(`${this.game.result.score}`, "70px fontgame", this.staticUI.score.x + this.widthScore / 2, this.staticUI.score.y + this.heightScore / 10);
        context.fillText(`Điểm thưởng: ${this.game.result.score}`, this.staticUI.board.x + this.widthBoard / 2, this.staticUI.board.y + this.heightBoard * 2 / 4);
        this.buttonNext.writeText(context, "TIẾP THEO");
        context.restore();
    }
}
