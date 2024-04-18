import React, { useEffect, useState, useMemo, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { fakeData } from '../fakeDataWords';
import ModalImportData from './ModalImportData';
import { Fragment } from 'react';
const DataManagement = () => {
    const [isOpenModelImportData, setIsOpenModelImportData] = useState(true);
    useEffect(() => {
        console.log(isOpenModelImportData)
    })
    return (
        <div className="h-screen inset-0  text-white flex flex-col">
            {(isOpenModelImportData === false) ?
                <Fragment>
                    <div className="w-full h-1/4 flex flex-row">
                        <form className="w-full flex items-center justify-center">
                            <div class="flex w-3/5">
                                <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                                <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg></button>
                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="relative w-full">
                                    <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                    <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span class="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="pl-10">
                        <DataTable
                            columns={[
                                {
                                    name: "ID",
                                    selector: "ID",
                                    sortable: true,
                                },
                                {
                                    name: "English Word",
                                    selector: "word",
                                },
                                {
                                    name: "Vietnamese",
                                    selector: "vietnamese",
                                },
                                {
                                    name: "Topic",
                                    selector: "topic",
                                },
                                {
                                    name: "Actions",
                                    cell: (row) => (
                                        <>
                                            < button
                                                className="h-6 w-6"
                                                onClick={() => { }}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
                            title="Word management"
                            data={fakeData}
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
                    modalTitle={'Data Management'}
                    isOpenModelImportData={isOpenModelImportData}
                    setIsOpenModelImportData={setIsOpenModelImportData}
                />
            }
        </div >
    );
};

export default DataManagement;
