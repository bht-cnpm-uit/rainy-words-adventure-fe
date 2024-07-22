import React, { useEffect, useRef, useState } from 'react';
import { handleSignUp } from '../../services/userServices';
import { getAllSchools } from '../../services/schoolServices';
import { useNavigate } from 'react-router-dom';
import { Background } from './background';
const SignUp = (props) => {
    const canvasRef = useRef();
    const navigate = useNavigate();
    const [dataSchool, setDataSchool] = useState([]);

    function resizeCanvas(canvas) {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    async function handleSubmitSignUp(values) {
        try {
            let data = await handleSignUp(values);
            if (data && data.errCode == 0) {
                window.location.href = '/login';
            }
        } catch (error) {
            alert("Vui lòng nhập đủ thông tin!")
            console.error("Error during sign up: ", error);
        }
        return 0;
    }

    class Home {
        constructor(canvas, ctx, dataSchool) {
            this.handleSubmitSignUp = handleSubmitSignUp.bind(this);
            this.canvas = canvas;
            this.ctx = ctx;
            this.dataSchool = dataSchool;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.spriteWidthBG = 1080;
            this.scale = this.height / this.spriteWidthBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.gameFrame = 0;
            this.background = new Background(this, this.dataSchool);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }

        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.scale = this.height / this.spriteWidthBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
        }

        draw(context) {
            this.background.draw(context);
            this.background.btnSignUp.draw(context);
        }

        update() {
            this.gameFrame++;
            this.background.update();
        }

        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnSignUp)) {
                window.location.href = '/login';
            }
            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.spriteWidth * this.scale / 1.4 &&
                mouseY >= button.y * this.scale / 1.4 &&
                mouseY <= button.y + button.spriteHeight * this.scale / 1.4
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnSignUp)) {
                cursorStyle = 'pointer';
            }

            this.canvas.style.cursor = cursorStyle;
        }
    }

    useEffect(() => {
        async function getSchools() {
            try {
                let dataSchool = await getAllSchools();
                if (dataSchool && dataSchool.errCode === 0) {
                    setDataSchool(dataSchool.listSchool);
                }
            } catch (error) {
                console.error("Error during fetch data schools: ", error);
            }
        }
        getSchools();
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('responsive-canvas');
        if (canvas) {
            resizeCanvas(canvas);
            const context = canvas.getContext('2d');
            const home = new Home(canvas, context, dataSchool);
            function animate() {
                home.draw(context);
                home.update();
                requestAnimationFrame(animate);
            }
            animate();

            return () => {
                window.removeEventListener('resize', home.onResize);
                canvas.removeEventListener('mousemove', home.onMouseMove);
                canvas.removeEventListener('click', home.onClick);
            };
        }
    }, [dataSchool]);

    return <canvas id="responsive-canvas" ref={canvasRef} {...props} />;
};

export default SignUp;
