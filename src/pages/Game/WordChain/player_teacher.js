export class TeacherCat {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.spriteWidth = 883;
        this.spriteHeight = 611;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.frameX = 0;
        this.frameY = 0;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.image = new Image();
        this.image.src = '../assets/Asset/TeacherCatSprite(Blink).png';
        this.animateTeacher();
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.game.boardWordChain.translateX - this.width * 0.9, this.game.height - this.height, this.width, this.height);
    }

    animateTeacher() {
        const self = this;
        let animationHandle;
        let frame = 0;
        function animate() {
            frame++;
            if (self.game.gameState) {
                if (self.frameX == 1) {
                    if (frame % 50 == 0)
                        self.frameX++;
                } else if (self.frameX != 1 && self.frameX < 4) {
                    if (frame % 30 == 0)
                        self.frameX++;
                } else {
                    self.frameX = 0;
                }
                animationHandle = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationHandle);
                return; // Stop the animation loop
            }
        }
        animate();
    }

}