import React from 'react';

export const HAction = ({ children, isRounded, isHover, isGrey, onClick }) => {
	const getActionClasses = () => {
		const classes = [];

		isRounded && classes.push('is-rounded');

		isHover && classes.push('is-hoverable');

		isGrey && classes.push('is-grey');

		return classes.join(' ');
	};

	return (
		<>
			<button
				onClick={onClick}
				className={`button h-action ${getActionClasses()}`}
			>
				{children}
			</button>
		</>
	);
};
