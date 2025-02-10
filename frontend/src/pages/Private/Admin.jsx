import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../slices/user/userSlice.js";
import { fetchEnum } from "../../slices/enum/enumSlice.js";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../components";

const Admin = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fetchData = async () => {
		try {
			const res = await dispatch(fetchUserInfo()).unwrap();
			//console.log(res);
			const enumRes = await dispatch(fetchEnum()).unwrap();
			
			if (res) {
				setUserData(res);
			}
		} catch (err) {
			toast.error(err);
			navigate("/");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!userData) {
			fetchData();
		}
	}, []);

	if (isLoading) {
		return <Loading />
	}

	return userData.role === "superAdmin" || userData.role === "admin" ? <Outlet /> : <Navigate to="/home" replace/>
};

export default Admin;
