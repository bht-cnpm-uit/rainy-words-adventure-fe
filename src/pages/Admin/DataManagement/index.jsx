import React, { useEffect, useState, useMemo, useRef } from 'react';
import DataTable from 'react-data-table-component';
import ModalImportData from './ModalImportData';
import EditWordModal from './EditWordModal';

import { deleteWord, getAllWords, updateWord } from '../../../services/wordServices';
import { getTopics } from '../../../services/topicServices';
import { Fragment } from 'react';
const DataManagement = () => {
    let FilterType = {
        0: 'Tất cả',
        1: 'Tiếng anh',
        2: 'Tiếng Việt',
        3: 'Chủ đề',
    };
    const [isOpenModelImportData, setIsOpenModelImportData] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [filterType, setFilterType] = useState(0);
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [updatedWordData, setUpdatedWordData] = useState(null); 
 

    const getCombinedData = async () => {
        try {
            const [wordsResponse, topicsResponse] = await Promise.all([getAllWords(), getTopics()]);
            const words = wordsResponse.listWord;
            const topics = topicsResponse.listTopic;

            const combinedData = words.map((word) => ({
                ...word,
                nameEn: topics.find((topic) => topic.id === word.topicId)?.nameEn || 'Unknown',
            }));

            setData(combinedData);
            setDataFilter(combinedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditWordSubmit = async (wordData) => {
        try {
            console.log('Word data:', wordData);
            let response = await updateWord(wordData);
            console.log('Response: ', response);
            alert('Cập nhật thành công!');
            setIsEditModalOpen(false);
            setUpdatedWordData(wordData);
            // getCombinedData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateWord = (word) => {
        const selectedWord = {
            wordId: word.id,
            levelVocab: word.levelVocab,
            vocab: word.vocab,
            topicId: word.topicId,
            vietnamese: word.vietnamese,
            example: word.example
        };
        setSelectedWord(selectedWord);
        setIsEditModalOpen(true);
        console.log('Selected word:', selectedWord);
    };

    const handleDeleteWord = async (id) => {
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa từ vựng có STT là: ${id}?`);
        if (!isConfirmed) {
            return;
        }

        try {
            let rowid = [id];
            let respone = await deleteWord(rowid);
            console.log('Response: ', respone);
            alert('Xóa thành công!');
            getAllWords();
        } catch (error) {
            console.error('Error:', error);
        }
        return 0;
    };

    useEffect(() => {
        getCombinedData();
    });

    const handleFilter = (text) => {
        let listWordsFilter;
        if (text.trim()) {
            if (filterType === 0) {
                listWordsFilter = data.filter(
                    (row) =>
                        row['vocab'].toLowerCase().includes(text.toLowerCase()) ||
                        row['vietnamese'].toLowerCase().includes(text.toLowerCase()) ||
                        row['nameEn'].toLowerCase().includes(text.toLowerCase()),
                );
            } else if (filterType === 1) {
                listWordsFilter = data.filter((row) =>
                    row['vocab'].toLowerCase().includes(text.toLowerCase()),
                );
            } else if (filterType === 2) {
                // Implement filtering logic for filterType 2
                listWordsFilter = data.filter((row) =>
                    row['vietnamese'].toLowerCase().includes(text.toLowerCase()),
                );
            } else if (filterType === 3) {
                // Implement filtering logic for filterType 3
                listWordsFilter = data.filter((row) =>
                    row['nameEn'].toLowerCase().includes(text.toLowerCase()),
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
        <div className="inset-0 flex  h-screen flex-col text-white">
            {isOpenModelImportData === false ? (
                <Fragment>
                    <div className="flex h-32 w-full flex-row">
                        <form className="flex w-full items-center justify-center">
                            <div className="flex w-2/3">
                                <div className="relative w-1/5">
                                    <button
                                        className="h-full w-full rounded-l-lg border bg-blue-400"
                                        type="button"
                                        onClick={() => {
                                            setIsOpenDropdown(!isOpenDropdown);
                                        }}
                                    >
                                        <div className="flex">
                                            <p className="w-4/5">{FilterType[filterType]}</p>
                                            <svg
                                                className="text-white-200 h-6 w-6 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                            >
                                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                            </svg>
                                        </div>
                                    </button>
                                    {isOpenDropdown && (
                                        <ul class="absolute z-10 w-full rounded-b-lg border bg-blue-400 py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => {
                                                        setFilterType(0);
                                                        setIsOpenDropdown(false);
                                                    }}
                                                >
                                                    Tất cả
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => {
                                                        setFilterType(1);
                                                        setIsOpenDropdown(false);
                                                    }}
                                                >
                                                    Tiếng Anh
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => {
                                                        setFilterType(2);
                                                        setIsOpenDropdown(false);
                                                    }}
                                                >
                                                    Tiếng việt
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => {
                                                        setFilterType(3);
                                                        setIsOpenDropdown(false);
                                                    }}
                                                >
                                                    Chủ đề
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div class="w-4/5">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        class="block w-full rounded-r-lg border p-2.5 text-black"
                                        placeholder={
                                            'Nhập để tìm kiếm theo ' +
                                            FilterType[filterType].toLowerCase()
                                        }
                                        onChange={(e) => {
                                            handleFilter(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') e.preventDefault();
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="relative pl-10">
                        <DataTable
                            columns={[
                                {
                                    name: 'STT',
                                    selector: 'id',
                                    sortable: true,
                                    width: '15%',
                                },
                                {
                                    name: 'Tiếng Anh',
                                    selector: 'vocab',
                                    sortable: true,
                                },
                                {
                                    name: 'Tiếng Việt',
                                    selector: 'vietnamese',
                                    sortable: true,
                                },
                                {
                                    name: 'Chủ đề',
                                    selector: 'nameEn',
                                    sortable: true,
                                },
                                {
                                    name: 'Thao tác',
                                    cell: (row) => (
                                        <>
                                            <button
                                                className="h-6 w-6"
                                                onClick={() => handleDeleteWord(row.id)}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
                                                    className="fill-current text-zinc-500 hover:text-red-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="ml-5 h-6 w-6"
                                                onClick={() => handleUpdateWord(row)}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
                                                    className="fill-current text-zinc-500 hover:text-blue-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                                </svg>
                                            </button>
                                        </>
                                    ),
                                    ignoreRowClick: true,
                                    allowOverflow: true,
                                    button: true,
                                },
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
                                <button
                                    className="left-0 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                    onClick={() => setIsOpenModelImportData(!isOpenModelImportData)}
                                >
                                    <p>Nhập dữ liệu</p>
                                </button>
                            }
                        />
                    </div>
                </Fragment>
            ) : (
                <ModalImportData
                    modalTitle={'Nhập dữ liệu'}
                    isOpenModelImportData={isOpenModelImportData}
                    setIsOpenModelImportData={setIsOpenModelImportData}
                />
            )}
            <EditWordModal
                isOpen={isEditModalOpen}
                word={selectedWord}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditWordSubmit}
            />
        </div>
    );
};

export default DataManagement;
