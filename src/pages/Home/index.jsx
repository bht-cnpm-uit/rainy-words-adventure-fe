import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Background } from './background';

const Home = (props) => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Home {
        constructor(canvas, ctx) {
            this.ctx = ctx;
            this.canvas = canvas;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.spriteWidthBG = 1080;
            this.scale = this.height / this.spriteWidthBG;
            this.gameFrame = 0;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.background = new Background(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.width = this.width;
            canvas.style.height = this.height;
            this.scale = this.height / this.spriteWidthBG;

            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.background.onResize(this);
        }
        draw(context) {
            this.background.draw(context);
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
            if (this.isMouseOverButton(mouseX, mouseY, this.background.logoGame.buttonStart)) {
                window.location.href = '/login';
            }
            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            console.log(button)
            return (
                mouseX >= button.x - button.width / 2 &&
                mouseX <= button.x - button.width / 2 + button.spriteWidth / 2 &&
                mouseY >= button.y - button.height / 2 &&
                mouseY <= button.y - button.height / 2 + button.spriteHeight / 2
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.logoGame.buttonStart)) {
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
    return <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>;
};

export default Home;
