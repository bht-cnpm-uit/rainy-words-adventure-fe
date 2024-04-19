import React, { useEffect, useState, useMemo, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { fakeData } from '../fakeDataWords';
import ModalImportData from './ModalImportData';
import { Fragment } from 'react';
const DataManagement = () => {
    let FilterType = {
        0: 'Tất cả',
        1: 'Tiếng anh',
        2: 'Tiếng Việt',
        3: 'Chủ đề'
    }
    const [isOpenModelImportData, setIsOpenModelImportData] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [filterType, setFilterType] = useState(0)
    const [data, setData] = useState(fakeData)
    const [dataFilter, setDataFilter] = useState(fakeData);
    useEffect(() => {
        // console.log(isOpenModelImportData)
    })
    const handleFilter = (text) => {
        let listWordsFilter;
        if (text.trim()) {
            if (filterType === 0) {
                listWordsFilter = data.filter(row =>
                    row['word'].toLowerCase().includes(text.toLowerCase()) ||
                    row['vietnamese'].toLowerCase().includes(text.toLowerCase()) ||
                    row['topic'].toLowerCase().includes(text.toLowerCase())
                );
            }
            else if (filterType === 1) {
                listWordsFilter = data.filter(row =>
                    row['word'].toLowerCase().includes(text.toLowerCase())
                );
            } else if (filterType === 2) {
                // Implement filtering logic for filterType 2
                listWordsFilter = data.filter(row =>
                    row['vietnamese'].toLowerCase().includes(text.toLowerCase())
                );
            } else if (filterType === 3) {
                // Implement filtering logic for filterType 3
                listWordsFilter = data.filter(row =>
                    row['topic'].toLowerCase().includes(text.toLowerCase())
                );
            } else {
                listWordsFilter = data;
            }
        } else {
            listWordsFilter = data;
        }

        setDataFilter(listWordsFilter);
    };

    return (
        <div className="h-screen inset-0  text-white flex flex-col">
            {(isOpenModelImportData === false) ?
                < Fragment >
                    <div className="w-full h-32 flex flex-row">
                        <form className="w-full flex items-center justify-center">
                            <div className="flex w-2/3">
                                <div className="w-1/5 relative">
                                    <button
                                        className='w-full h-full bg-blue-400 border rounded-l-lg'
                                        type='button'
                                        onClick={() => { setIsOpenDropdown(!isOpenDropdown) }}
                                    >
                                        <div className="flex">
                                            <p
                                                className='w-4/5'
                                            >
                                                {FilterType[filterType]}
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
                                        isOpenDropdown &&
                                        <ul class="z-10 w-full absolute py-2 text-sm text-gray-700 dark:text-gray-200 bg-blue-400 border rounded-b-lg">
                                            <li>
                                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterType(0); setIsOpenDropdown(false) }}
                                                >Tất cả</button>
                                            </li>
                                            <li>
                                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterType(1); setIsOpenDropdown(false) }}
                                                >Tiếng anh</button>
                                            </li>
                                            <li>
                                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterType(2); setIsOpenDropdown(false) }}
                                                >Tiếng việt</button>
                                            </li>
                                            <li>
                                                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => { setFilterType(3); setIsOpenDropdown(false) }}
                                                >Chủ đề</button>
                                            </li>
                                        </ul>
                                    }
                                </div>
                                <div class="w-4/5">
                                    <input
                                        type="search"
                                        id="search-dropdown" class="text-black block p-2.5 w-full border rounded-r-lg"
                                        placeholder={'Nhập để tìm kiếm theo ' + FilterType[filterType].toLowerCase()}
                                        onChange={(e) => { handleFilter(e.target.value) }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}

                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="pl-10 relative" >
                        <DataTable
                            columns={[
                                {
                                    name: "STT",
                                    selector: "ID",
                                    sortable: true,
                                    width: '15%'
                                },
                                {
                                    name: "Tiếng anh",
                                    selector: "word",
                                    sortable: true,
                                },
                                {
                                    name: "Tiếng Việt",
                                    selector: "vietnamese",
                                    sortable: true,
                                },
                                {
                                    name: "Chủ đề",
                                    selector: "topic",
                                    sortable: true,
                                },
                                {
                                    name: "Thao tác",
                                    cell: (row) => (
                                        <>
                                            < button
                                                className="h-6 w-6"
                                                onClick={() => { }}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
                                                    className='fill-current text-zinc-500 hover:text-red-500'
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512">
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </button >
                                            < button
                                                className="ml-5 h-6 w-6"
                                                onClick={() => { }}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
                                                    className='fill-current text-zinc-500 hover:text-blue-500'
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                                </svg>
                                            </button >
                                        </>
                                    ),
                                    ignoreRowClick: true,
                                    allowOverflow: true,
                                    button: true,
                                }
                            ]}
                            title="Danh sách từ vựng"
                            data={dataFilter}
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
                                <button className="left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setIsOpenModelImportData(!isOpenModelImportData)}
                                >
                                    <p>Nhập dữ liệu</p>
                                </button>
                            }
                        />
                    </div>
                </Fragment>
                :
                <ModalImportData
                    modalTitle={'Nhập dữ liệu'}
                    isOpenModelImportData={isOpenModelImportData}
                    setIsOpenModelImportData={setIsOpenModelImportData}
                />
            }
        </div >
    );
};

export default DataManagement;
