import { useState, useEffect } from "react";

const ImageSlider = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);

	const goToSlide = (index) => {
		setCurrentIndex(index);
		setIsAutoScrolling(false);
	};

	useEffect(() => {
		if (!isAutoScrolling) return;
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isAutoScrolling, images.length]);

	return (
		<div className="image-slider-container">
			{images.map((image, index) => (
				<img
					key={index}
					src={image.src}
					alt={image.title}
					className={`slider-image ${currentIndex === index ? "active" : ""}`}
				/>
			))}
			<div
				className="slider-controls"
				style={{
					left: `calc(50% - ${
						images.length * 10 - ((images.length - 1) * 5) / 2
					}px)`,
				}}
			>
				{images.map((_, index) => (
					<div
						key={index}
						className={`slider-circle ${
							currentIndex === index ? "active" : ""
						}`}
						onClick={() => goToSlide(index)}
					></div>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;
