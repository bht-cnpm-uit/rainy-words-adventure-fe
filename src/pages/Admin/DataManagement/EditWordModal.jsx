import React, {useEffect, useState} from 'react';

const EditWordModal = ({ isOpen, word, onClose, onSubmit }) => {
    if (!isOpen || !word) return null;

    const [updatedWord, setUpdatedWord] = useState({
        wordId: word.wordId,
        levelVocab: word.levelVocab,
        vocab: word.vocab,
        topicId: word.topicId,
        vietnamese: word.vietnamese,
        example: word.example
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedWord((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        console.log("Update word:",updatedWord);
        onSubmit(updatedWord);
    };

    useEffect(() => {
        setUpdatedWord({
            wordId: word.wordId,
            levelVocab: word.levelVocab,
            vocab: word.vocab,
            topicId: word.topicId,
            vietnamese: word.vietnamese,
            example: word.example
        });
    }, [word]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Cập nhật từ vựng</h2>
                <label className="block mb-2">
                    Word ID:
                    <input
                        type="text"
                        name="wordId"
                        value={updatedWord.wordId}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    Tiếng Anh:
                    <input
                        type="text"
                        name="vocab"
                        value={updatedWord.vocab}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    Tiếng Việt:
                    <input
                        type="text"
                        name="vietnamese"
                        value={updatedWord.vietnamese}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    Mức độ:
                    <input
                        type="text"
                        name="levelVocab"
                        value={updatedWord.levelVocab}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    Topic ID:
                    <input
                        type="text"
                        name="topicId"
                        value={updatedWord.topicId}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    Ví dụ:
                    <input
                        type="text"
                        name="example"
                        value={updatedWord.example}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </label>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditWordModal;
