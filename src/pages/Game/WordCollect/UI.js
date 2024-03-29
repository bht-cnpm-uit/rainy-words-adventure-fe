export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 65;
        this.fontFamily = 'Helvetica';
    }
    draw(context) {
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillStyle = 'blue';
        context.fillText(this.game.score, this.game.width / 2, this.fontSize * 1.5);
    }
}