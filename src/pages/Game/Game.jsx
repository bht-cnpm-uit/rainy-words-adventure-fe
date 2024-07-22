import React, { useState, useEffect } from "react";
import WordCollect from "./WordCollect";
import WordChain from "./WordChain";
import Result from "../Game/Result";
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewGame, saveGame } from "../../services/gameServices";

const Game = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [typegame, setTypegame] = useState('word-collect');
    const [listwordcollect, setlistwordcollect] = useState([]);
    const [listWordChain, setListWordChain] = useState([]);
    const [diffLevel, setDiffLevel] = useState(0);
    const [listIdBonusItem, setListIdBonusItem] = useState([1, 2, 3]);
    const [result, setResult] = useState({
        noWords: 0,
        score: 0,
        bonusItems: null
    });
    const [dataSaveGame, setDataSaveGame] = useState({
        levelId: null,
        studentId: null,
        score: null,
        items: null,
        time: null,
        minScore: 200
    });
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [gameSaved, setGameSaved] = useState(false);
    const [resSaveGame, setResSaveGame] = useState();

    useEffect(() => {
        const getAllWords = async () => {
            const state = location.state || {};
            if (state.level !== undefined && state.diff !== undefined) {
                setDataSaveGame(prevData => ({
                    ...prevData,
                    levelId: state.level,
                    studentId: state.studentId
                }));
                const probs = state.diff === 0 ? [0.6, 0.3, 0.1] :
                    state.diff === 1 ? [0.4, 0.3, 0.3] : [0.2, 0.3, 0.5];
                const numWords = 25;
                setListIdBonusItem(state.level > 30 ? [4, 5, 6] : [1, 2, 3]);
                const res = await createNewGame({ levelId: state.level, probabilities: probs, numWords: numWords });
                if (res && res.errCode === 0) {
                    setlistwordcollect(res.listWord);
                    setDiffLevel(state.diff);
                }
            } else {
                navigate('/level');
            }
        };
        getAllWords();
    }, [location.state, navigate]);

    useEffect(() => {
        let interval;
        if (typegame === 'word-collect') {
            setStartTime(Date.now());
            interval = setInterval(() => {
                setTimer(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else if (typegame === 'end-game' && startTime) {
            clearInterval(interval);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setTimer(elapsedTime);
            setDataSaveGame(prevData => ({
                ...prevData,
                time: elapsedTime,
            }));
        }
        return () => clearInterval(interval);
    }, [typegame, startTime]);

    const handleSaveGame = async (data) => {
        try {
            const res = await saveGame(data);
            if (res.errCode === 0) {
                setResSaveGame({
                    isGetCup: res.isGetCup,
                    isPassLevel: res.isPassLevel
                })
            }
            console.log("Response from save game: ", res);
        } catch (error) {
            console.error("Failed to save game:", error);
        }
    };

    useEffect(() => {
        const saveGameData = async () => {
            if (typegame === 'end-game' && !gameSaved) {
                const updatedData = {
                    ...dataSaveGame,
                    score: result.score,
                    items: result.bonusItems,
                    time: timer,
                };
                setGameSaved(true); // Set the flag to true before saving
                await handleSaveGame(updatedData);
            }
        };

        saveGameData();
    }, [typegame, result, timer, dataSaveGame, gameSaved]);

    let gameComponent;

    if (typegame === 'word-collect') {
        gameComponent = (
            <WordCollect
                setTypegame={setTypegame}
                listwordcollect={listwordcollect}
                setListWordChain={setListWordChain}
                setResult={setResult}
                diffLevel={diffLevel}
                listIdBonusItem={listIdBonusItem}
            />
        );
    } else if (typegame === 'word-chain') {
        gameComponent = (
            <WordChain
                setTypegame={setTypegame}
                listWordChain={listWordChain}
                setResult={setResult}
                result={result}
                diffLevel={diffLevel}
            />
        );
    } else if (typegame === 'end-game') {
        gameComponent = <Result result={result} elapsedTime={timer} resSaveGame={resSaveGame} />;
    } else {
        gameComponent = null;
    }

    return <>{gameComponent}</>;
};

export default Game;
