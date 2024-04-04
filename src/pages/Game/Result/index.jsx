import React, { useState, useRef, useEffect } from 'react';
import { ShowResult } from './UI';
import { Player } from './player';
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
            this.canvas.style.cursor = 'default';
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.showResult = new ShowResult(this);
            this.background = new Background(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            this.gameFrame = 0;
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
            let cursorStyle = 'default'; // Default cursor style

            //check if the mouse is over closs setting board

            if (
                this.isMouseOverButton(
                    mouseX - this.showResult.translateX,
                    mouseY - this.showResult.translateY,
                    this.showResult.buttons.next,
                )
            ) {
                cursorStyle = 'pointer';
            }
            // Check if the mouse is over the next map button
            // Apply the cursor style
            this.canvas.style.cursor = cursorStyle;
        }
        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (
                this.isMouseOverButton(
                    mouseX - this.showResult.translateX,
                    mouseY - this.showResult.translateY,
                    this.showResult.buttons.next,
                )
            ) {
                //  next
                window.location.href = '/final';
            }
        }

        // Function to check if the mouse is over a button
        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            );
        }
        update(deltaTime) {}
        draw(context) {
            this.background.draw(context);
            this.showResult.draw(context);
            this.player.draw(context);
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, canvas.width, canvas.height);

        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // const deltaTime = timeStamp - lastTime || 0;
            // lastTime = timeStamp;
            // mainScreen.update(deltaTime);
            mainScreen.draw(context);
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return <canvas ref={canvasRef} {...props} />;
};

export default Result;
