import React, { useState, useRef, useEffect } from 'react';
import { Background } from './background';
import { Levels } from './level';
import { Player } from './player';
import { BtnBackMap, BtnNextMap, Guide, Library, Achievement, Account } from './button';
import { LevelSetting } from './UI';
import PopUpInstruc from './PopUpInstruc';
import PopUpAcc from './PopUpAcc';
import PopUpLibrary from './PopUpLibrary';
import PopUpRank from './PopUpRank';
import Congrat from './Congrat';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/slices/userSlice';
import { getCurrentLevelUser } from '../../../services/levelServices';
import { userSelector } from '../../../redux/selectors/userSelector';
import { LEVEL } from './level';
import { useNavigate, useLocation } from 'react-router-dom';
const Level = props => {
    const canvasRef = useRef();
    const animationRef = useRef();
    const mainScreenRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const resizeCanvas = (canvas) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupAcc, setOpenPopupAcc] = useState(false);
    const [openPopupLib, setOpenPopupLib] = useState(false);
    const [openPopupRank, setOpenPopupRank] = useState(false);
    const [openCongrat, setOpenCongrat] = useState(false);
    const [congratType, setCongratType] = useState(null);
    const [level, setLevel] = useState(LEVEL);
    const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
    const [nextLevel, setNextLevel] = useState(null);
    const [gift, setGift] = useState(null);

    const HandleRemovePopUp = () => setOpenPopup(false);
    const HandleRemovePopUpAcc = () => setOpenPopupAcc(false);
    const HandleRemovePopUpLib = () => setOpenPopupLib(false);
    const HandleRemovePopUpRank = () => setOpenPopupRank(false);
    const userInfor = useSelector(userSelector);
    const HandleRemoveCongrat = () => {
        setOpenCongrat(false);
        if (mainScreenRef && nextLevel) {
            mainScreenRef.current.levels.unLockLevel(nextLevel)
            setNextLevel(null);
        }
        navigate(location.pathname, { replace: true, state: {} });
    }

    class MainScreen {
        constructor(canvas, ctx, mode, level) {
            this.canvas = canvas;
            this.canvas.style.width = window.innerWidth;
            this.canvas.style.height = window.innerHeight;
            this.ctx = ctx;
            this.mode = mode;
            this.level = level;
            this.currentLevelPlayer = null;
            this.currentLevel;
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
        setLevel(lv) {
            let level = lv.levelInfor;
            let score = lv.levelScore;
            let init_level = JSON.parse(JSON.stringify(LEVEL));
            init_level.forEach((item, idx) => {
                item["state"] = (level[0][idx] || idx === 0 || level[0][idx - 1]) ? 1 : 0;
                item['difficulty_level'] = [level[0][idx], level[1][idx], level[2][idx]]
                item['score'] = [score[0][idx].score === undefined ? 0 : score[0][idx].score, score[1][idx].score === undefined ? 0 : score[1][idx].score, score[2][idx].score === undefined ? 0 : score[2][idx].score]
                if (!this.player.currentLevel) {
                    if (idx == 19 || level[0][0] === 0 || (level[0][idx] === 0 && level[0][idx - 1] === 1)) {
                        this.player.currentLevel = JSON.parse(JSON.stringify(item))
                    }
                }
            });
            this.level = init_level;
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
                for (const level of this.level) {
                    if (this.isMouseOverLevel(mouseX - this.levels.xVirtual, mouseY, level)) {
                        cursorStyle = 'pointer';
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
            if (!this.levelSetting.hidden) {
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
                    navigate('/game', {
                        state: {
                            studentId: userInfor.id,
                            level: (this.levelSetting.currentLevel.level - 1) * 3 + this.levelSetting.currentDiffLevel + 1,
                            diff: this.levelSetting.currentDiffLevel,
                            listLevels: this.level
                        }
                    });
                }
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
                    this.level.forEach(level => {
                        if (this.isMouseOverLevel(mouseX - this.levels.xVirtual, mouseY, level)) {
                            if (level.state) {
                                if (this.player.currentLevel.level == level.level) {
                                    this.levelSetting.open(level)
                                }
                                else {
                                    this.player.jump(level)
                                }
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
                mouseX >= level.position.x * this.scale + this.levels.width / 5 &&
                mouseX <= level.position.x * this.scale + this.levels.width / 1.5 &&
                mouseY >= level.position.y * this.scale + this.levels.height / 5 &&
                mouseY <= level.position.y * this.scale + this.levels.height / 1.5
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
        const mainScreen = new MainScreen(canvas, context, mode, level);
        mainScreenRef.current = mainScreen;

        const animate = (timeStamp) => {
            const deltaTime = timeStamp - (animate.lastTime || 0);
            animate.lastTime = timeStamp;
            context.clearRect(0, 0, canvas.width, canvas.height);
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
            mainScreenRef.current.updateMode(mode)
        }
    }, [mode])
    useEffect(() => {
        const state = location.state || {};
        if (state) {
            let flag = 0
            if (state.isPassLevel) {
                if (state.newLevel) {
                    setNextLevel(state.newLevel);
                    flag = 1;
                    setCongratType('next-level');
                }
            }
            if ((state.itemsGetCup && state.itemsGetCup.length) || (state.listAchievement && state.listAchievement.length)) {
                setGift({
                    itemCup: state.itemsGetCup,
                    achievements: state.listAchievement
                })
                setCongratType('gift');
                flag = 1;
            }
            if (flag) {
                setOpenCongrat(true);
            }
        }
    }, [navigate])
    useEffect(() => {
        const getLevel = async () => {
            console.log(userInfor)
            let dataLevel = await getCurrentLevelUser(userInfor.id);
            let levelMatrix = dataLevel.levelMatrix;
            let levelScore = dataLevel.scoreTimeMatrix;
            console.log(levelMatrix)
            let lv = {
                levelInfor: levelMatrix,
                levelScore: levelScore
            }
            setLevel(lv);
            mainScreenRef.current.setLevel(lv);
            dispatch(userActions.setLevel(lv));
        };
        getLevel();
    }, [])

    return (
        <div>
            <canvas id='responsive-canvas' ref={canvasRef} {...props}></canvas>
            {openPopup && <PopUpInstruc openPopUp={openPopup} closePopUp={HandleRemovePopUp} />}
            {openPopupAcc && <PopUpAcc openPopUpAcc={openPopupAcc} closePopUpAcc={HandleRemovePopUpAcc} mode={mode} setMode={setMode} />}
            {openPopupLib && <PopUpLibrary openPopUpLib={openPopupLib} closePopUpLib={HandleRemovePopUpLib} />}
            {openPopupRank && <PopUpRank openPopUpRank={openPopupRank} closePopUpRank={HandleRemovePopUpRank} />}
            {openCongrat && <Congrat openCongrat={openCongrat} closeCongrat={HandleRemoveCongrat} nextLevel={nextLevel} gift={gift} setGift={setGift} congratType={congratType} setCongratType={setCongratType} />}
        </div>

    );
}

export default Level;
