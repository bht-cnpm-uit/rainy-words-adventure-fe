import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { fakeData } from './fakeSchool';
import PopUp from './PopUp';

const SchoolManagement = () => {
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const HandleRemovePopUp = () => setIsOpenPopUp(false);

    const columns = [
        {
            name: 'ID',
            selector: 'ID',
            sortable: true,
            width: '20%',
        },
        {
            name: 'Tên trường',
            selector: 'name',
            sortable: false,
            width: '70%',
        },
        {
            name: 'Thao tác',
            width: '10%',
            cell: (row) => {
                return (
                    <div>
                        <button className="h-6 w-6" onClick={() => {}} data-tag="allowRowEvents">
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
                            onClick={() => {}}
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
                    </div>
                );
            },
        },
    ];

    return (
        <div className="container">
            <DataTable
                title={<div className="mt-8 text-center">DANH SÁCH TRƯỜNG HỌC</div>}
                className="flex justify-items-center"
                columns={columns}
                data={fakeData}
                pagination
                customStyles={{
                    headRow: {
                        style: {
                            backgroundColor: '',
                        },
                    },
                    headCells: {
                        style: {
                            fontWeight: 'bold',
                            color: '#333',
                            // zIndex: 1,
                        },
                    },
                }}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                fixedHeader
                fixedHeaderScrollHeight="570px"
                subHeader
                subHeaderComponent={
                    <div className="sub">
                        <button
                            className="ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                            onClick={() => setIsOpenPopUp(!isOpenPopUp)}
                        >
                            <p>Nhập dữ liệu</p>
                        </button>
                    </div>
                }
            />
            {isOpenPopUp && <PopUp openPopUp={isOpenPopUp} closePopUp={HandleRemovePopUp} />}
        </div>
    );
};

export default SchoolManagement;
