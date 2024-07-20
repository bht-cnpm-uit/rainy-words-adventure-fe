import React, { useState } from 'react';
import { updateInfo } from '../../../services/studentServices';

const PopUpUpdateAcc = ({ openPopUpUpdate, closePopUpUpdate, student }) => {
    const [updatedStudent, setUpdatedStudent] = useState(student);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClosePopUpUpdate = (e) => {
        if (e.target.id === 'ModelContainerUpdate') {
            closePopUpUpdate();
        }
    };

    function dateFormat(dateStr) {
        let dateObj = new Date(dateStr);
        let day = String(dateObj.getUTCDate()).padStart(2, '0');
        let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        let year = dateObj.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }
    function dateFormat2(dateStr) {
        let dateObj = new Date(dateStr);
        let day = String(dateObj.getUTCDate()).padStart(2, '0');
        let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        let year = dateObj.getUTCFullYear();
        return `${year}-${month}-${day}`;
    }

    if (!openPopUpUpdate) return null;

    const handleClose = () => {
        closePopUpUpdate();
    };

    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if(!password || !confirmPassword) {
            alert("Vui lòng nhập mật khẩu và xác nhận mật khẩu!");
            return;
        }
        const updateData = {
            phoneNumber: updatedStudent.phoneNumber,
            oldPassword: password,
            newPassword: password,
            grade: updatedStudent.grade,
            birthday: dateFormat2(updatedStudent.birthday),
        };
        console.log("UPDATED DATA: ", updateData);

        try {
            const response = await updateInfo(updateData);
            console.log("Update successful", response);
            if(response.errCode !== "0")
            alert("Mật khẩu sai!");
            else{
                alert("Cập nhật thành công!");
                closePopUpUpdate();
            }
        } catch (error) {
            console.error("Update failed", error);
            alert("Sai mật khẩu!");
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
                        <div className="flex justify-center mt-4 flex-col items-center">
                            <input
                                name="name"
                                value={updatedStudent.name}
                                onChange={handleChange}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
                            />
                            <input
                                name="grade"
                                value={updatedStudent.grade}
                                onChange={handleChange}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
                            />
                            <input
                                name="birthday"
                                value={dateFormat(updatedStudent.birthday)}
                                onChange={handleChange}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
                            />
                            <input
                                name="phoneNumber"
                                value={updatedStudent.phoneNumber}
                                onChange={handleChange}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mb-2 border border-gray-400 px-2 py-1 text-lg rounded-full text-center w-8/12"
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
