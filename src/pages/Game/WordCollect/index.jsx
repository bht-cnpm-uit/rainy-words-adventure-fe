import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Player } from './Player/player';
import { Background } from './background';
import { Score, BonusItems, BoardStopGame, BtnGameState } from './UI';
import { WordFall } from './wordFall';
const WordCollect = props => {
    const canvasRef = useRef()
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Game {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.canvas.style.cursor = 'default'
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.gameFrame = 0;
            this.background = new Background(this);
            this.Score = new Score(this);
            this.btnGameState = new BtnGameState(this);
            this.bonusItems = new BonusItems(this);
            this.player = new Player(this);
            this.boardStopGame = new BoardStopGame(this);
            this.wordFall = new WordFall(this);
            this.wordTimer = 0;
            this.wordInterval = 2000;
            this.gameState = 1;
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }
        updateGameState(state) {
            this.gameState = state;
        }
        onClick(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.back)) {
                window.location.href = '/level';
            }
            else if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.replay)) {
                this.boardStopGame.updateState(!this.boardStopGame.hidden);
                this.btnGameState.setState(!this.btnGameState.currentState)
            }
            else if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.continue)) {
                this.boardStopGame.updateState(!this.boardStopGame.hidden);
                this.btnGameState.setState(!this.btnGameState.currentState)
            }
            else if (this.isMouseOverButton(mouseX, mouseY, this.btnGameState)) {
                this.boardStopGame.updateState(!this.boardStopGame.hidden);
                this.btnGameState.setState(!this.btnGameState.currentState)
            }
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            let cursorStyle = 'default';
            if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.back)) {
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.replay)) {
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX - this.boardStopGame.translateX, mouseY - this.boardStopGame.translateY, this.boardStopGame.buttons.continue)) {
                cursorStyle = 'pointer';
            }
            else if (this.isMouseOverButton(mouseX, mouseY, this.btnGameState)) {
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
        update(deltaTime) {
            if (this.gameState) {
                this.gameFrame++;
                this.background.update(this.gameFrame);
                this.wordFall.update(deltaTime);
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
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const game = new Game(canvas, context, canvas.width, canvas.height);
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

    return (
        <canvas
            ref={canvasRef} {...props} />
    );
}
export default WordCollect;
