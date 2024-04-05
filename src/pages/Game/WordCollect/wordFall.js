import { data } from "./fakeData";
class Item {
    constructor(game, image) {
        this.game = game
        this.spriteWidth = 304;
        this.spriteHeight = 304;
        this.scaleY = this.game.background.scaleY;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.x = Math.random() * (this.game.width - 2 * this.width) + this.width;
        this.y = -this.height;
        this.vy = 0.1
        this.image = image;
        this.frameX = Math.floor(Math.random() * 5);
        this.frameY = Math.floor(Math.random() * 0);
        this.spinSpeed = Math.PI / 10000;
        this.maxAngleSpin = 10 * Math.PI / 180;
        this.angle = (Math.random() * 20 - 10) * Math.PI / 180;
        this.markedForDeletion = false;
        this.wordIndex = Math.floor(Math.random() * 40);
    }
    draw(context) {
        const wordData = data[this.wordIndex];
        const word = wordData["word"];
        const vietnamese = wordData["vietnamese"];

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            -this.width / 3,
            -this.height / 3,
            this.width,
            this.height
        );

        // Set font size and style for both texts
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';

        // Draw English text
        context.fillText(word, this.width / 8, -this.height / 10);

        // Adjust font size for Vietnamese text
        context.font = '15px Arial';

        // Draw Vietnamese text
        context.fillText(vietnamese, this.width / 8, -this.height / 30);

        context.restore();
    }

    update(deltaTime) {
        if (this.angle + this.spinSpeed * deltaTime > this.maxAngleSpin || this.angle + this.spinSpeed * deltaTime < -this.maxAngleSpin) {
            this.spinSpeed = -this.spinSpeed;
        } else {
            this.angle += this.spinSpeed * deltaTime;
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
        this.image.src = "../assets/Asset/GameObject/GameObject(5x12Atlas).png";
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