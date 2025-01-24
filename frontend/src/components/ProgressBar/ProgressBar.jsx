const ProgressBar = ({ current, max, type, isSmall }) => {
	const percentage = current < max ? (current / max) * 100 : 100;
	const actualPercentage = Math.round((current / max) * 1000) / 10;

	const barColor =
		type === "health"
			? percentage >= 35
				? "green"
				: percentage <= 0
				? "rgb(48, 0, 0)"
				: "red"
			: type === "endurance"
			? "blue"
			: "#80471C";

	return (
		<div
			className={
				isSmall
					? `progress-bar-container-small progress-bar-container`
					: `progress-bar-container`
			}
			title={`${current}/${max}`}
		>
			<div
				className={
					isSmall
						? `progress-bar-border-small progress-bar-border`
						: `progress-bar-border`
				}
				style={{ border: `1px solid ${barColor}` }}
			>
				<div
					className="progress-bar-filling"
					style={{
						width: `${percentage}%`,
						backgroundColor: `${barColor}`,
					}}
				></div>
			</div>
			<span
				className={
					isSmall
						? `progress-bar-text-small progress-bar-text`
						: `progress-bar-text`
				}
			>
				{isSmall ? (
					<>{actualPercentage}%</>
				) : (
					<>
						{current}/{max}
					</>
				)}
			</span>
		</div>
	);
};

export default ProgressBar;
