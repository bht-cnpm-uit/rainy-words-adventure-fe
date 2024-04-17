
class Text {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center', fillStyle = 'brown') {
        context.font = font;
        context.textAlign = textAlign;
        context.fillStyle = fillStyle;
        context.fillText(text, this.x, this.y);
    }
}

export class Score extends Text {
    constructor(game) {
        super(game.width / 2, game.height / 12);
        this.game = game;
        this.score = 0;
    }

    draw(context) {
        super.writeText(context, this.score, "60px fontgame", "center");
    }
    update(score) {
        this.score += score;
    }
}

export class BonusItems {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.x = 10;
        this.y = 10;
        this.maxItems = 3;
        this.noItems = 3;
        this.image = new Image();
        this.image.src = "../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_11.png";
        this.spriteWidth0 = 192;
        this.spriteHeight0 = 112;
        this.width0 = this.spriteWidth0 * this.scaleY / 1.5;
        this.height0 = this.spriteHeight0 * this.scaleY / 1.5;
        this.noItems0 = 0;
        this.imagebonus0 = new Image();
        this.imagebonus0.src = '../assets/Asset/Asset/bonusItem/0.png';
        this.spriteWidth1 = 171;
        this.spriteHeight1 = 84;
        this.width1 = this.spriteWidth1 * this.scaleY / 1.5;
        this.height1 = this.spriteHeight1 * this.scaleY / 1.5;
        this.noItems1 = 0;
        this.imagebonus1 = new Image();
        this.imagebonus1.src = '../assets/Asset/Asset/bonusItem/1.png';
        this.spriteWidth2 = 136;
        this.spriteHeight2 = 94;
        this.width2 = this.spriteWidth2 * this.scaleY / 1.5;
        this.height2 = this.spriteHeight2 * this.scaleY / 1.5;
        this.noItems2 = 0;
        this.imagebonus2 = new Image();
        this.imagebonus2.src = '../assets/Asset/Asset/bonusItem/2.png';
    }
    update() {
    }

    draw(context) {
        for (let i = 0; i < this.noItems; i++) {
            context.drawImage(this.image, this.x + i * this.width, this.y, this.width, this.height);
        }
        context.font = "18px";
        if (this.noItems0) {
            context.fillText(`x ${this.noItems0}`, this.x + 20, this.y + this.height * 1.1 + this.height0);
            context.drawImage(this.imagebonus0, this.x + 60, this.y + this.height * 1.1, this.width0, this.height0);
        }
        if (this.noItems1) {
            let yOffset = (this.noItems0 > 0) ? 1.1 : 0;
            let y = this.y + yOffset * this.height0 + this.height * 1.1;
            context.fillText(`x ${this.noItems1}`, this.x + 20, y + this.height1);
            context.drawImage(this.imagebonus1, this.x + 60, y, this.width1, this.height1);
        }
        if (this.noItems2) {
            let yOffset0 = (this.noItems0 > 0) ? 1.1 : 0;
            let yOffset1 = (this.noItems1 > 0) ? 1.1 : 0;
            let y = this.y + this.height * 1.1 + yOffset0 * this.height0 + yOffset1 * this.height1 * 1.1
            context.fillText(`x ${this.noItems2}`, this.x + 20, y + this.height2);
            context.drawImage(this.imagebonus2, this.x + 60, y, this.width2, this.height2);
        }
    }

    updateResult(word) {
        if (word.isTrueWord) {
            this.game.listWordCollect.push(JSON.parse(JSON.stringify(word.word)));
            if (word.typeItem == 0) {
                this.noItems0++;
            }
            else if (word.typeItem == 1) {
                this.noItems2++;
            }
            else if (word.typeItem == 2) {
                this.noItems1++;
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
        else {
            this.noItems--;
            if (this.noItems < 1) {
                this.game.updateGameState(0) //Loss
            }
        }
    }
}

class Button {
    constructor(game, image, x, y, width, height, spriteWidth, spriteHeight, type) {
        this.image = new Image();
        this.game = game;
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.type = type
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
            this.game.btnGameState.setState(!this.game.btnGameState.currentState)
        }
        else if (type === 'end_collect_play') {
            cancelAnimationFrame(this.animationHandleCountDown)
            this.game.updateResult()
            this.game.props.settypegame('word-chain')
        }
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
        this.scaleY = this.game.background.scaleY;
        this.hidden = true;
        this.spriteWidthBoard = 908;
        this.spriteHeightBoard = 476;
        this.width = this.spriteWidthBoard * this.scaleY / 1.2;
        this.height = this.spriteHeightBoard * this.scaleY / 1.2
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.spriteWidthButton = 437;
        this.spriteHeightButton = 129;
        this.widthBtn = this.spriteWidthButton * this.scaleY / 1.95;
        this.heightBtn = this.spriteHeightButton * this.scaleY / 1.5;
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_1.png',
                0, 0, this.width, this.height,
                this.spriteWidthBoard, this.spriteHeightBoard
            )
        }
        this.text = {
            textTitleStop: new Text(
                this.width / 2,
                this.height / 2.2
            )
        }
        this.buttons = {
            continue: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                (this.width / 3 - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'continue'
            ),
            replay: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.width / 3 + (this.width / 3 - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'replay'
            ),
            back: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.width * 2 / 3 + (this.width / 3 - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'back'
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
export class BoardEndWordCollect {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.hidden = true;
        this.spriteWidthBoard = 908;
        this.spriteHeightBoard = 476;
        this.width = this.spriteWidthBoard * this.scaleY / 1.2;
        this.height = this.spriteHeightBoard * this.scaleY / 1.2
        this.translateX = (this.game.width - this.width) / 2;
        this.translateY = (this.game.height - this.height) / 2;
        this.spriteWidthButton = 437;
        this.spriteHeightButton = 129;
        this.widthBtn = this.spriteWidthButton * this.scaleY / 1.95;
        this.heightBtn = this.spriteHeightButton * this.scaleY / 1.5;
        this.countDown = 10;
        this.animationHandleCountDown;
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_1.png',
                0, 0, this.width, this.height,
                this.spriteWidthBoard, this.spriteHeightBoard
            )
        }
        this.text = {
            textTitle: new Text(
                this.width / 2,
                this.height / 2.2
            ),
            countDown: new Text(
                this.width / 2,
                this.height / 1.6
            )
        }
        this.buttons = {
            replay: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                (this.width / 2 - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'replay'
            ),
            back: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                this.width / 2 + (this.width / 2 - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'back'
            ),
            play: new Button(
                this.game,
                '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
                (this.width - this.widthBtn) / 2,
                this.height - this.heightBtn * 1.5,
                this.widthBtn,
                this.heightBtn,
                this.spriteWidthButton,
                this.spriteHeightButton,
                'end_collect_play'
            ),
        }
    }
    update() {

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
                this.text.countDown.writeText(context, `${this.countDown}`, "50px fontgame");
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
                self.game.props.settypegame('word-chain')
                return;
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
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.imagePause = new Image();
        this.imagePause.src = '../assets/Asset/Asset/btn_pause.png';
        this.imageStart = new Image();
        this.imageStart.src = '../assets/Asset/Asset/btn_start.png';
        this.x = this.game.width - this.spriteWidth / 1.5;
        this.y = this.spriteHeight / 4;
    }
    draw(context) {
        if (this.game.gameState === "Playing") {
            context.drawImage(this.imageStart, this.x, this.y, this.spriteWidth / 2, this.spriteHeight / 2);
        }
        else {
            context.drawImage(this.imagePause, this.x, this.y, this.spriteWidth / 2, this.spriteHeight / 2);
        }
    }
}

