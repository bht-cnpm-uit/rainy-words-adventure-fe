import React, { useState, useEffect } from 'react';
import "./style.scss"
/*
To-do lists:
+ Fix rơi xuống mắt đất => delete
+ fix rơi ngẫu nhiên sau x time
+ Fix hộp đỏ chạm từ vựng => 2 case: True | False
*/
const FallItem = ({ word, startPosition, onRemove }) => {
    const [position, setPosition] = useState(startPosition);
    useEffect(() => {
        const fallInterval = setInterval(() => {
            setPosition(prevPosition => ({ x: prevPosition.x, y: prevPosition.y + 0.8 }));
        }, 0.000001);
        return () => clearInterval(fallInterval);
    }, []);
    return (
        <div
            className="word-item"
            style={{
                width: 100,
                height: 100,
                backgroundColor: "yellow",
                position: "fixed",
                left: position.x,
                top: position.y,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            }}
        >
            {word}
        </div>
    );
}

function FallingWords() {
    const defaultPos = [[300, 0], [550, 0], [800, 0], [1000, 0], [1250, 0], [1500, 0]];
    const words = [
        "Apple", "Banana", "Carrot", "Dog", "Elephant", "Fish", "Guitar", "House",
        "Ice Cream", "Jellyfish", "Kangaroo", "Lemon", "Monkey", "Notebook", "Orange",
        "Penguin", "Queen", "Rabbit", "Strawberry", "Turtle", "Umbrella", "Violin",
        "Watermelon", "Xylophone", "Yak", "Zebra", "Ball", "Cat", "Duck", "Egg",
        "Frog", "Giraffe", "Hat", "Ink", "Jacket", "Key"
    ];
    const [fallingItems, setFallingItems] = useState([]);
    const defaultIntervalTime = 2000; // in milliseconds

    useEffect(() => {
        const newItems = words.slice(0, 6).map((word, index) => ({
            id: index,
            word: word,
            startPosition: { x: defaultPos[index][0], y: defaultPos[index][1] }
        }));
        setFallingItems(newItems);

        const interval = setInterval(() => {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            const randomStartPosition = {
                x: defaultPos[Math.floor(Math.random() * defaultPos.length)][0],
                y: 0
            };
            setFallingItems(prevItems => [...prevItems, {
                id: prevItems.length,
                word: randomWord,
                startPosition: randomStartPosition
            }]);
        }, defaultIntervalTime);

        return () => clearInterval(interval);
    }, [words, defaultPos, defaultIntervalTime]);

    const removeItem = (itemId) => {
        setFallingItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }

    return (
        <div className="">
            {fallingItems.map(item => (
                <FallItem
                    key={item.id}
                    word={item.word}
                    startPosition={item.startPosition}
                    onRemove={() => removeItem(item.id)}
                />
            ))}
        </div>
    );
}

export default FallingWords;