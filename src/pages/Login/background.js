class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image;
        this.image.src = src;
        this.x = 0;
        this.y = 0;
    }
    update() {

    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerImage1 = new Layer(this.game, this.spriteWidth, this.spriteHeight,'../assets/Asset/Map1/ScrollBG.png' );
        this.layerImage2 = new Layer(this.game, this.spriteWidth, this.spriteHeight,'../assets/Asset/Map1/StableBG.png' );
        // this.layerLogo = new Layer(this.game, this.spriteWidth,this.spriteHeight,'../assets/Asset/Logo.png' );
        this.speedModifier = 0.5;
        this.speed = this.speedModifier;
 
    }
    update() {
        let gameSpeed = 5;
        this.speed = gameSpeed * this.speedModifier;
        if (this.layerImage1.x <= -this.width) {
            this.layerImage1.x = 0;
        }
        this.layerImage1.x = this.layerImage1.x - this.speed;
    }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(this.layerImage1.image, 0, 0, this.spriteWidth, this.spriteHeight, this.layerImage1.x, 0, this.width, this.height);
        context.drawImage(this.layerImage1.image, 0, 0, this.spriteWidth, this.spriteHeight, this.layerImage1.x + this.width, 0, this.width, this.height);
        context.drawImage(this.layerImage2.image, 0, 0, this.spriteWidth - widthCut, this.spriteHeight, this.layerImage2.x, 0, this.width, this.height);
        context.save();
    }
}

export class LogoGame {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 552;
        this.spriteWidth = 922;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerLogo = new Layer(this.game, this.spriteWidth,this.spriteHeight,'../assets/Asset/Logo.png' );

    }
    update() {
    }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(this.layerLogo.image, widthCut, 0, this.spriteWidth - widthCut, this.spriteHeight, this.layerLogo.x + this.width/2, 100, this.width/3, this.height/3);
        context.save();
    }
}

export class LoginForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 542;
        this.spriteWidth = 754;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerForm = new Layer(this.game, this.spriteWidth,this.spriteHeight,'../assets/Asset/Login/loginuserBg.png' );
        this.inputUsername = this.createInput('text','Tài khoản: ', `${this.width*1.37 / 2.3}px` , `${this.height*0.9 / 1.5}px`, `${this.width/6}px`, '50px', 'Nhập tài khoản');
        this.inputPassword = this.createInput('password','Mật khẩu: ', `${this.width*1.37 / 2.3}px`, `${this.height*0.9 / 1.3}px`, `${this.width/6}px`, '50px', 'Nhập mật khẩu' );
    }
    update() {
    }
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(this.layerForm.image, widthCut, 0, this.spriteWidth - widthCut, this.spriteHeight, this.layerForm.x + this.width/2.3, this.height/1.9, this.width/2.5, this.height/2.5);
        context.save();
    }

    createInput(type,labelText, left, top,width, height, placeholder) {
        const container = document.createElement('div'); // create div
        container.style.position = 'absolute';
        container.style.left = left;
        container.style.top = top;

        const label = document.createElement('span'); //create span includes lable
        label.textContent = labelText;
        container.appendChild(label);

        const input = document.createElement('input'); // create input
        input.type = type;
        input.style.width = width; // set width
        input.style.height = height; // set height
        input.placeholder = placeholder; // add placeholder
        input.style.paddingLeft = '10px';

        container.appendChild(input);
        document.body.appendChild(container);
        return input;
    }

    getUsername() {
        
    }

    getPassword() {
        
    }
}