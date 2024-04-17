import { Player } from './player';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Background } from './backgroundNew';
import { start } from './button';
const Home = (props) => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Home {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
        }
        update() {
            this.gameFrame++;
            this.background.update(this.gameFrame);
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
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const home = new Home(canvas, context, canvas.width, canvas.height);
        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            home.draw(context);
            home.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas ref={canvasRef} {...props} />;
};

export default Home;
