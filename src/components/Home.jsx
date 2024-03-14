const Home = () => {
    return (
        <div className="relative h-screen bg-[url('src/assets/img/background')] bg-cover bg-center">
            <div className="flex">
                <button
                    className="ml-40 mt-20 rounded border-2 px-5 py-1.5 font-bold duration-200 hover:bg-[#ff2343] "
                    type="button"
                    // onClick={handleCreateMessage}
                    style={{ fontFamily: 'Dancing Script' }}
                >
                    Hướng dẫn
                </button>
            </div>

            <div className="flex justify-center">
                <button
                    className="absolute bottom-20 rounded bg-[#000] px-5 py-1.5 font-bold text-white duration-200 ease-in  hover:bg-[#ff2343]  "
                    type="button"
                    // onClick={handleCancel}
                    style={{ fontFamily: 'Dancing Script' }}
                >
                    Bắt đầu
                </button>
            </div>
        </div>
    );
};

export default Home;
