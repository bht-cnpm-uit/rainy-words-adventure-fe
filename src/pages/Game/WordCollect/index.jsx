import React, { useState, useEffect, useMemo } from "react";
import FallItem from "./WordFall";
import Figure from "./FigureGame";
const dictionary = {
    "Apple": "Quả táo",
    "Banana": "Quả chuối",
    "Carrot": "Cà rốt",
    "Dog": "Con chó",
    "Elephant": "Con voi",
    "Fish": "Cá",
    "Guitar": "Đàn guitar",
    "House": "Ngôi nhà",
    "Ice Cream": "Kem",
    "Jellyfish": "Sứa",
    "Kangaroo": "Kangaroo",
    "Lemon": "Quả chanh",
    "Monkey": "Con khỉ",
    "Notebook": "Sổ tay",
    "Orange": "Quả cam",
    "Penguin": "Chim cánh cụt",
    "Queen": "Nữ hoàng",
    "Rabbit": "Con thỏ",
    "Strawberry": "Dâu",
    "Turtle": "Con rùa",
    "Umbrella": "Ô",
    "Violin": "Violon",
    "Watermelon": "Dưa hấu",
    "Xylophone": "Kèn xylophone",
    "Yak": "Con trâu đực",
    "Zebra": "Ngựa vằn",
    "Ball": "Quả bóng",
    "Cat": "Con mèo",
    "Duck": "Con vịt",
    "Egg": "Quả trứng",
    "Frog": "Con ếch",
    "Giraffe": "Hươu cao cổ",
    "Hat": "Cái mũ",
    "Ink": "Mực",
    "Jacket": "Áo khoác",
    "Key": "Chìa khóa"
};
function shuffleDictionary(dict) {
    const keys = Object.keys(dict);
    const values = Object.values(dict);
    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }
    const shuffleDictionary = {};
    for (let i = 0; i < keys.length; i++) {
        shuffleDictionary[keys[i]] = values[i];
    }
    return shuffleDictionary;
}
function WordCollect() {
    const defaultPos = [[200, 0], [450, 0], [700, 0], [900, 0], [1150, 0], [1300, 0]];
    const correctWords = dictionary;
    const [fallingItems, setFallingItems] = useState([]);

    useEffect(() => {
        let shuffleDict = shuffleDictionary(dictionary);
        let listItems = Object.keys(shuffleDict).map((key, index) => ({
            key,
            meaningVN: shuffleDict[key],
            startPosition: defaultPos[Math.floor(Math.random() * 6)],
            correctMeaningVN: correctWords[key]
        }));
        listItems.forEach((item, index) => {
            setTimeout(() => {
                setFallingItems(prevItems => [...prevItems, item]);
            }, index * 3000);
        });
    }, []);

    const removeItem = useMemo(() => (itemId) => {
        // setFallingItems(prevItems => prevItems.filter(item => item.key !== itemId));
    }, []);

    return (
        <div className="absolute inset-0 h-full w-full bg-white"
            style={{
                backgroundImage: 'linear-gradient(to right, #808080 2px, transparent 2px), linear-gradient(to bottom, #808080 2px, transparent 2px)',
                backgroundSize: '128px 128px'
            }}>
            {fallingItems.map((item, index) => (
                <FallItem
                    key={index}
                    word={item.key}
                    meaningVN={item.meaningVN}
                    startPosition={item.startPosition}
                    onRemove={() => removeItem(item.key)}
                />
            ))}
            <Figure />
        </div>
    );
}

export default WordCollect;
