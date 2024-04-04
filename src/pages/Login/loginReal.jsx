import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    //redux
    const user = useSelector((state) => {
        return state.user;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errCode, setErrCode] = useState(-1);

    const fetchLogin = () => {
        //auto navigate
        navigate('/level');

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
        <div className="mx-[100px] my-8 rounded-[12px] border-4 border-[#821E06] bg-[#FFB567] p-4 ">
            <div className="m-2 rounded-[10px] bg-[#FFF9E7]">
                <div className="m-2 flex justify-around p-4">
                    <div className="content-center text-xl">Tài khoản: </div>
                    <input
                        className="flex-end w-3/5 rounded-[12px] border border-solid border-gray-300 px-4 py-2 text-xl"
                        type="text"
                        placeholder="Tài khoản"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrCode(-1);
                        }}
                    />
                </div>
                {errCode === 2 && <div>Sai tai khoan r</div>}
                <div className="m-2 flex justify-around p-4">
                    <div className="content-center text-xl">Mật khẩu: </div>
                    <input
                        className="w-3/5 rounded-[12px] border border-solid border-gray-300 px-4 py-2 text-xl"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrCode(-1);
                        }}
                    />
                </div>
                {errCode === 1 && <div>Sai mat khau roi r</div>}
                <div className="flex w-full justify-around">
                    <div
                        className="relative mb-4 h-[50px] w-[150px] bg-[url('/../assets/Asset/ButtonAtlas_cuts/ButtonAtlas_cuts/image_25.png')] bg-center bg-no-repeat"
                        style={{
                            backgroundSize: '100%',
                        }}
                        onClick={() => {
                            console.log('Hello world');
                        }}
                    >
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-transparent text-xl"
                            onClick={fetchLogin}
                        >
                            Đăng nhập
                        </div>
                    </div>
                    {/* <button className="my-4 w-48 ">
                        <img
                            src="/assets\Asset\ButtonAtlas_cuts\ButtonAtlas_cuts\image_25.png"
                            alt="my image"
                            onClick={() => {
                                console.log('Btn click');
                            }}
                        />
                    </button> */}
                </div>
            </div>
        </div>
    );
};

const LoginForm = () => {
    // app
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //status: initial, writing, wrong username, wrong password
    return (
        <div className="grid h-screen grid-cols-2 bg-[url('../assets/Asset/Login/backgroundLogin.png')] bg-cover bg-center bg-no-repeat ">
            <div className="grid h-screen grid-rows-5 ">
                <div className="row-span-1">
                    <img
                        src="/assets\Asset\ButtonAtlas_cuts\ButtonAtlas_cuts\image_24.png"
                        alt="guide"
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="b row-span-4 m-8">
                    <img
                        src="/assets\Asset\GameObject\SunflowerCatSpriteWalkBlink_cuts\image_1-0.png"
                        alt=""
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>
            <div className="grid h-screen grid-rows-7 ">
                <div className="row-span-1 flex justify-center p-4">
                    <img
                        className="mr-4 object-contain"
                        src="/assets\Asset\Logo\Logo Ban.png"
                        alt="logoBan"
                    />
                    <img
                        className="object-contain"
                        src="/assets\Asset\Logo\Logo Đoàn.png"
                        alt="logoBan"
                    />
                    <img
                        className=" ml-4 object-contain"
                        src="/assets\Asset\Logo\Logo Khoa.png"
                        alt="logoBan"
                    />
                </div>
                <div className="row-span-2 m-2 ">
                    <img
                        src="/assets\Asset\Logo.png"
                        alt=""
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="row-span-4  ">
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
