import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	TbLayoutSidebarLeftCollapseFilled,
	TbLayoutSidebarLeftExpandFilled,
	TbLogout2,
	TbSettings,
	TbHome,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Dropdown } from "../../";
import { toast } from "react-toastify";
import { logoutUser } from "../../../slices/user/userSlice";

const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
	const userDropdownRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleUserDropdown = () => {
		setIsUserDropdownOpen((prev) => !prev);
	};

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
			icon: <TbHome />,
			label: "Home",
			show: true,
			onClick: () => {
				navigate("/home");
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
					toast.error(err);
				}
			},
		},
	];
	return (
		<div className="admin-header-container">
			<div>
				<div className="admin-sidebar-icon" onClick={toggleSidebar}>
					{isSidebarOpen ? (
						<TbLayoutSidebarLeftCollapseFilled size={32} />
					) : (
						<TbLayoutSidebarLeftExpandFilled size={32} />
					)}
				</div>
			</div>
			<div>
				<div
					className="user-header-image-container-admin"
					onClick={toggleUserDropdown}
					ref={userDropdownRef}
				>
					<img src="/src/assets/logo/logo_64.png" alt="profile" />
					{isUserDropdownOpen && (
						<Dropdown
							options={userDropdownOptions}
							positionStyles={{
								top: "44px",
								right: "10px",
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminHeader;
