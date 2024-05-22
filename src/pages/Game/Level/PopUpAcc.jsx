import React, { useState } from 'react';
import PopUpUpdateAcc from './PopUpUpdateAcc';

const PopUpAcc = ({ openPopUpAcc, closePopUpAcc }) => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [isSoundOn, setIsSoundOn] = useState(true);

    const handleClosePopUpAcc = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUpAcc();
        }
    };
    const student = [
        {
            name: 'Nguyễn Văn A',
            school: 'Trường THPT ABC',
            grade: '12',
            dayOfBirth: '01/01/2004',
            phoneNumber: '0123456789',
        },
    ];

    const handleClose = () => {
        closePopUpAcc();
    };

    if (!openPopUpAcc) return null;

    const handleLogout = () => {
        // Perform logout logic here
        // Redirect to homepage
        window.location.href = '/login';
    };

    const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
    const HandleRemovePopUpUpdate = () => setOpenPopupUpdate(false);

    const handleUpdate = () => {
        setOpenPopupUpdate(true);
    };
    const toggleSound = () => {
        setIsSoundOn(!isSoundOn);
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUpAcc}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm "
        >
            <div className="w-10/12 rounded-[20px] border border-4 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/3">
                <div className="relative w-full items-center justify-center p-3">
                    <h2 className="py-3 text-center font-mono text-3xl font-semibold text-orange-500">
                        THÔNG TIN TÀI KHOẢN
                    </h2>
                    <button
                        onClick={handleClose}
                        className="absolute -right-5 -top-10 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                    ></button>
                    <div className="my-2">
                        <div className="flex flex-col items-center">
                            <div className="mx-auto h-40 w-40 rounded-full border-2 border-zinc-950 bg-[url('/assets/Asset/Stars/4.png')] bg-cover"></div>
                        </div>
                        <div className="ml-4 mr-4 mt-4 bg-orange-50">
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Tên:</span> {student[0].name}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Trường:</span>
                                {student[0].school}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Lớp:</span> {student[0].grade}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Ngày sinh:</span>
                                {student[0].dayOfBirth}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Số điện thoại:</span>
                                {student[0].phoneNumber}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="mt-4 font-mono text-2xl">
                            <p className="text-orange-500">CHẾ ĐỘ</p>
                            <div className="flex justify-center space-x-4">
                                <div
                                    onClick={() => setSelectedMode('Day')}
                                    className={`h-12 w-12 rounded-full bg-white ${selectedMode === 'Day' ? 'border-4 border-orange-500' : ''}`}
                                ></div>
                                <div
                                    onClick={() => setSelectedMode('Chiều')}
                                    className={`h-12 w-12 rounded-full bg-amber-200 ${selectedMode === 'Chiều' ? 'border-4 border-orange-500' : ''}`}
                                ></div>
                                <div
                                    onClick={() => setSelectedMode('night')}
                                    className={`h-12 w-12 rounded-full bg-gray-500 text-white ${selectedMode === 'night' ? 'border-4 border-orange-500' : ''}`}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center mt-4 font-mono text-2xl text-orange-500">
                            <span>BẬT/TẮT ÂM THANH</span>
                            <button
                                onClick={toggleSound}
                                className={`ml-8 h-6 w-6 ${isSoundOn ? "bg-[url('assets/Asset/ButtonSliderAtlas_cuts/image_32.png')]" : "bg-[url('assets/Asset/ButtonSliderAtlas_cuts/image_32copy.png')]"} bg-cover`}
                            ></button>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleUpdate}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Sửa thông tin
                        </button>

                        <button
                            onClick={handleLogout}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
            {openPopupUpdate && (
                <PopUpUpdateAcc
                    openPopUpUpdate={openPopupUpdate}
                    closePopUpUpdate={HandleRemovePopUpUpdate}
                />
            )}
        </div>
    );
};

export default PopUpAcc;
