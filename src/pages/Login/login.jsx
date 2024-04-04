import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import { BrowserRouter as useNavigate } from 'react-router-dom';

// Initialization for ES Users

const LoginForm = () => {
    //redux
    const user = useSelector((state) => {
        return state.user;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // app
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //status: initial, writing, wrong username, wrong password
    const [errCode, setErrCode] = useState(-1);

    const fetchLogin = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            username: username,
            password: password,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:6868/api/login', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setErrCode(result.errCode);
                if (result.errCode === 0) {
                    dispatch(userActions.login(username));
                    navigate('/');
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <section className="mx-5 my-2 flex h-screen flex-col items-center justify-center space-y-10 md:mx-0 md:my-0 md:flex-row md:space-x-16 md:space-y-0">
            <div className="max-w-sm md:w-1/3">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                />
            </div>
            <div className="max-w-sm md:w-1/3">
                <div className="m-3 text-center text-xl font-bold">Đăng nhập </div>
                <input
                    className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
                    type="text"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrCode(-1);
                    }}
                />
                {errCode === 2 && <div>Sai tai khoan r</div>}
                <input
                    className="mt-4 w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrCode(-1);
                    }}
                />
                {errCode === 1 && <div>Sai mat khau roi r</div>}
                <div className="mt-4 flex justify-between text-sm font-semibold">
                    <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
                        <input className="mr-1" type="checkbox" />
                        <span>Lưu mật khẩu</span>
                    </label>
                    <a
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        Quên mật khẩu?
                    </a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 rounded bg-blue-600 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-blue-700"
                        type="submit"
                        onClick={fetchLogin}
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="mt-4 text-center text-sm font-semibold text-slate-500 md:text-left">
                    Bạn chưa có tài khoản?{' '}
                    <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">
                        Đăng ký
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
