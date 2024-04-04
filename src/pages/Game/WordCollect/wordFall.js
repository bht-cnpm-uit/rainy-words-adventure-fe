import { data } from "./fakeData";
class Item {
    constructor(game, image) {
        this.game = game
        this.spriteWidth = 304;
        this.spriteHeight = 304;
        this.x = Math.random() * (this.game.width - 2 * this.spriteWidth) + this.spriteWidth;
        this.y = -this.spriteHeight;
        this.vy = 0.1
        this.image = image;
        this.frameX = Math.floor(Math.random() * 5);
        this.frameY = Math.floor(Math.random() * 0);
        this.spinSpeed = Math.PI / 10000;
        this.angle = (Math.random() * 20 - 10) * Math.PI / 180;
        this.markedForDeletion = false;
        this.wordIndex = Math.floor(Math.random() * 40);
    }
    draw(context) {
        const spriteWidthThird = this.spriteWidth / 3;
        const spriteHeightThird = this.spriteHeight / 3;
        const spriteHeightEighthFive = this.spriteHeight / 8.5;

        const wordData = data[this.wordIndex];
        const word = wordData["word"];
        const vietnamese = wordData["vietnamese"];

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            -spriteWidthThird,
            -spriteHeightThird,
            this.spriteWidth / 1.5,
            this.spriteHeight / 1.5
        );

        // Set font size and style for both texts
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';

        // Draw English text
        context.fillText(word, 0, -spriteHeightThird / 2);

        // Adjust font size for Vietnamese text
        context.font = '15px Arial';

        // Draw Vietnamese text
        context.fillText(vietnamese, 0, -spriteHeightEighthFive);

        context.restore();
    }

    update(deltaTime) {
        this.angle += this.spinSpeed * deltaTime;
        if (this.angle > 10 * Math.PI / 180 || this.angle < -10 * Math.PI / 180) {
            this.spinSpeed *= -1;
        }
        this.y += this.vy * deltaTime;
        if (this.y > this.game.height) this.markedForDeletion = true;
    }
}

export class WordFall {
    constructor(game) {
        this.game = game;
        this.words = [];
        this.image = new Image();
        this.image.src = "../src/assets/Asset/GameObject/GameObject(5x12Atlas).png";
    }
    update(deltaTime) {
        this.words = this.words.filter(word => !word.markedForDeletion);
        this.words.forEach(word => word.update(deltaTime));
    }
    draw(context) {
        this.words.forEach(word => word.draw(context));
    }
    addNewItem() {
        this.words.push(new Item(this.game, this.image));
    }
}