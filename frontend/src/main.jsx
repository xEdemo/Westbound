import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import store from "./store.js";
import { Provider } from "react-redux";

import { Home, Landing, Private, Register, Login } from "./pages";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Landing />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			{/* Private Routes */}
			<Route path="" element={<Private />}>
				<Route path="/home" element={<Home />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
