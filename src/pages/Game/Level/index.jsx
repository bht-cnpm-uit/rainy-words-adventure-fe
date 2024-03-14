function LevelComponent() {
    return (
        <div className=" flex h-screen items-center justify-center">
            <div className=" relative h-1/2 w-1/3 items-center justify-center rounded-lg bg-amber-100 p-4 shadow-md">
                <div className="text-center">
                    <h2 className="mb-2 text-lg font-semibold">SCORE:</h2>
                    <div className="flex justify-between">
                        <p className="text-gray-600">Level:</p>
                        <p className="font-bold text-blue-600">1</p>
                    </div>
                    <div class="mt-2 flex justify-between">
                        <p className="text-gray-600">Độ khó:</p>
                        <p className="font-bold text-blue-600">2</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button className="absolute bottom-10 rounded bg-[#000] px-5 py-1.5 font-bold text-white duration-200 ease-in  hover:bg-[#ff2343]">
                        Chơi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelComponent;
