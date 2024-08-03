class Item {
    constructor(game, currentWordFall, image, word) {
        this.game = game
        this.currentWordFall = currentWordFall
        this.spriteWidth = 304;
        this.spriteHeight = 304;
        this.x = Math.random() * (this.game.width - 2 * this.spriteWidth * this.game.scale) + this.spriteWidth * this.game.scale;
        this.y = -this.spriteHeight * this.game.scale;
        this.vy = this.game.diffLevel * 0.05 + 0.1
        this.vx = 0.04 * (Math.random() * 2 - 1);
        this.image = image;
        this.spinSpeed = Math.PI / 10000;
        this.maxAngleSpin = 10 * Math.PI / 180;
        this.angle = (Math.random() * 20 - 10) * Math.PI / 180;
        this.markedForDeletion = 0;
        this.word = word
        this.setFrameXY(this.game.listBonusItem[0]); // Random bonus item
        this.animateHandle = null;
        this.animateFall();
    }
    updatePositionItem() {
        this.x = this.x * this.game.scaleX;
        this.y = this.y * this.game.scaleY;
    }
    setFrameXY(itemId) {
        let rand = Math.random();
        if (itemId === 1) {
            if (rand < 0.1) {
                // 10% probability for frameX in range(0,5) and frameY = 1
                this.frameX = Math.floor(Math.random() * 5);
                this.frameY = 1;
                this.typeItem = -1;
            } else if (rand < 0.6) {
                // 70% probability for frameX in range(0,5) and frameY = 0
                this.frameX = Math.floor(Math.random() * 5);
                this.frameY = 0;
                this.typeItem = 1;
            } else if (rand < 0.9) {
                // 15% probability for frameX in range(6,11) and frameY = 0
                this.frameX = Math.floor(Math.random() * 5) + 6;
                this.frameY = 0;
                this.typeItem = 3;
            } else {
                // 5% probability for frameX in range(6,11) and frameY = 1
                this.frameX = Math.floor(Math.random() * 5) + 6;
                this.frameY = 1;
                this.typeItem = 2;
            }
        }
        else {
            if (rand < 0) {
                // 10% probability for frameX in range(0,5) and frameY = 1
                this.frameX = Math.floor(Math.random() * 5);
                this.frameY = 1;
                this.typeItem = -1;
            } else if (rand < 0.8) {
                // 70% probability for frameX in range(0,5) and frameY = 0
                this.frameX = Math.floor(Math.random() * 5);
                this.frameY = 0;
                this.typeItem = 4;
            } else if (rand < 0.9) {
                // 15% probability for frameX in range(6,11) and frameY = 0
                this.frameX = Math.floor(Math.random() * 5) + 6;
                this.frameY = 1;
                this.typeItem = 5;
            } else {
                // 5% probability for frameX in range(6,11) and frameY = 1
                this.frameX = Math.floor(Math.random() * 5) + 6;
                this.frameY = 2;
                this.typeItem = 6;
            }
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
        context.fillText(this.word["vocab"], this.spriteWidth * this.game.scale / 8, -this.spriteHeight * this.game.scale / 10);

        // Adjust font size for Vietnamese text
        context.font = '15px Arial';

        // Draw Vietnamese text
        context.fillText(this.word["vietnamese"], this.spriteWidth * this.game.scale / 8, -this.spriteHeight * this.game.scale / 30);

        context.restore();
    }
    animateFall() {
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
                self.animateHandle = requestAnimationFrame(animate);
            } else {
                self.markedForDeletion = 1;
                self.game.bonusItems.updateResult(self);
                cancelAnimationFrame(self.animateHandle);
                return;
            }
        }
        animate();
    }
    stopAnimation() {
        if (this.animateHandle) {
            cancelAnimationFrame(this.animateHandle);
        }
    }
}


export class WordFall {
    constructor(game) {
        this.game = game;
        this.words = [];
        this.image = new Image();
        this.image.src = game.listBonusItem[0] === 1 ? "/Asset/Item/item_13.png" : "/Asset/Item/item_46.png";
        this.listWords = this.game.props.listwordcollect;
    }
    updatePositionItems() {
        this.words.forEach(word => word.updatePositionItem())
    }
    update() {
        this.words = this.words.filter((word) => {
            if (word.markedForDeletion === 1) {
                this.listWords.push(word.word);
                return false;
            } else if (word.markedForDeletion === 2) {
                return false;
            } else {
                return true;
            }
        });
    }
    draw(context) {
        this.words.forEach(word => word.draw(context));
    }
    addNewItem() {
        if (this.listWords.length) {
            let word = this.listWords.shift()
            this.words.push(new Item(this.game, this, this.image, word));
        }
    }
}