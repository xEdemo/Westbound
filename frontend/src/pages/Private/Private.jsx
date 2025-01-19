import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../slices/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Layout, Loading } from "../../components";

const Private = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fetchUser = async () => {
		try {
			const res = await dispatch(fetchUserInfo()).unwrap();
			//console.log(res);
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
			fetchUser();
		}
	}, []);

	if (isLoading) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	return userData ? <Outlet /> : <Navigate to="/" replace />;
};

export default Private;
