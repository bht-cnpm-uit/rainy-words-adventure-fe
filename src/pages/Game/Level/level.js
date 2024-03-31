export const level = [
    {
        'level': 1,
        'position': {
            "x": 364,
            "y": 639
        },
        'state': 'Block'
    },
    {
        'level': 2,
        'position': {
            "x": 948,
            "y": 639
        },
        'state': 'Block'
    },
    {
        'level': 3,
        'position': {
            "x": 1523,
            "y": 626
        },
        'state': 'Block'
    },
    {
        'level': 4,
        'position': {
            "x": 1919,
            "y": 444
        },
        'state': 'Block'
    },
    {
        'level': 5,
        'position': {
            "x": 2349,
            "y": 358
        },
        'state': 'Block'
    },
    {
        'level': 6,
        'position': {
            "x": 2761,
            "y": 462
        },
        'state': 'Block'
    },
    {
        'level': 7,
        'position': {
            "x": 2851,
            "y": 95
        },
        'state': 'Block'
    },
    {
        'level': 8,
        'position': {
            "x": 3289,
            "y": 552
        },
        'state': 'Block'
    },
    {
        'level': 9,
        'position': {
            "x": 3349,
            "y": 915
        },
        'state': 'Block'
    },
    {
        'level': 10,
        'position': {
            "x": 3550,
            "y": 1194
        },
        'state': 'Block'
    },
    {
        'level': 11,
        'position': {
            "x": 3960,
            "y": 1181
        },
        'state': 'Block'
    },
    {
        'level': 12,
        'position': {
            "x": 4410,
            "y": 1096
        },
        'state': 'Block'
    },
    {
        'level': 13,
        'position': {
            "x": 4678,
            "y": 715
        },
        'state': 'Block'
    },
    {
        'level': 14,
        'position': {
            "x": 5198,
            "y": 584
        },
        'state': 'Block'
    },
    {
        'level': 15,
        'position': {
            "x": 5664,
            "y": 710
        },
        'state': 'Block'
    },
    {
        'level': 16,
        'position': {
            "x": 6074,
            "y": 671
        },
        'state': 'Block'
    },
    {
        'level': 17,
        'position': {
            "x": 6524,
            "y": 505
        },
        'state': 'Block'
    },
    {
        'level': 18,
        'position': {
            "x": 6928,
            "y": 1003
        },
        'state': 'Block'
    },
    {
        'level': 19,
        'position': {
            "x": 7122,
            "y": 524
        },
        'state': 'Block'
    },
    {
        'level': 20,
        'position': {
            "x": 7526,
            "y": 552
        },
        'state': 'Block'
    }
]


export class Levels {
    constructor(game) {
        this.game = game;
        this.levels = level;
        this.spriteWidth = 214; //214;
        this.spriteHeight = 168; //168;
        this.width = this.game.width;
        this.height = this.game.height;
        this.imageUnlock = new Image();
        this.imageUnlock.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_27.png';
        this.imageCurrent = new Image();
        this.imageCurrent.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_23.png';
        this.imageLock = new Image();
        this.imageLock.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_23.png';
    }
    update() {

    }
    draw(context) {
        this.levels.forEach(level => {
            context.drawImage(this.imageCurrent, level.position.x, level.position.y, this.spriteWidth, this.spriteHeight);
        })
    }
    updatePositionLevel(background) {
        const ratioWidth = this.game.width / background.width;
        const currentHeightBG = background.height * ratioWidth;
        const ratioHeight = this.game.height / currentHeightBG;
        this.levels.forEach(level => {
            level.position.x *= ratioWidth;
            level.position.y *= ratioHeight;
        })
    }
}