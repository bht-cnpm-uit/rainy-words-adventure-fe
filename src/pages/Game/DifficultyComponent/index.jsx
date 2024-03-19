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
        <div className="flex h-screen items-center justify-center text-center">
            <div className="relative grid gap-2 rounded-lg bg-amber-100 p-4 shadow-md">
                <div className="col-span-2 flex justify-center items-center">
                    {/* <h2 className="mb-2 text-lg font-semibold">SCORE</h2> */}
                    <img src="src/assets/img/image.png " alt="hinh anh" className="h-20" />
                </div>

                <div className="col-span-2">
                    <span className="text-gray-600 font-bold">Level 1</span>
                </div>

                <div class="flex grid-cols-2">
                    <div className="">
                        <img src="src/assets/img/cat2.png " alt="hinh anh" className="w-40 h-40" />
                    </div>
                    <div className="">
                        <p className="text-gray-600">ĐỘ KHÓ</p>
                        
                        <p className="mt-10 font-bold flex flex-wrap ">
                            <button id="btnPre" className="ml-5 mr-5" onClick={handlePreClick}>
                                <img src="src/assets/img/BtnPre.png" alt="" />
                            </button>
                            {difficulty}
                            <button id="btnNext" className="ml-5" onClick={handleNextClick}>
                                <img src="src/assets/img/BtnNext.png" alt="" />
                            </button>
                        </p>
                    </div>
                </div>
                
                <div className="col-span-2 flex justify-center items-center">
                    <button className="bottom-10 rounded bg-[#000] px-5 py-1.5 font-bold text-white duration-200 ease-in  hover:bg-[#ff2343]">
                        Chơi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DifficultyComponent;
