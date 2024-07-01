import React from 'react';
import { useState } from 'react';

const vocabularyLibrary = [
    {
        word: 'experience',
        definition: 'Kinh nghiệm',
        ex: 'This is an apple and I want to eat one and I sold out them in one day.',
    },
    { word: 'banana', definition: 'quả chuối', ex: 'This is a banana' },
    { word: 'cat', definition: 'con mèo', ex: 'This is a cat ' },
    {
        word: 'dog',
        definition: 'con chó',
        ex: 'This is a dog This is an apple and I want to eat one and I sold out them in one day.',
    },
    { word: 'apple', definition: 'quả táo', ex: 'This is an apple' },
    { word: 'pen', definition: 'quả chuối', ex: 'This is a banana' },
    { word: 'class', definition: 'con mèo', ex: 'This is a cat' },
    { word: 'hello', definition: 'quả táo', ex: 'This is an apple' },
    { word: 'hi', definition: 'quả chuối', ex: 'This is a banana' },
    { word: 'function', definition: 'con mèo', ex: 'This is a cat' },
    { word: 'no', definition: 'con chó', ex: 'This is a dog' },
    { word: 'yes', definition: 'quả táo', ex: 'This is an apple' },
];

const PopUpLibrary = ({ openPopUpLib, closePopUpLib }) => {
    const [selectedWord, setSelectedWord] = useState(vocabularyLibrary[0]);

    const handleWordClick = (word) => {
        setSelectedWord(word);
    };
    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelLibraryContainer') {
            closePopUpLib();
        }
    };

    const handleClosePopUpLib = (e) => {
        closePopUpLib();
    };

    if (!openPopUpLib) return null;

    return (
        <div
            id="ModelLibraryContainer"
            onClick={handleClosePopUp}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="grid w-10/12 grid-cols-2  gap-4 p-2 py-5 md:w-1/2 lg:w-1/2">
                <div className="w-full items-center justify-center rounded-[22px] border  border-4 border-yellow-600 bg-orange-100 p-3  ">
                    <h2 className="py-3 text-center font-mono text-5xl font-semibold text-orange-700">
                        THƯ VIỆN
                    </h2>
                    <div className=" scrollbar-thumb-orange-400 scrollbar-track-orange-200 scrollbar-thin max-h-96 overflow-y-auto overflow-y-scroll rounded-[5px]  bg-orange-50">
                        <ul className="divide-y divide-gray-200 font-mono text-orange-400">
                            {vocabularyLibrary.map((item, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer py-2 ${selectedWord.word === item.word ? 'bg-orange-200': 'bg-orange-50'}`}
                                    onClick={() => handleWordClick(item)}
                                >
                                    <p className="ml-4 text-xl font-semibold">{item.word}</p>
                                    <p className="ml-4 text-gray-500">{item.definition}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {selectedWord && (
                    <div className="relative flex items-center justify-center rounded-[22px] border border-4 border-yellow-600 bg-orange-100 p-4 ">
                        <button
                            onClick={handleClosePopUpLib}
                            className="absolute -right-4 -top-4 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                        ></button>
                        <div className=" rounded-[20px] bg-orange-50 p-4">
                            <h3 className="mt-8 text-center text-4xl font-bold text-orange-400">
                                {selectedWord.word}
                            </h3>
                            <p className="mt-12 text-center text-3xl text-gray-500 ">
                                {selectedWord.definition}
                            </p>
                            <p className="mb-8 mt-12 text-2xl italic text-gray-500">
                                Ví dụ: {selectedWord.ex}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopUpLibrary;
