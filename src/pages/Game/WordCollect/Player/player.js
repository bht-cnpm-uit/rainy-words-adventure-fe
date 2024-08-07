import { GOLEFT, GORIGHT, STOP } from "./playerStates";

class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight')
                && (this.keys.indexOf(e.key) === -1)) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
}
export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.width = this.spriteWidth * this.game.scale / 2;
        this.height = this.spriteHeight * this.game.scale / 2;
        this.position = {
            x: this.game.width / 2,
            y: this.game.height - this.spriteHeight * this.game.scale / 4
        }
        this.velocity = 0;
        this.acceleration = 0.025;
        this.image = new Image();
        this.image.src = game.mode == 'light' ? '/Asset/Player/SunflowerCatWalk_light.png' : '/Asset/Player/SunflowerCatWalk_dark.png'
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.states = [new STOP(this), new GORIGHT(this), new GOLEFT(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.input = new InputHandler();
    }
    updatePositionPlayer() {
        this.position.x = this.position.x * this.game.scaleX;
        this.position.y = this.game.height - this.spriteHeight * this.game.scale / 4;
    }

    draw(ctx) {
        ctx.save();
        // Translate the canvas to the center of the object
        ctx.translate(this.position.x, this.position.y);

        if (this.velocity < 0) {
            ctx.scale(-1, 1); // Flip horizontally
        }

        // Draw the image
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            -this.spriteWidth * this.game.scale / 4,
            -this.spriteHeight * this.game.scale / 4,
            this.spriteWidth * this.game.scale / 2,
            this.spriteHeight * this.game.scale / 2
        );

        ctx.restore(); // Restore the canvas state

    }
    update(deltaTime, words) {
        this.gameFrame++;
        this.currentState.handleInput(this.input.keys);
        //collision detection
        words.forEach(word => {
            const dx = word.x - this.position.x;
            const dy = word.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < word.spriteWidth / 5 + this.width / 7) {
                word.stopAnimation();
                word.markedForDeletion = 2;
                this.game.bonusItems.updateResult(word);
                this.game.Score.update(word.word.levelVocab)
            }
        })
        this.position.x += this.velocity;
        if (this.input.keys.indexOf('ArrowRight') > -1) {
            this.velocity = Math.min(this.velocity + this.acceleration * deltaTime, 15);
            if (this.gameFrame % this.staggerFrames == 0) {
                if (this.frameX < 4)
                    this.frameX += 1
                else this.frameX = 0
            }
        } else if (this.input.keys.indexOf('ArrowLeft') > -1) {
            this.velocity = Math.max(this.velocity - this.acceleration * deltaTime, -15);
            if (this.gameFrame % this.staggerFrames == 0) {
                if (this.frameX < 4)
                    this.frameX += 1
                else this.frameX = 0
            }
        } else {
            this.velocity = 0;
            if (this.gameFrame % this.staggerFrames == 0) {
                if (this.frameX == 4) {
                    if (this.gameFrame % (this.staggerFrames * 20) == 0)
                        this.frameX = 0;
                }
                else
                    this.frameX++;
            }
        }
        if (this.position.x < 0) this.position.x = 0;
        else if (this.position.x > this.game.width) this.position.x = this.game.width;
    }
    setState(state) {
        if (this.currentState !== this.states[state]) {
            this.frameX = 0;
        }
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}