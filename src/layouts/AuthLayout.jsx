import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.userInfo === null || user.isLoggedIn == false) {
            navigate('/login');
        }
    }, [user, location.pathname]);
    return <>{children}</>;
}

export default AuthLayout;