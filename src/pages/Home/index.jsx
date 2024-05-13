import { Player } from './player';
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
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.scale = this.height / 1080;
            this.background = new Background(this);
            this.player = new Player(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.scale = this.height / 1080;
            this.background.onResize();
        }
        draw(context) {
            this.background.draw(context);
            // this.player.draw(context);
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
            if (this.isMouseOverButton(mouseX, mouseY, this.background.buttonStart)) {
                window.location.href = '/login';
            }
            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.spriteWidth / 2 &&
                mouseY >= button.y &&
                mouseY <= button.y + button.spriteHeight / 2
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

            if (this.isMouseOverButton(mouseX, mouseY, this.background.buttonStart)) {
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
            home.draw(context);
            home.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>;
};

export default Home;
