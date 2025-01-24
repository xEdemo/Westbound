import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header, Sidebar } from "../";

const Layout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
		const savedState = localStorage.getItem("IS_SIDEBAR_OPEN");
		return savedState === "false" ? false : true;
	});

	const location = useLocation();

	useEffect(() => {
		localStorage.setItem("IS_SIDEBAR_OPEN", isSidebarOpen);
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<div className="layout-container">
			<Header />
			{location.pathname === "/" ||
			location.pathname === "/login" ||
			location.pathname === "/register" ? (
				<>{children}</>
			) : (
				<div className="layout-main">
					<Sidebar
						isOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>
					<div
						className="content"
						style={{
							marginLeft: isSidebarOpen ? "0px" : "-100px",
							transition: "margin-left 0.3s ease",
							width: isSidebarOpen
								? `calc(100vw - 150px)`
								: `calc(100vw - 50px)`,
							height: "calc(100vh - 80px)",
						}}
					>
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default Layout;
