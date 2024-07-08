import instance from '../axios';
const getAllSchools = () => {
    return instance.get('api/school/get-all');
};

const createNewSchool = (listSchool) => {
    return instance.post('api/school/create', { listSchool });
};

const deleteSchool = (listId) => {
    return instance.post('api/school/delete', { listId });
};

export { getAllSchools, createNewSchool, deleteSchool };
