import { useState, useEffect } from "react";
import {
	FaChevronDown,
	FaChevronUp,
	FaChevronRight,
	FaUserCog,
} from "react-icons/fa";
import { MdMiscellaneousServices, MdDashboard } from "react-icons/md";
import { GiBroadsword, GiRobberMask } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const chevronSize = 12;

const AdminSidebar = ({ isSidebarOpen }) => {
	const [isControllerOpen, setIsControllerOpen] = useState(
		() => JSON.parse(localStorage.getItem("IS_CONTROLLER_OPEN")) ?? true
	);

	const location = useLocation();
	const navigate = useNavigate();

	const handleToggleController = () => {
		const newState = !isControllerOpen;
		setIsControllerOpen(newState);
		localStorage.setItem("IS_CONTROLLER_OPEN", JSON.stringify(newState));
	};

	const controllers = [
		{
			icon: <GiRobberMask />,
			label: "Crime",
			onClick: () => {
				navigate("/admin/crime");
			},
			isSelected: location.pathname.includes("/admin/crime")
				? true
				: false,
		},
		{
			icon: <MdMiscellaneousServices />,
			label: "Enum",
			onClick: () => {
				navigate("/admin/enum");
			},
			isSelected: location.pathname.includes("/admin/enum")
				? true
				: false,
		},
		{
			icon: <GiBroadsword />,
			label: "Item",
			onClick: () => {
				navigate("/admin/item");
			},
			isSelected: location.pathname.includes("/admin/item")
				? true
				: false,
		},
		{
			icon: <FaUserCog />,
			label: "User",
			onClick: () => {
				navigate("/admin/user");
			},
			isSelected: location.pathname.includes("/admin/user")
				? true
				: false,
		},
	];

	return (
		<div
			className={`admin-sidebar-container ${
				isSidebarOpen ? "open" : "closed"
			}`}
		>
			{
				<div className="admin-sidebar-content">
					<div className="admin-logo">
						<img src="/src/assets/logo/logo.webp" alt="Westbound" />
					</div>
					<div className="admin-dropdown-layout">
						<div
							className={`admin-dropdown-item ${
								location.pathname === "/admin/dashboard"
									? "active"
									: ""
							}`}
							onClick={() => navigate("/admin/dashboard")}
						>
							<MdDashboard />
							<p>Dashboard</p>
							{location.pathname === "/admin/dashboard" ? (
								<FaChevronRight size={chevronSize} />
							) : (
								<div style={{ width: "12px" }}></div>
							)}
						</div>
					</div>
					<div className="admin-controllers">
						<h4 onClick={handleToggleController}>
							Controllers{" "}
							{isControllerOpen ? (
								<FaChevronUp size={chevronSize} />
							) : (
								<FaChevronDown size={chevronSize} />
							)}
						</h4>
						{isControllerOpen && (
							<div
								className={`admin-dropdown-layout ${
									isControllerOpen ? "open" : "closed"
								}`}
							>
								{controllers.map((c, index) => (
									<div
										key={index}
										className={`admin-dropdown-item ${
											c.isSelected ? "active" : ""
										}`}
										onClick={c.onClick}
									>
										{c.icon}
										<p>{c.label}</p>
										{c.isSelected ? (
											<FaChevronRight
												size={chevronSize}
											/>
										) : (
											<div
												style={{ width: "12px" }}
											></div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			}
		</div>
	);
};

export default AdminSidebar;
