import { Player } from './player';
import { Background } from './background';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Guide, start } from './button';
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
            this.Guide = new Guide(this);
            this.start = new start(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.Guide.draw(context);
            this.start.draw(context);
        }

        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (this.isMouseOverButton(mouseX - this.start.translateX, mouseY - this.start.translateY, this.start)) {
                window.location.href = '/level';
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX - this.Guide.translateX, mouseY - this.Guide.translateY, this.Guide)) {
                window.location.href = '/level';
                cursorStyle = 'pointer';
            }
            this.canvas.style.cursor = cursorStyle;
        }
        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (this.isMouseOverButton(mouseX - this.start.translateX, mouseY - this.start.translateY, this.start)) {
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX - this.Guide.translateX, mouseY - this.Guide.translateY, this.Guide)) {
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
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas ref={canvasRef} {...props} />;
};

export default Home;
