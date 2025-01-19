import { Layout } from "../../components";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
	const { user, isAuthenticated, loading, error } = useSelector(
		(state) => state.user
	);

	return <Layout>
		<p>Home page</p>
	</Layout>;
};

export default Home;
