import { Outlet } from "react-router-dom";
import { Header } from "../";

const Layout = ({ children }) => {
	return (
		<div className="layout-container">
			<Header />
			{children}
		</div>
	);
};

export default Layout;
