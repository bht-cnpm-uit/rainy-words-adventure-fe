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
        this.image.src = './Asset/Button/btn_2.png';
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
            this.spriteWidth * this.game.scale / 1.6,
            this.spriteHeight * this.game.scale / 1.6,
        );
        context.font = this.game.scale * 45 + 'px Arial';
        context.fillStyle = 'brown';
        context.textAlign = 'center';
        context.testBaseline = 'middle';
        context.fillText(
            'Đăng ký',
            this.x + this.spriteWidth * this.game.scale / 3.2,
            this.y + this.spriteHeight * this.game.scale / 1.9,
            this.spriteWidth * this.game.scale / 1.6
        );
    }
}
class LoginForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 667;
        this.spriteWidth = 1151;
        this.width = this.game.width;
        this.height = this.game.height;
        this.createForm();
    }

    update() { }

    draw() { }

    createForm() {
        const container = document.createElement('div');
        container.id = 'container';

        const container_bg = document.createElement('div');
        container_bg.id = 'container_bg';

        const container_form = document.createElement('form');
        container_form.id = 'container_form';

        container.appendChild(container_bg);
        container.appendChild(container_form);

        container_form.style.backgroundImage = 'url("./Asset/Board/board_1.png")';
        container_form.innerHTML = `
            <div class="form-row row-1">
                <label for="username">Số điện thoại</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="form-row">
                <label for="password">Mật khẩu</label>
                <div class="password-container">
                    <input type="password" id="password" name="password">
                    <button type="button" id="toggle-password">
                        <img src="./Asset/Icon/eye-slash.png" alt="Toggle Password">
                    </button>
                </div>
            </div>
            <div class="error-message" id="error-message"></div>
            <input type="submit" value="ĐĂNG NHẬP">
        `;

        document.body.appendChild(container);

        const togglePasswordButton = container.querySelector('#toggle-password');
        togglePasswordButton.addEventListener('click', () => {
            const passwordInput = container.querySelector('#password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordButton.querySelector('img').src = './Asset/Icon/eye.png';
            } else {
                passwordInput.type = 'password';
                togglePasswordButton.querySelector('img').src = './Asset/Icon/eye-slash.png';
            }
        });

        container.addEventListener('submit', async (event) => {
            event.preventDefault();
            var phoneNumber = container.querySelector('#username').value;
            var password = container.querySelector('#password').value;
            var isSuccess = await this.game.game.handleSubmitLogin({ phoneNumber, password });
            if (!isSuccess) {
                const errorMessage = document.getElementById('error-message');
                errorMessage.innerText = "Số diện thoại hoặc mật khẩu không đúng !";
            }
        });
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
            './Asset/Map/ScrollBG_light.png',
        );
        this.layerImage2 = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            './Asset/Map/StableBG_light.png',
        );
        this.player = new Player(
            this.game,
            './Asset/Player/SunflowerCatWalk_light.png'
        );
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
