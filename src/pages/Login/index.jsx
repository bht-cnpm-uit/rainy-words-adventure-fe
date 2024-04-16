import { Player } from './player';
import { Background, LogoGame, LoginForm } from './background';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { btnSignIn, btnLogin } from './button';
const Login = (props) => {
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
            this.loginForm = new LoginForm(this);
            this.player = new Player(this);
            this.btnSignIn = new btnSignIn(this);
            this.btnLogin = new btnLogin(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            this.loginForm.checkInput();
        }

        draw(context) {
            this.background.draw(context);
            this.logogame.draw(context);
            this.loginForm.draw(context);
            this.player.draw(context);
            this.btnSignIn.draw(context);
            this.btnLogin.drawLogin(context);
        }
        update(){
            this.gameFrame++;
            this.background.update(this.gameFrame);
        }

        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left; // x of item
            const mouseY = event.clientY - rect.top; // y of item
            let cursorStyle = 'defaut';
            if (this.isMouseOverButton(mouseX, mouseY, this.btnLogin)) {
                if (
                    this.loginForm.validateInput(this.loginForm.inputUsername) &&
                    this.loginForm.validateInput(this.loginForm.inputPassword)
                    
                ) {
                    window.location.href = '/level';
                }
            }
            else if (this.isMouseOverButton(mouseX, mouseY, this.btnSignIn)) {
                window.location.href = '/signin';
            }
            this.canvas.style.cursor = cursorStyle;
        }

        isMouseOverButton(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.spriteWidth/3 &&
                mouseY >= button.y &&
                mouseY <= button.y + button.spriteHeight/3
            );
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';

           if (this.isMouseOverButton(mouseX  , mouseY , this.btnLogin)) {
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX  , mouseY , this.btnSignIn)){
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

export default Login;
