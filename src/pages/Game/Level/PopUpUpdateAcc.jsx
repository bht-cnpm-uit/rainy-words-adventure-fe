import React, { useState } from 'react';

const student = {
    name: 'Nguyễn Văn A',
    school: 'Trường THPT ABC',
    grade: '12',
    dayOfBirth: '01/01/2004',
    phoneNumber: '0123456789',
};

const PopUpUpdateAcc = ({ openPopUpUpdate, closePopUpUpdate }) => {
    const [updatedStudent, setUpdatedStudent] = useState(student);

    const handleClosePopUpUpdate = (e) => {
        if (e.target.id === 'ModelContainerUpdate') {
            closePopUpUpdate();
        }
    };

    if (!openPopUpUpdate) return null;

    const handleClose = () => {
        closePopUpUpdate();
    };

    const handleUpdate = () => {
        // Xử lý cập nhật dữ liệu
        console.log(updatedStudent);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    return (
        <div
            id="ModelContainerUpdate"
            onClick={handleClosePopUpUpdate}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
            <div className="w-10/12 rounded-lg border border-4 border-yellow-600 bg-orange-100 p-2 py-5 shadow-md md:w-1/2 lg:w-1/3">
                <div className="w-full items-center justify-center p-3">
                    <h2 className="py-3 text-center text-xl font-semibold">CẬP NHẬP THÔNG TIN</h2>
                    <div className="my-2">
                        <div className="avt flex flex-col items-center">
                            <div className="mx-auto h-40 w-40 rounded-full border-2 border-zinc-950 bg-[url('/assets/Asset/GameObject/SunflowerCatSpriteWalkBlink_cuts/image_1-1.png')] bg-cover"></div>
                            <button
                                onClick={() => console.log('Choose Avatar')}
                                className="mb-4 mt-4 items-center justify-center rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-800"
                            >
                                Chọn ảnh đại diện
                            </button>
                        </div>
                        <div className="flex justify-center mt-4 flex-col items-center">
                            <div
                                name="name"
                                contentEditable="true"
                                onBlur={handleChange}
                                className="mb-2 border border-gray-400  px-2 py-1 text-lg rounded-full text-center w-8/12"
                            >
                                Họ và Tên: {student.name}
                            </div>
                            <div
                                name="school"
                                contentEditable="true"
                                onBlur={handleChange}
                                className="mb-2 border border-gray-400  px-2 py-1 text-lg rounded-full text-center w-8/12"
                            >
                                Trường: {student.school}
                            </div>
                            <div
                                name="grade"
                                contentEditable="true"
                                onBlur={handleChange}
                                className="mb-2 border border-gray-400  px-2 py-1 text-lg rounded-full text-center w-8/12"
                            >
                                Lớp: {student.grade}
                            </div>
                            <div
                                name="dayOfBirth"
                                contentEditable="true"
                                onBlur={handleChange}
                                value = "Ngày sinh: "
                                className="mb-2 border border-gray-400  px-2 py-1 text-lg rounded-full text-center w-8/12"
                            >
                                Ngày sinh: {student.dayOfBirth}
                            </div>
                            <div
                                name="phoneNumber"
                                contentEditable="true"
                                onBlur={handleChange}
                                className="mb-2 border border-gray-400  px-2 py-1 text-lg rounded-full text-center w-8/12"
                            >
                                Số điện thoại: {student.phoneNumber}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleUpdate}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Cập nhập
                        </button>
                        <button
                            onClick={handleClose}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpUpdateAcc;
