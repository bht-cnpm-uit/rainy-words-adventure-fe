import { data } from "../WordCollect/fakeData";
class StaticUI {
    constructor(image, x, y, spriteWidth, spriteHeight, scaleY) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY;
        this.height = this.spriteHeight * scaleY;
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
    constructor(x, y, fontsize) {
        this.fontSize = fontsize;
        this.x = x;
        this.y = y;
    }
    writeText(context, text, font = "30px Arial", textAlign = 'center', fillStyle = 'white') {
        context.font = this.fontSize.toString() + "px Arial";
        context.textAlign = textAlign;
        context.fillStyle = fillStyle;
        context.fillText(text, this.x, this.y);
    }
}
class Word {
    constructor(wordChain, text, x, y, spriteWidth, spriteHeight, scaleY, type, index) {
        this.wordChain = wordChain;
        this.x = x;
        this.y = y;
        this.fixedX = x;
        this.fixedY = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY;
        this.height = this.spriteHeight * scaleY;
        this.isDragging = false;
        this.type = type;
        this.isMatching = null;
        this.isMatched = null;
        this.index = index;
        this.text = text;
        this.image = new Image();
        this.image.src = type === 'EN' ? '../assets/Asset/WordMatchingButton (1)/0.png' : '../assets/Asset/WordMatchingButton (1)/1.png';
    }
    stickyWord(word) {
        const offsetX = this.type === 'EN' ? -1 : 1;
        this.x = word.x + offsetX * (this.width - 20);
        this.y = word.y;
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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
                            this.x = this.fixedX + this.width / 2;
                            this.y = this.fixedY;
                            this.isMatching.x = this.isMatching.fixedX - this.width / 2.5;
                            this.isMatching.y = this.isMatching.fixedY;
                            break;
                        }
                    }
                }
                else {
                    this.x = this.fixedX + this.width / 2;
                    this.y = this.fixedY;
                    this.isMatching.x = this.isMatching.fixedX - this.width / 2.5;
                    this.isMatching.y = this.isMatching.fixedY;
                }
                console.log("UPDATING STATE")
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
                            this.isMatching.x = this.isMatching.fixedX + this.width / 2;
                            this.isMatching.y = this.isMatching.fixedY;
                            this.x = this.fixedX - this.width / 2.5;
                            this.y = this.fixedY;
                            break;
                        }
                    }
                }
                else {
                    this.isMatching.x = this.isMatching.fixedX + this.width / 2;
                    this.isMatching.y = this.isMatching.fixedY;
                    this.x = this.fixedX - this.width / 2.5;
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
export class BoardWordChain {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidthBoard = 1441;
        this.spriteHeightBoard = 785;
        this.staticUI = {
            board: new StaticUI(
                '../assets/Asset/PanelAtlas_cuts/image_2.png',
                0,
                0,
                this.spriteWidthBoard,
                this.spriteHeightBoard,
                this.scaleY
            )
        }
        this.translateX = (this.game.width - this.staticUI.board.width) / 2;
        this.translateY = (this.game.height - this.staticUI.board.height) / 2;
        this.text = {
            textQuestion: new Text(
                this.staticUI.board.width / 2,
                80,
                20
            )
        }
        this.EnglishWord = []
        this.VietNameseWord = []
        this.spriteWidthWord = 397;
        this.spriteHeightWord = 119;
        this.createGame();
    }
    createGame() {
        for (let i = 0; i < 4; i++) {
            this.EnglishWord.push(new Word(this, data[i]["word"], this.spriteWidthWord * this.scaleY / 2, this.spriteHeightWord / 4 + this.spriteHeightWord * i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'EN', i));
            this.VietNameseWord.push(new Word(this, data[i]["vietnamese"], this.spriteWidthBoard * this.scaleY / 2 + this.spriteWidthWord * this.scaleY / 2, this.spriteHeightWord / 4 + this.spriteHeightWord * i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'VI', i));
        }
    }
    update() { }
    draw(context) {
        context.save();
        context.translate(this.translateX, this.translateY);
        this.staticUI.board.draw(context);
        this.text.textQuestion.writeText(context, "Hãy nối các từ dưới đây sao cho phù hợp với nghĩa");
        this.VietNameseWord.forEach(word => word.draw(context));
        this.EnglishWord.forEach(word => word.draw(context));
        context.restore();
    }
}