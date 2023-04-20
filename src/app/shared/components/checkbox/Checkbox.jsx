import React from 'react';

export const Checkbox = ({
	label,
	isOutlined,
	isCircle,
	isSuccess,
	isPrimary,
	isInfo,
	isWarning,
	isDanger,
	isSolid,
	labelStyle,
	checked = false,
	onChange = () => {},
}) => {
	const getButtonClasses = () => {
		const classes = [];

		isCircle && classes.push('is-circle');
		isOutlined && classes.push('is-outlined');
		isSolid && classes.push('is-solid');

		// Color Options
		isPrimary && classes.push('is-primary');
		isSuccess && classes.push('is-success');
		isInfo && classes.push('is-info');
		isWarning && classes.push('is-warning');
		isDanger && classes.push('is-danger');

		return classes.join(' ');
	};

	return (
		<div className="field">
			<div className="control">
				<label className={`checkbox ${getButtonClasses()}`} style={labelStyle}>
					{label}
					<input type="checkbox" checked={checked} onChange={onChange} />
					<span></span>
				</label>
			</div>
		</div>
	);
};
