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
    constructor(text, x, y, spriteWidth, spriteHeight, scaleY) {
        this.imageleft = new Image();
        this.imageleft.src = '../assets/Asset/WordMatchingButton (1)/0.png';
        this.imageright = new Image();
        this.imageright.src = '../assets/Asset/WordMatchingButton (1)/1.png';
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth * scaleY;
        this.height = this.spriteHeight * scaleY;
        this.isDragging = false;
    }
    draw(context, type) {
        if (type == 'EN')
            context.drawImage(
                this.imageleft,
                0,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        else
            context.drawImage(
                this.imageright,
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
            this.EnglishWord.push(new Word(data[i]["word"], this.spriteWidthWord / 4, this.spriteHeightWord / 4 + this.spriteHeightWord * i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY));
            this.VietNameseWord.push(new Word(data[i]["vietnamese"], this.spriteWidthBoard * this.scaleY - this.spriteWidthWord, this.spriteHeightWord / 4 + this.spriteHeightWord * i, this.spriteWidthWord, this.spriteHeightWord, this.scaleY));
        }
    }
    update() { }
    draw(context) {
        context.save();
        context.translate(this.translateX, this.translateY);
        this.staticUI.board.draw(context);
        this.text.textQuestion.writeText(context, "Hãy nối các từ dưới đây sao cho phù hợp với nghĩa");
        this.VietNameseWord.forEach(word => word.draw(context, 'VI'));
        this.EnglishWord.forEach(word => word.draw(context, 'EN'));
        context.restore();
    }
}