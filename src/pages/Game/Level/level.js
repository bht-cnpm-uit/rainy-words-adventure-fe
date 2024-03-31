export const level = [
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
    {
        "level": 7,
        "position": {
            "x": 2952,
            "y": 166
        },
        "state": "Block"
    },
    {
        "level": 8,
        "position": {
            "x": 3389,
            "y": 623
        },
        "state": "Block"
    },
    {
        "level": 9,
        "position": {
            "x": 3380,
            "y": 986
        },
        "state": "Block"
    },
    {
        "level": 10,
        "position": {
            "x": 3651,
            "y": 1265
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
        this.levels = level;
        this.levelsNext = level
        this.spriteWidth = 107;
        this.spriteHeight = 84;
        this.width = this.game.width;
        this.height = this.game.height;
        this.imageUnlock = new Image();
        this.imageUnlock.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_27.png';
        this.imageLock = new Image();
        this.imageLock.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_23.png';
        this.updatePositionLevel();
        this.xVirtual = 0;
    }

    loadImage(image) {
        return new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });
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
        this.levels.forEach(level => {
            if (level.state === 'Unlocked') {
                context.drawImage(this.imageUnlock, level.position.x, level.position.y, this.spriteWidth, this.spriteHeight);
            } else {
                context.drawImage(this.imageLock, level.position.x, level.position.y, this.spriteWidth, this.spriteHeight);
            }
        });
    }

    updatePositionLevel() {
        const ratioHeight = this.game.height / this.game.background.spriteHeight;
        this.levels.forEach(level => {
            level.position.x = level.position.x * ratioHeight - this.spriteWidth / 2;
            level.position.y = level.position.y * ratioHeight - this.spriteHeight / 2;
        });
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
        let step = 600;

        if (direct == 1 && this.xVirtual + direct * step > first.position.x) {
            step = 0;
        }

        this.levelsNext.forEach(levelItem => {
            levelItem.position.x += direct * step;
            this.xVirtual += direct * step;
        });
    }

}