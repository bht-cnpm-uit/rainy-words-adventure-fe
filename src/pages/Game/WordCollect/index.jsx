import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Player } from './player';
import { InputHandler } from './input';
import { Background } from './background';
import { Item } from './item';
import { UI } from './UI';
import { BtnGameState } from './button';
const WordFall = props => {
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
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.player = new Player(this);
            this.UI = new UI(this);
            this.btnGameState = new BtnGameState(this);
            this.score = 0;
            this.words = [];
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

            if (
                mouseX >= this.btnGameState.x &&
                mouseX <= this.btnGameState.x + this.btnGameState.width * 0.9 &&
                mouseY >= this.btnGameState.y &&
                mouseY <= this.btnGameState.y + this.btnGameState.height * 0.9
            ) {
                this.btnGameState.setState(!this.btnGameState.currentState)
            } else {
            }
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (
                mouseX >= this.btnGameState.x &&
                mouseX <= this.btnGameState.x + this.btnGameState.width * 0.9 &&
                mouseY >= this.btnGameState.y &&
                mouseY <= this.btnGameState.y + this.btnGameState.height * 0.9
            ) {
                this.canvas.style.cursor = 'pointer'; // Change cursor style to pointer
            } else {
                this.canvas.style.cursor = 'default'; // Change cursor style to default
            }
        }
        update(deltaTime) {
            if (this.gameState) {
                this.player.update(this.input.keys, this.words);
                this.background.update();
                this.words = this.words.filter(word => !word.markedForDeletion)
                if (this.wordTimer > this.wordInterval) {
                    this.#addNewWord();
                    this.wordTimer = 0;
                } else {
                    this.wordTimer += deltaTime;
                }
                this.words.forEach(word => word.update(deltaTime));
            }
        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context);
            this.words.forEach(word => word.draw(context));
            this.btnGameState.draw(context);
            this.UI.draw(context);
        }
        #addNewWord() {
            this.words.push(new Item(this));
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

        // Cleanup function
        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return (
        <canvas ref={canvasRef} {...props} />
    );
}
export default WordFall;
