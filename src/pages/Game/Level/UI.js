export class LevelSetting {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.imgScore = new Image();
        this.imgBtnPlay = new Image();
        this.imgBtnNext = new Image();
        this.imgBtnBack = new Image();
        this.imgPlayer = new Image();
        this.imgBtnClose = new Image();
        this.imgBoard = new Image();
        this.spriteWidthBoard = 693;
        this.spriteHeightBoard = 843;
        this.spriteWidthBtnClose = 139;
        this.spriteHeightBtnClose = 138;
        this.spriteWidthBtnNext = 139;
        this.spriteHeightBtnNext = 138;
        this.spriteWidthBtnBack = 139;
        this.spriteHeightBtnBack = 138;
        this.spriteWidthScore = 669;
        this.spriteHeightScore = 220;
        this.spriteWidthPlay = 437;
        this.spriteHeightPlay = 129;
        this.spriteWidthPlayer = 653;
        this.spriteHeightPlayer = 800;
        this.imgScore.src = 'src/assets/Asset/PanelAtlas_cuts/image_6.png';
        this.imgBtnNext.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png';
        this.imgBtnBack.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png';
        this.imgBtnClose.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_19.png';
        this.imgBtnPlay.src = 'src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png';
        this.imgPlayer.src = 'src/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png';
        this.imgBoard.src = 'src/assets/Asset/PanelAtlas_cuts/image_3.png';
    }
    update() {

    }
    draw(context) {
        context.save();
        context.translate(this.width * 2 / 3, this.height * 1 / 4);
        context.font = "30px Arial";
        context.textAlign = "center";
        context.drawImage(this.imgBoard, 0, 0, this.spriteWidthBoard, this.spriteHeightBoard, 0, 0, this.spriteWidthBoard / 2, this.spriteHeightBoard / 2);
        context.drawImage(this.imgBtnClose, 0, 0, this.spriteWidthBtnClose, this.spriteHeightBtnClose, this.spriteWidthBoard / 2 - this.spriteWidthBtnClose / 3, -this.spriteHeightBtnClose / 6, this.spriteWidthBtnClose / 2, this.spriteHeightBtnClose / 2);
        context.drawImage(this.imgScore, 0, 0, this.spriteWidthScore, this.spriteHeightScore, (this.spriteWidthBoard - this.spriteWidthScore) / 4, this.spriteHeightScore / 5, this.spriteWidthScore / 2, this.spriteHeightScore / 2);
        context.drawImage(this.imgBtnNext, 0, 0, this.spriteWidthBtnNext, this.spriteHeightBtnNext, this.spriteWidthBoard * 1 / 3 + this.spriteWidthBtnNext / 6, this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 6, this.spriteWidthBtnNext / 3, this.spriteHeightBtnNext / 3);
        context.drawImage(this.imgBtnBack, 0, 0, this.spriteWidthBtnBack, this.spriteHeightBtnBack, this.spriteWidthBoard * 1 / 3 - this.spriteWidthBtnNext / 2, this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 6, this.spriteWidthBtnNext / 3, this.spriteHeightBtnNext / 3);
        context.drawImage(this.imgBtnPlay, 0, 0, this.spriteWidthPlay, this.spriteHeightPlay, this.spriteWidthBoard / 4 - this.spriteWidthPlay / 6, this.spriteHeightBoard / 2 - this.spriteHeightPlay / 1.5, this.spriteWidthPlay / 3, this.spriteHeightPlay / 3);
        context.fillText("Chơi", this.spriteWidthBoard / 4, this.spriteHeightBoard / 2 - this.spriteHeightPlay / 2.25);
        context.fillText("Level 1", this.spriteWidthBoard / 4, this.spriteHeightScore / 1.4);
        context.fillText("Độ khó", this.spriteWidthBoard * 2 / 6, this.spriteHeightBoard / 3.8);
        context.fillText("1", this.spriteWidthBoard / 3, this.spriteHeightBoard / 4 + this.spriteHeightBtnNext / 2.5);
        context.restore();
        context.save();
        context.translate(this.width * 2 / 3, this.height * 1 / 4);
        context.rotate(-(8 * Math.PI) / 180); // Rotate 45 degrees
        context.drawImage(this.imgPlayer, 0, this.spriteHeightPlayer, this.spriteWidthPlayer, this.spriteHeightPlayer, -this.spriteWidthPlayer / 8, this.spriteHeightPlayer / 6, this.spriteWidthPlayer / 4, this.spriteHeightPlayer / 4);
        context.restore();
        context.save();
        context.translate(this.width * 2 / 3, this.height * 1 / 4);
        context.font = "50px Arial blue";
        context.textAlign = "center";
        context.fillText("1080", this.spriteWidthBoard / 4, this.spriteHeightScore / 3);
        context.restore();
    }
}