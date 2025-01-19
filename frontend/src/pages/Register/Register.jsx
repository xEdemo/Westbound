import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "../../components";
import { toast } from "react-toastify";
import {
	fetchUsernames,
	fetchEmails,
} from "../../slices/user/registrationSlice.js";
import { registerUser } from "../../slices/user/userSlice.js";

// Allow Aa-Zz, 0-9, dashes, and underscores
const usernameRegex = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/;
const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isUsernameMatch, setIsUsernameMatch] = useState(false);
	const [isEmailMatch, setIsEmailMatch] = useState(false);

	const { usernames, emails, loading, error } = useSelector(
		(state) => state.registration
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsernames());
		dispatch(fetchEmails());
	}, [dispatch]);

	useEffect(() => {
		if (usernames) {
			const normalizedUsername = username.toLowerCase();
			setIsUsernameMatch(
				usernames
					.map((u) => u.toLowerCase())
					.includes(normalizedUsername)
			);
		}
	}, [username, usernames]);

	useEffect(() => {
		if (emails) {
			const normalizedEmail = email.toLowerCase();
			setIsEmailMatch(
				emails.map((e) => e.toLowerCase()).includes(normalizedEmail)
			);
		}
		if (email) {
		}
	}, [email, emails]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const normalizedUsername = username.toLowerCase();
		const normalizedEmail = email.toLowerCase();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		} else if (isUsernameMatch) {
			toast.error("The username entered already exists.");
			return;
		} else if (
			username.length < 2 ||
			username.length > 20 ||
			!usernameRegex.test(username)
		) {
			toast.error("This username does not fit the required parameters.");
			return;
		} else if (isEmailMatch) {
			toast.error("The email entered already exists.");
			return;
		} else if (!emailRegex.test(email) || email.length < 5) {
			toast.error("This email does not fit the required parameters.");
			return;
		} else if (password.length < 8) {
			toast.error("This password does not fit the required parameters.");
			return;
		}

		try {
			const res = await dispatch(
				registerUser({
					username: normalizedUsername,
					email: normalizedEmail,
					password,
				})
			).unwrap();
			if (res) {
				toast.success("User registered successfully!");
				navigate("/login");
			}
		} catch (err) {
			toast.error(error);
		}
	};

	return (
		<Layout>
			<div className="register-background">
				<form onSubmit={submitHandler} className="register-container">
					<h2 style={{ textAlign: "center" }}>Register</h2>
					<div>
						<label htmlFor="username">Create a Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter a Username"
							value={username}
							minLength={2}
							maxLength={20}
							onChange={(e) => setUsername(e.target.value)}
						/>
						{loading ? (
							<p style={{ color: "yellow" }}>Loading...</p>
						) : username.length < 2 ? (
							<p style={{ color: "red" }}>
								Username must exceed 2 characters.
							</p>
						) : username.length > 20 ? (
							<p style={{ color: "red" }}>
								Username must be 20 characters or less.
							</p>
						) : !usernameRegex.test(username) && username !== "" ? (
							<p style={{ color: "red" }}>
								Username can only contain letters, numbers,
								dashes (-), and underscores (_) with no
								consecutive or ending symbols.
							</p>
						) : isUsernameMatch ? (
							<p style={{ color: "red" }}>
								This username has already been taken.
							</p>
						) : (
							<p style={{ color: "green" }}>Username Available</p>
						)}
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter an Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							minLength={5}
							maxLength={254}
						/>
						{loading ? (
							<p style={{ color: "yellow" }}>Loading...</p>
						) : email.length < 5 ? (
							<p style={{ color: "red" }}>
								Email must exceed 5 characters.
							</p>
						) : !emailRegex.test(email) && email !== "" ? (
							<p style={{ color: "red" }}>
								This email does not follow a normal email format
							</p>
						) : isEmailMatch ? (
							<p style={{ color: "red" }}>Email already in use</p>
						) : (
							<p style={{ color: "green" }}>Email Available</p>
						)}
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter a Password"
							value={password}
							minLength={8}
							maxLength={60}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{password.length < 8 ? (
							<p style={{ color: "red" }}>
								Password must exceed 8 characters
							</p>
						) : password.length > 60 ? (
							<p style={{ color: "red" }}>
								Password must not exceed 60 characters
							</p>
						) : (
							<p style={{ color: "green" }}>
								Password meets criteria
							</p>
						)}
					</div>
					<div>
						<label htmlFor="confirm-password">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							placeholder="Confirm your Password"
							minLength={8}
							maxLength={60}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{confirmPassword !== password &&
						password.length >= 8 ? (
							<p style={{ color: "red" }}>
								Passwords do not match
							</p>
						) : password === confirmPassword &&
						  password.length >= 8 &&
						  confirmPassword.length >= 8 ? (
							<p style={{ color: "green" }}>Passwords match</p>
						) : (
							<p></p>
						)}
					</div>
					<button type="submit">Register</button>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<p>
						Already have an account?{" "}
						<Link to="/login">Click here to login.</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
};

export default Register;
