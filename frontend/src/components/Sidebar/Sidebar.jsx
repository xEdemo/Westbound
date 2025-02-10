import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, ProgressBar } from "../";
import { calculateXpForNextUserLevel, parseNumber } from "../../utils";
import {
	TbLayoutSidebarLeftExpandFilled,
	TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { FaHeartbeat, FaHeartBroken, FaBrain  } from "react-icons/fa";
import { GiStrong } from "react-icons/gi";

const iconSize = 24;

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
	const { user, isAuthenticated, loading, error } = useSelector(
		(state) => state.user
	);

	return (
		<div
			className="sidebar-container"
			style={{
				transform: isSidebarOpen ? "translateX(0)" : "translateX(-100px)", //translateX(-100px)
				transition: "transform 0.3s ease",
			}}
		>
			{user ? (
				<>
					<span
						className="sidebar-toggle-btn"
						onClick={toggleSidebar}
					>
						{isSidebarOpen ? (
							<TbLayoutSidebarLeftCollapseFilled
								size={iconSize}
							/>
						) : (
							<TbLayoutSidebarLeftExpandFilled size={iconSize} />
						)}
					</span>
					{isSidebarOpen ? (
						<>
							<div className="sidebar-div-open">
								<h3 style={{ textAlign: "center" }}>
									{user.username}
								</h3>
							</div>
							<div className="sidebar-div-open">
								<h6>Vitals</h6>
								<p>Health:</p>
								<div className="siderbar-progress-bar">
									<ProgressBar
										current={user.attributes.health.current}
										max={user.attributes.health.softCap}
										type="health"
										isSmall={!isSidebarOpen}
									/>
								</div>
								<p>Resolve:</p>
								<div className="siderbar-progress-bar">
									<ProgressBar
										current={
											user.attributes.resolve.current
										}
										max={user.attributes.resolve.softCap}
										type="resolve"
										isSmall={!isSidebarOpen}
									/>
								</div>
								<p>Endurance:</p>
								<div className="siderbar-progress-bar">
									<ProgressBar
										current={
											user.attributes.endurance.current
										}
										max={user.attributes.endurance.softCap}
										type="endurance"
										isSmall={!isSidebarOpen}
									/>
								</div>
							</div>
							<div className="sidebar-div-open">
								<h6>Progression</h6>
								<p>Level: <span>{user.progression.level}</span></p>
								<p>XP: <span title={`${calculateXpForNextUserLevel(user.progression.xp, user.progression.level).neededXp}xp to next level.`}>{parseNumber(user.progression.xp - 250)}/{parseNumber(calculateXpForNextUserLevel(user.progression.xp, user.progression.level).nextLevelXp)}</span></p>
								<p>Net Worth: <span style={{ color: "var(--money-green)" }}>{parseNumber(user.progression.netWorth.current)}</span></p>
							</div>
							<div className="sidebar-div-open">
								<h6>Currencies</h6>
								<p></p>
							</div>
							<div className="sidebar-div-open" style={{ marginBottom: "1000px" }}>
								<h6>Navigation</h6>
							</div>
						</>
					) : (
						<>
							<div
								className="closed-sidebar"
								style={{
									marginTop: `calc(${iconSize}px + 5px)`,
								}}
							>
								<div className="closed-siderbar-icon">
									{user.attributes.health.current <= 0 ? (
										<FaHeartBroken
											color="rgb(48, 0, 0)"
											size={16}
										/>
									) : (
										<FaHeartbeat
											color={
												(user.attributes.health
													.current /
													user.attributes.health
														.softCap) *
													100 >=
												35
													? "green"
													: "red"
											}
											size={16}
										/>
									)}
								</div>
								<div>
									<ProgressBar
										current={user.attributes.health.current}
										max={user.attributes.health.softCap}
										type="health"
										isSmall={!isSidebarOpen}
									/>
								</div>
								<div className="closed-siderbar-icon"><FaBrain color="#80471C" size={16} /></div>
								<div>
									<ProgressBar
										current={
											user.attributes.resolve.current
										}
										max={user.attributes.resolve.softCap}
										type="resolve"
										isSmall={!isSidebarOpen}
									/>
								</div>
								<div className="closed-siderbar-icon"><GiStrong color="blue" size={16} /></div>
								<div>
									<ProgressBar
										current={
											user.attributes.endurance.current
										}
										max={user.attributes.endurance.softCap}
										type="endurance"
										isSmall={!isSidebarOpen}
									/>
								</div>
							</div>
							<div className="closed-sidebar"></div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Sidebar;
