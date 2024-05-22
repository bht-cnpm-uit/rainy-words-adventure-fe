import './login.css';
class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.image = new Image();
        this.image.src = src;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.x = 0;
        this.y = 0;
    }
    update() { }
    draw(context, isTrue = false) {
        if (isTrue) {
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x + this.game.width, this.y, this.game.width, this.game.height);
        }
        else {
            context.drawImage(this.image, 0, 0, this.spriteWidth - this.game.widthCut, this.spriteHeight, this.x, this.y, this.game.width, this.game.height);
        }
    }
}
class Player {
    constructor(game, src) {
        this.game = game;
        this.spriteWidth = 653;
        this.spriteHeight = 800;
        this.position = {
            x: this.game.width / 60,
            y: this.game.height / 6,
        };
        this.image = new Image();
        this.image.src = src;
        this.frameX = 0;
        this.frameY = 1;
        this.staggerFrames = 5;
        this.gameFrame = 0;
    }
    draw(ctx) {
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 3);

        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            (this.game.width / 2 - this.spriteWidth * 1.2 * this.game.scale) / 20,
            this.game.height - this.spriteHeight * 1.05 * this.game.scale,
            this.spriteWidth * this.game.scale,
            this.spriteHeight * this.game.scale
        );

        if (this.gameFrame % (this.staggerFrames * 3) == 0) {
            if (this.frameX < 4) this.frameX += 1;
            else this.frameX = 0;
        }
        this.gameFrame++;
        ctx.restore();
    }
    onResize(game) {
        this.game = game;
        if (this.spriteWidth * this.game.scale > this.game.width / 2) {
            this.game.scale = this.game.width / (2.5 * this.spriteWidth)
        }
    }
}
class btnSignIn {
    constructor(game) {
        this.game = game;
        this.image = new Image();
        this.image.src = '../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_24.png';
        this.spriteWidth = 433;
        this.spriteHeight = 279;
        this.x = 100;
        this.y = -10;
    }
    draw(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth * this.game.scale / 1.4,
            this.spriteHeight * this.game.scale / 1.4,
        );
        context.font = this.game.scale * 45 + 'px Arial';
        context.fillStyle = 'brown';
        context.textAlign = 'center';
        context.testBaseline = 'middle';
        context.fillText(
            'Đăng ký',
            this.x + this.spriteWidth * this.game.scale / 2.8,
            this.y + this.spriteHeight * this.game.scale / 1.7,
            this.spriteWidth * this.game.scale / 1.4
        );
    }
}
class LogoGame extends Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        super();
        this.game = game;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image();
        this.image.src = src;
    }
    update() { }
    draw(context) {
        context.drawImage(this.image,
            0, 0,
            this.spriteWidth, this.spriteHeight,
            this.game.width / 2, this.game.height - this.spriteHeight * this.game.scale * 1.6,
            this.spriteWidth * this.game.scale * 0.95, this.spriteHeight * this.game.scale * 0.95
        );
    }
}
class LoginForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 667;
        this.spriteWidth = 1151;
        this.img_form = new Image();
        this.img_form.src = "../assets/Asset/Login/login_user_bg.png"
        this.width = this.game.width;
        this.height = this.game.height;
        this.createForm();
    }
    update() {
    }
    draw(context) {
    }
    createForm() {
        const container = document.createElement('form');
        container.id = 'loginForm';

        container.style.backgroundImage = 'url("../assets/Asset/Login/login_user_bg.png")';
        // <img src='../assets/Asset/Logo.png' width="200px"/>
        container.innerHTML = `
            <div class="form-row row-1">
                <label for="username">Tài khoản</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="form-row">
                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password">
            </div>
            <input type="submit" value="Đăng nhập">
        `;
        document.body.appendChild(container);

        container.addEventListener('submit', (event) => {
            window.location.href = '/level'
        });
    }

    getUsername() {

    }

    getPassword() {

    }
    validateInput(input) {
        if (input.value.trim() === '') {
            // check empty?
            input.style.border = '2px solid red';
            input.placeholder = 'Vui lòng nhập thông tin !!!';
            return false;
        } else {
            input.style.border = ''; // remove border
            // this.statusCheck = true;
            return true;
        }
    }

    checkInput() {
        // this.inputUsername.addEventListener('blur', () => {
        //     this.validateInput(this.inputUsername);
        // });

        // this.inputPassword.addEventListener('blur', () => {
        //     this.validateInput(this.inputPassword);
        // });
    }
}
export class Background {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteWidthGame = 922;
        this.spriteHeightGame = 653;
        this.layerImage1 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Map1/ScrollBG.png',
        );
        this.layerImage2 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Map1/StableBG.png',
        );
        this.player = new Player(
            this.game,
            '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png'
        );
        this.logoGame = new LogoGame(
            this.game,
            this.spriteWidthGame,
            this.spriteHeightGame,
            '../assets/Asset/Logo.png'
        )
        this.loginForm = new LoginForm(this);
        this.btnSignIn = new btnSignIn(this.game);
    }
    update() {
        this.layerImage1.x = -this.game.gameFrame % this.game.width;
    }
    draw(context) {
        this.layerImage1.draw(context, true);
        this.layerImage2.draw(context);
        this.player.draw(context);
        context.save();
    }
}

