class Layer {
    constructor(game, spriteWidth, spriteHeight, src) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.image = new Image();
        this.image.src = src;
        this.x = 0;
        this.y = 0;
    }
    update() {}
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
        context.drawImage(
            this.layerImage1.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.layerImage1.x,
            0,
            this.width,
            this.height,
        );
        context.drawImage(
            this.layerImage1.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.layerImage1.x + this.width,
            0,
            this.width,
            this.height,
        );
        context.drawImage(
            this.layerImage2.image,
            0,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerImage2.x,
            0,
            this.width,
            this.height,
        );
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
        this.layerLogo = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/Logo.png',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerLogo.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerLogo.x + this.width / 2,
            100,
            this.width / 3,
            this.height / 3,
        );
        context.save();
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

export class SignInForm {
    constructor(game) {
        this.game = game;
        this.spriteHeight = 1084;
        this.spriteWidth = 1508;
        this.statusCheck = true;
        this.width = this.game.width;
        this.height = this.game.height;
        this.scaleY = this.height / this.spriteHeight;
        this.layerForm = new Layer(
            this.game,
            this.spriteWidth,
            this.spriteHeight,
            '../assets/Asset/SignInForm.png',
        );
        this.inputName = this.createInput(
            'text',
            'Họ và tên: ',
            `${this.width * 0.4905}px`,
            `${this.height * 0.33}px`,
            `${this.width / 4}px`,
            `${this.height / 20}px`,
            'Nhập họ và tên',
        );
        this.selectSchoolName = this.createSelectBox(
            'Trường: ',
            `${this.width * 0.502}px`,
            `${this.height * 0.4}px`,
            `${this.width / 4}px`,
            `${this.height / 20}px`,
            optionSchools,
        );
        this.selectClass = this.createSelectBox(
            'Lớp: ',
            `${this.width * 0.517}px`,
            `${this.height * 0.47}px`,
            `${this.width / 20}px`,
            `${this.height / 20}px`,
            optionGrades,
        );
        this.inputDayOfBirth = this.createInput(
            'date',
            'Ngày sinh: ',
            `${this.width * 0.488}px`,
            `${this.height * 0.54}px`,
            `${this.width / 10}px`,
            `${this.height / 20}px`,
            'Nhập ngày sinh',
        );
        this.inputNumberPhone = this.createInput(
            'text',
            'SĐT: ',
            `${this.width * 0.516}px`,
            `${this.height * 0.61}px`,
            `${this.width / 4}px`,
            `${this.height / 20}px`,
            'Nhập số điện thoại',
        );
        this.inputPassWord = this.createInput(
            'password',
            'Mật khẩu: ',
            `${this.width * 0.492}px`,
            `${this.height * 0.68}px`,
            `${this.width / 4}px`,
            `${this.height / 20}px`,
            'Nhập mật khẩu',
        );
    }
    update() {}
    draw(context) {
        let widthCut = Math.ceil((this.spriteWidth * this.scaleY - this.width) / this.scaleY);
        context.drawImage(
            this.layerForm.image,
            widthCut,
            0,
            this.spriteWidth - widthCut,
            this.spriteHeight,
            this.layerForm.x + this.width / 5,
            this.height / 4,
            this.width / 1.5,
            this.height / 1.5,
        );
        context.save();
    }

    createInput(type, labelText, left, top, width, height, placeholder) {
        const container = document.createElement('div'); // create div
        container.style.position = 'absolute';
        container.style.left = left;
        container.style.top = top;

        const label = document.createElement('span'); //create span includes lable
        label.textContent = labelText;
        label.style.paddingRight = '20px';
        label.style.textAlign = 'right'; // Căn lề bên phải cho labelText

        container.appendChild(label);

        const input = document.createElement('input'); // create input
        input.type = type;
        input.style.width = width; // set width
        input.style.height = height; // set height
        input.placeholder = placeholder; // add placeholder
        input.style.paddingLeft = '10px';
        input.style.borderRadius = '10px';

        container.appendChild(input);
        document.body.appendChild(container);
        return input;
    }

    getUsername() {}

    getPassword() {}

    createSelectBox(labelText, left, top, width, height, options) {
        const container = document.createElement('div'); // create div includes option box
        container.style.position = 'absolute';
        container.style.left = left;
        container.style.top = top;

        const label = document.createElement('label'); // create label
        label.textContent = labelText;
        label.style.paddingRight = '20px';
        container.appendChild(label);

        const selectBox = document.createElement('select');
        selectBox.style.width = width;
        selectBox.style.height = height;
        selectBox.style.borderRadius = '10px';
        // create options
        Array.prototype.forEach.call(options, (option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.value;
            optionElement.style.paddingRight = '30px';
            selectBox.appendChild(optionElement);
        });

        container.appendChild(selectBox);
        document.body.appendChild(container);
        return selectBox;
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
        this.inputName.addEventListener('blur', () => {
            this.validateInput(this.inputName);
        });

        this.inputDayOfBirth.addEventListener('blur', () => {
            this.validateInput(this.inputDayOfBirth);
        });

        this.inputNumberPhone.addEventListener('blur', () => {
            this.validateInput(this.inputNumberPhone);
        });

        this.inputPassWord.addEventListener('blur', () => {
            this.validateInput(this.inputPassWord);
        });
    }
}
