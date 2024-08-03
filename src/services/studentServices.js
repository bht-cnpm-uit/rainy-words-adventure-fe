import instance from '../axios';
const getAllStudents = () => {
    return instance.get('api/user/get-all-student');
};
const getItemsOfStudent = (id) => {
    return instance.get(`api/item/get-student/${id}`);
};

const getAchivementOfStudent = (id) => {
    return instance.get(`api/user/get-achievement/${id}`);
};

const updateInfo = async (data) => {
    return instance.post('api/user/update-info', data);
};

const updateAvatar = async (data) => {
    return instance.post('api/user/update-avatar', data);
};

const getStudentInfo = (id) => {
    return instance.get(`api/user/get-info/${id}`);
<<<<<<< HEAD
}
=======
};

>>>>>>> 2a75200f0b684de8aa1c7d42f0c3cac274b8f5f5
const handleLogin = (phoneNumber, password) => {
    return instance.post('api/login', { phoneNumber: phoneNumber, password: password });
};
const handleSignUp = (dataSignUp) => {
<<<<<<< HEAD
    return instance.post('api/user/signup', dataSignUp)
}
const getListWordsOfStudent = (id) => {
    return instance.post('api/student-word/get-all', id);
}

export { getAllStudents, getItemsOfStudent, getAchivementOfStudent, updateInfo, getStudentInfo, handleLogin, handleSignUp, updateAvatar, getListWordsOfStudent }                  
=======
    return instance.post('api/user/signup', dataSignUp);
};

const getListWordsOfStudent = (id) => {
    return instance.post('api/student-word/get-all', id);
};
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
>>>>>>> 2a75200f0b684de8aa1c7d42f0c3cac274b8f5f5
