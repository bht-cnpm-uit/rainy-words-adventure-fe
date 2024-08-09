import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { userActions } from '../redux/slices/userSlice';

function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector(userSelector);
    const role = useSelector((state) => state.user.role)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (role === null) {
            navigate('/login')
        }
        else if (role && role === 'student' && user === null)
            navigate('/login');
    }, [navigate, location.pathname, user, dispatch]);

    return <>{children}</>;
}

export default AuthLayout;
