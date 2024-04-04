export const LEVEL = [
    {
        "level": 1,
        "position": {
            "x": 465,
            "y": 900
        },
        "state": "Unblock"
    },
    {
        "level": 2,
        "position": {
            "x": 1049,
            "y": 800
        },
        "state": "Unblock"
    },
    {
        "level": 3,
        "position": {
            "x": 1624,
            "y": 870
        },
        "state": "Unblock"
    },
    {
        "level": 4,
        "position": {
            "x": 2020,
            "y": 665
        },
        "state": "Block"
    },
    {
        "level": 5,
        "position": {
            "x": 2449,
            "y": 525
        },
        "state": "Block"
    },
    {
        "level": 6,
        "position": {
            "x": 2862,
            "y": 600
        },
        "state": "Block"
    },
    {
        "level": 7,
        "position": {
            "x": 3389,
            "y": 720
        },
        "state": "Block"
    },
    {
        "level": 8,
        "position": {
            "x": 3500,
            "y": 1100
        },
        "state": "Block"
    },
    {
        "level": 9,
        "position": {
            "x": 3651,
            "y": 1350
        },
        "state": "Block"
    },
    {
        "level": 10,
        "position": {
            "x": 4200,
            "y": 600
        },
        "state": "Block"
    },
    {
        "level": 11,
        "position": {
            "x": 4061,
            "y": 1350
        },
        "state": "Block"
    },
    {
        "level": 12,
        "position": {
            "x": 4511,
            "y": 1300
        },
        "state": "Block"
    },
    {
        "level": 13,
        "position": {
            "x": 4850,
            "y": 1000
        },
        "state": "Block"
    },
    {
        "level": 14,
        "position": {
            "x": 5299,
            "y": 750
        },
        "state": "Block"
    },
    {
        "level": 15,
        "position": {
            "x": 5765,
            "y": 850
        },
        "state": "Block"
    },
    {
        "level": 16,
        "position": {
            "x": 6175,
            "y": 900
        },
        "state": "Block"
    },
    {
        "level": 17,
        "position": {
            "x": 6625,
            "y": 700
        },
        "state": "Block"
    },
    {
        "level": 18,
        "position": {
            "x": 7150,
            "y": 1200
        },
        "state": "Block"
    },
    {
        "level": 19,
        "position": {
            "x": 7223,
            "y": 700
        },
        "state": "Block"
    },
    {
        "level": 20,
        "position": {
            "x": 7700,
            "y": 740
        },
        "state": "Block"
    }
]



export class Levels {
    constructor(game) {
        this.game = game;
        this.levels = [];
        this.levelsNext = []
        this.spriteWidth = 299;
        this.spriteHeight = 215;
        this.width = this.game.width;
        this.height = this.game.height;
        this.image = new Image();
        this.image.src = '../src/assets/Asset/btn_level.png';
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
                    context.drawImage(this.image, 0 * this.spriteWidth, 2 * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.spriteWidth / 2, this.spriteHeight / 2);
            }
            else {
                if (this.image.complete)
                    context.drawImage(this.image, 4 * this.spriteWidth, 2 * this.spriteHeight, this.spriteWidth, this.spriteHeight, level.position.x, level.position.y, this.spriteWidth / 2, this.spriteHeight / 2);
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