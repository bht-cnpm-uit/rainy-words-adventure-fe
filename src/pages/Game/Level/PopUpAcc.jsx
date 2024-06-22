import React, { useState } from 'react';
import PopUpUpdateAcc from './PopUpUpdateAcc';

const PopUpAcc = ({ openPopUpAcc, closePopUpAcc }) => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [confirmLogOut, setConfirmLogOut] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(
        '/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_1-1.png',
    );

    const avatarOptions = [
        '/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_1-0.png',
        '/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_0-3.png',
        '/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_1-2.png',
    ];

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
    }

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

    const handleAvatarSelection = (avatar) => {
        setSelectedAvatar(avatar);
        setAvatarModalOpen(false);
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUpAcc}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm "
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
                        <div
                            className="mx-auto h-40 w-40 rounded-full border-2 border-zinc-950"
                            style={{
                                backgroundImage: `url(${selectedAvatar})`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                        <button
                            onClick={() => setAvatarModalOpen(true)}
                            className="mb-4 mt-4 items-center justify-center rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-800"
                        >
                            Chọn ảnh đại diện
                        </button>
                    </div>
                    <div className="my-2">
                        {/* <div className="flex flex-col items-center">
                            <div className="mx-auto h-40 w-40 rounded-full border-2 border-zinc-950 bg-[url('/assets/Asset/Stars/4.png')] bg-cover"></div>
                        </div> */}
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
                    closePopUpUpdate={HandleRemovePopUpUpdate}
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

            {confirmLogOut && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-lg border border-4 border-yellow-600 bg-white p-6 text-center shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold">Thoát khỏi trò chơi</h2>
                        <p className="mb-4">Bạn có chắc chắn muốn thoát khỏi trò chơi không?</p>
                        <button className="rounded-lg bg-red-500 px-4 py-2 mr-4 text-white hover:bg-red-600" onClick={handleLogout}>
                            Có
                        </button>
                        <button className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600" onClick={handleCloseConfirmLogOut}>
                            Không
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopUpAcc;
