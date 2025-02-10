import { useState } from "react";
import { AdminHeader, AdminSidebar } from "../../";

const AdminLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		() => JSON.parse(localStorage.getItem("IS_ADMIN_SIDEBAR_OPEN")) ?? true
	);

	const toggleSidebar = () => {
		const newState = !isSidebarOpen;
		setIsSidebarOpen(newState);
		localStorage.setItem("IS_ADMIN_SIDEBAR_OPEN", JSON.stringify(newState));
	};

	return (
		<div
			className={`admin-layout-container ${
				isSidebarOpen ? "sidebar-open" : "sidebar-closed"
			}`}
		>
			<AdminSidebar isSidebarOpen={isSidebarOpen} />
			<div className="admin-main">
				<AdminHeader
					toggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>
				<div className="admin-content">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
