
class Text {
    constructor(game, currentBoard) {
        this.game = game
        this.currentBoard = currentBoard;
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center', fillStyle = 'brown', isCountDown = false) {
        context.font = Math.floor(60 * this.game.scale) + "px Arial";
        context.textAlign = textAlign;
        context.fillStyle = fillStyle;
        if (isCountDown) {
            context.fillText(text, this.currentBoard.width / 2, this.currentBoard.height / 1.6, this.currentBoard.width * 0.8);
        }
        else {
            context.fillText(text, this.currentBoard.width / 2, this.currentBoard.height / 2.2, this.currentBoard.width * 0.8);
        }
    }
}

export class Score {
    constructor(game) {
        this.game = game;
        this.score = 0;
    }
    draw(context) {
        let fontsize = Math.floor(90 * this.game.scale);
        context.font = fontsize + "px fontgame";
        context.fillStyle = 'brown';
        context.textAlign = "center";
        context.fillText(this.score, this.game.width / 2, fontsize);
    }
    update(vocabLevel) {
        if (vocabLevel == 'Hard') {
            this.score += 30 * (this.game.diffLevel * 0.5 + 1);
        }
        else if (vocabLevel == 'Medium') {
            this.score += 20 * (this.game.diffLevel * 0.5 + 1);
        }
        else {
            this.score += 10 * (this.game.diffLevel * 0.5 + 1);
        }
    }
}

export class BonusItems {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.x = 15;
        this.y = 10;
        this.maxItems = 3;
        this.noItems = 3;
        this.image = new Image();
        this.image.src = './Asset/Item/0.png';
        this.spriteShapeBonusItems = [[192, 112], [171, 84], [136, 94], [96, 62], [65, 68], [145, 114]]
        this.noBonusItems = [0, 0, 0, 0, 0, 0];
        this.imagebonus0 = new Image();
        this.imagebonus0.src = './Asset/Item/1.png';
        this.imagebonus1 = new Image();
        this.imagebonus1.src = './Asset/Item/2.png';
        this.imagebonus2 = new Image();
        this.imagebonus2.src = './Asset/Item/3.png';
        this.imagebonus3 = new Image();
        this.imagebonus3.src = './Asset/Item/4.png';
        this.imagebonus4 = new Image();
        this.imagebonus4.src = './Asset/Item/5.png';
        this.imagebonus5 = new Image();
        this.imagebonus5.src = './Asset/Item/6.png';
    }
    update() {
    }
    draw(context) {
        // Draw main items
        for (let i = 0; i < this.noItems; i++) {
            context.drawImage(this.image, this.x + i * this.spriteWidth * this.game.scale, this.y, this.spriteWidth * this.game.scale, this.spriteHeight * this.game.scale);
        }

        // Set font for text
        context.font = Math.floor(80 * this.game.scale) + "px fontgame";

        // Draw first bonus item
        let firstItem = this.game.listBonusItem[0] - 1;
        if (this.noBonusItems[firstItem]) {
            context.fillText(`x ${this.noBonusItems[firstItem]}`, this.x + 20, this.y + this.spriteHeight * this.game.scale * 1.1 + this.spriteShapeBonusItems[firstItem][1] * this.game.scale / 1.5);
            context.drawImage(this.imagebonus0, this.x + 60, this.y + this.spriteHeight * this.game.scale * 1.1, this.spriteShapeBonusItems[firstItem][0] * this.game.scale / 1.5, this.spriteShapeBonusItems[firstItem][1] * this.game.scale / 1.5);
        }

        // Draw second bonus item
        if (this.noBonusItems[firstItem + 1]) {
            let yOffset = (this.noBonusItems[firstItem] > 0) ? 1.1 : 0;
            let y = this.y + yOffset * this.spriteHeight * this.game.scale * 1.1 + this.spriteHeight * this.game.scale * 1.1;
            context.fillText(`x ${this.noBonusItems[firstItem + 1]}`, this.x + 20, y + this.spriteShapeBonusItems[firstItem + 1][1] * this.game.scale / 1.5);
            context.drawImage(this.imagebonus1, this.x + 60, y, this.spriteShapeBonusItems[firstItem + 1][0] * this.game.scale / 1.5, this.spriteShapeBonusItems[firstItem + 1][1] * this.game.scale / 1.5);
        }

        // Draw third bonus item
        if (this.noBonusItems[firstItem + 2]) {
            let yOffset0 = (this.noBonusItems[firstItem] > 0) ? 1.1 : 0;
            let yOffset1 = (this.noBonusItems[firstItem + 1] > 0) ? 2.2 : 0;
            let y = this.y + this.spriteHeight * this.game.scale * 1.1 + yOffset0 * this.spriteHeight * this.game.scale / 1.5 + yOffset1 * this.spriteHeight * this.game.scale / 1.5;
            context.fillText(`x ${this.noBonusItems[firstItem + 2]}`, this.x + 20, y + this.spriteShapeBonusItems[firstItem + 2][1] * this.game.scale / 1.5);
            context.drawImage(this.imagebonus2, this.x + 60, y, this.spriteShapeBonusItems[firstItem + 2][0] * this.game.scale / 1.5, this.spriteShapeBonusItems[firstItem + 2][1] * this.game.scale / 1.5);
        }
    }
    updateResult(word) {
        if (word.markedForDeletion === 2) {
            this.game.listWordCollect.push(JSON.parse(JSON.stringify(word.word)));
            if (word.typeItem > 0 && word.typeItem <= 6) {
                this.noBonusItems[word.typeItem - 1] += 1;
            }
            else {
                if (this.noItems < this.maxItems) {
                    this.noItems++;
                }
            }
            if (this.game.listWordCollect.length === 12) {
                this.game.updateGameState(2) //Win
            }
        }
        else if (word.markedForDeletion === 1) {
            this.noItems--;
            if (this.noItems < 1) {
                this.game.updateGameState(0) //Loss
            }
        }
    }
}

class Button {
    constructor(game, currentBoard, image, spriteWidth, spriteHeight, type) {
        this.game = game;
        this.currentBoard = currentBoard;
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.type = type;
        this.x = null;
        this.y = null;
        if (this.currentBoard.type === 'board-stop-game') {
            if (type === 'continue') {
                this.x = (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else if (type === "replay") {
                this.x = this.currentBoard.width / 3 + (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else {
                this.x = this.currentBoard.width * 2 / 3 + (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
        }
        else {
            if (this.type === 'end_collect_play') {
                this.x = (this.currentBoard.width - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else {
                if (this.type === 'replay') {
                    this.x = (this.currentBoard.width / 2 - this.currentBoard.widthBtn) / 2;
                    this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
                }
                else if (this.type === 'back') {
                    this.x = this.currentBoard.width / 2 + (this.currentBoard.width / 2 - this.currentBoard.widthBtn) / 2;
                    this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
                }
            }
        }
        this.width = this.currentBoard.widthBtn;
        this.height = this.currentBoard.heightBtn;
    }
    updatePosition() {
        if (this.currentBoard.type === 'board-stop-game') {
            if (this.type === 'continue') {
                this.x = (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else if (this.type === "replay") {
                this.x = this.currentBoard.width / 3 + (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else {
                this.x = this.currentBoard.width * 2 / 3 + (this.currentBoard.width / 3 - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
        }
        else {
            if (this.type === 'end_collect_play') {
                this.x = (this.currentBoard.width - this.currentBoard.widthBtn) / 2;
                this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
            }
            else {
                if (this.type === 'replay') {
                    this.x = (this.currentBoard.width / 2 - this.currentBoard.widthBtn) / 2;
                    this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
                }
                else if (this.type === 'back') {
                    this.x = this.currentBoard.width / 2 + (this.currentBoard.width / 2 - this.currentBoard.widthBtn) / 2;
                    this.y = this.currentBoard.height - this.currentBoard.heightBtn * 1.5;
                }
            }
        }
        this.width = this.currentBoard.widthBtn;
        this.height = this.currentBoard.heightBtn;
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
            this.currentBoard.widthBtn,
            this.currentBoard.heightBtn
        );

    }
    writeText(context, text, font = "25px Arial", textAlign = 'center') {
        context.font = Math.floor(40 * this.game.scale) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "brown";
        context.fillText(text, this.x + this.currentBoard.widthBtn / 2, this.y + this.currentBoard.heightBtn / 1.5);
    }
    onClickButton(type) {
        if (type === 'replay') {
            window.location.reload();
        }
        else if (type === 'back') {
            window.location.href = '/level';
        }
        else if (type === 'continue') {
            this.game.updateGameState(3);
            this.game.boardStopGame.updateState(!this.game.boardStopGame.hidden);
        }
        else if (type === 'end_collect_play') {
            cancelAnimationFrame(this.animationHandleCountDown)
            this.game.updateResult()
        }
    }
}
class StaticUI {
    constructor(game, image, x, y, spriteWidth, spriteHeight) {
        this.image = new Image();
        this.image.src = image;
        this.game = game;
        this.x = x;
        this.y = y;
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
            this.spriteWidth * this.game.scale,
            this.spriteHeight * this.game.scale
        );
    }
}

export class BoardStopGame {
    constructor(game) {
        this.game = game;
        this.hidden = true;
        this.spriteWidthBoard = 908;
        this.spriteHeightBoard = 476;
        this.width = this.spriteWidthBoard * this.game.scale;
        this.height = this.spriteHeightBoard * this.game.scale;
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.spriteWidthButton = 437;
        this.spriteHeightButton = 129;
        this.widthBtn = this.width / 3.5;
        this.heightBtn = this.spriteHeightButton * this.game.scale / 1.5;
        this.type = 'board-stop-game';
        this.staticUI = {
            board: new StaticUI(
                game,
                './Asset/Board/board_4.png',
                0, 0,
                this.spriteWidthBoard, this.spriteHeightBoard
            )
        }
        this.text = {
            textTitleStop: new Text(
                game,
                this,
            )
        }
        this.buttons = {
            continue: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'continue'
            ),
            replay: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'replay'
            ),
            back: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'back'
            )
        }
    }
    updatePosition() {
        this.width = this.spriteWidthBoard * this.game.scale;
        this.height = this.spriteHeightBoard * this.game.scale;
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.widthBtn = this.width / 3.5;
        this.heightBtn = this.spriteHeightButton * this.game.scale / 1.5;
        this.buttons.back.updatePosition();
        this.buttons.continue.updatePosition();
        this.buttons.replay.updatePosition();
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
export class BoardEndWordCollect {
    constructor(game) {
        this.game = game;
        this.hidden = true;
        this.spriteWidthBoard = 908;
        this.spriteHeightBoard = 476;
        this.width = this.spriteWidthBoard * this.game.scale;
        this.height = this.spriteHeightBoard * this.game.scale;
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.spriteWidthButton = 437;
        this.spriteHeightButton = 129;
        this.widthBtn = this.width / 3;
        this.heightBtn = this.spriteHeightButton * this.game.scale / 1.5;
        this.countDown = 10;
        this.animationHandleCountDown = null;
        this.type = 'board-end-word-collect';
        this.staticUI = {
            board: new StaticUI(
                game,
                './Asset/Board/board_4.png',
                0, 0,
                this.spriteWidthBoard, this.spriteHeightBoard
            )
        }
        this.text = {
            textTitle: new Text(
                game,
                this
            ),
            countDown: new Text(
                game,
                this
            )
        }
        this.buttons = {
            replay: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'replay'
            ),
            back: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'back'
            ),
            play: new Button(
                this.game,
                this,
                './Asset/Button/btn_1.png',
                this.spriteWidthButton,
                this.spriteHeightButton,
                'end_collect_play'
            ),
        }
    }
    updatePosition() {
        this.width = this.spriteWidthBoard * this.game.scale;
        this.height = this.spriteHeightBoard * this.game.scale;
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.widthBtn = this.width / 3.5;
        this.heightBtn = this.spriteHeightButton * this.game.scale / 1.5;
        this.buttons.replay.updatePosition();
        this.buttons.back.updatePosition();
        this.buttons.play.updatePosition();
    }
    draw(context) {
        if (!this.hidden) {
            if (this.game.gameState == 'Win') {
                context.save();
                context.translate(this.translateX, this.translateY);
                this.staticUI.board.draw(context);
                this.buttons.play.draw(context);
                this.buttons.play.writeText(context, "Bắt đầu")
                this.text.textTitle.writeText(context, 'Vòng chơi nối từ bắt đầu sau:');
                this.text.countDown.writeText(context, `${this.countDown}`, "50px fontgame", 'center', 'brown', true);
                context.restore();
            }
            else if (this.game.gameState == 'Loss') {
                context.save();
                context.translate(this.translateX, this.translateY);
                this.staticUI.board.draw(context);
                this.buttons.replay.draw(context);
                this.buttons.replay.writeText(context, "Chơi lại")
                this.buttons.back.draw(context);
                this.buttons.back.writeText(context, "Trở về")
                this.text.textTitle.writeText(context, 'Bạn chưa vượt qua màn chơi này !');
                context.restore();
            }
        }
    }
    updateState(state) {
        this.hidden = state;
    }
    animateCountDown() {
        const self = this;
        let animationHandle = self.animationHandleCountDown;
        let frame = 0;
        self.countDown = 10;
        function animate() {
            frame++;
            if ((self.countDown > 0)) {
                if ((Math.floor(frame % 60) == 0))
                    self.countDown--;
                animationHandle = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(animationHandle);
                self.game.updateResult()
                // self.game.props.setTypegame('word-chain')
                // return;
            }
        }
        animate();
    }
}

export class BtnGameState {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 135;
        this.spriteHeight = 134;
        this.width = this.spriteWidth * this.game.scale / 1.3;
        this.height = this.spriteHeight * this.game.scale / 1.3;
        this.imagePause = new Image();
        this.imagePause.src = './Asset/Button/btn_7p.png';
        this.imageStart = new Image();
        this.imageStart.src = './Asset/Button/btn_7s.png';
        this.x = this.game.width - this.width * 1.2;
        this.y = this.height / 4;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale / 1.3;
        this.height = this.spriteHeight * this.game.scale / 1.3;
        this.x = this.game.width - this.width * 1.2;
        this.y = this.height / 4;
    }
    draw(context) {
        if (this.game.gameState === "Playing") {
            context.drawImage(this.imageStart, this.x, this.y, this.width, this.height);
        }
        else {
            context.drawImage(this.imagePause, this.x, this.y, this.width, this.height);
        }
    }
}

