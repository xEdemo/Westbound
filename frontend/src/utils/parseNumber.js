export const parseNumber = (num) => {
	if (num <= 999) return num.toString();

	const suffixes = ["", "k", "m", "b", "t", "q"];
	let index = 0;

	while (num >= 1000 && index < suffixes.length - 1) {
		num /= 1000;
		index++;
	}

	return `${num.toFixed(1)}${suffixes[index]}`;
};
