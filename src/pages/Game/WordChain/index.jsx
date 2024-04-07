import React, { useState, useRef, useEffect } from "react";
import { Background } from "../WordCollect/background";
import { BoardWordChain } from "./wordChain";
const WordChain = props => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Game {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.canvas.style.cursor = 'default';
            this.ctx = ctx;
            this.width = canvas.width;
            this.height = canvas.height;
            this.background = new Background(this);
            this.boardWordChain = new BoardWordChain(this);
            this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
            this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
            this.startX = null;
            this.startY = null;
        }
        onMouseUp(event) {
            this.boardWordChain.VietNameseWord.forEach(word => {
                if (!word.isDragging) { return }
                else {
                    event.preventDefault();
                    word.isDragging = false;
                }
            })
            this.boardWordChain.EnglishWord.forEach(word => {
                if (!word.isDragging) { return }
                else {
                    event.preventDefault();
                    word.isDragging = false;
                }
            })
        }
        onMouseOut(event) {
            this.boardWordChain.VietNameseWord.forEach(word => {
                if (!word.isDragging) { return }
                else {
                    event.preventDefault();
                    word.isDragging = false;
                }
            })
            this.boardWordChain.EnglishWord.forEach(word => {
                if (!word.isDragging) { return }
                else {
                    event.preventDefault();
                    word.isDragging = false;
                }
            })
        }
        onMouseDown(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left - this.boardWordChain.translateX;
            let mouseY = event.clientY - rect.top - this.boardWordChain.translateY;
            this.startX = mouseX;
            this.startY = mouseY;
            this.boardWordChain.VietNameseWord.forEach(word => {
                if (this.isMouseOver(mouseX, mouseY, word)) {
                    word.isDragging = true;
                }
            })
            this.boardWordChain.EnglishWord.forEach(word => {
                if (this.isMouseOver(mouseX, mouseY, word)) {
                    word.isDragging = true;
                }
            })
        }
        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left - this.boardWordChain.translateX;
            let mouseY = event.clientY - rect.top - this.boardWordChain.translateY;
            let cursorStyle = 'default';
            this.boardWordChain.VietNameseWord.forEach(word => {
                if (word.isDragging) {
                    let dx = mouseX - this.startX;
                    let dy = mouseY - this.startY;
                    word.x += dx;
                    word.y += dy;
                    word.draw(this.ctx, 'VI');
                    this.startX = mouseX;
                    this.startY = mouseY;
                    this.boardWordChain.EnglishWord.forEach(word2 => {
                        if (this.calculateDistance(word, word2) < 200)
                            console.log("close")
                    })
                }
                else word.isDragging = false;
            })
            this.boardWordChain.EnglishWord.forEach(word => {
                if (word.isDragging) {
                    let dx = mouseX - this.startX;
                    let dy = mouseY - this.startY;
                    word.x += dx;
                    word.y += dy;
                    word.draw(this.ctx, 'EN');
                    this.startX = mouseX;
                    this.startY = mouseY;
                    this.boardWordChain.VietNameseWord.forEach(word2 => {
                        if (this.calculateDistance(word, word2) < 200)
                            console.log("close")
                    })
                }
                else word.isDragging = false;
            })
        }
        calculateDistance(word1, word2) {
            return Math.sqrt((word1.x - word2.x) * (word1.x - word2.x) + (word1.y - word2.y) * (word1.y - word2.y))
        }
        isMouseOver(mouseX, mouseY, word) {
            return (
                mouseX >= word.x &&
                mouseX <= word.x + word.width &&
                mouseY >= word.y &&
                mouseY <= word.y + word.height
            )
        }
        update(deltaTime) {
            this.background.update();
            this.boardWordChain.update();
        }
        draw(context) {
            this.background.draw(context);
            this.boardWordChain.draw(context);
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const gameWordChain = new Game(canvas, context);
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            gameWordChain.update(deltaTime);
            gameWordChain.draw(context);
            requestAnimationFrame(animate);
        }
        let lastTime = 0;
        animate(0);
        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);
    return (
        <canvas ref={canvasRef} {...props} />
    )
}

export default WordChain;