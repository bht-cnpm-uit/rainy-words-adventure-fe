
import { Background } from './background';
import React, {useEffect, useRef } from 'react';

const SignIn = (props) => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Home {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
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

        onResize(envent) {
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
            this.background.btnLogIn.draw(context);
        }
        update() {
            this.gameFrame++;
            this.background.update();
        }

        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left; // x of item
            const mouseY = event.clientY - rect.top; // y of item
            let cursorStyle = 'defaut';
            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnLogIn)) {
                window.location.href = '/login';
            }
            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.spriteWidth * this.scale / 1.4 &&
                mouseY >= button.y  * this.scale / 1.4 &&
                mouseY <= button.y + + button.spriteHeight * this.scale / 1.4
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.btnLogIn)) {
                cursorStyle = 'pointer';
            }

            this.canvas.style.cursor = cursorStyle;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const home = new Home(canvas, context, canvas.width, canvas.height);
        function animate() {
            home.gameFrame++;
            home.draw(context);
            home.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas id='responsive-canvas' ref={canvasRef} {...props} />;
};

export default SignIn;
