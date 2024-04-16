import { Player } from './player';
import { Background, LogoGame, LogoDoan, LogoDoi, LogoTruong, LogoBan, LogoDoan2} from './background';
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
            this.logogame = new LogoGame(this);
            this.logoDoan = new LogoDoan(this);
            this.logoDoi = new LogoDoi(this);
            this.logoTruong = new LogoTruong(this);
            this.logoBan = new LogoBan(this);
            this.logoDoan2 = new LogoDoan2(this);
            this.player = new Player(this);
            // this.Guide = new Guide(this);
            this.start = new start(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }

        draw(context) {
            this.background.draw(context);
            this.background.drawtext(context);
            this.logogame.draw(context);
            this.logoDoan.draw(context);
            this.logoDoan2.draw(context);
            this.logoDoi.draw(context);
            this.logoTruong.draw(context);
            this.logoBan.draw(context);
       
            this.player.draw(context);
            // this.Guide.draw(context);
            this.start.draw(context);
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
            if (this.isMouseOverButton(mouseX, mouseY, this.start)) {
                window.location.href = '/login';
            } 
            // else if (this.isMouseOverButton(mouseX, mouseY, this.Guide)) {
            //     window.location.href = '/';
            // }
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

            if (this.isMouseOverButton(mouseX, mouseY, this.start)) {
                cursorStyle = 'pointer';
            } 
            // else if (this.isMouseOverButton(mouseX, mouseY, this.Guide)) {
            //     cursorStyle = 'pointer';
            // }

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
