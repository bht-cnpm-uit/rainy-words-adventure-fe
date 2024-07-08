import instance from "../axios";
const getAllStudents = () => {
    return instance.get('api/user/get-all-student')
}

export { getAllStudents }                  