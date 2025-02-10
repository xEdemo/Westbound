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

import {
	Home,
	Landing,
	Private,
	Register,
	Login,
	Admin,
	Dashboard,
	Item,
	ItemForm,
} from "./pages";

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
			{/* Admin Routes */}
			<Route path="/admin" element={<Admin />}>
				<Route path="/admin/dashboard" element={<Dashboard />} />
				<Route path="/admin/item" element={<Item />}>
					<Route path="create" element={<ItemForm mode="create" />} />
					<Route path=":itemId" element={<ItemForm mode="edit" />} />
				</Route>
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
