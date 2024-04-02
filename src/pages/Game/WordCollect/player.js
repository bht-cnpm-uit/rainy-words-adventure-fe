import { GOLEFT, GORIGHT, STOP } from "./playerStates";

export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.width = this.spriteWidth / 3.5;
        this.height = this.spriteHeight / 3.5;
        this.position = {
            x: 100,
            y: this.game.height - this.height * 1.05
        }
        this.velocity = 0;
        this.image = new Image();
        this.image.src = 'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png';
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.states = [new STOP(this), new GORIGHT(this), new GOLEFT(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    draw(ctx) {
        ctx.save();

        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);

        if (this.velocity < 0) {
            ctx.scale(-1, 1); // Flip horizontally
        }
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
    }
    update(input, words) {
        this.gameFrame++;
        this.currentState.handleInput(input);
        //collision detection
        words.forEach(word => {
            const dx = word.x - this.position.x;
            const dy = word.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < word.spriteWidth / 2 + this.width / 2) {
                word.markedForDeletion = true;
                this.game.score += 10;
                this.game.bonusItems.addNewItem();
            }
        })
        this.position.x += this.velocity;
        if (input.indexOf('ArrowRight') > -1) {
            this.velocity = Math.min(this.velocity + 0.3, 15);
            if (this.gameFrame % this.staggerFrames == 0) {
                if (this.frameX < 4)
                    this.frameX += 1
                else this.frameX = 0
            }
        } else if (input.indexOf('ArrowLeft') > -1) {
            this.velocity = Math.max(this.velocity - 0.3, -15);
            if (this.gameFrame % this.staggerFrames == 0) {
                if (this.frameX < 4)
                    this.frameX += 1
                else this.frameX = 0
            }
        } else {
            this.velocity = 0;
            if (this.gameFrame % (this.staggerFrames) == 0) {
                if (this.frameX == 4) {
                    if (this.gameFrame % (this.staggerFrames * 20) == 0)
                        this.frameX = 0;
                }
                else
                    this.frameX++;
            }
        }
        // horizontal movement
        if (this.position.x < 0) this.position.x = 0;
        else if (this.position.x > this.game.width - this.width) this.position.x = this.game.width - this.width;
    }
    setState(state) {
        if (this.currentState !== this.states[state]) {
            this.frameX = 0;
        }
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}