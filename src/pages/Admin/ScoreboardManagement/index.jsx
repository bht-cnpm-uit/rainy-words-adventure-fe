import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { fakeData } from '../fakeDataWords';
import { scoreboard } from './fakedata';
import { Fragment } from 'react';

const ScoreboardManagement = () => {
    const FilterType = {
        0: 'Tất cả',
        1: 'Tên',
        2: 'Trường',
        3: 'Khối'
    };

    const [isOpenModelImportData, setIsOpenModelImportData] = useState(false);
    const [isOpenDropdownSchool, setIsOpenDropdownSchool] = useState(false);
    const [isOpenDropdownGrade, setIsOpenDropdownGrade] = useState(false);
    const [filterSchool, setFilterSchool] = useState(FilterType[0]);
    const [filterGrade, setFilterGrade] = useState(FilterType[0]);
    const [filterType, setFilterType] = useState(0);
    const [dataFilter, setDataFilter] = useState(fakeData);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const schools = [...new Set(scoreboard.map(entry => entry.school))];
    const grades = [...new Set(scoreboard.map(entry => entry.grade))];
    const [grade, setGrade] = useState(grades);
    const [school, setSchool] = useState(schools);
    const [scoreBoardData, setScoreBoardData] = useState(scoreboard);
    const [filterScoreBoardData, setFilterScoreBoardData] = useState(scoreboard);

    const handleFilter = (text) => {
        let listWordsFilter;
        if (text.trim()) {
            switch (filterType) {
                case 0:
                    listWordsFilter = fakeData.filter(row =>
                        row.word.toLowerCase().includes(text.toLowerCase()) ||
                        row.vietnamese.toLowerCase().includes(text.toLowerCase()) ||
                        row.topic.toLowerCase().includes(text.toLowerCase())
                    );
                    break;
                case 1:
                    listWordsFilter = fakeData.filter(row =>
                        row.word.toLowerCase().includes(text.toLowerCase())
                    );
                    break;
                case 2:
                    listWordsFilter = fakeData.filter(row =>
                        row.vietnamese.toLowerCase().includes(text.toLowerCase())
                    );
                    break;
                case 3:
                    listWordsFilter = fakeData.filter(row =>
                        row.topic.toLowerCase().includes(text.toLowerCase())
                    );
                    break;
                default:
                    listWordsFilter = fakeData;
                    break;
            }
        } else {
            listWordsFilter = fakeData;
        }

        setDataFilter(listWordsFilter);
    };

    return (
        <div className="pl-10 h-screen inset-0  text-white flex flex-col">
            <DataTable
                columns={[
                    {
                        name: "STT",
                        selector: "STT",
                        sortable: true,
                        width: '10%'
                    },
                    {
                        name: "Họ và tên",
                        selector: "fullname",
                        sortable: true,
                        width: "15%"
                    },
                    {
                        name: "Trường",
                        selector: "school",
                        sortable: true,
                    },
                    {
                        name: "Khối lớp",
                        selector: "grade",
                        sortable: true,
                        width: "10%"
                    },
                    {
                        name: "Điểm số",
                        selector: "score",
                        sortable: true,
                        width: "15%"
                    },
                    {
                        name: "Thời gian",
                        selector: "time",
                        sortable: true,
                    }
                ]}
                title="Bảng xếp hạng"
                data={filterScoreBoardData}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                fixedHeader
                pagination
                fixedHeaderScrollHeight="435px"
                subHeader
                subHeaderComponent={
                    <div className='flex justify-around items-center w-full'>
                        <div className="filter-by-school flex">
                            <p className='text-black mr-2'>Trường</p>
                            <div className="relative">
                                <button
                                    className='px-5 h-full bg-blue-400 border rounded'
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
                                        {school.map((schoolItem, index) => (
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
                                    className='text-sm px-10 h-full bg-blue-400 border rounded'
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
