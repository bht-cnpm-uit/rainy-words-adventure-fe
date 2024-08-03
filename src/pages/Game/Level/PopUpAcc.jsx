import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopUpUpdateAcc from './PopUpUpdateAcc';
import { setAvatar } from '../../../redux/slices/userSlice';
import { getAchivementOfStudent, getStudentInfo, updateAvatar } from '../../../services/studentServices';

const PopUpAcc = ({ openPopUpAcc, closePopUpAcc, mode, setMode }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [confirmLogOut, setConfirmLogOut] = useState(false);
    // const [isSoundOn, setIsSoundOn] = useState(true);
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [achivements, setAchivements] = useState([]);
    const [avatarInfor, setAvatarInfor] = useState({
        "AvatarId": userInfo.AvatarId,
        "FrameId": userInfo.FrameId
    });

    const avatarOptions = [0, 1, 2];

    const [frameOptions, setFrameOptions] = useState([0, 1, 2]);

    const setFramOptions = () => {
        let newFrameOptions = [...frameOptions];
        let addedIds = new Set(newFrameOptions.map(option => option.id));

        for (let i = 0; i < achivements.length; i++) {
            let newId = achivements[i].id + 3;
            if (!addedIds.has(newId)) {
                newFrameOptions.push(newId);
                addedIds.add(newId);
            }
        }
        setFrameOptions(newFrameOptions);
    };


    const handleSetMode = (mode) => {
        setMode(mode);
        localStorage.setItem('theme', mode);
    };

    const showPopUpConfirmLogout = () => {
        setConfirmLogOut(true);
    };

    const handleClosePopUpAcc = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUpAcc();
        }
    };

    function dateFormat(dateStr) {
        let dateObj = new Date(dateStr);

        let day = String(dateObj.getUTCDate()).padStart(2, '0');
        let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        let year = dateObj.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        getStudentInfomation(userInfo.id);
        achivementOfStudent(userInfo.id);
        setFramOptions();
    }, []);

    const getStudentInfomation = async (studentId) => {
        let response = await getStudentInfo(studentId);
        setData(response.student);
    };

    const achivementOfStudent = async (studentId) => {
        let response = await getAchivementOfStudent(studentId);
        let getListAchivement = response.listAchievement.map((achivement) => ({
            id: achivement.id,
            name: achivement.name,
        }));
        setAchivements(getListAchivement);
    };

    const handleCloseConfirmLogOut = () => {
        setConfirmLogOut(false);
    };

    if (!openPopUpAcc) return null;

    const handleLogout = () => {
        window.location.href = '/login';
    };

    const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
    const handleRemovePopUpUpdate = () => setOpenPopupUpdate(false);

    const handleUpdate = () => {
        setOpenPopupUpdate(true);
    };

    // const toggleSound = () => {
    //     setIsSoundOn(!isSoundOn);
    // };

    const handleAvatarSelection = (avatar) => {
        setAvatarInfor(prevState => ({
            ...prevState,
            AvatarId: avatar
        }));
    };

    const handleFrameSelection = (frame) => {
        setAvatarInfor(prevState => ({
            ...prevState,
            FrameId: frame
        }));
    };

    const handleUpdateSuccess = () => {
        getStudentInfomation(userInfo.id);
    };
    const handleChangeAvatar = async () => {
        let res = await updateAvatar({
            studentId: userInfo.id,
            AvatarId: avatarInfor.AvatarId,
            FrameId: avatarInfor.FrameId,
        })
        if (res.errCode === "0") {
            dispatch(setAvatar({
                AvatarId: avatarInfor.AvatarId,
                FrameId: avatarInfor.FrameId,
            }))
        }
        setAvatarModalOpen(false)
    }
    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUpAcc}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="relative w-10/12 rounded-[20px] border-4 border-yellow-600 bg-orange-100 p-2 py-4 shadow-md md:w-1/2 lg:w-1/3">
                <button
                    onClick={closePopUpAcc}
                    className="absolute -right-5 -top-6 ml-auto h-10 w-10 bg-[url('/Asset/Button/btn_5.png')] bg-cover"
                ></button>
                <div className="relative max-h-[500px] w-full items-center justify-center overflow-y-auto scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                    <div className="sticky top-0 rounded-tl-lg bg-orange-200 p-4 text-center shadow-lg z-10">
                        <h2 className="font-mono text-3xl font-semibold text-orange-500">
                            THÔNG TIN TÀI KHOẢN
                        </h2>
                    </div>
                    <div className="mt-6">
                        <div className="avt flex flex-col items-center">
                            <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border-zinc-950">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        backgroundImage: `url(/Asset/FrameAvatar/${userInfo.FrameId}.png)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                                <div
                                    className="h-36 w-36 rounded-full"
                                    style={{
                                        backgroundImage: `url(/Asset/Avatar/${userInfo.AvatarId}.png)`,
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

                        </div>

                        <div className="my-2 ml-4 mr-4 mt-4 bg-orange-50">
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Tên:</span> {data.name}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Lớp:</span> {data.grade}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Ngày sinh:</span>
                                {dateFormat(data.birthday)}
                            </p>
                            <p className="ml-4 text-lg">
                                <span className="mr-4 font-semibold">Số điện thoại:</span>
                                {data.phoneNumber}
                            </p>
                        </div>

                        <div>
                            <div className="mt-4 font-mono text-2xl">
                                <p className="text-orange-500">CHẾ ĐỘ</p>
                                <div className="flex justify-center space-x-4">
                                    <div onClick={() => handleSetMode('light')} className={`h-12 w-12 cursor-pointer border-2 rounded-full  bg-green-200 ${mode === 'light' ? 'border-orange-500 border-solid opacity-100' : 'opacity-75 border-orange-400 border-dashed'}`}>
                                        <svg viewBox="0 0 512 512" className='fill-yellow-500 m-2'>
                                            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                                        </svg>
                                    </div>
                                    <div onClick={() => handleSetMode('dark')} className={`h-12 w-12 cursor-pointer border-2 rounded-full bg-neutral-700  text-white ${mode === 'dark' ? 'border-orange-500 border-solid opacity-100' : 'opacity-75 border-orange-400 border-dashed'}`}>
                                        <svg viewBox="-60 0 512 512" className='fill-white m-1'>
                                            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                                        </svg>
                                    </div>

                                </div>
                            </div>
                            {/* <div className="mt-4 flex items-center justify-start font-mono text-2xl text-orange-500">
                            <span>BẬT/TẮT ÂM THANH</span>
                            <button
                                onClick={toggleSound}
                                className={`ml-8 h-6 w-6 ${isSoundOn ? "bg-[url('assets/ButtonSliderAtlas/image_32.png')]" : "bg-[url('assets/ButtonSliderAtlas/image_32copy.png')]"} bg-cover`}
                            ></button>
                        </div> */}
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
            </div>

            <div className="z-20">
                {openPopupUpdate && (
                    <PopUpUpdateAcc
                        openPopUpUpdate={openPopupUpdate}
                        closePopUpUpdate={handleRemovePopUpUpdate}
                        student={data}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                )}
                {isAvatarModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-2/5 rounded-lg bg-orange-50 p-5 shadow-lg">
                            <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-zinc-950">
                                <div
                                    className="cursor-pointer absolute inset-0 rounded-full"
                                    style={{
                                        backgroundImage: `url(/Asset/FrameAvatar/${avatarInfor.FrameId}.png)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                                <div
                                    className="cursor-pointer h-36 w-36 rounded-full"
                                    style={{
                                        backgroundImage: `url(/Asset/Avatar/${avatarInfor.AvatarId}.png)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            </div>
                            <h2 className="mb-4 flex font-mono text-2xl text-orange-400">
                                CHỌN ẢNH
                            </h2>
                            <div className="flex">
                                {avatarOptions.map((avatar) => (
                                    <img
                                        key={avatar}
                                        src={`/Asset/Avatar/${avatar}.png`}
                                        alt="Avatar"
                                        className={`hover:opacity-100 h-28 mx-5 cursor-pointer rounded-full border-2 ${avatar === avatarInfor.AvatarId ? 'opacity-100' : 'opacity-75'}`}
                                        onClick={() => handleAvatarSelection(avatar)}
                                    />
                                ))}
                            </div>

                            <h2 className="mt-4 mb-4 flex font-mono text-2xl text-orange-400">CHỌN KHUNG</h2>
                            < div className="flex overflow-y-auto w-full scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400 snap-x" >
                                {
                                    frameOptions.map((frame) => (
                                        <img
                                            key={frame}
                                            src={`/Asset/FrameAvatar/${frame}.png`}
                                            alt="Frame"
                                            className={`hover:opacity-100 h-28 mx-5 cursor-pointer rounded-full border-none ${frame === avatarInfor.FrameId ? 'opacity-100' : 'opacity-75'}`}
                                            onClick={() => handleFrameSelection(frame)}
                                        />
                                    ))
                                }
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => handleChangeAvatar()}
                                    className={`mt-4 rounded bg-amber-600 px-6 py-2 mr-3 font-bold text-white hover:bg-amber-800 ${(avatarInfor.FrameId !== userInfo.FrameId || avatarInfor.AvatarId !== userInfo.AvatarId) ? "" : "cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"}`}
                                >
                                    Lưu thay đổi
                                </button>
                                <button
                                    onClick={() => setAvatarModalOpen(false)}
                                    className="mt-4 rounded bg-amber-600 px-6 py-2 ml-3 font-bold text-white hover:bg-amber-800"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {confirmLogOut && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="rounded-lg border-4 border-yellow-600 bg-white p-6 text-center shadow-lg">
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
        </div >
    );
};

export default PopUpAcc;
