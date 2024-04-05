import React, { useState, useRef, useEffect } from 'react';
import { Background } from './background';
import { Levels } from './level';
import { Player } from './player';
import { BtnBackMap, BtnNextMap, Guide, Library, Achievement, Account } from './button';
import { LevelSetting } from './UI';
const Level = props => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class MainScreen {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.canvas.style.cursor = 'default'
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.levels = new Levels(this);
            this.btnNextMap = new BtnNextMap(this);
            this.btnBackMap = new BtnBackMap(this);
            this.btnGuide = new Guide(this);
            this.btnLibrary = new Library(this);
            this.btnAchievement = new Achievement(this);
            this.btnAccount = new Account(this);
            this.levelSetting = new LevelSetting(this);
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
            if (!this.levelSetting.hidden) {
                if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.close)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.back)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.next)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.play)) {
                    cursorStyle = 'pointer';
                }

            }
            else if (this.isMouseOverButton(mouseX, mouseY, this.btnNextMap) || this.isMouseOverButton(mouseX, mouseY, this.btnBackMap)) {
                cursorStyle = 'pointer';
            }
            else {
                // // Check if the mouse is over any level
                for (const level of this.levels.levels) {
                    if (this.isMouseOverLevel(mouseX, mouseY, level)) {
                        cursorStyle = 'pointer'; // Change cursor style to pointer
                    }
                }
            }
            // Check if the mouse is over the next map button
            // Apply the cursor style
            this.canvas.style.cursor = cursorStyle;
        }
        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.close)) {
                this.levelSetting.close();
            }
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.back)) {
            }
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.next)) {
            }
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.play)) {
                //  play
                window.location.href = '/word-collect';
            }
            // Check if the mouse is over the next map button
            else if (this.levelSetting.hidden) {
                if (this.isMouseOverButton(mouseX, mouseY, this.btnNextMap)) {
                    this.background.onclick(1);
                    this.levels.onclickNextMap(-1);
                    return;
                }
                // Check if the mouse is over the back map button
                else if (this.isMouseOverButton(mouseX, mouseY, this.btnBackMap)) {
                    this.background.onclick(-1);
                    this.levels.onclickNextMap(1);
                    return;
                }
                else {
                    this.levels.levels.forEach(level => {
                        if (this.isMouseOverLevel(mouseX, mouseY, level)) {
                            // this.player.updateCurrentLayer(level)
                            this.levelSetting.open(level, this.ctx);
                            return;
                        }
                    });
                }
            }
        }

        // Function to check if the mouse is over a level
        isMouseOverLevel(mouseX, mouseY, level) {
            return (
                mouseX >= level.position.x + this.levels.width / 5 &&
                mouseX <= level.position.x + this.levels.width / 1.5 &&
                mouseY >= level.position.y + this.levels.height / 5 &&
                mouseY <= level.position.y + this.levels.height / 1.5
            );
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
        update(deltaTime) {
            this.gameFrame++;
            this.background.update(deltaTime);
            this.levels.update(deltaTime);
            this.player.update(deltaTime);
        }
        draw(context) {
            this.background.draw(context);
            this.levels.draw(context);
            this.player.draw(context)
            this.btnNextMap.draw(context);
            this.btnBackMap.draw(context);
            this.btnGuide.draw(context);
            this.btnLibrary.draw(context);
            this.btnAchievement.draw(context);
            this.btnAccount.draw(context);
            this.levelSetting.draw(context);
            // for (const level of this.levels.levels) {
            //     if (level.state === 'Current') {
            //         this.player.draw(context, level.position);
            //         break;
            //     }
            // }
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, canvas.width, canvas.height);
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            mainScreen.update(deltaTime);
            mainScreen.draw(context);
            requestAnimationFrame(animate);
        }

        let lastTime = 0; // Initialize lastTime
        animate(0);

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return (
        <canvas ref={canvasRef} {...props} />
    );

}

export default Level;
