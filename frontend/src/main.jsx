import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import { Home, Landing, Private } from "./pages";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Landing />} />
			{/* Private Routes */}
			<Route path="" element={<Private />}>
				<Route path="/home" element={<Home />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
