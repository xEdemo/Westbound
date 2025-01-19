import { Layout, ImageSlider } from "../../components";
import { Link } from "react-router-dom";

const images = [
	{
		src: "/src/assets/logo/logo_1024.png",
		title: "Welcome to Westbound!",
	},
	{ src: "/src/assets/background/landing-page-main.png", title: "Adventure Awaits" },
	{ src: "/src/assets/slides/slide3.jpg", title: "Make Your Own Destiny" },
];

const Landing = () => {
	return (
		<Layout>
			<div className="landing-hero">
				<img
					src="/src/assets/background/landing-page-main.png"
					alt="Landing Background"
					className="landing-image"
				/>
				<Link to="/register" className="register-link"></Link>
				<ImageSlider images={images} />
			</div>
			<div>
				<div></div>
				<div></div>
			</div>
		</Layout>
	);
};

export default Landing;
