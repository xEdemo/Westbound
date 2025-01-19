import { useEffect, useState } from "react";
import { TbLogout2, TbSettings  } from "react-icons/tb";

const Dropdown = ({ options, positionStyles }) => {
	return (
		<div className="dropdown-container" style={{ ...positionStyles }}>
			{options &&
				options.map((option, index) => (
					<div key={index} className="dropdown-item" onClick={option.onClick}>
						{option.icon}
						<p>{option.label}</p>
					</div>
				))}
		</div>
	);
};

export default Dropdown;
