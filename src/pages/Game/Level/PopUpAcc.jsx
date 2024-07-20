import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopUpUpdateAcc from './PopUpUpdateAcc';
import { setAvatar, setFrame } from '../../../redux/slices/userSlice';

const PopUpAcc = ({ openPopUpAcc, closePopUpAcc, mode, setMode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [confirmLogOut, setConfirmLogOut] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

    const avatarOptions = [
        '/assets/Asset/Avt_Frame_cuts/3.png',
        '/assets/Asset/Avt_Frame_cuts/4.png',
        '/assets/Asset/Avt_Frame_cuts/8.png',
    ];

    const frameOptions = [
        '/assets/Asset/Avt_Frame_cuts/0.png',
        '/assets/Asset/Avt_Frame_cuts/1.png',
        '/assets/Asset/Avt_Frame_cuts/2.png',
        // Add more frame options here
    ];

    const handleSetMode = (mode) => {
        setMode(mode);
        localStorage.setItem('theme', mode)
    }

    const showPopUpConfirmLogout = () => {
        setConfirmLogOut(true);
    };

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

    const handleCloseConfirmLogOut = () => {
        setConfirmLogOut(false);
    };

    if (!openPopUpAcc) return null;

    const handleLogout = () => {
        // Perform logout logic here
        // Redirect to homepage
        window.location.href = '/login';
    };

    const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
    const handleRemovePopUpUpdate = () => setOpenPopupUpdate(false);

    const handleUpdate = () => {
        setOpenPopupUpdate(true);
    };

    const toggleSound = () => {
        setIsSoundOn(!isSoundOn);
    };

    const handleAvatarSelection = (avatar) => {
        dispatch(setAvatar(avatar));
        setAvatarModalOpen(false);
    };

    const handleFrameSelection = (frame) => {
        dispatch(setFrame(frame));
        setIsFrameModalOpen(false);
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUpAcc}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="w-10/12 rounded-[20px] border border-4 border-yellow-600 bg-orange-100 p-2 py-4 shadow-md md:w-1/2 lg:w-1/3">
                <button
                    onClick={closePopUpAcc}
                    className="relative -right-6 -top-8 -mb-4 ml-auto flex h-10 w-10 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                ></button>
                <div className="relative max-h-[500px] w-full items-center justify-center overflow-y-auto p-3 scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                    <h2 className="py-3 text-center font-mono text-3xl font-semibold text-orange-500">
                        THÔNG TIN TÀI KHOẢN
                    </h2>

                    <div className="avt flex flex-col items-center">
                        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-2 border-zinc-950">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    backgroundImage: `url(${user.frame})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                            <div
                                className="h-36 w-36 rounded-full"
                                style={{
                                    backgroundImage: `url(${user.avatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                        </div>
                        <button
                            onClick={() => setAvatarModalOpen(true)}
                            className="mb-4 mt-4 items-center justify-center rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-800"
                        >
                            Chọn ảnh đại diện
                        </button>
                        <button
                            onClick={() => setIsFrameModalOpen(true)}
                            className="mb-4 items-center justify-center rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-800"
                        >
                            Chọn khung
                        </button>
                    </div>

                    <div className="my-2 ml-4 mr-4 mt-4 bg-orange-50">
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

                    <div>
                        <div className="mt-4 font-mono text-2xl">
                            <p className="text-orange-500">CHẾ ĐỘ</p>
                            <div className="flex justify-center space-x-4">
                                <div
                                    onClick={() => handleSetMode('light')}
                                    className={`h-12 w-12 cursor-pointer rounded-full bg-white ${mode === 'light' ? 'border-4 border-orange-500' : ''}`}
                                ></div>
                                <div
                                    onClick={() => handleSetMode('dark')}
                                    className={`h-12 w-12 cursor-pointer rounded-full bg-gray-500 text-white ${mode === 'dark' ? 'border-4 border-orange-500' : ''}`}
                                ></div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-start font-mono text-2xl text-orange-500">
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
                            onClick={showPopUpConfirmLogout}
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
                    closePopUpUpdate={handleRemovePopUpUpdate}
                />
            )}

            {isAvatarModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/2 rounded-lg bg-orange-50 p-5 shadow-lg">
                        <h2 className="mb-4 flex justify-center font-mono text-2xl">
                            CHỌN ẢNH ĐẠI DIỆN
                        </h2>
                        <div className="flex justify-around">
                            {avatarOptions.map((avatar) => (
                                <img
                                    key={avatar}
                                    src={avatar}
                                    alt="Avatar"
                                    className="h-28 w-28 cursor-pointer rounded-full border-4"
                                    onClick={() => handleAvatarSelection(avatar)}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setAvatarModalOpen(false)}
                                className="mt-4 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isFrameModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/2 rounded-lg bg-orange-50 p-5 shadow-lg">
                        <h2 className="mb-4 flex justify-center font-mono text-2xl">CHỌN KHUNG</h2>
                        <div className="flex justify-around">
                            {frameOptions.map((frame) => (
                                <img
                                    key={frame}
                                    src={frame}
                                    alt="Frame"
                                    className="h-28 w-28 cursor-pointer rounded-full border-4"
                                    onClick={() => handleFrameSelection(frame)}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsFrameModalOpen(false)}
                                className="mt-4 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmLogOut && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-lg border border-4 border-yellow-600 bg-white p-6 text-center shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold">Thoát khỏi trò chơi</h2>
                        <p className="mb-4">Bạn có chắc chắn muốn thoát khỏi trò chơi không?</p>
                        <button
                            className="mr-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            Có
                        </button>
                        <button
                            className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                            onClick={handleCloseConfirmLogOut}
                        >
                            Không
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopUpAcc;
