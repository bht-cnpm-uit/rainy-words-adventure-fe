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
        if (difficulty < 5) { // Kiểm tra nếu độ khó nhỏ hơn 5
            setDifficulty(difficulty + 1);
        } else {
            // Nếu độ khó đã đạt đến mức 5, thông báo cho người dùng biết
            alert("Bạn đã đạt đến mức độ khó tối đa!");
        }
    };

    return (
        <div className="flex bg-cover items-center justify-end text-center mr-10 p-10">
            <div className="bg-[url('src/assets/Asset/PanelAtlas_cuts/image_3.png')] bg-cover">
                <div className="m-10 bg-[url('src/assets/Asset/PanelAtlas_cuts/image_7.png')] bg-cover" >
        
                <div className="col-span-2 flex justify-center items-center relative">
                    <img src="src/assets/Asset/PanelAtlas_cuts/image_6.png " alt="hinh anh" className="h-20"/>
                    <div class="absolute -inset-5 flex justify-center">
                        <h2 class="text-white text-6xl font-bold mb-7">1080</h2>
                    </div>
                </div>

                <div className="col-span-2">
                    <span className="text-[#78350f] text-lg">Level 1</span>
                </div>

                <div class="flex justify-center items-center grid-cols-2 ">
                    <div className="">
                        <img src="src/assets/img/cat2.png " alt="con meo" className="w-40 h-40" />
                    </div>
                    <div className="">
                        <p className="font-bold text-[#78350f]">ĐỘ KHÓ</p>
                        
                        <div className="flex flex-wrap mr-2 ml-2 ">
                            <button id="btnPre" className="mr-5 w-12" onClick={handlePreClick}>
                                <img src="src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_8.png" alt="" />
                            </button>
                            <p className="flex justify-center items-center">{difficulty}</p>
                            <button id="btnNext" className="ml-5 w-12" onClick={handleNextClick}>
                                <img src="src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_7.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-10 pb-4 col-span-2 flex justify-center items-center relative">
                    <button className="w-40 ">
                        <img src="src/assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png" alt="" />
                        <div class="absolute inset-3 flex justify-center">
                            <h2 class="text-white text-[#78350f] text-xl font-bold">CHƠI</h2>
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
