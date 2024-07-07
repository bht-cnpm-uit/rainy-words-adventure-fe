import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file'
import DataTable from 'react-data-table-component';
const ModalImportData = ({ modalTitle, isOpenModelImportData, setIsOpenModelImportData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataUpload, setDataUpload] = useState([])
    const schema = {
        'id': {
            prop: 'id',
            type: String
        },
        'vocab':
        {
            prop: 'vocab',
            type: String
        },
        'vietnamese':
        {
            prop: 'vietnamese',
            type: String
        },
        'topicId':
        {
            prop: 'topicId',
            type: String
        }
    }

    const handleFileUpload = (file) => {
        if (file) {
            setSelectedFile(file.name);
            readXlsxFile(file, { schema }).then(({ rows, errors }) => {
                setDataUpload(rows)
            })

        };
    }

    const closeModal = () => {
        setIsOpenModelImportData(!isOpenModelImportData);
    };
    const handleDeleteWord = (row) => {
        const updatedData = dataUpload.filter(word => word !== row);
        setDataUpload(updatedData);
    }

    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:1000/api/word/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({listWord: dataUpload}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();
            console.log('Data successfully uploaded:', result);

            // Optionally, close the modal after successful upload
            closeModal();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };


    return (
        <div className="absolute inset-0 h-screen overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className=" bg-white rounded-lg overflow-hidden shadow-xl relative  w-1/2">
                    <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3 bg-gray-100">
                        <h5 className="font-bold text-gray-800">{modalTitle}</h5>
                        <button type="button" className="w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                            onClick={() => closeModal()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-4 py-5">
                        <div className="mt-4">
                            <label htmlFor="file-upload" className="cursor-pointer bg-white rounded-md border border-gray-300 px-4 py-2 inline-flex items-center justify-center w-full text-gray-700">
                                <span className="mr-2">{selectedFile ? selectedFile : 'Choose a file'}</span>
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
                        dataUpload.length
                        &&
                        <DataTable
                            columns={[
                                {
                                    name: "STT",
                                    selector: "id",
                                    sortable: true,
                                    width: "15%"
                                },
                                {
                                    name: "Tiếng anh",
                                    selector: "vocab",
                                    sortable: true,
                                },
                                {
                                    name: "Tiếng việt",
                                    selector: "vietnamese",
                                    sortable: true,
                                },
                                {
                                    name: "Chủ đề",
                                    selector: "topicId",
                                    sortable: true,
                                },
                                {
                                    name: "Xóa",
                                    cell: (row) => (
                                        <>
                                            <button
                                                className="h-6 w-6 relative"
                                                onClick={() => { handleDeleteWord(row) }}
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
                                }
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
                            fixedHeaderScrollHeight='300px'
                        />
                    }
                    <div className="flex justify-end space-x-4 px-4 py-3 bg-gray-100">
                        <button
                            type="button"
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                            onClick={() => closeModal()}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-400 text-white border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out"
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
