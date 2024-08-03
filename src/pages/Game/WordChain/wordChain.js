class StaticUI {
    constructor(game, image, x, y, spriteWidth, spriteHeight, type = '') {
        this.game = game;
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.type = type;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
    }
    draw(context) {
        if (this.type === 'board-score-chain') {
            context.drawImage(
                this.image,
                0,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width * 0.5,
                this.height * 0.5
            );
        }
        else {
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
}
class Button {
    constructor(game, wordChain, image, spriteWidth, spriteHeight) {
        this.game = game;
        this.wordChain = wordChain;
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * this.game.scale / 1.5;
        this.height = this.spriteHeight * this.game.scale / 1.5;
        this.x = this.wordChain.staticUI.board.width / 2 - this.width / 2;
        this.y = this.wordChain.staticUI.board.height * 6 / 7 - this.height / 2;
    }
    updatePosition() {
        this.width = this.spriteWidth * this.game.scale / 1.5;
        this.height = this.spriteHeight * this.game.scale / 1.5;
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
        let fontsize = 40;
        context.font = Math.floor(fontsize * this.game.scale) + "px Arial";
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
    constructor(game, wordChain, text, offsetX, offsetY, spriteWidth, spriteHeight, type) {
        this.game = game;
        this.wordChain = wordChain;
        this.imagePlay = new Image();
        this.imagePlay.src = type === 'EN' ? '/Asset/WordMatchingButton/0.png' : '/Asset/WordMatchingButton/1.png';
        this.imageCorrect = new Image();
        this.imageCorrect.src = type === 'EN' ? '/Asset/WordMatchingButton/4.png' : '/Asset/WordMatchingButton/5.png';
        this.imageWrong = new Image();
        this.imageWrong.src = type === 'EN' ? '/Asset/WordMatchingButton/2.png' : '/Asset/WordMatchingButton/3.png';
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.scaleBoardX = 1;
        this.scaleBoardY = 1;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale * 0.8;
        this.offsetX = offsetX;
        this.offsetY = offsetY
        this.x = this.offsetX === 0 ? this.wordChain.staticUI.board.width / 2 - this.width / 3 - this.width : this.offsetX + this.width / 3;
        this.y = this.wordChain.staticUI.board.height * 1.5 / 7 + (this.wordChain.staticUI.board.height * 1 / 7) * this.offsetY + (this.wordChain.staticUI.board.height * 1 / 7 - this.height) / 2;
        this.fixedX = this.x;
        this.fixedY = this.y;
        this.isDragging = false;
        this.type = type;
        this.isMatching = null;
        this.isMatched = null;
        this.text = text;
        this.status = 'play';
    }
    updatePosition() {
        this.scaleBoardX = this.spriteWidth * this.game.scale / this.width;
        this.scaleBoardY = this.spriteHeight * this.game.scale * 0.8 / this.height;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale * 0.8;
        this.x = this.x * this.scaleBoardX;
        this.y = this.y * this.scaleBoardY;
        this.fixedX = this.x;
        this.fixedY = this.y;
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
        context.font = Math.floor(35 * this.game.scale) + "px Arial";
        context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 1.7);
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
    constructor(game, currentBoard) {
        this.game = game;
        this.currentBoard = currentBoard
        this.timer = 25 - game.diffLevel * 5;
        this.animationHandleTimer;
    }
    draw(context) {
        context.font = Math.floor(60 * this.game.scale) + "px Arial";
        context.textBaseline = "middle";
        context.textAlign = "center";

        // Draw the circle
        context.beginPath();
        context.arc(this.currentBoard.staticUI.scoreBoard.width / 4, this.currentBoard.staticUI.scoreBoard.height * 3 / 8, this.currentBoard.staticUI.scoreBoard.height * 1 / 10, 0, 2 * Math.PI);
        context.fillStyle = "transparent"; // Set inside color to transparent
        context.fill(); // Fill the circle (inside) with transparent color
        context.strokeStyle = "brown"; // Set outline color to brown
        context.stroke(); // Stroke the outline of the circle with brown color

        // Draw the text
        context.fillStyle = "brown"; // Set text color (adjust as needed)
        context.fillText(`${this.timer}`, this.currentBoard.staticUI.scoreBoard.width / 4, this.currentBoard.staticUI.scoreBoard.height * 3 / 8);

    }

    animateCount(timer) {
        const self = this;
        let frame = 1;
        self.timer = timer;
        function animate() {
            if (self.timer > 0 && self.game.gameState === "Playing") {
                if (frame % 60 == 0) {
                    self.timer--;
                }
                frame++;
                self.animationHandleTimer = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(self.animationHandleTimer);
                self.game.updateGameState(1);
                return;
            }
        }
        animate();
    }

}
export class BoardScoreChain {
    constructor(game) {
        this.game = game;
        this.spriteWidthScoreBoard = 693;
        this.spriteHeightScoreBoard = 843;
        this.staticUI = {
            scoreBoard: new StaticUI(
                game,
                '/Asset/Board/board_3.png',
                0, 0,
                this.spriteWidthScoreBoard,
                this.spriteHeightScoreBoard,
                "board-score-chain"
            )
        }
        this.timer = new Timer(this.game, this)
    }
    updatePosition() {
        this.staticUI.scoreBoard.updatePosition();
    }
    draw(context) {
        context.save();
        this.staticUI.scoreBoard.draw(context);
        context.font = Math.floor(40 * this.game.scale) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "brown";
        context.fillText(`Điểm số: ${this.game.score}`, this.staticUI.scoreBoard.width / 4, this.staticUI.scoreBoard.height * 1 / 8 - 30);
        context.fillText(`Ván chơi: ${this.game.slot}/${this.game.maxSlot}`, this.staticUI.scoreBoard.width / 4, this.staticUI.scoreBoard.height * 1 / 4 - 30);
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
        this.timerCountChain = 25 - game.diffLevel * 5;
        this.spriteWidthBoard = 1441;
        this.spriteHeightBoard = 785;
        this.widthBoard = this.spriteWidthBoard * this.game.scale / 1.1;
        this.heightBoard = this.spriteHeightBoard * this.game.scale / 0.85
        this.translateX = this.game.width * 1 / 3;
        this.translateY = (this.game.height - this.heightBoard) / 2;
        this.timerPrepareNewGame = 5;
        this.staticUI = {
            board: new StaticUI(
                this.game,
                '/Asset/Board/board_6.png',
                0,
                0,
                this.spriteWidthBoard, this.spriteHeightBoard
            ),
        }
        this.button = new Button(game, this,
            '/Asset/Button/btn_1.png',
            437, 129)
        this.EnglishWord = [];
        this.VietNameseWord = [];
        this.spriteWidthWord = 397;
        this.spriteHeightWord = 119;
        this.correctWords = {};
        this.createGame(0);
        this.animatePrepareNewGame();
        // this.timer.animateCount();
    }
    updatePosition() {
        this.widthBoard = this.spriteWidthBoard * this.game.scale / 1.1;
        this.heightBoard = this.spriteHeightBoard * this.game.scale / 0.85
        this.translateX = this.game.width * 1 / 3;
        this.translateY = (this.game.height - this.heightBoard) / 2;
        this.staticUI.board.updatePosition();
        this.button.updatePosition();
        this.EnglishWord.forEach(word => word.updatePosition());
        this.VietNameseWord.forEach(word => word.updatePosition());
    }
    createGame(gameSlot) {
        this.correctWords = {}
        this.correctWords = this.game.listWords
            .slice(gameSlot * 4, gameSlot * 4 + 4)
            .map(item => ({
                en: item.vocab,
                vi: item.vietnamese,
                score: item.levelVocab === 'Hard' ? 30 * (this.game.diffLevel * 0.5 + 1) : item.levelVocab === 'Medium' ? 20 * (this.game.diffLevel * 0.5 + 1) : 10 * (this.game.diffLevel * 0.5 + 1)
            }));
        let wordsEn = [...this.game.listWords.slice(gameSlot * 4, gameSlot * 4 + 4).map(item => item.vocab)];
        let wordsVi = [...this.game.listWords.slice(gameSlot * 4, gameSlot * 4 + 4).map(item => item.vietnamese)];
        wordsEn = shuffleArray(wordsEn);
        wordsVi = shuffleArray(wordsVi);
        this.EnglishWord = [];
        this.VietNameseWord = [];
        for (let i = 0; i < 4; i++) {
            this.EnglishWord.push(new Word(this.game, this, wordsEn[i], 0, i, this.spriteWidthWord, this.spriteHeightWord, 'EN'));
            this.VietNameseWord.push(new Word(this.game, this, wordsVi[i], this.staticUI.board.width / 2, i, this.spriteWidthWord, this.spriteHeightWord, 'VI'));
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
        context.fillText("", this.widthBoard / 2, this.heightBoard / 2)
        context.font = Math.floor(40 * this.game.scale) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "brown";
        context.fillText("Hãy nối các từ dưới đây sao cho phù hợp với nghĩa",
            this.staticUI.board.width / 2, this.staticUI.board.height * 1 / 8);

        if (this.game.gameState === "Prepare-new-game") {
            context.fillText(`${this.timerPrepareNewGame}`, this.widthBoard / 1.8, this.heightBoard / 2)
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
                this.button.writeText(context, "Kiểm tra");
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
                self.game.boardScoreChain.timer.animateCount(self.timerCountChain);
                return; // Stop the animation loop
            }
        }
        animate();
    }
}