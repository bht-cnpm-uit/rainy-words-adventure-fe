import { data } from "../WordCollect/fakeData";
class StaticUI {
    constructor(image, x, y, spriteWidth, spriteHeight, width, height) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = width;
        this.height = height;
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
class Button {
    constructor(wordChain, image, spriteWidth, spriteHeight, scaleY) {
        this.wordChain = wordChain;
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY / 1.5;
        this.height = this.spriteHeight * scaleY / 1.5;
        this.x = this.wordChain.staticUI.board.width / 2 - this.width / 2;
        this.y = this.wordChain.staticUI.board.height * 6 / 7 - this.height / 2;
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
    constructor(x, y, fontsize) {
        this.fontSize = fontsize;
        this.x = x;
        this.y = y;
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center', fillStyle = 'brown') {
        context.font = this.fontSize.toString() + "px Arial";
        context.textAlign = textAlign;
        context.fillStyle = fillStyle;
        context.fillText(text, this.x, this.y);
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
class Word {
    constructor(wordChain, text, offsetX, offsetY, spriteWidth, spriteHeight, scaleY, type) {
        this.wordChain = wordChain;
        this.imagePlay = new Image();
        this.imagePlay.src = type === 'EN' ? '../assets/Asset/WordMatchingButton (1)/0.png' : '../assets/Asset/WordMatchingButton (1)/1.png';
        this.imageCorrect = new Image();
        this.imageCorrect.src = type === 'EN' ? '../assets/Asset/WordMatchingButton (1)/4.png' : '../assets/Asset/WordMatchingButton (1)/5.png';
        this.imageWrong = new Image();
        this.imageWrong.src = type === 'EN' ? '../assets/Asset/WordMatchingButton (1)/2.png' : '../assets/Asset/WordMatchingButton (1)/3.png';
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY;
        this.height = this.spriteHeight * scaleY * 0.9;
        this.x = offsetX === 0 ? this.wordChain.staticUI.board.width / 2 - this.width / 3 - this.width : offsetX + this.width / 3;
        this.y = this.wordChain.staticUI.board.height * 1.5 / 7 + (this.wordChain.staticUI.board.height * 1 / 7) * offsetY + (this.wordChain.staticUI.board.height * 1 / 7 - this.height) / 2;
        this.fixedX = this.x;
        this.fixedY = this.y;
        this.isDragging = false;
        this.type = type;
        this.isMatching = null;
        this.isMatched = null;
        this.text = text;
        this.status = 'play';
    }
    stickyWord(word) {
        // this.x = offsetX === 0 ? this.wordChain.staticUI.board.width / 2 - this.width * 0.95 : offsetX - this.width * 0.03;
        const offsetX = this.type === 'EN' ? -this.width * 0.92 : this.width * 0.92;
        this.x = word.x + offsetX;
        this.y = word.y;
    }

    draw(context) {
        if (this.wordChain.game.gameState === "Checking") {
            let dx = Math.random() * 2;
            let dy = Math.random() * 2;
            context.drawImage(this.imagePlay, 0, 0, this.spriteWidth, this.spriteHeight, this.x + dx, this.y + dy, this.width, this.height);
        }
        else if (this.wordChain.game.gameState === "Checked") {
            if (this.status === 'correct') {
                context.drawImage(this.imageCorrect, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            }
            else {
                context.drawImage(this.imageWrong, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            }

        }
        else if (this.wordChain.game.gameState === "Playing") {
            context.drawImage(this.imagePlay, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
    returnPreviousPos() {
        this.x = this.fixedX;
        this.y = this.fixedY
    }
    convertPositionWords(word1, word2) {
        let tempFixedX = word1.fixedX;
        let tempFixedY = word1.fixedY;

        word1.fixedX = word2.fixedX;
        word1.fixedY = word2.fixedY;

        word2.fixedX = tempFixedX;
        word2.fixedY = tempFixedY;
    }
    processMouseUp() {
        if (this.type == 'EN') {
            if ((this.x >= this.fixedX + this.width / 2) && this.isMatching) {
                if (this.fixedY !== this.isMatching.fixedY) {
                    for (let i = 0; i < this.wordChain.EnglishWord.length; i++) {
                        let word = this.wordChain.EnglishWord[i];
                        if (word.fixedY === this.isMatching.fixedY) {
                            this.convertPositionWords(this, word);
                            word.x = word.fixedX;
                            word.y = word.fixedY;
                            // Copying values from 'word' to 'this'
                            this.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.95;
                            this.y = this.fixedY;
                            this.isMatching.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.03;;
                            this.isMatching.y = this.isMatching.fixedY;
                            break;
                        }
                    }
                }
                else {
                    this.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.95;
                    this.y = this.fixedY;
                    this.isMatching.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.03;;
                    this.isMatching.y = this.isMatching.fixedY;
                }
                // Updating state
                this.isMatched = this.isMatching;
                this.isMatching.isMatched = this;
                this.isMatching = null;
            }
            else {
                this.returnPreviousPos();
                if (this.isMatching) {
                    this.isMatching.returnPreviousPos();
                    this.isMatching = null;
                }
            }
        }
        else {
            if ((this.x <= this.fixedX - this.width / 2.5) && this.isMatching) {
                if (this.fixedY !== this.isMatching.fixedY) {
                    for (let i = 0; i < this.wordChain.VietNameseWord.length; i++) {
                        let word = this.wordChain.VietNameseWord[i];
                        if (word.fixedY === this.isMatching.fixedY) {
                            this.convertPositionWords(this, word);
                            word.x = word.fixedX;
                            word.y = word.fixedY;
                            // Copying values from 'word' to 'this'
                            this.isMatching.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.95;
                            this.isMatching.y = this.isMatching.fixedY;
                            this.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.03;;
                            this.y = this.fixedY;
                            break;
                        }
                    }
                }
                else {
                    this.isMatching.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.95;
                    this.isMatching.y = this.isMatching.fixedY;
                    this.x = this.wordChain.staticUI.board.width / 2 - this.width * 0.03;;
                    this.y = this.fixedY;
                }

                // Updating state
                this.isMatched = this.isMatching;
                this.isMatching.isMatched = this;
                this.isMatching = null;
            }
            else {
                this.returnPreviousPos();
                if (this.isMatching) {
                    this.isMatching.returnPreviousPos();
                    this.isMatching = null;
                }
            }
        }
    }
}
class Timer {
    constructor(game, x, y, radius) {
        this.game = game;
        this.scaleY = this.game.scaleY
        this.timer = 20;
        this.x = x;
        this.y = y;
        this.radius = radius * this.scaleY
        this.animationHandleTimer;
    }
    draw(context) {
        context.font = "40px Arial";
        context.textBaseline = "middle";
        context.strokeStyle = "brown"; // Set outline color to brown
        context.textAlign = "center";
        context.fillText(`${this.timer}`, this.x, this.y);
        context.fillStyle = "transparent"; // Set inside color to transparent
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill(); // Fill the circle (inside) with transparent color
        context.stroke(); // Stroke the outline of the circle with brown color
    }

    animateCount(timer) {
        const self = this;
        let frame = 1;
        self.timer = timer;
        function animate() {
            if (self.timer > 0 && self.game.game.gameState === "Playing") {
                if (frame % 60 == 0) {
                    self.timer--;
                }
                frame++;
                self.animationHandleTimer = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(self.animationHandleTimer);
                self.game.game.updateGameState(1);
                return;
            }
        }
        animate();
    }

}
export class BoardScoreChain {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidthScoreBoard = 693;
        this.spriteHeightScoreBoard = 843;
        this.widthScoreBoard = this.spriteWidthScoreBoard * this.scaleY / 2;
        this.heightScoreBoard = this.spriteHeightScoreBoard * this.scaleY / 2;
        this.staticUI = {
            scoreBoard: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_3.png',
                0, 0,
                this.spriteWidthScoreBoard,
                this.spriteHeightScoreBoard,
                this.widthScoreBoard, this.heightScoreBoard
            )
        }
        this.text = {
            scoreText: new Text(
                this.widthScoreBoard / 2,
                this.heightScoreBoard * 1 / 4 - 30,
                30
            ),
            slotText: new Text(
                this.widthScoreBoard / 2,
                this.heightScoreBoard * 2 / 4 - 30,
                30
            )
        }
        this.timer = new Timer(this, this.widthScoreBoard / 2, this.heightScoreBoard * 3 / 4, this.heightScoreBoard * 1 / 4)
    }
    draw(context) {
        context.save();
        this.staticUI.scoreBoard.draw(context);
        this.text.scoreText.writeText(context, `Điểm số: ${this.game.score}`)
        this.text.slotText.writeText(context, `Ván chơi: ${this.game.slot}/${this.game.maxSlot}`)
        this.timer.draw(context)
        context.restore();
    }
}
export class BoardWordChain {
    /*
    chia thành 7 phần => 
    title (1.5/7)
    button (1.5/7)
    4 từ nối (4/7)
    */
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidthBoard = 1441;
        this.spriteHeightBoard = 785;
        this.widthBoard = this.spriteWidthBoard * this.scaleY / 1.1;
        this.heightBoard = this.spriteHeightBoard * this.scaleY / 0.85
        this.translateX = this.game.width * 1 / 3;
        this.translateY = (this.game.height - this.heightBoard) / 2;
        this.timerPrepareNewGame = 5;
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_2.png',
                0,
                0,
                this.spriteWidthBoard,
                this.spriteHeightBoard,
                this.widthBoard, this.heightBoard
            ),
        }
        this.button = new Button(this,
            '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png',
            437, 129,
            this.scaleY)
        this.text = {
            textQuestion: new Text(
                this.staticUI.board.width / 2,
                80,
                20
            ),
            textButton: new Text(
                this.button.x + this.button.width / 2,
                this.button.y + this.button.height / 1.8,
                20
            ),
            textTimerPrepare: new Text(
                this.widthBoard / 2,
                this.heightBoard / 2,
                40
            )
        }
        this.EnglishWord = [];
        this.VietNameseWord = [];
        this.spriteWidthWord = 397;
        this.spriteHeightWord = 119;
        this.correctWords = {};
        this.createGame(0);
        this.animatePrepareNewGame();
        // this.timer.animateCount();
    }
    createGame(gameSlot) {
        this.correctWords = {}
        this.correctWords = this.game.listWords
            .slice(gameSlot * 4, gameSlot * 4 + 4)
            .map(item => ({
                en: item.word,
                vi: item.vietnamese,
                score: item.level
            }));
        let wordsEn = [...this.game.listWords.slice(gameSlot * 4, gameSlot * 4 + 4).map(item => item.word)];
        let wordsVi = [...this.game.listWords.slice(gameSlot * 4, gameSlot * 4 + 4).map(item => item.vietnamese)];
        wordsEn = shuffleArray(wordsEn);
        wordsVi = shuffleArray(wordsVi);
        this.EnglishWord = [];
        this.VietNameseWord = [];
        for (let i = 0; i < 4; i++) {
            this.EnglishWord.push(new Word(this, wordsEn[i], 0, i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'EN'));
            this.VietNameseWord.push(new Word(this, wordsVi[i], this.staticUI.board.width / 2, i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'VI'));
        }
    }
    checkResut() {
        this.animateCheck();
    }
    animateCheck() {
        const self = this;
        let animationHandle;
        let frame = 1;
        let timer = 0;
        function animate() {
            if (timer < 2) {
                if (frame % 60 == 0) {
                    timer++;
                }
                frame++;
                animationHandle = requestAnimationFrame(animate);
            }
            else if (timer < 8) {
                if (self.game.gameState === "Checking") {
                    self.EnglishWord.forEach(word => {
                        if (word.isMatched) {
                            let targetObject = { ...self.correctWords.find(item => item.en === word.text) };
                            if (targetObject.vi === word.isMatched.text) {
                                word.status = 'correct';
                                word.isMatched.status = 'correct';
                                self.game.score += targetObject.score
                            }
                            else {
                                let wordMatch = word.isMatched;
                                wordMatch.x = wordMatch.fixedX;
                                wordMatch.y = wordMatch.fixedY;
                                wordMatch.status = 'wrong'
                                word.status = 'wrong'
                                word.isMatched.isMatched = null;
                                word.isMatched = null;
                                word.x = word.fixedX;
                                word.y = word.fixedY
                            }
                        }
                    })
                }
                if (frame % 60 == 0) {
                    timer++;
                }
                frame++;
                self.game.updateGameState(2)
                animationHandle = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(animationHandle);
                self.game.updateSlotGame();
                return; // Stop the animation loop
            }
        }
        animate();
    }
    update() {

    }
    prepareNewGame() {
    }
    draw(context) {
        context.save();
        context.translate(this.translateX, this.translateY);
        this.staticUI.board.draw(context);
        this.text.textQuestion.writeText(context, "Hãy nối các từ dưới đây sao cho phù hợp với nghĩa");
        if (this.game.gameState === "Prepare-new-game") {
            this.text.textTimerPrepare.writeText(context, `${this.timerPrepareNewGame}`);
        }
        else {
            if (this.game.gameState === "Checking" || this.game.gameState === "Checked") {
                this.VietNameseWord.forEach(word => word.draw(context));
                this.EnglishWord.forEach(word => word.draw(context));
            }
            else {
                this.VietNameseWord.forEach(word => word.draw(context));
                this.EnglishWord.forEach(word => word.draw(context));
                this.button.draw(context)
                this.text.textButton.writeText(context, "Kiểm tra");
            }
        }
        context.restore();
    }
    animatePrepareNewGame() {
        const self = this;
        let animationHandle;
        let frame = 1;
        self.timerPrepareNewGame = 5;
        function animate() {
            if (self.timerPrepareNewGame > 0) {
                if (frame % 60 == 0) {
                    self.timerPrepareNewGame--;
                }
                frame++;
                animationHandle = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(animationHandle);
                self.game.updateGameState(0);
                self.game.boardScoreChain.timer.animateCount(20);
                return; // Stop the animation loop
            }
        }
        animate();
    }
}