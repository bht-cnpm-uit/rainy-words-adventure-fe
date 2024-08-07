import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import {
    getAchivementOfStudent,
    getItemsOfStudent,
    getStudentInfo,
} from '../../../services/studentServices';
import { getLeaderboard } from '../../../services/gameServices';

const PopUpRank = ({ openPopUpRank, closePopUpRank }) => {
    const [cupCount, setCupCount] = useState(0);
    const [items, setItems] = useState([]);

    const userInfo = useSelector((state) => state.user.userInfo);
    const [leaderboardStudents, setLeaderboardStudents] = useState([]);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            itemsOfStudent(userInfo.id);
            getStudentInfomation(userInfo.id);
            getLeaderBoads();
        }
    }, [userInfo]);

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

    const getStudentInfomation = async (studentId) => {
        let response = await getStudentInfo(studentId);

        setCupCount(response.student.cup);
    };

    const getLeaderBoads = async () => {
        let response = await getLeaderboard();

        let getLeaderboardStudents = response.leaderboard.map((student) => ({
            id: student.id,
            name: student.Name,
            school: student.School,
            grade: student.Grade,
            score: student.Score,
            cup: student.cup,
            totalTime: student.TotalTime
        }));
        setLeaderboardStudents(getLeaderboardStudents);
    };

    const [selectedTableRank, setSelectedRank] = useState(1);
    const [selectedTableAward, setSelectedAward] = useState(0);

    const handleClick = () => {
        setSelectedAward(!selectedTableAward);
        setSelectedRank(!selectedTableRank);
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="w-full h-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="relative flex rounded-lg h-3/4 border-4 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-3/5">
                <button
                    className="absolute -right-5 -top-7 h-12 w-12 bg-[url('/Asset/Button/btn_5.png')] bg-cover"
                    onClick={closePopUpRank}
                ></button>
                <div className="left w-1/5 text-center align-middle content-center">
                    <div className="font-mono text-xl font-semibold text-orange-950">
                        <h2
                            className={`cursor-pointer mr-2 mb-4 rounded-lg ${selectedTableRank ? 'bg-orange-400' : 'bg-orange-200'}`}
                            onClick={handleClick}
                        >
                            BẢNG XẾP HẠNG
                        </h2>
                        <h2
                            className={`cursor-pointer mr-2 rounded-lg ${selectedTableAward ? 'bg-orange-400' : 'bg-orange-200'}`}
                            onClick={handleClick}
                        >
                            THÀNH TÍCH
                        </h2>
                    </div>
                </div>
                <div className="right w-4/5 h-full">
                    <div className="relative w-full h-full overflow-y-auto scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                        {selectedTableRank && (
                            <table className="w-full table-auto bg-orange-200 text-center text-orange-950">
                                <thead className="sticky top-0 bg-orange-200">
                                    <tr>
                                        <th className="px-4 py-2">STT</th>
                                        <th className="px-4 py-2">Tên</th>
                                        <th className="px-4 py-2">Trường</th>
                                        <th className="px-4 py-2">Lớp</th>
                                        <th className="px-4 py-2">Tổng Điểm</th>
                                        <th className="px-4 py-2">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {leaderboardStudents.map((player, index) => (
                                        <tr key={player.id}>
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{player.name}</td>
                                            <td className="border px-4 py-2">{player.school}</td>
                                            <td className="border px-4 py-2">{player.grade}</td>
                                            <td className="border px-4 py-2">{player.score}</td>
                                            <td className="border px-4 py-2">{player.totalTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )}

                        {!selectedTableRank && (
                            <>
                                <div className="sticky top-0 z-20 rounded-tl-lg bg-orange-200 p-4 text-center shadow-lg">
                                    <h2 className="text-2xl font-bold text-orange-500">THÀNH TỰU ĐẠT ĐƯỢC</h2>
                                </div>

                                <div className="mt-6">
                                    <div className="grid grid-cols-2 gap-4 mx-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="rounded-lg bg-white p-4 shadow"
                                            >
                                                <div className="relative items-baseline text-center font-bold">
                                                    <img
                                                        src={`/Asset/Item/${item.id}.png`}
                                                        className={`mx-auto h-16 mb-3 relative ${(item.count >= 500) ? 'opacity-50' : ''}`}
                                                        alt=""
                                                    />
                                                    {(item.count >= 500)
                                                        &&
                                                        <>
                                                            <svg
                                                                className='opacity-100 absolute top-0 left-0 w-full h-full z-10 fill-green-600'
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 800 800"
                                                            >
                                                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                                            </svg>
                                                        </>

                                                    }
                                                    <div className="flex items-center justify-center">
                                                        <ProgressBar
                                                            currentValue={item.count}
                                                            maxValue={500}
                                                        />
                                                        <span className='text-orange-500'>{item.count}/500</span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    <h3 className="mt-5 text-center mb-4 text-xl font-semibold text-orange-500">
                                        Huy chương nhận được
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4 mx-4">
                                        {items.map((item) => {
                                            if (item.count >= 500) {
                                                return (
                                                    <div key={item.id} className="rounded-lg bg-orange-100 p-3 shadow">
                                                        <div className="relative items-baseline text-center font-bold">
                                                            <img
                                                                src={`/Asset/Medals/${item.id}.png`}
                                                                className="mx-auto h-16 mb-3 relative animate-wiggle"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null; // Optionally handle cases where item.count < 500
                                            }
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
};

export default PopUpRank;
