import { Layout } from "../../components";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
	const { user, isAuthenticated, loading, error } = useSelector(
		(state) => state.user
	);

	return (
		<Layout>
			<div>
				<p>Home page</p>
			</div>
		</Layout>
	);
};

export default Home;
