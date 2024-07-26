import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken !== 'admin') {
            navigate('/login');
        }

        
    }, [user, navigate, location.pathname]);

    return <>{children}</>;
}

export default AuthLayout;
