import React from 'react';


const PopUpInstruc = ({ openPopUp, closePopUp }) => {
    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    };

    if (!openPopUp) return null;

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="lg:w-1/2 w-10/12 rounded-lg border border-emerald-600 bg-white p-2 py-5 shadow-md md:w-1/2">
                <div className="w-full items-center justify-center p-3">
                    <h2 className="py-3 text-center text-xl font-semibold">HƯỚNG DẪN CÁCH CHƠI GAME</h2>
                </div>
            </div>
        </div>
    );
};

export default PopUpInstruc;
