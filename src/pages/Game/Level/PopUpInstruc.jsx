import React, { useState } from 'react';

const cards = [
    {
        name: 'Hướng dẫn',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

    },
    {
        name: 'Giải thưởng',
        content: 'Đây là giải thưởng của game'
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        + 'Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of' 
        + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
];

const PopUpInstruc = ({ openPopUp, closePopUp }) => {
    const [selectedCard, setSelectedCard] = useState(cards[0]);

    const handleClickCard = (card) => {
        setSelectedCard(card);
    };
    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    };

    const handleClosePopUpInstr = (e) => {
        closePopUp();
    };
    if (!openPopUp) return null;

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-sm"
        >
            <div className="border-emerald-600 w-10/12 rounded-lg border bg-orange-100 p-2 py-2 shadow-md md:w-1/2 lg:w-1/2">
                <div className="relative flex grid w-full grid-cols-4 items-center justify-center p-3">
                    <button
                        className="absolute -right-6 -top-5 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                        onClick={handleClosePopUpInstr}
                    ></button>
                    <div className="list-none divide-y divide-gray-200 font-mono text-white">
                        {cards.map((item) => (
                            <li
                                className="cursor-pointer py-2 text-center"
                                onClick={() => handleClickCard(item)}
                            >
                                <p className={`text-xl rounded-lg font-semibold bg-orange-300 ${selectedCard.name === item.name ? 'bg-orange-500': 'bg-orange-300'}`}>{item.name}</p>
                            </li>
                        ))}
                    </div>

                    {selectedCard && (
                        <div className=" col-span-3 ml-4 mr-4 mt-4 bg-orange-50 rounded-lg max-h-[500px] overflow-y-auto p-3 scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                            <p className="ml-4 mr-4 text-lg text-justify">
                                {selectedCard.content}
                            </p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopUpInstruc;
