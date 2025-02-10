import React from "react";

const Dropdown = ({ options, positionStyles }) => {
	return (
		<div className="dropdown-container" style={{ ...positionStyles }}>
			{options &&
				options.map((option, index) => (
					<React.Fragment key={index}>
						{option.show && (
							<div
								className="dropdown-item"
								onClick={option.onClick}
							>
								{option.icon}
								<p>{option.label}</p>
							</div>
						)}
					</React.Fragment>
				))}
		</div>
	);
};

export default Dropdown;
