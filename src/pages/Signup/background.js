import './signup.css';
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
            context.drawImage(
                this.image,
                0,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.game.width,
                this.game.height,
            );
            context.drawImage(
                this.image,
                0,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x + this.game.width,
                this.y,
                this.game.width,
                this.game.height,
            );
        } else {
            context.drawImage(
                this.image,
                0,
                0,
                this.spriteWidth - this.game.widthCut,
                this.spriteHeight,
                this.x,
                this.y,
                this.game.width,
                this.game.height,
            );
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
            (this.game.width / 2 - this.spriteWidth * 0.3 * this.game.scale) / 20,
            this.game.height - this.spriteHeight * 1.05 * this.game.scale,
            this.spriteWidth * this.game.scale,
            this.spriteHeight * this.game.scale,
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
            this.game.scale = this.game.width / (2.5 * this.spriteWidth);
        }
    }
}

class btnSignUp {
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
            (this.spriteWidth * this.game.scale) / 1.6,
            (this.spriteHeight * this.game.scale) / 1.6,
        );
        context.font = this.game.scale * 45 + 'px Arial';
        context.fillStyle = 'brown';
        context.textAlign = 'center';
        context.testBaseline = 'middle';
        context.fillText(
            'Đăng nhập',
            this.x + (this.spriteWidth * this.game.scale) / 3.2,
            this.y + (this.spriteHeight * this.game.scale) / 1.9,
            (this.spriteWidth * this.game.scale) / 1.6,
        );
    }
}

class SignupForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1084;
        this.spriteWidth = 1508;
        this.img_form = new Image();
        this.img_form.src = './Asset/Board/board_2.png';
        this.width = this.game.width;
        this.height = this.game.height;
        this.createForm(game.dataSchool);
    }
    update() { }
    draw() { }

    createForm(dataSchool) {
        const container = document.createElement('div');
        container.id = 'container';

        const box_logo = document.createElement('div');
        box_logo.id = 'box_logo';

        const box_form = document.createElement('form');
        box_form.id = 'box_form';

        container.appendChild(box_logo);
        container.appendChild(box_form);

        box_form.innerHTML = `
            <div class="form-row row-1">
                <label for="username">Họ và tên</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="form-row row-1">
                <label for="school">Trường</label>
                <select id="school" name="school">
                ${dataSchool
                .map(option => `<option value="${option.id}">${option.name}</option>`)
                .join('')}
                </select>
            </div>
            <div class="form-row row-1">
                <label for="class">Lớp</label>
                <input type="text" id="class" name="class">
                </input>
            </div>
            <div class="form-row row-1">
                <label for="dateOfBirth">Ngày sinh</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth">
            </div>
            <div class="form-row row-1">
                <label for="phoneNumber">Số điện thoại</label>
                <input type="text" id="phoneNumber" name="phoneNumber">
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
            <input type="submit" value="ĐĂNG KÍ">
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

            let phoneNumber = container.querySelector("#phoneNumber").value;
            let password = container.querySelector("#password").value;
            let username = container.querySelector("#username").value;
            let dateOfBirth = container.querySelector("#dateOfBirth").value;
            let schoolId = container.querySelector("#school").value;
            let class_ = container.querySelector("#class").value;

            let isSuccess = await this.game.game.handleSubmitSignUp({
                phoneNumber,
                password,
                name: username,
                schoolId,
                grade: class_,
                birthday: dateOfBirth,
            });
            if (!isSuccess) {
                // const errorMessage = document.getElementById('error-message');
                if (phoneNumber == '' || password == '' || username == '' || dateOfBirth == '' || class_ == '') {
                    // errorMessage.innerText = "Vui lòng nhập đủ thông tin !";
                    alert("Vui lòng nhập đủ thông tin !")
                }
            }

        });
    }
}

export class Background {
    constructor(game, dataSchool) {
        this.game = game;
        this.spriteHeight = 1080;
        this.spriteWidth = 2920;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteWidthGame = 922;
        this.spriteHeightGame = 653;
        this.dataSchool = dataSchool;
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
            './Asset/Player/SunflowerCatWalk_light.png',
        );
        this.signupForm = new SignupForm(this);
        this.btnSignUp = new btnSignUp(this.game);
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