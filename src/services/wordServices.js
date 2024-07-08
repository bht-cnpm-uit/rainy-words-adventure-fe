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

export { getAllWords, createNewWords, deleteWord };
