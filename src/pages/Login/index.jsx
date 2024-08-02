import { Background } from './background';
import { useEffect, useRef } from 'react';
import { handleLogin } from '../../services/userServices';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
const Login = (props) => {
    const canvasRef = useRef();
    const dispatch = useDispatch();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    async function handleSubmitLogin(values) {
        try {
            let data = await handleLogin(values.phoneNumber, values.password)
            if (data && data.student) {
                if (data.student.phoneNumber === 'admin') {
                    localStorage.setItem('authToken', 'admin');
                    window.location.href = '/admin';
                } else {
                    localStorage.setItem('authToken', 'user');
                    dispatch(userActions.login(data.student));
                    window.location.href = '/level';
                }
            }
        } catch (error) {
            // alert('Tên đăng nhập hoặc mật khẩu không đúng !!!');
            // console.error('Error during login:', error);
        }
        return 0;
    }
    class Home {
        constructor(canvas, ctx) {
            this.handleSubmitLogin = handleSubmitLogin.bind(this);
            this.ctx = ctx;
            this.canvas = canvas;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.spriteWidthBG = 1080;
            this.scale = this.height / this.spriteWidthBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.gameFrame = 0;
            this.background = new Background(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize() {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.width = this.width;
            canvas.style.height = this.height;
            this.scale = this.height / this.spriteWidthBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
        }
        draw(context) {
            this.background.draw(context);
            this.background.btnSignIn.draw(context);
        }
        update() {
            this.gameFrame++;
            this.background.update();
        }

        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'defaut';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnSignIn)) {
                window.location.href = '/signup';
            }

            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + (button.spriteWidth * this.scale) / 1.4 &&
                mouseY >= button.y + (button.spriteHeight * this.scale) / 2.8 &&
                mouseY <= button.y + (button.spriteHeight * this.scale) / 1.4
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnSignIn)) {
                cursorStyle = 'pointer';
            }
            this.canvas.style.cursor = cursorStyle;
        }
    }

    useEffect(() => {
        const canvas = document.getElementById('responsive-canvas');
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const home = new Home(canvas, context);
        function animate() {
            home.gameFrame++;
            home.draw(context);
            home.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas id="responsive-canvas" ref={canvasRef} {...props}></canvas>;
};

export default Login;
