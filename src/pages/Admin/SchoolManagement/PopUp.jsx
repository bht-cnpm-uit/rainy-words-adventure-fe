import React, { useState } from 'react';
import PopUpAddSchool from './PopUpAddSchool';
import ModalImportData from './ModalImportData';

const PopUp = ({ openPopUp, closePopUp }) => {
    const [isOpenModelImportData, setIsOpenModelImportData] = useState(false);
    const [openPopupAddSchool, setOpenPopupAddSchool] = useState(false);

    const HandleRemovePopUpAddSchool = () => setOpenPopupAddSchool(false);

    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    };

    const handleClose = () => {
        closePopUp();
    };

    if (!openPopUp) return null;

    const handleAddSchool = () => {
        setOpenPopupAddSchool(true);
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="z-99 fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm "
        >
            <div className="w-10/12 rounded-lg border border-4 border-b border-gray-200 bg-gray-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/3">
                <div className="w-full items-center justify-center p-3">
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleAddSchool}
                            className="focus:shadow-outline-blue mx-2 rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none"
                        >
                            Thêm trường học
                        </button>
                        <button
                            onClick={() => setIsOpenModelImportData(!isOpenModelImportData)}
                            className="focus:shadow-outline-blue mx-2 rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none"
                        >
                            Nhập dữ liệu
                        </button>
                        <button
                            onClick={handleClose}
                            className="focus:shadow-outline-blue mx-2 rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
            {openPopupAddSchool && (
                <PopUpAddSchool
                    openPopupAddSchool={openPopupAddSchool}
                    closePopUpAddSchool={HandleRemovePopUpAddSchool}
                />
            )}

            {isOpenModelImportData && (
                <ModalImportData
                    modalTitle={'Nhập dữ liệu'}
                    isOpenModelImportData={isOpenModelImportData}
                    setIsOpenModelImportData={setIsOpenModelImportData}
                />
            )}
        </div>
    );
};

export default PopUp;
