import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { getAchivementOfStudent, getItemsOfStudent } from '../../../services/studentServices';

const PopUpRank = ({ openPopUpRank, closePopUpRank }) => {
    const [cupCount, setCupCount] = useState(2);
    const [items, setItems] = useState([]);
    const [achivements, setAchivements] = useState([]);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        console.log('User info:', userInfo);
        if (userInfo && userInfo.id) {
            achivementOfStudent(userInfo.id);
            itemsOfStudent(userInfo.id);
        }
    }, [userInfo]);

    const achivementOfStudent = async (studentId) => {
        let response = await getAchivementOfStudent(studentId);
        console.log('Achivement: ', response);
        let getListAchivement = response.listAchievement.map((achivement) => ({
            id: achivement.id,
            name: achivement.name,
        }));
        setAchivements(getListAchivement);
    };

    const itemsOfStudent = async (studentId) => {
        let response = await getItemsOfStudent(studentId);
        let getItemsOfStudents = response.items.map((item) => ({
            id: item.id,
            count: item.count,
        }));
        setItems(getItemsOfStudents);
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
            <div className="w-10/12 rounded-lg border border border-4 border-emerald-600 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/2">
                <div className="relative flex grid w-full grid-cols-4 items-center justify-center p-3 ">
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
                        <table className="col-span-3 w-full table-auto rounded-[20px] bg-orange-200 text-center text-orange-950">
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
                        <div className="col-span-3 max-h-96 overflow-y-auto bg-gray-100 p-3 scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                            <div className="rounded-lg bg-orange-300 p-4 text-center shadow-lg">
                                <h2 className="text-2xl font-bold">THÀNH TỰU ĐẠT ĐƯỢC</h2>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">
                                    Số lượng vật phẩm thu thập được:
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-lg bg-white p-4 shadow"
                                        >
                                            <div className="items-baseline text-center font-bold">
                                                <img
                                                    src={`/assets/Asset/Asset/item/${item.id}.png`}
                                                    className="mx-auto h-24 w-32"
                                                    alt=""
                                                />
                                                <div className="flex items-center justify-center">
                                                    <ProgressBar
                                                        currentValue={item.count}
                                                        maxValue={500}
                                                    />
                                                    <span>{item.count}/500</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">Danh hiệu đạt được:</h3>
                                <div className="flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh chăm chỉ nhất tháng</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh xuất sắc nhất tháng</span>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-white p-4 shadow">
                                <h2 className="mb-4 text-lg font-bold">Số khung đã được mở:</h2>
                                <div className="ml-8 flex grid grid-cols-2 items-center justify-center gap-4">
                                    {cupCount >= 1 && (
                                        <button className="h-40 w-44 rounded-lg bg-[url('/assets/Asset/Avt_Frame_cuts/5.png')] bg-cover text-gray-800 hover:bg-gray-300"></button>
                                    )}
                                    {cupCount >= 2 && (
                                        <button className="h-40 w-44 rounded-lg bg-[url('/assets/Asset/Avt_Frame_cuts/6.png')] bg-cover text-gray-800 hover:bg-gray-300"></button>
                                    )}
                                    {cupCount >= 3 && (
                                        <button className="h-40 w-44 rounded-lg bg-[url('/assets/Asset/Avt_Frame_cuts/7.png')] bg-cover text-gray-800 hover:bg-gray-300">
                                            <img src="/assets/Asset/Avt_Frame_cuts/7.png" alt="" />
                                        </button>
                                    )}
                                    {cupCount >= 5 && (
                                        <button className="h-40 w-44 rounded-lg bg-[url('/assets/Asset/Avt_Frame_cuts/9.png')] bg-cover text-gray-800 hover:bg-gray-300">
                                            <img src="/assets/Asset/Avt_Frame_cuts/9.png" alt="" />
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
