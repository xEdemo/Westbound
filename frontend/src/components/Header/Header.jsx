import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "../";
import { TbLogout2, TbSettings } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";
import { logoutUser } from "../../slices/user/userSlice.js";
import { toast } from "react-toastify";

const Header = () => {
	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
	const userDropdownRef = useRef(null);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isAuthenticated, loading, error } = useSelector(
		(state) => state.user
	);

	const toggleUserDropdown = () => {
		setIsUserDropdownOpen((prev) => !prev);
	};

	const userDropdownOptions = [
		{
			icon: <TbSettings />,
			label: "Settings",
			show: true,
			onClick: () => {
				console.log("Navigating to settings...");
			},
		},
		{
			icon: <MdAdminPanelSettings />,
			label: "Admin",
			show:
				user?.role === "superAdmin" || user?.role === "admin"
					? true
					: false,
			onClick: () => {
				navigate("/admin/dashboard");
			},
		},
		{
			icon: <TbLogout2 />,
			label: "Logout",
			show: true,
			onClick: async () => {
				try {
					const res = await dispatch(logoutUser()).unwrap();
					if (res) {
						toast.success(`Logout successful`);
						navigate("/login");
					}
				} catch (err) {
					toast.error(error);
				}
			},
		},
	];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				userDropdownRef.current &&
				!userDropdownRef.current.contains(event.target)
			) {
				setIsUserDropdownOpen(false);
			}
		};

		// Attach listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup listener on unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="header-container">
			<div className="header-layout">
				<div className="header-left">
					<div className="header-top-left">
						<Link to="/rules">Rules</Link>
					</div>
					<div className="header-bottom-left">
						<Link></Link>
					</div>
				</div>
				<Link
					// change to based on route
					to={
						location.pathname === "/" ||
						location.pathname === "/login" ||
						location.pathname === "/register"
							? "/"
							: "/home"
					}
					style={{
						height: "64px",
						minWidth: "64px",
					}}
				>
					<img src="/src/assets/logo/logo_64.png" alt="Westbound" />
				</Link>
				<div className="header-right">
					<div className="header-top-right">
						{location.pathname === "/" ? (
							<>
								<Link to="/login">Login</Link>
								<Link to="/register">Register</Link>
							</>
						) : location.pathname === "/login" ? (
							<Link to="/register">Register</Link>
						) : !isAuthenticated ? (
							<Link to="/login">Login</Link>
						) : (
							<div
								className="user-header-image-container"
								onClick={toggleUserDropdown}
								ref={userDropdownRef}
							>
								<img
									src="/src/assets/logo/logo_64.png"
									alt="profile"
								/>
								{isUserDropdownOpen && (
									<Dropdown
										options={userDropdownOptions}
										positionStyles={{
											top: "28px",
											right: "0px",
										}}
									/>
								)}
							</div>
						)}
					</div>
					<div className="header-bottom-right">
						<Link></Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
