import React, { useState, useRef, useEffect } from "react";
import { Background } from "../WordCollect/background";
import { BoardWordChain } from "./wordChain";

const WordChain = (props) => {
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
            this.currentWordDrug = null;
        }

        onMouseUp(event) {
            if (this.currentWordDrug) {
                this.currentWordDrug.processMouseUp();
                this.currentWordDrug.isDragging = false;
                this.currentWordDrug = null;
            }
        }

        onMouseOut(event) {
            if (this.currentWordDrug) {
                this.currentWordDrug.isDragging = false;
                this.currentWordDrug = null;
            }
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
                    this.currentWordDrug = word;
                    return;
                }
            });
            this.boardWordChain.EnglishWord.forEach(word => {
                if (this.isMouseOver(mouseX, mouseY, word)) {
                    word.isDragging = true;
                    this.currentWordDrug = word;
                    return;
                }
            });
        }

        onMouseMove(event) {
            const rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left - this.boardWordChain.translateX;
            let mouseY = event.clientY - rect.top - this.boardWordChain.translateY;
            if (this.currentWordDrug) {
                let dx = mouseX - this.startX;
                let dy = mouseY - this.startY;
                this.currentWordDrug.x += dx;
                this.currentWordDrug.y += dy;
                this.startX = mouseX;
                this.startY = mouseY;
                if (this.currentWordDrug.isMatching) {
                    this.currentWordDrug.isMatching.stickyWord(this.currentWordDrug);
                } else if (this.currentWordDrug.isMatched) {
                    this.currentWordDrug.isMatching = this.currentWordDrug.isMatched;
                    this.currentWordDrug.isMatching.stickyWord(this.currentWordDrug);
                    this.currentWordDrug.isMatched.isMatched = null;
                    this.currentWordDrug.isMatched = null;
                } else {
                    if (this.currentWordDrug.type === 'EN') {
                        this.boardWordChain.VietNameseWord.forEach(word2 => {
                            if ((this.calculateDistance(this.currentWordDrug, word2) < 50)
                                && !word2.isMatched
                            ) {
                                word2.stickyWord(this.currentWordDrug);
                                this.currentWordDrug.isMatching = word2;
                                return;
                            }
                        });
                    } else {
                        this.boardWordChain.EnglishWord.forEach(word2 => {
                            if ((this.calculateDistance(this.currentWordDrug, word2) < 50)
                                && !word2.isMatched
                            ) {
                                word2.stickyWord(this.currentWordDrug);
                                this.currentWordDrug.isMatching = word2;
                                return;
                            }
                        });
                    }
                }
            }
        }

        calculateDistance(word1, word2) {
            if (word1.type === 'EN') {
                let x1 = word1.x + word1.width;
                let y1 = word1.y + word1.height / 2;
                let x2 = word2.x;
                let y2 = word2.y + word2.height / 2;
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            } else if (word1.type === 'VI') {
                let x1 = word2.x + word2.width;
                let y1 = word2.y + word2.height / 2;
                let x2 = word1.x;
                let y2 = word1.y + word1.height / 2;
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            }
        }

        isMouseOver(mouseX, mouseY, word) {
            return (
                mouseX >= word.x &&
                mouseX <= word.x + word.width &&
                mouseY >= word.y &&
                mouseY <= word.y + word.height
            );
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
        let lastTime = 0;

        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            gameWordChain.update(deltaTime);
            gameWordChain.draw(context);
            requestAnimationFrame(animate);
        }

        animate(0);

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return <canvas ref={canvasRef} {...props} />;
};

export default WordChain;
