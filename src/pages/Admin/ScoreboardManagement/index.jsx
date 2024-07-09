import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fakeData } from '../fakeDataWords';

import { Fragment } from 'react';
import { getLeaderboard } from '../../../services/gameServices'

const ScoreboardManagement = () => {
    const FilterType = {
        0: 'Tất cả',
        1: 'Tên',
        2: 'Trường',
        3: 'Khối'
    };

    const [scoreboard, setScoreboard] = useState([]);
    
    const getLearderBoardData = async () => {
        try {
            let getData = await getLeaderboard();
            setScoreboard(getData.leaderboard);
            setScoreBoardData(getData.leaderboard);
            setFilterScoreBoardData(getData.leaderboard);
            setSchoolFilter([...new Set(getData.leaderboard.map(entry => entry.School))]);
            setGrade([...new Set(getData.leaderboard.map(entry => entry.Grade))]);
            // console.log(schoolFilter);
            
        } catch (error) {
            console.error('Error:', error);
        }
        return 0;
    }


    const [isOpenModelImportData, setIsOpenModelImportData] = useState(false);
    const [isOpenDropdownSchool, setIsOpenDropdownSchool] = useState(false);
    const [isOpenDropdownGrade, setIsOpenDropdownGrade] = useState(false);
    const [filterSchool, setFilterSchool] = useState('Tất cả');
    const [filterGrade, setFilterGrade] = useState('Tất cả');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // const [school, setSchool] = useState(schools);
    const [schoolFilter, setSchoolFilter] = useState([])
    // const grades = [...new Set(scoreboard.map(entry => entry.Grade))];
    const [grade, setGrade] = useState([]);
    const [scoreBoardData, setScoreBoardData] = useState([]);
    const [filterScoreBoardData, setFilterScoreBoardData] = useState([]);



    useEffect(() => {
        handleFilterData();
        getLearderBoardData();
    },[filterSchool, grade, startDate, endDate]);
    const handleFilterData = () => {
        let filter = scoreBoardData;

        if (filterSchool !== "Tất cả") {
            filter = filter.filter(row => row.School.includes(filterSchool));
        }

        if (filterGrade !== "Tất cả") {
            console.log(filterGrade)
            filter = filter.filter(row => row.Grade === filterGrade);
        }

        // Parse start date if it exists
        let parsedStartDate = null;
        if (startDate) {
            parsedStartDate = new Date(startDate);
            parsedStartDate.setHours(0, 0, 0, 0);
        }

        let parsedEndDate = null;
        if (endDate) {
            parsedEndDate = new Date(endDate);
            parsedEndDate.setHours(23, 59, 59, 999);
        }

        if (parsedStartDate && parsedEndDate) {
            filter = filter.filter(row => {
                const rowDate = new Date(row.time);
                return rowDate >= parsedStartDate && rowDate <= parsedEndDate;
            });
        }

        setFilterScoreBoardData(filter);
    };


    return (
        <div className="pl-10 h-screen inset-0  text-white flex flex-col">
            <DataTable
                columns={[
                    {
                        name: "STT",
                        selector: "id",
                        sortable: true,
                        width: '10%'
                    },
                    {
                        name: "Họ và tên",
                        selector: "Name",
                        sortable: true,
                       
                    },
                    {
                        name: "Trường",
                        selector: "School",
                        sortable: true,
                    },
                    {
                        name: "Khối lớp",
                        selector: "Grade",
                        sortable: true,
                        
                    },
                    {
                        name: "Điểm số",
                        selector: "Score",
                        sortable: true,
                        
                    },
                    {
                        name: "Thời gian",
                        selector: row => {
                            return new Date(row.LastTime).toLocaleDateString("en-GB");
                        },
                        sortable: true,
                    }
                ]}
                title="Bảng xếp hạng"
                data={filterScoreBoardData}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số lượng dòng đang hiển thị',
                    rangeSeparatorText: 'trong',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Tất cả',
                }}
                fixedHeader
                pagination
                fixedHeaderScrollHeight="435px"
                subHeader
                subHeaderComponent={
                    <div className='flex justify-between  items-center w-full'>
                        <div className="filter-by-school flex">
                            <p className='text-black mr-2'>Trường</p>
                            <div className="relative">
                                <button
                                    className='px-2 w-80 h-full bg-blue-400 border rounded'
                                    type='button'
                                    onClick={() => { setIsOpenDropdownSchool(!isOpenDropdownSchool) }}
                                >
                                    <div className="flex">
                                        <p
                                            className='w-full'
                                        >
                                            {filterSchool}
                                        </p>
                                        <svg
                                            className='w-6 h-6 fill-current text-white-200'
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512">
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                        </svg>
                                    </div>
                                </button>
                                {
                                    isOpenDropdownSchool &&
                                    <ul className="z-10 w-full absolute py-2 text-sm text-gray-700 dark:text-gray-200 bg-blue-400 border rounded overflow-auto h-60">
                                        <li key={0}>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => { setFilterSchool("Tất cả"); setIsOpenDropdownSchool(!isOpenDropdownSchool) }}
                                            >
                                                Tất cả
                                            </button>
                                        </li>
                                        {schoolFilter.map((schoolItem, index) => (
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterSchool(schoolItem); setIsOpenDropdownSchool(!isOpenDropdownSchool) }}
                                                >
                                                    {schoolItem}
                                                </button>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="filter-by-school flex">
                            <p className='text-black mr-2'>Khối</p>
                            <div className="relative">
                                <button
                                    className='text-sm px-2 w-24 h-full bg-blue-400 border rounded'
                                    type='button'
                                    onClick={() => { setIsOpenDropdownGrade(!isOpenDropdownGrade) }}
                                >
                                    <div className="flex">
                                        <p
                                            className='w-full'
                                        >
                                            {filterGrade}
                                        </p>
                                        <svg
                                            className='w-6 h-6 fill-current text-white-200'
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512">
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                        </svg>
                                    </div>
                                </button>
                                {
                                    isOpenDropdownGrade &&
                                    <ul className="z-10 w-full absolute py-2 text-sm text-gray-700 dark:text-gray-200 bg-blue-400 border rounded overflow-auto h-60">
                                        <li key={0}>
                                            <button
                                                type="button"
                                                className="text-sm inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => { setFilterGrade("Tất cả"); setIsOpenDropdownGrade(!isOpenDropdownGrade) }}
                                            >
                                                Tất cả
                                            </button>
                                        </li>
                                        {grade.map((gradeItem, index) => (
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterGrade(gradeItem); setIsOpenDropdownGrade(!isOpenDropdownGrade) }}
                                                >
                                                    {gradeItem}
                                                </button>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="filter-by-date text-black flex items-center">
                            <p className="mr-2">Hiển thị từ</p>
                            <input
                                className="mr-2 px-2 py-1 border rounded"
                                type='date'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <p className="mr-2">đến</p>
                            <input
                                className="mr-2 px-2 py-1 border rounded"
                                type='date'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsOpenModelImportData(!isOpenModelImportData)}
                        >
                            <p>Xuất dữ liệu</p>
                        </button>
                    </div>
                }
            />
        </div>
    );
};

export default ScoreboardManagement;
