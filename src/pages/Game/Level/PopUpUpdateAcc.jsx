import React, { useState } from 'react';
import { updateInfo } from '../../../services/studentServices';

const PopUpUpdateAcc = ({ openPopUpUpdate, closePopUpUpdate, student, onUpdateSuccess }) => {
    const [updatedStudent, setUpdatedStudent] = useState({
        ...student,
        birthday: dateFormat(student.birthday),
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClosePopUpUpdate = (e) => {
        if (e.target.id === 'ModelContainerUpdate') {
            closePopUpUpdate();
        }
    };

    function dateFormat(dateStr) {
        let dateObj = new Date(dateStr);
        let day = ('0' + dateObj.getUTCDate()).slice(-2);
        let month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
        let year = dateObj.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    function dateFormat2(dateStr) {
        let [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    if (!openPopUpUpdate) return null;

    const handleClose = () => {
        closePopUpUpdate();
    };

    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp!');
            return;
        }
        if (!password || !confirmPassword) {
            alert('Vui lòng nhập mật khẩu và xác nhận mật khẩu!');
            return;
        }
        const updateData = {
            phoneNumber: updatedStudent.phoneNumber,
            oldPassword: password,
            newPassword: password,
            grade: updatedStudent.grade,
            birthday: dateFormat2(updatedStudent.birthday),
            name: updatedStudent.name,
        };

        try {
            const response = await updateInfo(updateData);

            if (response.errCode !== '0') alert('Mật khẩu sai!');
            else {
                alert('Cập nhật thành công!');
                closePopUpUpdate();
                onUpdateSuccess();
            }
        } catch (error) {
            // console.error('Update failed', error);
            alert('Sai mật khẩu!');
        }
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
                    <h2 className="py-3 text-center text-xl font-semibold">CẬP NHẬT THÔNG TIN</h2>
                    <div className="my-2">
                        <div className="mt-4 flex flex-col items-center justify-center">
                            <input
                                name="name"
                                value={updatedStudent.name}
                                onChange={handleChange}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                            <input
                                name="grade"
                                value={updatedStudent.grade}
                                onChange={handleChange}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                            <input
                                name="birthday"
                                value={updatedStudent.birthday}
                                onChange={handleChange}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                            <input
                                name="phoneNumber"
                                disabled={updatedStudent.phoneNumber}
                                value={updatedStudent.phoneNumber}
                                onChange={handleChange}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                            <input
                                type="password"
                                placeholder="Xác thực mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mb-2 w-8/12 rounded-full border border-gray-400 px-2 py-1 text-center text-lg"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleUpdate}
                            className="mx-2 rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800"
                        >
                            Cập nhật
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
