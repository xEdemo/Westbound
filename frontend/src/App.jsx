import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Toastify
import "react-toastify/dist/ReactToastify.css";

// Default/Theme CSS
import "./index.css";

// Components CSS
import "./components/Layout/Layout.css";
import "./components/Header/Header.css";
import "./components/ImageSlider/ImageSlider.css";
import "./components/Loading/Loading.css";
import "./components/Dropdown/Dropdown.css";
import "./components/Sidebar/Sidebar.css";
import "./components/ProgressBar/ProgressBar.css";

// Pages CSS
import "./pages/Landing/Landing.css";
import "./pages/Landing/Landing.css";
import "./pages/Home/Home.css";
import "./pages/Register/Register.css";
import "./pages/Login/Login.css";

const App = () => {
	return (
		<>
			<Suspense>
				<ToastContainer
					position="bottom-left"
					autoClose={3000}
					limit={4}
					hideProgressBar
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<Outlet />
			</Suspense>
		</>
	);
};

export default App;
