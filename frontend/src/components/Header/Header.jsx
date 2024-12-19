import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav className="header-container">
			<Link to="/">
				<img src="google" alt="name" />
			</Link>
			<ul className="header-upper">
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
			<ul className="header-lower">
				<li>
					{/* custom dropdown for different pages */}
					<div>
						<ul>
							<li>
								yo
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</nav>
	)
};

export default Header;