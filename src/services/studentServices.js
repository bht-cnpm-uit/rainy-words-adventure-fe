import instance from "../axios";
const getAllStudents = () => {
    return instance.get('api/user/get-all-student')
}
const getItemsOfStudent = (id) => {
    return instance.get(`api/item/get-student/${id}`);
}

const getAchivementOfStudent = (id) => {
    return instance.get(`user/get-achievement/${id}`);
}

export { getAllStudents, getItemsOfStudent, getAchivementOfStudent }                  