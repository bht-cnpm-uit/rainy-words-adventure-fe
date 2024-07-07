import instance from "../axios";
const handleLogin = (phoneNumber, password) => {
    return instance.post('api/login', { phoneNumber: phoneNumber, password: password })
}
export { handleLogin }                  