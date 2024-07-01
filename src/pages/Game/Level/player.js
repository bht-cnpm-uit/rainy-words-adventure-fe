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

        this.vx0 = 30;

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
        else if (this.isJumping == 2) {
            ctx.translate(this.currentLevel.position.x - this.width / 3.5, this.currentLevel.position.y - this.height / 1.6)
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.imageJump,
                this.frameJumpX * this.spriteWidthJump, this.frameJumpY * this.spriteHeightJump,
                this.spriteWidthJump, this.spriteHeightJump,
                -this.widthJump / 2,
                -this.heightJump / 2,
                this.widthJump,
                this.heightJump
            );
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
            const direction = level.level > this.currentLevel.level ? 1 : -1;
            this.jump(level, direction);
        }
    }

    jump(nextLevel, direction) {
        const self = this;
        const g = 2;
        let animationHandle;
        let jumpTo
        if (direction == 1) {
            self.isJumping = 1;
            jumpTo = self.levels[self.currentLevel.level];
        }
        else {
            self.isJumping = 2;
            jumpTo = self.levels[self.currentLevel.level - 2];
        }
        let t = Math.abs(jumpTo.position.x - this.currentLevel.position.x) / (self.vx0);
        let vy0 = (jumpTo.position.y - this.currentLevel.position.y - 1 / 2 * g * t ** 2) / (t);
        let currentY = self.currentLevel.position.y
        let currentX = self.currentLevel.position.x;
        let distanceX = Math.abs(jumpTo.position.x - currentX);
        let distanceY = Math.abs(jumpTo.position.y - currentY);
        function animate(timeStamp) {
            let deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            deltaTime /= 1200;
            if (direction === 1 && self.currentLevel.position.x < jumpTo.position.x) {
                self.currentLevel.position.x += self.vx0 * deltaTime;
                self.currentLevel.position.y += vy0 * deltaTime + 1 / 2 * g * deltaTime ** 2;
                vy0 += g * deltaTime;
                animationHandle = requestAnimationFrame(animate);
            }
            else if (direction === -1 && self.currentLevel.position.x > jumpTo.position.x) {
                self.currentLevel.position.x += self.game.deltaTime * direction / 5;
                let dy = (Math.abs(distanceY) * Math.sin(((self.currentLevel.position.x - currentX) * Math.PI * 3 / (4 * distanceX))))
                self.currentLevel.position.y = currentY - dy;
                let dis = Math.abs(currentX - jumpTo.position.x);
                if (self.frameJumpX < 2) {
                    if (self.gameFrame % 2 == 0)
                        self.frameJumpX++;
                }
                else if (dis < 20 && self.gameFrame % 2 == 0) {
                    if (self.frameJumpX == 5) {
                        self.frameJumpX = 0;
                    }
                    else
                        self.frameJumpX++;
                }
                animationHandle = requestAnimationFrame(animate);
            }
            else if ((direction === 1 && jumpTo.level < nextLevel.level) || (direction === -1 && jumpTo.level > nextLevel.level)) {
                if (self.gameFrame % 20 == 0) {
                    if (direction === 1) {
                        self.currentLevel = JSON.parse(JSON.stringify(jumpTo));
                        jumpTo = JSON.parse(JSON.stringify(self.levels[self.currentLevel.level]));
                        currentY = self.currentLevel.position.y
                        currentX = self.currentLevel.position.x;
                        distanceX = jumpTo.position.x - currentX;
                        distanceY = jumpTo.position.y - currentY;
                    }
                    else {
                        self.currentLevel = JSON.parse(JSON.stringify(jumpTo));
                        jumpTo = JSON.parse(JSON.stringify(self.levels[self.currentLevel.level - 2]));
                        currentY = self.currentLevel.position.y
                        currentX = self.currentLevel.position.x;
                        distanceX = jumpTo.position.x - currentX;
                        distanceY = jumpTo.position.y - currentY;
                    }
                }
                animationHandle = requestAnimationFrame(animate);
            }
            else {
                self.currentLevel = JSON.parse(JSON.stringify(jumpTo));
                self.isJumping = null;
                cancelAnimationFrame(animationHandle);
                return;
            }
        }
        let lastTime = 0;
        animate(0);
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
