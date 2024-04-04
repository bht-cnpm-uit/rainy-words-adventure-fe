class UI {
    constructor(game) {
        this.game = game;
    }
    draw(context) {
        // Base class draw method, can be overridden by child classes
    }
}

export class Score extends UI {
    constructor(game) {
        super(game); // Call the constructor of the parent class
        this.fontSize = 65;
        this.fontFamily = 'Georgia, serif';
    }
    draw(context) {
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillStyle = 'blue';
        context.fillText(this.game.score, this.game.width / 2, this.fontSize * 1.5);
    }
}

export class BonusItems extends UI {
    constructor(game) {
        super(game);
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.x = 10;
        this.y = 10;
        this.maxItems = 5;
        this.noItems = 0;
        this.image = new Image();
        this.image.src = "src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_11.png";
    }
    update() {
    }
    draw(context) {
        for (let i = 0; i < this.noItems; i++) {
            context.drawImage(this.image, this.x + i * this.spriteWidth / 1.5, this.y, this.spriteWidth / 1.5, this.spriteHeight / 1.5);
        }
    }
    addNewItem() {
        if (this.noItems < this.maxItems) {
            this.noItems++;
        }
    }
}

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
    writeText(context, text, font = "25px Arial", textAlign = 'center') {
        context.font = font;
        context.textAlign = "center";
        context.fillStyle = "brown";
        context.fillText(text, this.x + this.width / 2, this.y + this.height / 1.5);
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
        context.fillStyle = "brown";
        context.fillText(text, this.x, this.y);
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

export class BoardStopGame {
    constructor(game) {
        this.game = game;
        this.translateX = this.game.width * 1 / 3;
        this.translateY = this.game.height * 1 / 3;
        this.hidden = true;
        this.spriteWidthBoard = 908;
        this.spriteHeightBoard = 476;
        this.spriteWidthButton = 437;
        this.spriteHeightButton = 129;
        this.staticUI = {
            board: new StaticUI(
                'src/assets/Asset/PanelAtlas_cuts/image_1.png',
                0, 0, this.spriteWidthBoard / 2, this.spriteHeightBoard / 2,
                this.spriteWidthBoard, this.spriteHeightBoard
            )
        }
        this.text = {
            textTitleStop: new Text(
                this.spriteWidthBoard / 4,
                this.spriteHeightBoard / 4
            )
        }
        this.buttons = {
            continue: new Button(
                'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard / 12 - this.spriteWidthButton / 8,
                this.spriteHeightBoard / 2 - this.spriteHeightButton / 2,
                this.spriteWidthButton / 4,
                this.spriteHeightButton / 3,
                this.spriteWidthButton,
                this.spriteHeightButton
            ),
            replay: new Button(
                'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard / 6 + this.spriteWidthBoard / 12 - this.spriteWidthButton / 8,
                this.spriteHeightBoard / 2 - this.spriteHeightButton / 2,
                this.spriteWidthButton / 4,
                this.spriteHeightButton / 3,
                this.spriteWidthButton,
                this.spriteHeightButton
            ),
            back: new Button(
                'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.spriteWidthBoard * 1 / 3 + this.spriteWidthBoard / 12 - this.spriteWidthButton / 8,
                this.spriteHeightBoard / 2 - this.spriteHeightButton / 2,
                this.spriteWidthButton / 4,
                this.spriteHeightButton / 3,
                this.spriteWidthButton,
                this.spriteHeightButton
            )
        }
    }
    update() {

    }
    draw(context) {
        if (!this.hidden) {
            context.save();
            context.translate(this.translateX, this.translateY);
            this.staticUI.board.draw(context);
            this.buttons.continue.draw(context);
            this.buttons.replay.draw(context);
            this.buttons.back.draw(context);
            this.buttons.continue.writeText(context, "Tiếp tục")
            this.buttons.replay.writeText(context, "Chơi lại")
            this.buttons.back.writeText(context, "Trở về")
            this.text.textTitleStop.writeText(context, 'Trò chơi đang tạm dừng');
            context.restore();
        }
    }
    updateState(state) {
        this.hidden = state;
    }
}