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
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 3,
            "position": {
                "x": 1550,
                "y": 505
            },
            "state": "Unblock",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 4,
            "position": {
                "x": 2020,
                "y": 280
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 5,
            "position": {
                "x": 2449,
                "y": 320
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 6,
            "position": {
                "x": 2862,
                "y": 420
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 7,
            "position": {
                "x": 3420,
                "y": 600
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 8,
            "position": {
                "x": 3185,
                "y": 890
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 9,
            "position": {
                "x": 3651,
                "y": 1120
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 10,
            "position": {
                "x": 3950,
                "y": 365
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 11,
            "position": {
                "x": 4061,
                "y": 1095
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 12,
            "position": {
                "x": 4400,
                "y": 950
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 13,
            "position": {
                "x": 4650,
                "y": 600
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 14,
            "position": {
                "x": 5300,
                "y": 550
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 15,
            "position": {
                "x": 5765,
                "y": 630
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 16,
            "position": {
                "x": 6175,
                "y": 480
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 17,
            "position": {
                "x": 6625,
                "y": 400
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 18,
            "position": {
                "x": 6900,
                "y": 900
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 19,
            "position": {
                "x": 7223,
                "y": 470
            },
            "state": "Block",
            "difficulty_level": 1,
            "max_difficulty_level": 3
        },
        {
            "level": 20,
            "position": {
                "x": 7650,
                "y": 430
            },
            "state": "Block",
            "difficulty_level": 1,
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
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.image = new Image();
        this.image.src = '../assets/Asset/btn_level.png';
        this.xVirtual = 0;
        this.updatePositionLevel();
        this.frameX = 0;
        this.frameY = 0;
    }
    update(deltaTime) {
        for (let i = 0; i < this.levelsNext.length; i++) {
            if (this.levels[i].position.x + deltaTime < this.levelsNext[i].position.x) {
                this.levels[i].position.x += deltaTime;
            } else if (this.levels[i].position.x - deltaTime > this.levelsNext[i].position.x) {
                this.levels[i].position.x -= deltaTime;
            }
            else {
                this.levels[i].position.x = this.levelsNext[i].position.x
            }
        }
    }

    draw(context) {
        context.save()
        this.levels.forEach(level => {
            if (level.state === 'Unblock') {
                if (this.image.complete)
                    context.drawImage(this.image, 0 * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.spriteWidth * this.scaleY, this.spriteHeight * this.scaleY);
            }
            else {
                if (this.image.complete)
                    context.drawImage(this.image, 4 * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.spriteWidth * this.scaleY, this.spriteHeight * this.scaleY);
            }
        });
    }
    drawAnimateUnBlockLevel(context, frameX, level) {
        context.save();
        context.drawImage(this.image, frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.spriteWidth / 2, this.spriteHeight / 2);
    }

    updatePositionLevel() {
        const init_level = JSON.parse(JSON.stringify(LEVEL)); // Assuming LEVEL is a constant containing the initial level data
        this.levels = []; // Clear the levels array
        for (let i = 0; i < init_level.length; i++) { // Iterate over init_level.length
            const lv = init_level[i]; // Access each level data from init_level
            lv.position.x = lv.position.x * this.scaleY;
            lv.position.y = lv.position.y * this.scaleY;
            this.levels.push(lv); // Push the updated level data into levels array
            if (lv.level == this.game.player.currentPostionLevel) {
                this.game.player.updatePosition(lv)
            }
        }
        this.levelsNext = JSON.parse(JSON.stringify(this.levels));
    }
    onclickNextMap(direct) {
        let first = this.levelsNext[0];
        let last = this.levelsNext[this.levelsNext.length - 1];
        let step = 800;

        if (direct == 1 && this.xVirtual + direct * step > 0) {
            step = 0 - this.xVirtual;
        }
        if (direct == -1 && this.xVirtual + direct * step <= -(this.game.background.widthScaleBg - this.game.width)) {
            step = this.game.background.widthScaleBg + this.xVirtual - this.game.width;
        }
        console.log(step)
        if (step < 800 && direct == -1) {
            this.game.btnNextMap.hidden = true;
        }
        else if ((step < 800 && direct == 1) || (direct == 1 && step == 800 && this.xVirtual == -800)) {
            this.game.btnBackMap.hidden = true;
        }
        else {
            this.game.btnNextMap.hidden = false;
            this.game.btnBackMap.hidden = false;
        }

        this.levelsNext.forEach(levelItem => {
            levelItem.position.x += direct * step;
            if (levelItem.level == this.game.player.currentPostionLevel) {
                this.game.player.positionNext += direct * step;
            }
        });
        this.xVirtual += direct * step;
    }
    updateStateLevel(lv) {
        this.levels.forEach(level => {
            if (level.level == lv.level) {
                level.state = "Unblock"
                return;
            }
        })
    }

}