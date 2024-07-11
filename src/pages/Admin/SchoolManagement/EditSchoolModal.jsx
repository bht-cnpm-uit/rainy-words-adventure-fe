import React, { useEffect, useState } from 'react';

const EditSchoolModal = ({ isOpen, school, onClose, onSubmit }) => {
    if (!isOpen || !school) return null;

    const [updatedSchool, setUpdatedSchool] = useState({
        schoolId: school.schoolId,
        schoolName: school.schoolName,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSchool((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        console.log('Update word:', updatedSchool);
        onSubmit(updatedSchool);
    };

    useEffect(() => {
        setUpdatedSchool({
            schoolId: school.schoolId,
            schoolName: school.schoolName,
        });
    }, [school]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="rounded bg-white p-5 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Cập nhật từ vựng</h2>
                <label className="mb-2 block">
                    Mã trường (ID)
                    <input
                        type="text"
                        name="schoolId"
                        value={updatedSchool.schoolId}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </label>
                <label className="mb-2 block">
                    Tên trường:
                    <input
                        type="text"
                        name="schoolName"
                        value={updatedSchool.schoolName}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </label>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSchoolModal;
