import React, { useState, useRef, useEffect } from "react";
import { Background } from "../WordCollect/background";
import { BoardScoreChain, BoardWordChain } from "./wordChain";
import { TeacherCat } from "./player_teacher";
const GameWordChainState = {
    0: 'Playing',
    1: 'Checking',
    2: 'Checked',
    3: 'Prepare-new-game',
    4: 'Done'
}
const WordChain = (props) => {
    const canvasRef = useRef();

    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Game {
        constructor(canvas, ctx) {
            this.props = props
            this.listWords = this.props.listWordChain;
            this.ctx = ctx;
            this.canvas = canvas;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.spriteHeightBG = 1080;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.slot = 1;
            this.maxSlot = 3;
            this.score = 0;
            this.startX = null;
            this.startY = null;
            this.currentWordDrug = null;
            this.gameState = GameWordChainState[3];
            this.background = new Background(this);
            this.boardWordChain = new BoardWordChain(this);
            this.boardScoreChain = new BoardScoreChain(this);
            this.teacherCat = new TeacherCat(this);
            this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
            this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.height = this.height;
            canvas.style.width = this.width;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((2920 * this.scale - this.width) / this.scale);
            this.background.updatePosition();
            this.boardWordChain.updatePosition();
            this.boardScoreChain.updatePosition();
        }
        updateResult() {
            let score = this.props.result.score + this.score;
            this.props.setResult({
                ...this.props.result,
                'score': score
            });
        }
        updateGameState(state) {
            this.gameState = GameWordChainState[state]
            if (state === 1) {
                cancelAnimationFrame(this.boardScoreChain.timer.animationHandleTimer);
                this.boardWordChain.checkResut();
            }
            else if (state === 4) {
                this.updateResult();
                this.props.setTypegame('end-game');
            }
        }
        updateSlotGame() {
            if (this.slot + 1 > this.maxSlot) {
                this.updateGameState(4);
            }
            else {
                this.slot++;
                this.boardWordChain.createGame(this.slot - 1)
                this.updateGameState(3);
                this.boardWordChain.animatePrepareNewGame();
            }
        }
        onClick(event) {
            if (this.gameState === "Playing") {
                const rect = this.canvas.getBoundingClientRect();
                let mouseX = event.clientX - rect.left - this.boardWordChain.translateX;
                let mouseY = event.clientY - rect.top - this.boardWordChain.translateY;
                if (this.isMouseOver(mouseX, mouseY, this.boardWordChain.button)) {
                    this.updateGameState(1);
                }
            }
        }
        onMouseUp(event) {
            if (this.gameState === "Playing") {
                if (this.currentWordDrug) {
                    this.currentWordDrug.processMouseUp();
                    this.currentWordDrug.isDragging = false;
                    this.currentWordDrug = null;
                }
            }
        }

        onMouseOut(event) {
            if (this.gameState === "Playing") {
                if (this.currentWordDrug) {
                    this.currentWordDrug.isDragging = false;
                    this.currentWordDrug = null;
                }
            }
        }

        onMouseDown(event) {
            if (this.gameState === "Playing") {
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
        }

        onMouseMove(event) {
            if (this.gameState === 'Playing') {
                const rect = this.canvas.getBoundingClientRect();
                let mouseX = event.clientX - rect.left - this.boardWordChain.translateX;
                let mouseY = event.clientY - rect.top - this.boardWordChain.translateY;
                let cursorStyle = 'default';
                if (this.isMouseOver(mouseX, mouseY, this.boardWordChain.button)) {
                    cursorStyle = 'pointer';
                }
                const englishWords = this.boardWordChain.EnglishWord;
                const vietnameseWords = this.boardWordChain.VietNameseWord;

                for (let i = 0; i < englishWords.length; i++) {
                    if (this.isMouseOver(mouseX, mouseY, englishWords[i]) || this.isMouseOver(mouseX, mouseY, vietnameseWords[i])) {
                        cursorStyle = 'pointer';
                        break;
                    }
                }
                this.canvas.style.cursor = cursorStyle;
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
            if (this.gameState === 'Prepare-new-game') {
            }
            else if (this.gameState === 'Playing') {
                this.boardWordChain.update();
            }
        }
        draw(context) {
            this.background.draw(context);
            this.boardWordChain.draw(context);
            this.boardScoreChain.draw(context);
            this.teacherCat.draw(context);
        }
    }

    useEffect(() => {
        const canvas = document.getElementById('responsive-canvas');
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

    return <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>;
};

export default WordChain;
