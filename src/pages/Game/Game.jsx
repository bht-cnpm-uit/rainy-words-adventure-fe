import React, { useState, useEffect } from "react";
import WordCollect from "./WordCollect";
import WordChain from "./WordChain";
import Result from "../Game/Result";
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewGame } from "../../services/gameServices";

const Game = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [typegame, setTypegame] = useState('word-collect');
    const [listwordcollect, setlistwordcollect] = useState([]);
    const [listWordChain, setListWordChain] = useState([]);
    const [diffLevel, setDiffLevel] = useState(0);
    const [result, setResult] = useState({
        noWords: 0,
        score: 0,
        bonus: {
            item1: 0,
            item2: 0,
            item3: 0,
        }
    });
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const getAllWords = async () => {
            const state = location.state || {};
            if (state.level !== undefined && state.diff !== undefined) {
                const probs = state.diff === 0 ? [0.6, 0.3, 0.1] :
                    state.diff === 1 ? [0.4, 0.3, 0.3] : [0.2, 0.3, 0.5];
                const numWords = 25;
                const res = await createNewGame({ levelId: state.level, probabilities: probs, numWords: numWords });
                if (res && res.errCode === 0) {
                    setlistwordcollect(res.listWord);
                    setDiffLevel(2);
                }
            } else {
                navigate('/level');
            }
        };
        getAllWords();
    }, [navigate]);

    useEffect(() => {
        let interval;
        if (typegame === 'word-collect') {
            setStartTime(Date.now());
            interval = setInterval(() => {
                setTimer((prev) => Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else if (typegame === 'end-game') {
            clearInterval(interval);
            if (startTime) {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                setTimer(elapsedTime);
            }
        }
        return () => clearInterval(interval);
    }, [typegame, startTime]);

    let gameComponent;

    switch (typegame) {
        case 'word-collect':
            gameComponent = (
                <WordCollect
                    setTypegame={setTypegame}
                    listwordcollect={listwordcollect}
                    setListWordChain={setListWordChain}
                    setResult={setResult}
                    diffLevel={diffLevel}
                />
            );
            break;
        case 'word-chain':
            gameComponent = (
                <WordChain
                    setTypegame={setTypegame}
                    listWordChain={listWordChain}
                    setResult={setResult}
                    result={result}
                    diffLevel={diffLevel}
                />
            );
            break;
        case 'end-game':
            gameComponent = <Result result={result} elapsedTime={timer} />;
            break;
        default:
            gameComponent = null;
            break;
    }

    return <>{gameComponent}</>;
};

export default Game;