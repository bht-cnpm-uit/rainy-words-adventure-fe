import React, {useState} from 'react';

const PopUpRank = ({ openPopUpRank, closePopUpRank }) => {
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
                    <div className='text-xl font-semibold text-center font-mono text-orange-950'>
                        <h2 className={`rounded-lg mb-4 ${selectedTableRank ? 'bg-orange-300': 'bg-orange-100'}`} onClick={handleClick} >
                            BẢNG XẾP HẠNG
                        </h2>
                        <h2 className={`rounded-lg ${selectedTableAward ? 'bg-orange-300': 'bg-orange-100'}`} onClick={handleClick}>
                            THÀNH TÍCH
                        </h2>
                    </div>

                    {selectedTableRank && (
                        <table className="col-span-3 w-full table-auto text-center bg-orange-300 rounded-[20px] text-orange-950">
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
                        <div className="bg-orange-300 w-[500px] h-[300px] rounded-[20px] text-center">HELLO</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUpRank;
