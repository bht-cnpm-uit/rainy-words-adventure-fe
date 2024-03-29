export class Player {
    constructor(game) {
        this.game = game;
        this.width = 150;
        this.height = 150;
        this.position = {
            x: 100,
            y: this.game.height - this.height * 1.5
        }
        this.velocity = 0;
    }
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(input, words) {
        //collision detection
        words.forEach(word => {
            const dx = word.x - this.position.x;
            const dy = word.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < word.spriteWidth / 2 + this.width / 2) {
                word.markedForDeletion = true;
                this.game.score += 10;
            }
        })
        this.position.x += this.velocity;
        if (input.keys.indexOf('ArrowRight') > -1) {
            this.velocity = Math.min(this.velocity + 0.3, 15);
        } else if (input.keys.indexOf('ArrowLeft') > -1) {
            this.velocity = Math.max(this.velocity - 0.3, -15);
        } else {
            this.velocity = 0;
        }
        // horizontal movement
        if (this.position.x < 0) this.position.x = 0;
        else if (this.position.x > this.game.width - this.width) this.position.x = this.game.width - this.width;

    }
}