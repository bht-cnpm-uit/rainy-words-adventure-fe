import React, { useState, useRef, useEffect } from 'react';
import { BoardResult } from './UI';
import { Background } from '../WordCollect/background';
import { useNavigate } from 'react-router-dom';
const Result = (props) => {
    const navigate = useNavigate();
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class MainScreen {
        constructor(canvas, ctx, navigate) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.spriteHeightBG = 1080;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.gameFrame = 0;
            this.deltaTime = null;
            this.result = props.result;
            this.diffLevel = props.diffLevel;
            this.time = props.elapsedTime;
            this.ressavegame = props.ressavegame;
            this.navigate = navigate;
            this.background = new Background(this);
            this.boardResult = new BoardResult(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.height = this.height;
            canvas.style.width = this.width;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.boardResult.updatePosition();
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (this.isMouseOverButton(mouseX, mouseY, this.boardResult.buttonNext)) {
                cursorStyle = 'pointer';
            }
            this.canvas.style.cursor = cursorStyle;
        }
        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            if (this.isMouseOverButton(mouseX, mouseY, this.boardResult.buttonNext)) {
                this.navigate('/level', {
                    state: {
                        ...props.ressavegame
                    }
                });
            }
        }
        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            );
        }
        update(deltaTime) {
            this.deltaTime = deltaTime;
            this.gameFrame++;
        }
        draw(context) {
            this.background.draw(context);
            this.boardResult.draw(context);
        }
    }
    useEffect(() => {
        const canvas = document.getElementById('responsive-canvas');
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, navigate);
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            mainScreen.draw(context);
            mainScreen.update(deltaTime);
            requestAnimationFrame(animate);
        }
        let lastTime = 0; // Initialize lastTime
        animate(0);

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>
};

export default Result;
