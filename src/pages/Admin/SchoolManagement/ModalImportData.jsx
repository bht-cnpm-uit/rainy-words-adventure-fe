import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import DataTable from 'react-data-table-component';
import { createNewSchool } from '../../../services/schoolServices';

const ModalImportData = ({ modalTitle, isOpenModelImportData, setIsOpenModelImportData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataUpload, setDataUpload] = useState([]);
    const schema = {
        id: {
            prop: 'id',
            type: String,
        },
        name: {
            prop: 'name',
            type: String,
        },
    };

    const handleFileUpload = (file) => {
        if (file) {
            setSelectedFile(file.name);
            readXlsxFile(file, { schema }).then(({ rows, errors }) => {
                setDataUpload(rows);
            });
        }
    };

    const closeModal = () => {
        setIsOpenModelImportData(!isOpenModelImportData);
    };
    const handleDeleteSchool = (row) => {
        const updatedData = dataUpload.filter((school) => school !== row);
        setDataUpload(updatedData);
    };

    const saveChanges = async () => {
        try {
            const result = await createNewSchool(dataUpload);

            console.log('Data successfully uploaded:', result);

            alert('Tải dữ liệu trường học thành công!');

            closeModal();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="absolute inset-10 h-screen overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className=" relative w-1/2 overflow-hidden rounded-lg bg-white  shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-3">
                        <h5 className="font-bold text-gray-800">{modalTitle}</h5>
                        <button
                            type="button"
                            className="h-6 w-6 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                            onClick={() => closeModal()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-4 py-5">
                        <div className="mt-4">
                            <label
                                htmlFor="file-upload"
                                className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700"
                            >
                                <span className="mr-2">
                                    {selectedFile ? selectedFile : 'Choose a file'}
                                </span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                />
                                <span className="text-blue-500 hover:text-blue-700">Browse</span>
                            </label>
                        </div>
                    </div>
                    {
                        // dataUpload.length
                        // &&
                        <DataTable
                            columns={[
                                {
                                    name: 'schoolID',
                                    selector: 'id',
                                    sortable: true,
                                    width: '30%',
                                },
                                {
                                    name: 'Trường',
                                    selector: 'name',
                                    sortable: true,
                                },
                                {
                                    name: 'Xóa',
                                    cell: (row) => (
                                        <>
                                            <button
                                                className="relative h-6 w-6"
                                                onClick={() => {
                                                    handleDeleteSchool(row);
                                                }}
                                                data-tag="allowRowEvents"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    className="fill-current text-slate-600 hover:text-red-500"
                                                >
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </button>
                                        </>
                                    ),
                                    ignoreRowClick: true,
                                    allowOverflow: true,
                                    button: true,
                                },
                            ]}
                            data={dataUpload}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página',
                                rangeSeparatorText: 'de',
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'Todos',
                            }}
                            fixedHeader
                            pagination
                            highlightOnHover
                            fixedHeaderScrollHeight="300px"
                        />
                    }
                    <div className="flex justify-end space-x-4 bg-gray-100 px-4 py-3">
                        <button
                            type="button"
                            className="focus:shadow-outline-blue rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none"
                            onClick={() => closeModal()}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="focus:shadow-outline-blue rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none"
                            onClick={() => saveChanges()}
                        >
                            Nhập dữ liệu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalImportData;
