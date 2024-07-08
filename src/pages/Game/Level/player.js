export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.width = this.spriteWidth * this.game.scale / 2;
        this.height = this.spriteHeight * this.game.scale / 2;
        this.spriteHeightJump = 780.5;
        this.spriteWidthJump = 702;
        this.widthJump = this.spriteWidthJump * this.game.scale / 2;
        this.heightJump = this.spriteHeightJump * this.game.scale / 2;
        this.levels = null;
        this.velocity = 0;
        this.image = new Image();
        this.imageJump = new Image();
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.maxCurrentLevel = 3;
        this.currentLevel = null;
        this.isJumping = null;
        this.frameJumpX = 0;
        this.frameJumpY = 0;

        // Load images
        this.image.onload = () => {
            this.imageJump.onload = () => {
                // Once images are loaded, set the initial position
                this.initialPositionPlayer(this.currentLevel);
            }
            this.imageJump.src = '../assets/Asset/Asset/SunflowerCatSprite(Jump).png';
        }
        this.image.src = '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png';
        this.animateStand()
    }
    updatePositionResize() {
        this.width = this.spriteWidth * this.game.scale / 2;
        this.height = this.spriteHeight * this.game.scale / 2;
        this.widthJump = this.spriteWidthJump * this.game.scale / 2;
        this.heightJump = this.spriteHeightJump * this.game.scale / 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(-this.game.background.xImageCut * this.game.scale, 0);
        if (this.isJumping == 1) {
            ctx.drawImage(this.imageJump,
                this.frameJumpX * this.spriteWidthJump, this.frameJumpY * this.spriteHeightJump,
                this.spriteWidthJump, this.spriteHeightJump,
                this.currentLevel.position.x - this.width / 3.5, this.currentLevel.position.y - this.height / 1.6,
                this.widthJump, this.heightJump);
        }
        else if (this.isJumping == -1) {
            ctx.save(); // Save the current state of the context

            // Translate to the position where you want to draw the image
            ctx.translate(this.currentLevel.position.x, this.currentLevel.position.y);

            // Invert the object by scaling horizontally by -1
            ctx.scale(-1, 1);

            // Translate back to draw the image correctly in the inverted context
            ctx.translate(-this.width / 3.5, -this.height / 1.6);

            // Draw the image
            ctx.drawImage(this.imageJump,
                this.frameJumpX * this.spriteWidthJump, this.frameJumpY * this.spriteHeightJump,
                this.spriteWidthJump, this.spriteHeightJump,
                -this.widthJump, 0, // Adjust the position after flipping
                this.widthJump, this.heightJump);

            ctx.restore(); // Restore the context to its original state
        }
        else {
            ctx.drawImage(this.image,
                this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight,
                this.currentLevel.position.x - this.width / 3.5, this.currentLevel.position.y - this.height / 1.6,
                this.width, this.height);
        }
        ctx.restore();
    }

    updateMaxCurrentLevel(lv) {
        this.maxCurrentLevel = lv;
    }

    initialPositionPlayer(level) {
        this.currentLevel = JSON.parse(JSON.stringify(level));
    }

    updatePosition(level) {
        if (level.level <= this.maxCurrentLevel) {
            this.jump(level);
        }
    }

    jump(nextLevel) {
        const self = this;
        const g = 5;
        let animationHandle;
        let jumpTo;

        function animate(timeStamp) {
            if (!self.lastTime) self.lastTime = timeStamp;
            let deltaTime = (timeStamp - self.lastTime) / 500;  // Convert to seconds
            self.lastTime = timeStamp;

            if (deltaTime > 1) deltaTime = 0;

            if (self.currentLevel.position.x * self.isJumping < jumpTo.position.x * self.isJumping) {
                self.currentLevel.position.x += self.vx0 * deltaTime;
                self.currentLevel.position.y += self.vy0 * deltaTime + 0.5 * g * deltaTime ** 2;
                self.vy0 += g * deltaTime;
                animationHandle = requestAnimationFrame(animate);
            } else {
                self.currentLevel = JSON.parse(JSON.stringify(jumpTo));
                self.isJumping = null;
                cancelAnimationFrame(animationHandle);

                // Pause for 1 second before the next jump
                setTimeout(() => {
                    self.processNextJump();
                }, 500);
            }
        }

        this.processNextJump = function () {
            if (self.currentLevel.level === nextLevel.level) {
                self.isJumping = null;
                cancelAnimationFrame(animationHandle);
                return;
            }

            if (nextLevel.level > self.currentLevel.level) {
                self.isJumping = 1;
                jumpTo = self.levels[self.currentLevel.level];
            } else {
                self.isJumping = -1;
                jumpTo = self.levels[self.currentLevel.level - 2];
            }
            let disX = Math.abs(jumpTo.position.x - self.currentLevel.position.x);
            let disY = Math.abs(jumpTo.position.y - self.currentLevel.position.y);
            self.vx0 = (disX > disY) ? 80 * self.isJumping : 20 * self.isJumping;
            let t = (jumpTo.position.x - self.currentLevel.position.x) / self.vx0;
            self.vy0 = (jumpTo.position.y - self.currentLevel.position.y - 0.5 * g * t ** 2) / t;
            self.lastTime = 0;
            animationHandle = requestAnimationFrame(animate);
        };

        self.processNextJump();
    }



    animateStand() {
        const self = this;
        let animationHandle;
        function animate() {
            if (true) {
                self.gameFrame++;
                if (self.gameFrame % self.staggerFrames === 0) {
                    if (self.frameX === 4) {
                        if (self.gameFrame % (self.staggerFrames * 20) === 0) {
                            self.frameX = 0;
                        }
                    }
                    else {
                        self.frameX++;
                    }
                }
                animationHandle = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationHandle);
                return;
            }
        }
        animate();
    }

}
