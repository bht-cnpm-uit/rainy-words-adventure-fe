import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { userActions } from '../redux/slices/userSlice';

function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');
        const isAuthenticated = !!authToken;

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (location.pathname.startsWith('/admin') && authToken !== 'admin') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            dispatch(userActions.logout());
            navigate('/login');
        }
    }, [navigate, location.pathname, user, dispatch]);

    return <>{children}</>;
}

export default AuthLayout;
