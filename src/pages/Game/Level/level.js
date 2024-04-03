export const LEVEL = [
    {
        "level": 1,
        "position": {
            "x": 465,
            "y": 710
        },
        "state": "Block"
    },
    {
        "level": 2,
        "position": {
            "x": 1049,
            "y": 710
        },
        "state": "Current"
    },
    {
        "level": 3,
        "position": {
            "x": 1624,
            "y": 697
        },
        "state": "Block"
    },
    {
        "level": 4,
        "position": {
            "x": 2020,
            "y": 485
        },
        "state": "Block"
    },
    {
        "level": 5,
        "position": {
            "x": 2449,
            "y": 429
        },
        "state": "Block"
    },
    {
        "level": 6,
        "position": {
            "x": 2862,
            "y": 533
        },
        "state": "Block"
    },
    // {
    //     "level": 6,
    //     "position": {
    //         "x": 2952,
    //         "y": 166
    //     },
    //     "state": "Block"
    // },
    {
        "level": 7,
        "position": {
            "x": 3389,
            "y": 623
        },
        "state": "Block"
    },
    {
        "level": 8,
        "position": {
            "x": 3380,
            "y": 986
        },
        "state": "Block"
    },
    {
        "level": 9,
        "position": {
            "x": 3651,
            "y": 1265
        },
        "state": "Block"
    },
    {
        "level": 10,
        "position": {
            "x": 4050,
            "y": 550
        },
        "state": "Block"
    },
    {
        "level": 11,
        "position": {
            "x": 4061,
            "y": 1252
        },
        "state": "Block"
    },
    {
        "level": 12,
        "position": {
            "x": 4511,
            "y": 1167
        },
        "state": "Block"
    },
    {
        "level": 13,
        "position": {
            "x": 4779,
            "y": 786
        },
        "state": "Block"
    },
    {
        "level": 14,
        "position": {
            "x": 5299,
            "y": 655
        },
        "state": "Block"
    },
    {
        "level": 15,
        "position": {
            "x": 5765,
            "y": 781
        },
        "state": "Block"
    },
    {
        "level": 16,
        "position": {
            "x": 6175,
            "y": 742
        },
        "state": "Block"
    },
    {
        "level": 17,
        "position": {
            "x": 6625,
            "y": 576
        },
        "state": "Block"
    },
    {
        "level": 18,
        "position": {
            "x": 7029,
            "y": 1074
        },
        "state": "Block"
    },
    {
        "level": 19,
        "position": {
            "x": 7223,
            "y": 595
        },
        "state": "Block"
    },
    {
        "level": 20,
        "position": {
            "x": 7627,
            "y": 623
        },
        "state": "Block"
    }
]


export class Levels {
    constructor(game) {
        this.game = game;
        this.levels = [];
        this.levelsNext = []
        this.spriteWidth = 107;
        this.spriteHeight = 84;
        this.width = this.game.width;
        this.height = this.game.height;
        this.imageUnlock = new Image();
        this.imageUnlock.src = 'src/assets/Asset/LevelButton/14.png';
        this.imageLock = new Image();
        this.imageLock.src = 'src/assets/Asset/LevelButton/13.png';
        this.xVirtual = 0;
        this.updatePositionLevel();
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
            if (level.state === 'Unlocked') {
                if (this.imageUnlock.complete)
                    context.drawImage(this.imageUnlock, level.position.x, level.position.y, this.spriteWidth, this.spriteHeight);
            } else {
                if (this.imageLock.complete)
                    context.drawImage(this.imageLock, level.position.x, level.position.y, this.spriteWidth, this.spriteHeight);
            }
        });
    }

    updatePositionLevel() {
        const ratioHeight = this.game.height / this.game.background.spriteHeight;
        const init_level = JSON.parse(JSON.stringify(LEVEL)); // Assuming LEVEL is a constant containing the initial level data
        this.levels = []; // Clear the levels array
        for (let i = 0; i < init_level.length; i++) { // Iterate over init_level.length
            const lv = init_level[i]; // Access each level data from init_level
            lv.position.x = lv.position.x * ratioHeight - this.spriteWidth / 2;
            lv.position.y = lv.position.y * ratioHeight - this.spriteHeight / 2;
            this.levels.push(lv); // Push the updated level data into levels array
        }
        this.levelsNext = JSON.parse(JSON.stringify(this.levels));
    }
    updateCurrentLevel(currentLevel) {
        this.levels.forEach(levelItem => {
            if (levelItem.level === currentLevel) {
                levelItem.state = 'Current';
            } else {
                levelItem.state = 'Block';
            }
        });
    }
    onclickNextMap(direct) {
        let first = this.levelsNext[0];
        let last = this.levelsNext[this.levelsNext.length - 1];
        let step = 800;

        if (direct == 1 && this.xVirtual + direct * step > 0) {
            step = 0 - this.xVirtual;
        }
        if (direct == -1 && this.xVirtual + direct * step <= -(this.game.background.widthScaleBg - this.width)) {
            step = this.game.background.widthScaleBg + this.xVirtual - this.width;
        }

        this.levelsNext.forEach(levelItem => {
            levelItem.position.x += direct * step;
        });
        this.xVirtual += direct * step;
    }

}