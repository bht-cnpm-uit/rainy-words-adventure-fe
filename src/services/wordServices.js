import instance from '../axios';
const getAllWords = () => {
    return instance.get('api/word/get-all');
};

const createNewWords = (listWord) => {
    return instance.post('api/word/create', { listWord });
};

const deleteWord = (listId) => {
    return instance.post('api/word/delete', { listId });
};

const updateWord = (word) => {
    return instance.post('api/word/update', word);
}

export { getAllWords, createNewWords, deleteWord, updateWord };
