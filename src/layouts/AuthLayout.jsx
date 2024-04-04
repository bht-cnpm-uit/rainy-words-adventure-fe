import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector((state) => {
        return state.user;
    });
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user.isLoggedIn == false) {
    //         navigate('/login');
    //     }
    // }, [user, location.pathname]);
    return <>{children}</>;
}

export default AuthLayout;
