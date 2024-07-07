import instance from "../axios";
const handleLogin = (phoneNumber, password) => {
    return instance.post('api/login', { phoneNumber: phoneNumber, password: password })
}
const handleSignUp = (dataSignUp) => {
    return instance.post('api/user/signup', dataSignUp)
}
export { handleLogin, handleSignUp }                  