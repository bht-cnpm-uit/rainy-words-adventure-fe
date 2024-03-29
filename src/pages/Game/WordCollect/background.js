class Layer {
    constructor(game, width, height, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        // Add update logic if needed
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 880;
        this.layerImage1 = new Layer(this.game, this.width, this.height, new Image());
        this.layerImage1.image.src = 'src/assets/Asset/Map3/RollBackground.png';
        this.layerImage2 = new Layer(this.game, this.width, this.height, new Image());
        this.layerImage2.image.src = 'src/assets/Asset/Map3/StableBG.png';
    }
    update() {
    }
    draw(context) {
        this.layerImage1.draw(context);
        this.layerImage2.draw(context);
    }
}
