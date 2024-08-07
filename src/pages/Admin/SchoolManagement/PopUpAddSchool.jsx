import React, { useState } from 'react';
import { createNewSchool } from '../../../services/schoolServices';

const PopUpAddSchool = ({ openPopupAddSchool, closePopUpAddSchool }) => {
    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUpAddSchool();
        }
    };

    const handleClose = () => {
        closePopUpAddSchool();
    };

    if (!openPopupAddSchool) return null;

    const [isOpen, setIsOpen] = useState(false);
    const [schoolData, setSchoolData] = useState({
        id: '',
        name: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSchoolData({
            ...schoolData,
            [name]: value,
        });
    };

    const handleAddSchool = async () => {
        if (schoolData.id == '' || schoolData.name == '') {
            const isConfirmed = window.confirm(`Bạn phải nhập dữ liệu đầy đủ!`);
            return;
        }

        try {
            const listSchool = [schoolData];
            let response = await createNewSchool(listSchool);

            alert('Thêm trường học thành công');
            handleClose();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm "
        >
            <div className="w-10/12 rounded-lg border border-4 border-b border-gray-200 bg-gray-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/3">
                <div className="w-full items-center justify-center p-3">
                    <div className="mb-4">
                        <label htmlFor="id" className="mb-2 block text-sm font-bold text-gray-700">
                            ID:
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={schoolData.id}
                            onChange={handleInputChange}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Nhập ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Tên trường:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={schoolData.name}
                            onChange={handleInputChange}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Nhập tên trường"
                        />
                    </div>
                    <button
                        onClick={handleAddSchool}
                        className="focus:shadow-outline-blue mx-2 rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none"
                    >
                        Thêm trường học
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
    );
};

export default PopUpAddSchool;
