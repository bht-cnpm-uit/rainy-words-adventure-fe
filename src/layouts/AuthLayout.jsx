import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
    const location = useLocation();
    const account = useSelector();
    const navigate = useNavigate();

    useEffect(() => {
        if (account == null) {
            navigate('./login');
        }
    }, [account, location.pathname]);
    return <>{children}</>
}

export default AuthLayout;