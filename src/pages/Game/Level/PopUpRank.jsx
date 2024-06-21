import React, { useState } from 'react';
// import Modal from 'react-modal';

const PopUpRank = ({ openPopUpRank, closePopUpRank }) => {
    
    //gia su cup hien tai la 5
    const [cupCount, setCupCount] = useState(5);

    //popup unlock successfully
    const [unlockSuccess, setUnlockSuccess] = useState(false);


    const unlockFrame =  (frameType) => {
        // setUnlockSuccess(true); // Hiển thị popup khi mở khóa thành công
    };


    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUpRank();
        }
    };

    if (!openPopUpRank) return null;

    const players = [
        {
            name: 'Player 1',
            levels: [
                { level: 1, score: 100, time: 30 },
                { level: 1, score: 150, time: 25 },
                { level: 2, score: 200, time: 40 },
            ],
        },
        {
            name: 'Player 2',
            levels: [
                { level: 1, score: 150, time: 20 },
                { level: 2, score: 200, time: 35 },
                { level: 2, score: 200, time: 38 },
            ],
        },
        {
            name: 'Player 3',
            levels: [
                { level: 1, score: 250, time: 20 },
                { level: 2, score: 500, time: 35 },
                { level: 2, score: 500, time: 38 },
            ],
        },
    ];

    const [selectedTableRank, setSelectedRank] = useState(1);
    const [selectedTableAward, setSelectedAward] = useState(0);

    const handleClick = () => {
        setSelectedAward(!selectedTableAward);
        setSelectedRank(!selectedTableRank);
    };

    const calculatePlayerStats = (players) => {
        return players.map((player) => {
            const levelStats = player.levels.reduce((acc, level) => {
                if (!acc[level.level]) {
                    acc[level.level] = { score: level.score, time: level.time };
                } else {
                    if (
                        level.score > acc[level.level].score ||
                        (level.score === acc[level.level].score &&
                            level.time < acc[level.level].time)
                    ) {
                        acc[level.level] = { score: level.score, time: level.time };
                    }
                }
                return acc;
            }, {});

            const totalScore = Object.values(levelStats).reduce(
                (total, level) => total + level.score,
                0,
            );
            const totalTime = Object.values(levelStats).reduce(
                (total, level) => total + level.time,
                0,
            );

            return {
                name: player.name,
                totalScore,
                totalTime,
            };
        });
    };

    const rankedPlayers = calculatePlayerStats(players).sort((a, b) => {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        return a.totalTime - b.totalTime;
    });

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="w-10/12 rounded-lg border border-emerald-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/2">
                <div className="relative flex grid w-full grid-cols-4 items-center justify-center p-3">
                    <button
                        className="absolute -right-6 -top-8 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                        onClick={closePopUpRank}
                    ></button>
                    <div className="text-center font-mono text-xl font-semibold text-orange-950">
                        <h2
                            className={`mb-4 rounded-lg ${selectedTableRank ? 'bg-orange-300' : 'bg-orange-100'}`}
                            onClick={handleClick}
                        >
                            BẢNG XẾP HẠNG
                        </h2>
                        <h2
                            className={`rounded-lg ${selectedTableAward ? 'bg-orange-300' : 'bg-orange-100'}`}
                            onClick={handleClick}
                        >
                            THÀNH TÍCH
                        </h2>
                    </div>

                    {selectedTableRank && (
                        <table className="col-span-3 w-full table-auto rounded-[20px] bg-orange-300 text-center text-orange-950">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">STT</th>
                                    <th className="px-4 py-2">Tên</th>
                                    <th className="px-4 py-2">Tổng Điểm</th>
                                    <th className="px-4 py-2">Thời Gian Hoàn Thành</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankedPlayers.map((player, index) => (
                                    <tr key={player.name}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{player.name}</td>
                                        <td className="border px-4 py-2">{player.totalScore}</td>
                                        <td className="border px-4 py-2">{player.totalTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {!selectedTableRank && (
                        <div className="col-span-3 max-h-[500px] overflow-y-auto bg-gray-100 p-3 scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                            <div className="rounded-lg bg-orange-300 p-4 text-center shadow-lg">
                                <h2 className="text-2xl font-bold">
                                    Số cúp hiện tại: <span id="cup-count">1</span>
                                </h2>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">
                                    Số lượng vật phẩm thu thập được:
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* hoa lài */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className=" items-baseline font-bold">
                                            <img src="/assets/Asset/Asset/bonusItem/0.png" alt="" />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>
                                    {/* Hoa hồng */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className="items-baseline text-center font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/1.png"
                                                className="mx-auto mb-7"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>

                                    {/* Nhánh lá non xanh */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className="items-baseline text-center font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/2.png"
                                                className="mx-auto mb-4"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>

                                    {/* Cái xẻng */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className=" items-baseline font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/3.png"
                                                className="mx-auto mb-6"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>

                                    {/* Hoa hướng dương */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className=" items-baseline font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/4.png"
                                                className="mx-auto mb-4"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>

                                    {/* Cái xúc */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className=" items-baseline font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/5.png"
                                                className="mx-auto mb-9 mt-2"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>

                                    {/* Lá cây */}
                                    <div className="rounded-lg bg-white p-4 shadow">
                                        <div className=" items-baseline font-bold">
                                            <img
                                                src="/assets/Asset/Asset/bonusItem/6.png"
                                                className="mx-auto mb-4"
                                                alt=""
                                            />
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/Asset/ButtonSliderAtlas_cuts/image_3.png"
                                                    className="mr-1 w-4/5"
                                                    alt=""
                                                />
                                                <span id="flower1-count">0/500</span>
                                            </div>
                                        </div>
                                        <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                            Nhận cúp
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">Danh hiệu:</h3>
                                <div className="flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh chăm chỉ nhất tháng</span>
                                    <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                        Nhận cúp
                                    </button>
                                </div>
                                <div className="mt-4 flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh xuất sắc nhất tháng</span>
                                    <button className="mx-auto mt-2 block rounded-lg bg-lime-400 p-2">
                                        Nhận cúp
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-white p-4 shadow">
                                <h2 className="mb-4 text-lg font-bold">
                                    Số cúp hiện tại: {cupCount}
                                </h2>
                                <div className="flex space-x-4">
                                    {/* Nút mở khóa khung */}
                                    {cupCount >= 1 && (
                                        <button
                                            onClick={() => unlockFrame('bronze')} // Gọi hàm mở khóa với frameType tương ứng
                                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Mở khóa khung Đồng
                                        </button>
                                    )}
                                    {cupCount >= 2 && (
                                        <button
                                            onClick={() => unlockFrame('silver')} // Gọi hàm mở khóa với frameType tương ứng
                                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Mở khóa khung Bạc
                                        </button>
                                    )}
                                    {cupCount >= 3 && (
                                        <button
                                            onClick={() => unlockFrame('gold')} // Gọi hàm mở khóa với frameType tương ứng
                                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Mở khóa khung Vàng
                                        </button>
                                    )}
                                    {cupCount >= 5 && (
                                        <button
                                            onClick={() => unlockFrame('platinum')} // Gọi hàm mở khóa với frameType tương ứng
                                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Mở khóa khung Bạch Kim
                                        </button>
                                    )}
                                    {cupCount >= 7 && (
                                        <button
                                            onClick={() => unlockFrame('diamond')} // Gọi hàm mở khóa với frameType tương ứng
                                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Mở khóa khung Kim Cương
                                        </button>
                                    )}
                                </div>

                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUpRank;
