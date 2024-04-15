export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.spriteHeightJump = 780.5;
        this.spriteWidthJump = 702;
        this.width = 109;
        this.height = 134;
        this.scaleY = this.game.background.scaleY;
        this.levels = null;
        this.position = {
            x: null,
            y: null
        }
        this.velocity = 0;
        this.image = new Image();
        this.imageJump = new Image();
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
        this.currentPostionLevel = 3;
        this.maxCurrentLevel = 3;
        this.currentLevel = null;
        this.isJumping = false;
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
    }

    draw(ctx) {
        ctx.save();
        if (this.isJumping) {
            ctx.drawImage(this.imageJump, this.frameJumpX * this.spriteWidthJump, this.frameJumpY * this.spriteHeightJump, this.spriteWidthJump, this.spriteHeightJump, this.position.x - this.spriteWidthJump * this.scaleY / 7, this.position.y - this.spriteHeightJump * this.scaleY / 3.2, this.spriteWidthJump * this.scaleY / 2, this.spriteHeightJump * this.scaleY / 2);
        }
        else {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x - this.spriteWidth * this.scaleY / 7, this.position.y - this.spriteHeight * this.scaleY / 3.2, this.spriteWidth * this.scaleY / 2, this.spriteHeight * this.scaleY / 2);
        }
        ctx.restore();
    }

    update(deltaTime) {
        this.gameFrame++;
        if (this.gameFrame % this.staggerFrames === 0) {
            if (this.frameX === 4) {
                if (this.gameFrame % (this.staggerFrames * 20) === 0) {
                    this.frameX = 0;
                }
            }
            else {
                this.frameX++;
            }
        }
    }
    updateMaxCurrentLevel(lv) {
        this.maxCurrentLevel = lv;
    }

    initialPositionPlayer(level) {
        this.currentLevel = level
        this.position.x = level.position.x;
        this.position.y = level.position.y;
    }

    updatePosition(level) {
        this.currentPostionLevel = level.level
        if (level.level <= this.maxCurrentLevel) {
            const direction = level.level > this.currentLevel.level ? 1 : -1;
            this.jump(this.currentLevel, level, direction);
        }
    }

    jump(currentLevel, nextLevel, direction) {
        const self = this;
        let animationHandle;
        self.isJumping = true;
        const jumpTo = self.levels[nextLevel.level - 1];
        const currentY = self.position.y
        const currentX = self.position.x;
        const distanceX = jumpTo.position.x - currentX;
        const distanceY = jumpTo.position.y - currentY;
        let frame = 0;
        function animate() {
            if ((direction === 1 && self.position.x < jumpTo.position.x) ||
                (direction === -1 && self.position.x > jumpTo.position.x)) {
                self.position.x += self.game.deltaTime * direction / 5;
                let dy = (Math.abs(distanceY) * Math.sin(((self.position.x - currentX) * Math.PI * 3 / (4 * distanceX))))
                self.position.y = currentY - dy;
                self.gameFrame += 1;
                let dis = Math.abs(self.position.x - jumpTo.position.x);
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
            } else {
                self.currentLevel = jumpTo.level;
                self.position.x = jumpTo.position.x;
                self.position.y = jumpTo.position.y;
                self.isJumping = false;
                cancelAnimationFrame(animationHandle);
                return; // Stop the animation loop
            }
        }
        animate();
    }

}
