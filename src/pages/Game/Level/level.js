export const LEVEL =
    [
        {
            "level": 1,
            "position": {
                "x": 465,
                "y": 515
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 2,
            "position": {
                "x": 950,
                "y": 580
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 3,
            "position": {
                "x": 1550,
                "y": 505
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 4,
            "position": {
                "x": 2020,
                "y": 280
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 5,
            "position": {
                "x": 2449,
                "y": 320
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 6,
            "position": {
                "x": 2862,
                "y": 420
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 7,
            "position": {
                "x": 3420,
                "y": 600
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 8,
            "position": {
                "x": 3185,
                "y": 890
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 9,
            "position": {
                "x": 3651,
                "y": 1120
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 10,
            "position": {
                "x": 3950,
                "y": 365
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 11,
            "position": {
                "x": 4061,
                "y": 1095
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 12,
            "position": {
                "x": 4400,
                "y": 950
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 13,
            "position": {
                "x": 4650,
                "y": 600
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 14,
            "position": {
                "x": 5300,
                "y": 550
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 15,
            "position": {
                "x": 5765,
                "y": 630
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 16,
            "position": {
                "x": 6175,
                "y": 480
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 17,
            "position": {
                "x": 6625,
                "y": 400
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 18,
            "position": {
                "x": 6900,
                "y": 900
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 19,
            "position": {
                "x": 7223,
                "y": 470
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        },
        {
            "level": 20,
            "position": {
                "x": 7650,
                "y": 430
            },
            "state": 0,
            "difficulty_level": 0,
            "score": 0,
            'time': -1
        }
    ]
export class Levels {
    constructor(game) {
        this.game = game;
        this.levelsNext = []
        this.spriteWidth = 259;
        this.spriteHeight = 259;
        this.spriteWidthStar = 325;
        this.spriteHeightStar = 172;
        this.widthStar = this.spriteWidthStar * this.game.scale / 2;
        this.heightStar = this.spriteHeightStar * this.game.scale / 2;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.image = new Image();
        this.image.src = './Asset/Button/btn_level.png';
        this.imageStar0 = new Image();
        this.imageStar0.src = './Asset/Stars/0.png'
        this.imageStar1 = new Image();
        this.imageStar1.src = './Asset/Stars/1.png'
        this.imageStar2 = new Image();
        this.imageStar2.src = './Asset/Stars/2.png'
        this.imageStar3 = new Image();
        this.imageStar3.src = './Asset/Stars/3.png'
        this.xVirtual = -this.game.background.xImageCut * this.game.scale;
        this.frameX = 0;
        this.frameY = 0;
        this.maxWidthSlice = this.game.width;
        this.isUnblocking = false;
        this.frame = 0;
    }
    updatePosition() {
        this.widthStar = this.spriteWidthStar * this.game.scale / 2;
        this.heightStar = this.spriteHeightStar * this.game.scale / 2;
        this.width = this.spriteWidth * this.game.scale;
        this.height = this.spriteHeight * this.game.scale;
        this.maxWidthSlice = this.game.width;
        this.xVirtual = -this.game.background.xImageCut * this.game.scale;
    }

    draw(context) {
        if (this.game.level) {
            if (this.game.mode == 'light') {
                this.frameY = 0;
            }
            else this.frameY = 1;
            context.save()
            context.translate(this.xVirtual, 0);
            this.game.level.forEach(level => {
                if (level.state === 2) {
                    if (this.frame % 8 == 0) {
                        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x * this.game.scale + Math.random() * 5, level.position.y * this.game.scale + Math.random() * 3, this.width, this.height);
                    }
                    else {
                        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x * this.game.scale, level.position.y * this.game.scale, this.width, this.height);
                    }
                }
                else if (level.state) {
                    context.drawImage(
                        this.image,
                        0 * this.spriteWidth,
                        this.frameY * this.spriteHeight,
                        this.spriteWidth,
                        this.spriteHeight,
                        level.position.x * this.game.scale,
                        level.position.y * this.game.scale,
                        this.width,
                        this.height
                    );

                    let difficultySum = level.difficulty_level.reduce((sum, val) => sum + val, 0);
                    let starImages = [this.imageStar0, this.imageStar1, this.imageStar2, this.imageStar3];

                    if (difficultySum >= 0 && difficultySum <= 3) {
                        context.drawImage(
                            starImages[difficultySum],
                            level.position.x * this.game.scale + (this.width - this.widthStar) / 2,
                            level.position.y * this.game.scale - this.heightStar / 6,
                            this.widthStar,
                            this.heightStar
                        );
                    }
                }

                else {
                    context.drawImage(this.image,
                        1 * this.spriteWidth, this.frameY * this.spriteHeight,
                        this.spriteWidth, this.spriteHeight,
                        level.position.x * this.game.scale, level.position.y * this.game.scale,
                        this.width, this.height);
                }
            });
            context.restore()
        }
    }
    drawAnimateUnBlockLevel(context, frameX, level) {
        context.save();
        context.drawImage(this.image, frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x * this.game.scale, level.position.y * this.game.scale, this.width, this.height);
    }
    unLockLevel(lv) {
        this.game.level.forEach(level => {
            if (level.level == lv.level) {
                level.state = 2
                this.animateUnblockLevel(level);
                return;
            }
        })
    }
    // Animate to unblock level
    animateUnblockLevel(lv) {
        const self = this;
        let animationHandle;
        self.frameX = 1;
        self.frame = 1;
        function animate() {
            if (self.frameX < 4) {
                self.frame++;
                if (self.frameX == 1) {
                    if (self.frame % 50 == 0)
                        self.frameX = 2;
                }
                else if (self.frameX > 1) {
                    if (self.frame % 30 == 0) {
                        self.frameX++;
                    }
                }
                animationHandle = requestAnimationFrame(animate);
            }
            else {
                lv.state = 1
                cancelAnimationFrame(animationHandle);
                return;
            }
        }
        animate();
    }

}