import instance from '../axios';
const getAllStudents = () => {
    return instance.get('api/user/get-all-student');
};
const getItemsOfStudent = (id) => {
    return instance.post(`api/item/get-student`, { id: id });
};

const getAchivementOfStudent = (id) => {
    return instance.post(`api/user/get-achievement`, { id: id });
};

const updateInfo = async (data) => {
    return instance.post('api/user/update-info', data);
};

const updateAvatar = async (data) => {
    return instance.post('api/user/update-avatar', data);
};

const getStudentInfo = (id) => {
    return instance.post(`api/user/get-info`, { id: id });
}

const handleLogin = (phoneNumber, password) => {
    return instance.post('api/login', { phoneNumber: phoneNumber, password: password });
};
const handleSignUp = (dataSignUp) => {
    return instance.post('api/user/signup', dataSignUp)
}
const getListWordsOfStudent = (id) => {
    return instance.post('api/student-word/get-all', id);
}

export {
    getAllStudents,
    getItemsOfStudent,
    getAchivementOfStudent,
    updateInfo,
    getStudentInfo,
    handleLogin,
    handleSignUp,
    updateAvatar,
    getListWordsOfStudent
};

