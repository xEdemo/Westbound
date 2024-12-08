import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Default/Theme CSS
import "./index.css";

// Components CSS
import "./components/Layout/Layout.css";

// Pages CSS
import "./pages/Landing/Landing.css";
import "./pages/Home/Home.css";

const App = () => {
	return (
		<>
			<Suspense>
				<Outlet />
			</Suspense>
		</>
	);
}

export default App;