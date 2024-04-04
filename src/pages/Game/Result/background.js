const ScrollBG = '/assets/Asset/Map1/ScrollBG.png'
const StableBG = '/assets/Asset/Map1/StableBG.png'
class Layer {
    constructor(game, width, height, image, image2 = "") {
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.image2 = image2;
        this.x = 0;
        this.y = 0;
        this.x2 = 2920;
    }
    update() {
        // Add update logic if needed
    }
    drawStable(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.save();
    }
    draw(context) {
        let gameSpeed = 5;
        context.drawImage(this.image, this.x, 0);
        context.drawImage(this.image2, this.x2, 0);
        if (this.x < -2920) this.x = 2920 - gameSpeed + this.x2;
        else this.x -= gameSpeed;

        if (this.x2 < -2920) this.x2 = 2920 - gameSpeed + this.x;
        else this.x2 -= gameSpeed;
        context.save();
    }

    drawLogo(context) {
        context.drawImage(this.image, 550, 0, this.width, this.height);
        context.save();
    }

}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 750;
        this.layerImage1 = new Layer(this.game, this.width, this.height, new Image(), new Image());
        this.layerImage1.image.src = ScrollBG;
        this.layerImage1.image2.src = ScrollBG;
        this.layerImage2 = new Layer(this.game, this.width, this.height, new Image());
        this.layerImage2.image.src = StableBG;
        // this.layerLogo = new Layer(this.game, 922,552 , new Image());
        // this.layerLogo.image.src = '../assets/Asset/Logo.png';

    }
    update() {
    }
    draw(context) {
        this.layerImage1.draw(context);
        this.layerImage2.drawStable(context);
        // this.layerLogo.drawLogo(context);
    }
}
