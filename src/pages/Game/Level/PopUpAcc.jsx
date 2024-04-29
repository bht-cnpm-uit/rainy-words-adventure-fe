import React from 'react';

const student = [
    {
        name: 'Nguyễn Văn A',
        school: 'Trường THPT ABC',
        grade: '12',
        dayOfBirth: '01/01/2004',
        phoneNumber: '0123456789',
    },
];

const PopUpAcc = ({ openPopUpAcc, closePopUpAcc }) => {
    const handleClosePopUpAcc = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUpAcc();
        }
    };

    if (!openPopUpAcc) return null;

    const handleLogout = () => {
        // Perform logout logic here
        // Redirect to homepage
        window.location.href = '/login';
    };

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUpAcc}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm "
        >
            <div className="w-10/12 rounded-lg border border-4 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/3">
                <div className="w-full items-center justify-center p-3">
                    <h2 className="py-3 text-center text-xl font-semibold">THÔNG TIN TÀI KHOẢN</h2>
                    <div className="my-2">
                        <div className='avt flex flex-col items-center'>
                            <div className="mx-auto h-40 w-40 rounded-full border-2 border-zinc-950 bg-[url('public/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_1-1.png')] bg-cover">
                                </div>
                                {/* <button
                                    onClick={() => console.log('Choose Avatar')}
                                    className="items-center justify-center mt-4 rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-800 mb-4"
                                    >
                                    Chọn ảnh đại diện
                                </button> */}
                        </div>
                        <div className='ml-8 mt-4'>
                            <p className="text-lg">
                                <span className="mr-4 font-semibold">Tên:</span> {student[0].name}
                            </p>
                            <p className="text-lg">
                                <span className="mr-4 font-semibold">Trường:</span>{' '}
                                {student[0].school}
                            </p>
                            <p className="text-lg">
                                <span className="mr-4 font-semibold">Lớp:</span> {student[0].grade}
                            </p>
                            <p className="text-lg">
                                <span className="mr-4 font-semibold">Ngày sinh:</span>{' '}
                                {student[0].dayOfBirth}
                            </p>
                            <p className="text-lg">
                                <span className="mr-4 font-semibold">Số điện thoại:</span>{' '}
                                {student[0].phoneNumber}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800">
                            Sửa thông tin
                        </button>
                        <button
                            onClick={handleLogout}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpAcc;
