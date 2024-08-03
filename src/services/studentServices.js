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

const getStudentInfo = (id) => {
    return instance.get(`api/user/get-info/${id}`);
}

const getListWordsOfStudent = (id) => { 
    return instance.post('api/student-word/get-all',id );
}

export { getAllStudents, getItemsOfStudent, getAchivementOfStudent, updateInfo, getStudentInfo, getListWordsOfStudent}                  