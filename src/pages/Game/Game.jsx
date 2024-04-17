import React, { useState } from "react";
import WordCollect from "./WordCollect";
import WordChain from "./WordChain";
import Result from "../Game/Result"

const Game = () => {
    const [typegame, settypegame] = useState('done');
    const [listwordcollect, setlistwordcollect] = useState([]);

    let gameComponent;

    switch (typegame) {
        case 'word-collect':
            gameComponent = (
                <WordCollect
                    settypegame={settypegame}
                    listwordcollect={listwordcollect}
                    setlistwordcollect={setlistwordcollect}
                />
            );
            break;
        case 'word-chain':
            gameComponent = (
                <WordChain
                    settypegame={settypegame}
                    listwordcollect={listwordcollect}
                    setlistwordcollect={setlistwordcollect}
                />
            );
            break;
        case 'done':
            gameComponent = <Result />;
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
