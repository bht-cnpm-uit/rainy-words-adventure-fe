import React, { useState } from "react";
import WordCollect from "./WordCollect";
import WordChain from "./WordChain";
import Result from "../Game/Result"

const Game = () => {
    const [typegame, settypegame] = useState('word-chain');
    const [listwordcollect, setlistwordcollect] = useState([]);
    const [result, setResult] = useState({
        "noWords": 0,
        "score": 0,
        "bonus":
        {
            "item1": 0,
            "item2": 0,
            "item3": 0
        }
    });

    let gameComponent;

    switch (typegame) {
        case 'word-collect':
            gameComponent = (
                <WordCollect
                    settypegame={settypegame}
                    listwordcollect={listwordcollect}
                    setlistwordcollect={setlistwordcollect}
                    setResult={setResult}
                />
            );
            break;
        case 'word-chain':
            gameComponent = (
                <WordChain
                    settypegame={settypegame}
                    listwordcollect={listwordcollect}
                    setlistwordcollect={setlistwordcollect}
                    setResult={setResult}
                    result={result}
                />
            );
            break;
        case 'done':
            gameComponent =
                <Result
                    result={result}
                />;
            break;
        default:
            gameComponent = null;
            break;
    }

    return (
        <>
            {gameComponent}
        </>
    );
};

export default Game;
