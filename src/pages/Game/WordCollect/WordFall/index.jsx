import React, { useState, useEffect, useRef, useMemo } from 'react';
import useAnimation from '../useAnimation';

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
            this.words = [];
            this.wordTimer = 0;
            this.wordInterval = 500;
        }
        update(deltaTime) {
            this.words = this.words.filter(word => !word.markedForDeletion)
            if (this.wordTimer > this.wordInterval) {
                this.#addNewWord();
                this.wordTimer = 0;
            } else {
                this.wordTimer += deltaTime;
            }
            this.words.forEach(word => word.update(deltaTime));
        }
        draw() {
            this.words.forEach(word => word.draw(this.ctx));
        }
        #addNewWord() {
            this.words.push(new item(this));
        }
    }
    class Word {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
        }
        update(deltaTime) {

        }
        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight);
        }
    }
    class item extends Word {
        constructor(game) {
            super(game);
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.vy = Math.random() * 0.1 + 0.1;
            this.y = 0;
            this.x = Math.random() * this.game.width;
            this.image = new Image;
            this.image.src = "./src/assets/Asset/Map1/GameObject_cut/tile000.png";
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += this.vy * deltaTime;
            if (this.y > this.game.height) this.markedForDeletion = true;
        }
        draw(ctx) {
            super.draw(ctx);
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const game = new Game(context, canvas.width, canvas.height);
        let lastTime = 1;
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            game.update(deltaTime);
            game.draw();
            console.log(game.words);
            requestAnimationFrame(animate);
        }
        animate(0);
    }, [])
    return (
        <canvas ref={canvasRef} {...props} />
    );
}
export default WordFall;
