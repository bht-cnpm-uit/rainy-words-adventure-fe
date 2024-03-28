import React, { useState, useEffect, useRef, useMemo } from 'react';

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
            this.wordInterval = 2000;
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
            // this.words.sort(function (a, b) {
            //     return a.x - b.x;
            // })
        }
    }
    class Player {
        constructor(ctx) {
            this.ctx = ctx;
            this.width = 100;
            this.height = 100;
            this.position = {
                x: 100,
                y: window.innerHeight - this.height * 1.5
            }
            this.velocity = 0;
        }
        // update(deltaTime) {

        // }
        draw(ctx) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        update() {
            this.draw(this.ctx)
            this.position.x += this.velocity;
        }
        collision() {

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
            this.vy = Math.random() * 0.01 + 0.1;
            this.y = 0 - this.spriteHeight;
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
        const player = new Player(context); // Moved player initialization inside useEffect
        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }
        const game = new Game(context, canvas.width, canvas.height);
        addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                case 37:
                    keys.left.pressed = true;
                    break;
                case 68:
                case 39:
                    keys.right.pressed = true;
                    break;
            }
        })
        addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                case 37:
                    keys.left.pressed = false;
                    break;
                case 68:
                case 39:
                    keys.right.pressed = false;
                    break;
            }
        })
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0; // Handle initial frame
            lastTime = timeStamp;
            game.update(deltaTime);
            game.draw();
            player.update();
            if (keys.right.pressed) {
                player.velocity = Math.min(player.velocity + 0.3, 15);
            } else if (keys.left.pressed) {
                player.velocity = Math.max(player.velocity - 0.3, -15);
            } else {
                player.velocity = 0;
            }
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
    return (
        <canvas ref={canvasRef} {...props} />
    );
}
export default WordFall;
