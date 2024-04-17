import React, { useState, useRef, useEffect } from 'react';
import { BoardResult } from './UI';
import { Background } from './background';
const Result = (props) => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class MainScreen {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.boardResult = new BoardResult(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }
        onMouseMove(event) {

        }
        onClick(event) {

        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            );
        }
        update() {
            this.gameFrame++;
            this.background.update(this.gameFrame);
        }
        draw(context) {
            this.background.draw(context);
            this.boardResult.draw(context);
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, canvas.width, canvas.height);
        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            mainScreen.draw(context);
            mainScreen.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);

    return <canvas ref={canvasRef} {...props} />;
};

export default Result;
