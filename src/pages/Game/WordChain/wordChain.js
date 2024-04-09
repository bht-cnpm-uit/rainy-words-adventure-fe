import { data } from "../WordCollect/fakeData";
class StaticUI {
    constructor(image, x, y, spriteWidth, spriteHeight, scaleY) {
        this.image = new Image();
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY / 1.1;
        this.height = this.spriteHeight * scaleY / 0.85;
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
    onClick() {

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
    constructor(wordChain, text, offsetX, offsetY, spriteWidth, spriteHeight, scaleY, type) {
        this.wordChain = wordChain;
        this.image = new Image();
        this.image.src = type === 'EN' ? '../assets/Asset/WordMatchingButton (1)/0.png' : '../assets/Asset/WordMatchingButton (1)/1.png';
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
    }
    stickyWord(word) {
        // this.x = offsetX === 0 ? this.wordChain.staticUI.board.width / 2 - this.width * 0.95 : offsetX - this.width * 0.03;
        const offsetX = this.type === 'EN' ? -this.width * 0.92 : this.width * 0.92;
        this.x = word.x + offsetX;
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
        this.translateX = (this.game.width - this.staticUI.board.width) * 3 / 4;
        this.translateY = (this.game.height - this.staticUI.board.height) / 2;
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
            this.EnglishWord.push(new Word(this, data[i]["word"], 0, i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'EN'));
            this.VietNameseWord.push(new Word(this, data[i]["vietnamese"], this.staticUI.board.width / 2, i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY, 'VI'));
        }
    }
    update() { }
    draw(context) {
        context.save();
        context.translate(this.translateX, this.translateY);
        this.staticUI.board.draw(context);
        this.button.draw(context)
        this.text.textQuestion.writeText(context, "Hãy nối các từ dưới đây sao cho phù hợp với nghĩa");
        this.text.textButton.writeText(context, "Kiểm tra");
        this.VietNameseWord.forEach(word => word.draw(context));
        this.EnglishWord.forEach(word => word.draw(context));
        context.restore();
    }
}