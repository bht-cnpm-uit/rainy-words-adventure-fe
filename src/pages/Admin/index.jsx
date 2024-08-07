import React, { useState } from 'react';
import DataManagement from './DataManagement';
import SchoolManagement from './SchoolManagement';
import StudentManagement from './StudentManagement';
import GameManagement from './GameManagement';
import ScoreboardManagement from './ScoreboardManagement';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
const Admin = () => {
    const [optionManage, setOptionManage] = useState('data');
    const dispatch = useDispatch();
    const handleLogOut = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
            dispatch(userActions.logout())
            window.location.href = '/';
        }
    }
    return (
        <div className="absolute flex h-screen w-full">
            <aside className="w-1/5 bg-gray-100" aria-label="Sidebar">
                <div className="h-full overflow-y-auto rounded px-4 py-4 dark:bg-gray-800">
                    <ul className="space-y-6">
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setOptionManage('data');
                                }}
                            >
                                <svg
                                    className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Quản lý dữ liệu</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setOptionManage('school');
                                }}
                            >
                                <svg
                                    className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dữ liệu trường học</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setOptionManage('game');
                                }}
                            >
                                <svg
                                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Quản lý màn chơi
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setOptionManage('scoreboard');
                                }}
                            >
                                <svg
                                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Quản lí bảng xếp hạng
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setOptionManage('student');
                                }}
                            >
                                <svg
                                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Quản lý học sinh
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={handleLogOut}
                            >
                                <svg
                                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.293 9.293a1 1 0 011.414 0L10 11.586V4a1 1 0 112 0v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3 flex-1 whitespace-nowrap">Đăng xuất</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="flex-1">
                {optionManage === 'data' ? (
                    <DataManagement />
                ) : optionManage === 'school' ? (
                    <SchoolManagement />
                ) : optionManage === 'game' ? (
                    <GameManagement />
                ) : optionManage === 'student' ? (
                    <StudentManagement />
                ) : (
                    <ScoreboardManagement />
                )}
            </div>
        </div>
    );
};

export default Admin;
