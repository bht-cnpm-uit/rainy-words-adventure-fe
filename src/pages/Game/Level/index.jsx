import React, { useState, useRef, useEffect } from 'react';
import { Background } from './background';
import { Levels } from './level';
import { Player } from './player';
import { BtnBackMap, BtnNextMap, Guide, Library, Achievement, Account } from './button';
import { LevelSetting } from './UI';
import { Component } from 'react';
import PopUpInstruc from './PopUpInstruc';
import PopUpAcc from './PopUpAcc';
import PopUpLibrary from './PopUpLibrary';
import PopUpRank from './PopUpRank';
import CongratNewLevel from './CongratNewLevel';
import { set } from 'react-hook-form';
import { configSelector } from '../../../redux/selectors';
import { useSelector } from 'react-redux';
const Level = props => {
    const canvasRef = useRef();
    const animationRef = useRef();
    const mainScreenRef = useRef();

    const resizeCanvas = (canvas) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupAcc, setOpenPopupAcc] = useState(false);
    const [openPopupLib, setOpenPopupLib] = useState(false);
    const [openPopupRank, setOpenPopupRank] = useState(false);
    const [openCongratNewLevel, setOpenCongratNewLevel] = useState(true);
    const [mode, setMode] = useState(useSelector(configSelector));

    const HandleRemovePopUp = () => setOpenPopup(false);
    const HandleRemovePopUpAcc = () => setOpenPopupAcc(false);
    const HandleRemovePopUpLib = () => setOpenPopupLib(false);
    const HandleRemovePopUpRank = () => setOpenPopupRank(false);
    const HandleRemoveCongratNewLevel = () => setOpenCongratNewLevel(false);

    class MainScreen {
        constructor(canvas, ctx, mode) {
            this.canvas = canvas;
            this.canvas.style.width = window.innerWidth;
            this.canvas.style.height = window.innerHeight;
            this.ctx = ctx;
            this.mode = mode;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.spriteHeightBG = 1580;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((7920 * this.scale - this.width) / this.scale);
            this.scaleX = 1;
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
            this.gameFrame = 0;
            this.slide = false;
            this.deltaTime = null;
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
        }
        updateMode(mode) {
            this.mode = mode
        }
        onResize(event) {
            var canvas = document.getElementById('responsive-canvas');
            resizeCanvas(canvas);
            this.scaleX = window.innerWidth / this.width;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            canvas.style.height = this.height;
            canvas.style.width = this.width;
            this.scale = this.height / this.spriteHeightBG;
            this.widthCut = Math.ceil((7920 * this.scale - this.width) / this.scale);
            this.levels.updatePosition();
            this.btnNextMap.updatePosition();
            this.btnBackMap.updatePosition();
            this.btnGuide.updatePosition();
            this.btnLibrary.updatePosition();
            this.btnAchievement.updatePosition();
            this.btnAccount.updatePosition();
            this.player.updatePositionResize();
            this.background.updatePosition();
            this.levelSetting.updatePosition();
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
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.decrease)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.increase)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.play)) {
                    cursorStyle = 'pointer';
                }
            }
            else if ((this.isMouseOverButton(mouseX, mouseY, this.btnNextMap) && !this.btnNextMap.hidden) || (this.isMouseOverButton(mouseX, mouseY, this.btnBackMap) && !this.btnBackMap.hidden)) {
                cursorStyle = 'pointer';
            }
            else {
                // // Check if the mouse is over any level
                for (const level of this.levels.levels) {
                    if (this.isMouseOverLevel(mouseX - this.levels.xVirtual, mouseY, level)) {
                        cursorStyle = 'pointer'; // Change cursor style to pointer
                    }
                }

                if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnGuide)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnLibrary)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnAchievement)) {
                    cursorStyle = 'pointer';
                }
                else if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnAccount)) {
                    cursorStyle = 'pointer';
                }

            }
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
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.decrease)) {
                this.levelSetting.updateDifficultyLevel(-1);
            }
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.increase)) {
                this.levelSetting.updateDifficultyLevel(1);
            }
            else if (this.isMouseOverButton(mouseX - this.levelSetting.translateX, mouseY - this.levelSetting.translateY, this.levelSetting.buttons.play)) {
                //  play
                window.location.href = '/game';
            }
            // Check if the mouse is over the next map button
            else if (this.levelSetting.hidden) {
                if (this.isMouseOverButton(mouseX, mouseY, this.btnNextMap) && !this.slide && !this.btnNextMap.hidden) {
                    this.animateSlide(1);
                    return;
                }
                // Check if the mouse is over the back map button
                else if (this.isMouseOverButton(mouseX, mouseY, this.btnBackMap) && !this.slide && !this.btnBackMap.hidden) {
                    this.animateSlide(-1);
                    return;
                }
                else {
                    this.levels.levels.forEach(level => {
                        if (this.isMouseOverLevel(mouseX - this.levels.xVirtual, mouseY, level)) {
                            if (level.state == "Block") {
                                if (this.player.maxCurrentLevel + 1 == level.level) {
                                    this.levels.updateStateLevel(level);
                                    this.player.updateMaxCurrentLevel(level.level);
                                }
                            }
                            else if (this.player.currentLevel.level == level.level) {
                                this.levelSetting.open(level);
                            }
                            else {
                                this.player.updatePosition(level);
                            }
                            return;
                        }
                    });
                }
            }

            if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnGuide)) {
                // Show the pop up
                setOpenPopup(true);

            }
            if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnLibrary)) {
                setOpenPopupLib(true);
            }
            if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnAchievement)) {
                setOpenPopupRank(true);
            }
            if (this.isMouseOverButtonTool(mouseX, mouseY, this.btnAccount)) {
                setOpenPopupAcc(true);
            }
        }
        animateSlide(direct) {
            this.slide = true;
            this.background.onclick(direct);
            this.btnNextMap.hidden = (this.background.xImage == this.widthCut);
            this.btnBackMap.hidden = (this.background.xImage == 0);
            const self = this;
            let animateHandle;
            function animate() {
                if (self.slide) {
                    self.background.updateSlide();
                    self.levels.xVirtual = -self.background.xImageCut * self.scale;
                    animateHandle = requestAnimationFrame(animate);
                }
                else {
                    cancelAnimationFrame(animateHandle);
                    return;
                }
            }
            animate();
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

        isMouseOverButtonTool(mouseX, mouseY, button) {
            return (
                mouseX >= button.x &&
                mouseX <= button.x + button.spriteWidth / 2 &&
                mouseY >= button.y &&
                mouseY <= button.y + button.spriteHeight / 2
            );
        }
        update(deltaTime) {
            this.deltaTime = deltaTime;
            this.gameFrame++;
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
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, mode);
        mainScreen.levels.updatePositionLevel();
        mainScreenRef.current = mainScreen;

        let lastTime = 0;
        const animate = (timeStamp) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            mainScreen.update(deltaTime);
            mainScreen.draw(context);
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    useEffect(() => {
        if (mainScreenRef.current) {
            mainScreenRef.current.updateMode(mode);
        }
    }, [mode]);

    return (
        <div>
            <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>
            {openPopup && <PopUpInstruc openPopUp={openPopup} closePopUp={HandleRemovePopUp} />}
            {openPopupAcc && <PopUpAcc openPopUpAcc={openPopupAcc} closePopUpAcc={HandleRemovePopUpAcc} mode={mode} setMode={setMode} />}
            {openPopupLib && <PopUpLibrary openPopUpLib={openPopupLib} closePopUpLib={HandleRemovePopUpLib} />}
            {openPopupRank && <PopUpRank openPopUpRank={openPopupRank} closePopUpRank={HandleRemovePopUpRank} />}
            {openCongratNewLevel && <CongratNewLevel openCongratNewLevel={openCongratNewLevel} closeCongratNewLevel={HandleRemoveCongratNewLevel} nextLevel={10} />}
        </div>

    );
}

export default Level;
