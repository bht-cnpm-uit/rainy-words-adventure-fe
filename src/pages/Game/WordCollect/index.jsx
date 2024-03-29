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
        constructor(ctx, width, height) {
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
        }
        update(deltaTime) {
            this.player.update(this.input, this.words);
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
        draw(context) {
            this.background.draw(context)
            this.player.draw(context);
            this.words.forEach(word => word.draw(context));
            this.btnGameState.draw(context);
            this.UI.draw(context);
        }
        #addNewWord() {
            this.words.push(new Item(this));
            // this.words.sort(function (a, b) {
            //     return a.x - b.x;
            // })
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const game = new Game(context, canvas.width, canvas.height);
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
