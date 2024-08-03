import instance from "../axios";
const getAllStudents = () => {
    return instance.get('api/user/get-all-student')
}
const getItemsOfStudent = (id) => {
    return instance.get(`api/item/get-student/${id}`);
}

const getAchivementOfStudent = (id) => {
    return instance.get(`api/user/get-achievement/${id}`);
}

const updateInfo = async (data) => {
    return instance.post('api/user/update-info', data);
}

const updateAvatar = async (data) => {
    return instance.post('api/user/update-avatar', data)
}

const getStudentInfo = (id) => {
    return instance.get(`api/user/get-info/${id}`);
}
<<<<<<< HEAD
const handleLogin = (phoneNumber, password) => {
    return instance.post('api/login', { phoneNumber: phoneNumber, password: password })
}
const handleSignUp = (dataSignUp) => {
    return instance.post('api/user/signup', dataSignUp)
}
export { getAllStudents, getItemsOfStudent, getAchivementOfStudent, updateInfo, getStudentInfo, handleLogin, handleSignUp, updateAvatar }                  
=======

const getListWordsOfStudent = (id) => { 
    return instance.post('api/student-word/get-all',id );
}

export { getAllStudents, getItemsOfStudent, getAchivementOfStudent, updateInfo, getStudentInfo, getListWordsOfStudent}                  
>>>>>>> 2c3bda5924037a0e0a6fe7fd1858ddfe30187a0e
