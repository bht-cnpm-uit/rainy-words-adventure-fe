import React, { useState } from 'react';
function DifficultyComponent() {
    // Sử dụng useState để lưu trữ giá trị của số độ khó
    const [difficulty, setDifficulty] = useState(1);

    // Hàm xử lý khi click vào nút Pre
    const handlePreClick = () => {
        if (difficulty > 1) {
            setDifficulty(difficulty - 1);
        }
    };

    // Hàm xử lý khi click vào nút Next
    const handleNextClick = () => {
        if (difficulty < 5) {
            // Kiểm tra nếu độ khó nhỏ hơn 5
            setDifficulty(difficulty + 1);
        } else {
            // Nếu độ khó đã đạt đến mức 5, thông báo cho người dùng biết
            alert('Bạn đã đạt đến mức độ khó tối đa!');
        }
    };

    return (
        <div className="mr-10 flex items-center justify-end bg-cover p-10 text-center">
            <div className="bg-[url('../assets/Asset/PanelAtlas_cuts/image_3.png')] bg-cover">
                <div className="m-10 bg-[url('../assets/Asset/PanelAtlas_cuts/image_7.png')] bg-cover">
                    <div className="relative col-span-2 flex items-center justify-center">
                        <img
                            src="../assets/Asset/PanelAtlas_cuts/image_6.png "
                            alt="hinh anh"
                            className="h-20"
                        />
                        <div class="absolute -inset-5 flex justify-center">
                            <h2 class="text-white mb-7 text-6xl font-bold">1080</h2>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <span className="text-lg text-[#78350f]">Level 1</span>
                    </div>

                    <div class="flex grid-cols-2 items-center justify-center ">
                        <div className="">
                            <img
                                src="../assets/img/cat2.png "
                                alt="con meo"
                                className="h-40 w-40"
                            />
                        </div>
                        <div className="">
                            <p className="font-bold text-[#78350f]">ĐỘ KHÓ</p>

                            <div className="ml-2 mr-2 flex flex-wrap ">
                                <button id="btnPre" className="mr-5 w-12" onClick={handlePreClick}>
                                    <img
                                        src="../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png"
                                        alt=""
                                    />
                                </button>
                                <p className="flex items-center justify-center">{difficulty}</p>
                                <button
                                    id="btnNext"
                                    className="ml-5 w-12"
                                    onClick={handleNextClick}
                                >
                                    <img
                                        src="../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative col-span-2 mt-10 flex items-center justify-center pb-4">
                        <button className="w-40 ">
                            <img
                                src="../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png"
                                alt=""
                            />
                            <div class="absolute inset-3 flex justify-center">
                                <h2 class="text-white text-xl font-bold text-[#78350f]">CHƠI</h2>
                            </div>
                        </button>
                    </div>

                    <div className="h-9"></div>
                </div>
            </div>
        </div>
    );
}

export default DifficultyComponent;
