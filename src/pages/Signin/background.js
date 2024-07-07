import './signin.css';
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

class btnLogIn {
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

const optionGrades = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
    { value: '9', label: 'Option 9' },
];

const optionSchools = [
    { value: 'Tiểu học Linh Trung', label: 'Option 1' },
    { value: 'Trung học cơ sở Linh Trung', label: 'Option 2' },
    { value: 'Tiểu học Thủ Đức', label: 'Option 3' },
];

class SigninForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1084;
        this.spriteWidth = 1508;
        this.width = this.game.width;
        this.height = this.game.height;
        this.img_form = new Image();
        // this.img_form.src = '../assets/Asset/SignInForm.png';
        this.createForm();
    }
    update() { }
    draw(context) { }

    createForm() {
        const box = document.createElement('div');
        box.id = 'box';

        // Create the first sub-div
        const box_logo = document.createElement('div');
        box_logo.id = 'box_logo';

        // Create the second sub-div
        const box_form = document.createElement('form');
        box_form.id = 'box_form';

        box.appendChild(box_logo);
        box.appendChild(box_form);

        // box_form.style.backgroundImage = 'url("../assets/Asset/SignInForm.png")';
        box_form.innerHTML = `
            <div class="form-row row-1">
                <label for="username">Họ và tên</label>
                <input type="text" id="username" name="username">
            </div>

            <div class="form-row row-1">
                <label for="school">Trường</label>
                <select id="school" name="school">
                ${optionSchools
                .map(
                    (option) => `
                    <option value="${option.label}">${option.value}</option>`,
                )
                .join('')}
                </select>
            </div>

            <div class="form-row row-1">
                <label for="class">Lớp</label>
                <select id="class" name="class">
                ${optionGrades
                .map(
                    (option) => `
                    <option value="${option.label}">${option.value}</option>`,
                )
                .join('')}
                </select>
            </div>

             <div class="form-row row-1">
                <label for="dateOfBirth">Ngày sinh</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth">
            </div>

            <div class="form-row row-1">
                <label for="phoneNumber">Số điện thoại</label>
                <input type="text" id="phoneNumber" name="phoneNumber">
            </div>

            <div class="form-row row-1">
                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password">
            </div>
            <input type="submit" value="ĐĂNG KÍ">
        `;

        document.body.appendChild(box);

        box.addEventListener('submit', async (event) => {
            event.preventDefault();

            const box = event.target;

            const phoneNumber = box.querySelector("#phoneNumber").value;
            const password = box.querySelector("#password").value;
            const username = box.querySelector("#username").value;
            const dateOfBirth = box.querySelector("#dateOfBirth").value;

            var isSuccess = await this.game.game.handleSubmitSignUp({
                phoneNumber: phoneNumber,
                password: password,
                name: username,
                schoolId: "1",
                grade: "7",
                birthday: dateOfBirth
            });

            if (isSuccess) {
                this.deleteForm();
            }
        });
    }
    deleteForm() {
        const box = document.getElementById('box');
        if (box) {
            document.body.removeChild(box);
        }
    }

    getUsername() { }

    getPassword() { }

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
        // this.inputName.addEventListener('blur', () => {
        //     this.validateInput(this.inputName);
        // });
        // this.inputDayOfBirth.addEventListener('blur', () => {
        //     this.validateInput(this.inputDayOfBirth);
        // });
        // this.inputNumberPhone.addEventListener('blur', () => {
        //     this.validateInput(this.inputNumberPhone);
        // });
        // this.inputPassWord.addEventListener('blur', () => {
        //     this.validateInput(this.inputPassWord);
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
            '../assets/Asset/GameObject/SunflowerCatSpriteWalkBlink.png',
        );
        this.signinForm = new SigninForm(this);
        this.btnLogIn = new btnLogIn(this.game);
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
