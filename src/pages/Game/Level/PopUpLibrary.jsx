import React, {useEffect, useState} from 'react';
import { getAllWords } from '../../../services/wordServices';


const PopUpLibrary = ({ openPopUpLib, closePopUpLib }) => {
    const [vocabularyLibrary, setVocabularyLibrary] = useState([]);
    const [selectedWord, setSelectedWord] = useState([]);
   
    
    const getWordFromDatabase = async () => {
        try {
            let data = await getAllWords();
            setVocabularyLibrary(data.listWord);
            setSelectedWord((data.listWord)[0])
        } catch (error) {
            console.error('Error fetching words from database:', error);
        }
    };


    useEffect(() => {
        getWordFromDatabase();
    }, []);

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
            <div className=" w-5/12 gap-4 p-2 py-5 md:w-1/5 lg:w-1/3">
                <div className="w-full items-center justify-center rounded-[22px] border  border-4 border-yellow-600 bg-orange-100 p-3  ">
                    <h2 className="py-3 text-center font-mono text-5xl font-semibold text-orange-700">
                        THƯ VIỆN
                    </h2>
                    <div className=" max-h-96 overflow-y-auto overflow-y-scroll rounded-[5px] bg-orange-50 scrollbar-thin scrollbar-track-orange-200  scrollbar-thumb-orange-400">
                        <ul className="divide-y divide-gray-200 font-mono text-orange-400">
                            {vocabularyLibrary.map((item, index) => (
                                <li
                                    key={index}
                                    // className={`cursor-pointer py-2 ${selectedWord.vocab === item.vocab ? 'bg-orange-200' : 'bg-orange-50'}`}
                                    // onClick={() => handleWordClick(item)}
                                >
                                    <p className="ml-12 text-xl font-semibold">{item.vocab}</p>
                                    <p className="ml-12 text-gray-500">{item.vietnamese}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* {selectedWord && (
                    <div className="relative flex items-center justify-center rounded-[22px] border border-4 border-yellow-600 bg-orange-100 p-4 ">
                        <button
                            onClick={handleClosePopUpLib}
                            className="absolute -right-4 -top-4 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas/image_19.png')] bg-cover"
                        ></button>
                        <div className=" rounded-[20px] bg-orange-50 p-4">
                             <p className="mb-8 mt-12 text-2xl italic text-gray-500">
                                Chủ đề: {selectedWord.topic}
                            </p>
                            <h3 className="mt-8 text-center text-4xl font-bold text-orange-400">
                                {selectedWord.word}
                            </h3>
                            <p className="mt-12 text-center text-3xl text-gray-500 ">
                                {selectedWord.definition}
                            </p>
                           
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default PopUpLibrary;
