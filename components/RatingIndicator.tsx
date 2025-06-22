interface RatingIndicatorProps {
	rating: number;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function RatingIndicator({
	rating,
	size = "sm",
	className = "",
}: RatingIndicatorProps) {
	const percentage = Math.round(rating * 10);

	const sizeConfig = {
		sm: {
			container: "w-10 h-10",
			svg: "w-8 h-8",
			text: "text-xs",
			percentText: "text-[8px]",
			radius: 16,
			strokeWidth: 2,
		},
		md: {
			container: "w-16 h-16",
			svg: "w-14 h-14",
			text: "text-sm",
			percentText: "text-xs",
			radius: 24,
			strokeWidth: 3,
		},
		lg: {
			container: "w-20 h-20",
			svg: "w-18 h-18",
			text: "text-lg",
			percentText: "text-sm",
			radius: 32,
			strokeWidth: 4,
		},
	};

	const config = sizeConfig[size];
	const circumference = 2 * Math.PI * config.radius;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	const getColor = (score: number) => {
		if (score < 50) return "#ef4444";
		if (score < 70) return "#eab308";
		return "#22c55e";
	};

	const viewBoxSize = config.radius * 2 + config.strokeWidth * 2;
	const center = viewBoxSize / 2;

	return (
		<div
			className={`${config.container} bg-black/80 rounded-full flex items-center justify-center ${className}`}
		>
			<svg
				className={`${config.svg} transform -rotate-90`}
				viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
			>
				<title>{`Rating: ${percentage}%`}</title>
				<circle
					cx={center}
					cy={center}
					r={config.radius}
					fill="none"
					stroke="#374151"
					strokeWidth={config.strokeWidth}
				/>
				<circle
					cx={center}
					cy={center}
					r={config.radius}
					fill="none"
					stroke={getColor(percentage)}
					strokeWidth={config.strokeWidth}
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className={`text-white ${config.text} font-bold`}>
					{percentage}
					<span className={config.percentText}>%</span>
				</span>
			</div>
		</div>
	);
}
