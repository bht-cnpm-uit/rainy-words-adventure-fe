export const LEVEL =
    [
        {
            "level": 1,
            "position": {
                "x": 465,
                "y": 515
            },
            "state": "Unblock",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 2,
            "position": {
                "x": 950,
                "y": 580
            },
            "state": "Unblock",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 3,
            "position": {
                "x": 1550,
                "y": 505
            },
            "state": "Unblock",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 4,
            "position": {
                "x": 2020,
                "y": 280
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 5,
            "position": {
                "x": 2449,
                "y": 320
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 6,
            "position": {
                "x": 2862,
                "y": 420
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 7,
            "position": {
                "x": 3420,
                "y": 600
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 8,
            "position": {
                "x": 3185,
                "y": 890
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 9,
            "position": {
                "x": 3651,
                "y": 1120
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 10,
            "position": {
                "x": 3950,
                "y": 365
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 11,
            "position": {
                "x": 4061,
                "y": 1095
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 12,
            "position": {
                "x": 4400,
                "y": 950
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 13,
            "position": {
                "x": 4650,
                "y": 600
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 14,
            "position": {
                "x": 5300,
                "y": 550
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 15,
            "position": {
                "x": 5765,
                "y": 630
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 16,
            "position": {
                "x": 6175,
                "y": 480
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 17,
            "position": {
                "x": 6625,
                "y": 400
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 18,
            "position": {
                "x": 6900,
                "y": 900
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 19,
            "position": {
                "x": 7223,
                "y": 470
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        },
        {
            "level": 20,
            "position": {
                "x": 7650,
                "y": 430
            },
            "state": "Block",
            "difficulty_level": 0,
            "max_difficulty_level": 3
        }
    ]

export class Levels {
    constructor(game) {
        this.game = game;
        this.scaleY = this.game.background.scaleY;
        this.levels = [];
        this.levelsNext = []
        this.spriteWidth = 259;
        this.spriteHeight = 259;
        this.spriteWidthStar = 325;
        this.spriteHeightStar = 172;
        this.widthStar = this.spriteWidthStar * this.scaleY / 2;
        this.heightStar = this.spriteHeightStar * this.scaleY / 2;
        this.width = this.spriteWidth * this.scaleY;
        this.height = this.spriteHeight * this.scaleY;
        this.image = new Image();
        this.image.src = '../assets/Asset/btn_level.png';
        this.imageStar0 = new Image();
        this.imageStar0.src = '../assets/Asset/Stars/0.png'
        this.imageStar1 = new Image();
        this.imageStar1.src = '../assets/Asset/Stars/1.png'
        this.imageStar2 = new Image();
        this.imageStar2.src = '../assets/Asset/Stars/2.png'
        this.imageStar3 = new Image();
        this.imageStar3.src = '../assets/Asset/Stars/3.png'
        this.xVirtual = 0;
        // this.updatePositionLevel();
        this.frameX = 0;
        this.frameY = 0;
        this.maxWidthSlice = this.game.width / 2;
        this.isUnblocking = false;
        this.frame = 0;
    }

    draw(context) {
        context.save()
        this.levels.forEach(level => {
            if (level.state === 'Unblocking') {
                if (this.frame % 8 == 0) {
                    context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x + Math.random() * 5, level.position.y + Math.random() * 3, this.width, this.height);
                }
                else {
                    context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.width, this.height);
                }
            }
            else if (level.state === 'Unblock') {
                context.drawImage(this.image, 0 * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.width, this.height);
                if (level.difficulty_level == 0) {
                    context.drawImage(this.imageStar0, level.position.x + (this.width - this.widthStar) / 2, level.position.y - this.heightStar / 6, this.widthStar, this.heightStar);
                }
                else if (level.difficulty_level == 1) {
                    context.drawImage(this.imageStar1, level.position.x + (this.width - this.widthStar) / 2, level.position.y - this.heightStar / 6, this.widthStar, this.heightStar);
                }
                else if (level.difficulty_level == 2) {
                    context.drawImage(this.imageStar2, level.position.x + (this.width - this.widthStar) / 2, level.position.y - this.heightStar / 6, this.widthStar, this.heightStar);
                }
                else if (level.difficulty_level == 3) {
                    context.drawImage(this.imageStar3, level.position.x + (this.width - this.widthStar) / 2, level.position.y - this.heightStar / 6, this.widthStar, this.heightStar);
                }
            }
            else {
                context.drawImage(this.image, 1 * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.width, this.height);
            }
        });
    }
    drawAnimateUnBlockLevel(context, frameX, level) {
        context.save();
        context.drawImage(this.image, frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.width, this.height);
    }

    updatePositionLevel() {
        const init_level = JSON.parse(JSON.stringify(LEVEL)); // Assuming LEVEL is a constant containing the initial level data
        this.levels = []; // Clear the levels array
        for (let i = 0; i < init_level.length; i++) { // Iterate over init_level.length
            const lv = init_level[i]; // Access each level data from init_level
            lv.position.x = lv.position.x * this.scaleY;
            lv.position.y = lv.position.y * this.scaleY;
            this.levels.push(lv); // Push the updated level data into levels array
            if (lv.level == this.game.player.maxCurrentLevel) {
                this.game.player.initialPositionPlayer(lv)
            }
        }
        this.game.player.levels = JSON.parse(JSON.stringify(this.levels))
        this.levelsNext = JSON.parse(JSON.stringify(this.levels));
    }
    updateSlide() {
        for (let i = 0; i < this.levelsNext.length; i++) {
            if (this.levels[i].position.x + this.game.deltaTime < this.levelsNext[i].position.x) {
                this.levels[i].position.x += this.game.deltaTime;
            } else if (this.levels[i].position.x - this.game.deltaTime > this.levelsNext[i].position.x) {
                this.levels[i].position.x -= this.game.deltaTime;
            }
            else {
                this.levels[i].position.x = this.levelsNext[i].position.x
            }
            if (this.levels[i].level == this.game.player.currentLevel.level) {
                this.game.player.currentLevel = JSON.parse(JSON.stringify(this.levels[i]));
            }
        }
    }
    onclickNextMap(direct) {
        let first = this.levelsNext[0];
        let last = this.levelsNext[this.levelsNext.length - 1];
        let step = this.maxWidthSlice;

        if (direct == 1 && this.xVirtual + direct * step > 0) {
            step = 0 - this.xVirtual;
        }
        if (direct == -1 && this.xVirtual + direct * step <= -(this.game.background.widthScaleBg - this.game.width)) {
            step = this.game.background.widthScaleBg + this.xVirtual - this.game.width;
        }
        if (step < this.maxWidthSlice && direct == -1) {
            this.game.btnNextMap.hidden = true;
        }
        else if ((step < this.maxWidthSlice && direct == 1) || (direct == 1 && step == this.maxWidthSlice && this.xVirtual == -this.maxWidthSlice)) {
            this.game.btnBackMap.hidden = true;
        }
        else {
            this.game.btnNextMap.hidden = false;
            this.game.btnBackMap.hidden = false;
        }

        this.levelsNext.forEach(levelItem => {
            levelItem.position.x += direct * step;
        });
        this.xVirtual += direct * step;
    }
    updateStateLevel(lv) {
        this.levels.forEach(level => {
            if (level.level == lv.level) {
                level.state = "Unblocking"
                this.animateUnblockLevel(level);
                this.game.player.updateMaxCurrentLevel(level.level)
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
                lv.state = 'Unblock'
                cancelAnimationFrame(animationHandle);
                return;
            }
        }
        animate();
    }

}