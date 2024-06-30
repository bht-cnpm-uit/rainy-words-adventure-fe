import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Player } from './Player/player';
import { Background } from './background';
import { Score, BonusItems, BoardStopGame, BtnGameState, BoardEndWordCollect } from './UI';
import { WordFall } from './wordFall';
const GameState =
{
    0: 'Loss',
    1: 'Stop',
    2: 'Win',
    3: 'Playing'
}
const WordCollect = props => {
    const canvasRef = useRef()
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Game {
        constructor(canvas, ctx) {
            this.props = props
            this.ctx = ctx;
            this.canvas = canvas;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.spriteHeightBG = 1080;
            this.gameFrame = 0;
            this.deltaTime = null;
            this.gameState = GameState[3];
            this.wordTimer = 0;
            this.wordInterval = 2000;
            this.scale = this.height / this.spriteHeightBG;
            this.scaleX = 1;
            this.scaleY = 1;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.wordFall = new WordFall(this);
            this.listWordCollect = [];
            this.background = new Background(this);
            this.Score = new Score(this);
            this.btnGameState = new BtnGameState(this);
            this.bonusItems = new BonusItems(this);
            this.player = new Player(this);
            this.boardStopGame = new BoardStopGame(this);
            this.boardEndWordCollect = new BoardEndWordCollect(this);
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.scaleX = window.innerWidth / this.width;
            this.scaleY = window.innerHeight / this.height;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.height = this.height;
            canvas.style.width = this.width;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.player.updatePositionPlayer();
            this.wordFall.updatePositionItems();
            this.btnGameState.updatePosition();
            this.boardStopGame.updatePosition();
            this.background.updatePosition();
            this.boardEndWordCollect.updatePosition();
        }
        updateResult() {
            this.props.setResult({
                "noWords": this.listWordCollect.length,
                "score": this.Score.score,
                "bonus":
                {
                    "item1": this.bonusItems.noItems0,
                    "item2": this.bonusItems.noItems1,
                    "item3": this.bonusItems.noItems2,
                }
            })
        }
        updateGameState(state) {
            this.gameState = GameState[state];
            if (state === 2) {
                this.props.setlistwordcollect(this.listWordCollect);
                this.boardEndWordCollect.hidden = false;
                this.boardEndWordCollect.animateCountDown();
            }
            else if (state === 0) {
                this.boardEndWordCollect.hidden = false;
            }
        }
        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (!this.boardStopGame.hidden) {
                for (const buttonKey in this.boardStopGame.buttons) {
                    if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons[buttonKey])) {
                        this.boardStopGame.buttons[buttonKey].onClickButton(this.boardStopGame.buttons[buttonKey].type);
                        return;
                    }
                }
            }
            else if (!this.boardEndWordCollect.hidden) {
                if (this.gameState === 'Win') {
                    if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.play)) {
                        this.boardEndWordCollect.buttons.play.onClickButton('end_collect_play');
                        return;
                    }
                }
                else if (this.gameState === 'win') {
                    if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.replay)) {
                        this.boardEndWordCollect.buttons.play.onClickButton('replay');
                        return;
                    }
                    else if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.back)) {
                        this.boardEndWordCollect.buttons.play.onClickButton('back');
                        return;
                    }
                }
            }
            else if (this.isMouseOverButton(mouseX, mouseY, this.btnGameState)) {
                if (this.gameState === 'Playing') {
                    this.updateGameState(1);
                }
                else if (this.gameState === "Stop") {
                    this.updateGameState(3);
                }
                this.boardStopGame.updateState(!this.boardStopGame.hidden);
            }
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (!this.boardStopGame.hidden) {
                for (const buttonKey in this.boardStopGame.buttons) {
                    if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons[buttonKey])) {
                        cursorStyle = 'pointer';
                    }
                }
            }
            else if (!this.boardEndWordCollect.hidden) {
                if (this.gameState === 'Win') {
                    if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.play)) {
                        cursorStyle = 'pointer';
                    }
                }
                else if (this.gameState === 'win') {
                    if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.replay)) {
                        cursorStyle = 'pointer';
                    }
                    else if (this.isMouseOverButton(mouseX - this.boardEndWordCollect.translateX, mouseY - this.boardEndWordCollect.translateY, this.boardEndWordCollect.buttons.back)) {
                        cursorStyle = 'pointer';
                    }
                }
            }
            else {
                if (this.isMouseOverButton(mouseX, mouseY, this.btnGameState)) {
                    cursorStyle = 'pointer';
                }
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
        update(deltaTime) {
            this.deltaTime = deltaTime;
            if (this.gameState === 'Playing') {
                this.gameFrame++;
                this.wordFall.update();
                this.player.update(deltaTime, this.wordFall.words);
                if (this.wordTimer > this.wordInterval) {
                    this.wordFall.addNewItem();
                    this.wordTimer = 0;
                } else {
                    this.wordTimer += deltaTime;
                }
            }
        }
        draw(context) {
            this.background.draw(context)
            this.wordFall.draw(context);
            this.bonusItems.draw(context);
            this.player.draw(context);
            this.btnGameState.draw(context);
            this.Score.draw(context);
            this.boardStopGame.draw(context);
            this.boardEndWordCollect.draw(context);
        }
    }
    useEffect(() => {
        const canvas = document.getElementById('responsive-canvas');
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const game = new Game(canvas, context);
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            game.draw(context);
            game.update(deltaTime);
            requestAnimationFrame(animate);
        }

        let lastTime = 0; // Initialize lastTime
        animate(0);

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);
    return <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>
}
export default WordCollect;