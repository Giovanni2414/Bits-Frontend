import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export const Auth = ({children}) => {
	const token = useSelector(state=>state.auth.value.access_token)
	const location = useLocation();
	if (token === "") {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
}