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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="w-10/12 rounded-lg border border border-4 border-emerald-600 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/2">
                <div className="relative flex grid w-full grid-cols-4 items-center justify-center p-3 ">
                    <button
                        className="absolute -right-6 -top-8 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas/image_19.png')] bg-cover"
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
                                    <th className="px-4 py-2">Trường</th>
                                    <th className="px-4 py-2">Lớp</th>
                                    <th className="px-4 py-2">Tổng Điểm</th>
                                    <th className="px-4 py-2">Thời gian</th>

                                    
                                </tr>
                            </thead>
                            <tbody>
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
                                                    src={`/assets/Asset/item/${item.id}.png`}
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

                            {/* <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">Danh hiệu đạt được:</h3>
                                <div className="flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh chăm chỉ nhất tháng</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between rounded-lg  bg-white p-4 shadow">
                                    <span className="flex-1">Học sinh xuất sắc nhất tháng</span>
                                </div>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUpRank;
