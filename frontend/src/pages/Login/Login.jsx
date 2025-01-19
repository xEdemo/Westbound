import { useState, useEffect } from "react";
import { Layout } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, fetchUserInfo } from "../../slices/user/userSlice.js";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { user, isAuthenticated, loading, error } = useSelector(
		(state) => state.user
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (isAuthenticated) navigate("/home");
	}, []);
	
	const submitHandler = async (e) => {
		e.preventDefault();
		const normalizedUsername = username.toLowerCase();
		if (!username || !password) {
			return;
		}
		try {
			const res = await dispatch(
				loginUser({ username: normalizedUsername, password })
			).unwrap();
			if (res) {
				toast.success(`Login successful`);
				navigate("/home");
			}
		} catch (err) {
			toast.error(error);
		}
	};

	return (
		<Layout>
			<div className="login-background">
				<form onSubmit={submitHandler} className="login-container">
					<h2 style={{ textAlign: "center" }}>Login</h2>
					<div>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={username}
							minLength={2}
							maxLength={20}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={password}
							minLength={8}
							maxLength={60}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && (
						<p
							style={{
								color: "red",
								textAlign: "center",
								marginBottom: "5px",
							}}
						>
							{error}
						</p>
					)}
					{!loading ? (
						<button type="submit">Login</button>
					) : (
						<button type="button">Login</button>
					)}
					<p>
						Don't have an account?{" "}
						<Link to="/register">Click here to register.</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
