import { data } from "./fakeData";
class Item {
    constructor(game, image) {
        this.game = game
        this.spriteWidth = 304;
        this.spriteHeight = 304;
        this.x = Math.random() * (this.game.width - 2 * this.spriteWidth * this.game.scale) + this.spriteWidth * this.game.scale;
        this.y = -this.spriteHeight * this.game.scale;
        this.vy = 0.1;
        this.vx = 0.04 * (Math.random() * 2 - 1);
        this.image = image;
        this.spinSpeed = Math.PI / 10000;
        this.maxAngleSpin = 10 * Math.PI / 180;
        this.angle = (Math.random() * 20 - 10) * Math.PI / 180;
        this.markedForDeletion = false;
        this.word = data[Math.floor(Math.random() * data.length)]
        this.isTrueWord = true;
        // this.setWord();
        this.setFrameXY(); // Random bonus item
        this.animateFall();
    }
    updatePositionItem() {
        this.x = this.x * this.game.scaleX;
        this.y = this.y * this.game.scaleY;
    }
    // setWord() {
    // let rand = Math.random();
    // let wordIndex = Math.floor(Math.random() * data.length);
    // if (rand > 0.5) {
    //     this.isTrueWord = true;
    //     this.word = data[wordIndex];
    // }
    // else {
    //     this.isTrueWord = false;
    //     this.word = JSON.parse(JSON.stringify(data[wordIndex]));
    //     let vietnameseIndex = (wordIndex + Math.ceil(Math.random() * (data.length - wordIndex - 1)));
    //     this.word["vietnamese"] = data[vietnameseIndex]["vietnamese"];
    // }
    // }
    setFrameXY() {
        let rand = Math.random();
        if (rand < 0.05) {
            // 10% probability for frameX in range(0,5) and frameY = 1
            this.frameX = Math.floor(Math.random() * 5);
            this.frameY = 1;
            this.typeItem = -1;
        } else if (rand < 0.8) {
            // 70% probability for frameX in range(0,5) and frameY = 0
            this.frameX = Math.floor(Math.random() * 5);
            this.frameY = 0;
            this.typeItem = 0;
        } else if (rand < 0.95) {
            // 15% probability for frameX in range(6,11) and frameY = 0
            this.frameX = Math.floor(Math.random() * 5) + 6;
            this.frameY = 0;
            this.typeItem = 1;
        } else {
            // 5% probability for frameX in range(6,11) and frameY = 1
            this.frameX = Math.floor(Math.random() * 5) + 6;
            this.frameY = 1;
            this.typeItem = 2;
        }
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            -this.spriteWidth * this.game.scale / 3,
            -this.spriteHeight * this.game.scale / 3,
            this.spriteWidth * this.game.scale,
            this.spriteHeight * this.game.scale
        );

        // Set font size and style for both texts
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';

        // Draw English text
        context.fillText(this.word["word"], this.spriteWidth * this.game.scale / 8, -this.spriteHeight * this.game.scale / 10);

        // Adjust font size for Vietnamese text
        context.font = '15px Arial';

        // Draw Vietnamese text
        context.fillText(this.word["vietnamese"], this.spriteWidth * this.game.scale / 8, -this.spriteHeight * this.game.scale / 30);

        context.restore();
    }

    // update(deltaTime) {
    //     if (this.angle + this.spinSpeed * deltaTime > this.maxAngleSpin || this.angle + this.spinSpeed * deltaTime < -this.maxAngleSpin) {
    //         this.spinSpeed = -this.spinSpeed;
    //     } else {
    //         this.angle += this.spinSpeed * deltaTime;
    //     }
    //     this.y += this.vy * deltaTime;
    //     if (this.y > this.game.height) this.markedForDeletion = true;
    // }
    animateFall() {
        let animateHandle;
        let self = this;
        function animate() {
            if (self.y < self.game.height) {
                if (self.game.gameState === 'Playing') {
                    if (self.angle + self.spinSpeed * self.game.deltaTime > self.maxAngleSpin || self.angle + self.spinSpeed * self.game.deltaTime < -self.maxAngleSpin) {
                        self.spinSpeed = -self.spinSpeed;
                    } else {
                        self.angle += self.spinSpeed * self.game.deltaTime;
                    }
                    self.y += self.vy * self.game.deltaTime;
                    self.x += self.vx * self.game.deltaTime;
                    if (self.x < 0 || self.x > self.game.width) {
                        self.vx = -self.vx;
                    }
                }
                animateHandle = requestAnimationFrame(animate);
            } else {
                self.markedForDeletion = true;
                cancelAnimationFrame(animateHandle)
                return;
            }
        }
        animate();
    }
}


export class WordFall {
    constructor(game) {
        this.game = game;
        this.words = [];
        this.image = new Image();
        this.image.src = "../assets/Asset/GameObject/GameObject(5x12Atlas).png";
    }
    updatePositionItems() {
        this.words.forEach(word => word.updatePositionItem())
    }
    update() {
        this.words = this.words.filter(word => !word.markedForDeletion);
    }
    draw(context) {
        this.words.forEach(word => word.draw(context));
    }
    addNewItem() {
        this.words.push(new Item(this.game, this.image));
    }
}