function LevelComponent() {
    return (
        <div className="flex h-screen items-center justify-center text-center">
            <div className="relative grid gap-2 rounded-lg bg-amber-100 p-4 shadow-md">
                <div className="col-span-2">
                    <h2 className="mb-2 text-lg font-semibold">SCORE</h2>
                    <img src="src/assets/img/image.png " alt="hinh anh" className=" h-20" />
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
                        <p className="mt-10 font-bold">2</p>
                    </div>
                </div>
                
                <div className="col-span-2 flex items-center justify-center">
                    <button className="bottom-10 rounded bg-[#000] px-5 py-1.5 font-bold text-white duration-200 ease-in  hover:bg-[#ff2343]">
                        Chơi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LevelComponent;
