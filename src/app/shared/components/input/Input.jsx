import React from 'react';

export const Input = ({
	type = 'text',
	placeholder,
	focusType,
	helpText,
	isRounded,
	hasIcon,
	isLoading,
	hasValidation,
	isSuccess,
	isError,
	iconType,
	value,
	onChange,
	...rest
}) => {
	const getFocusType = () => {
		switch (focusType) {
			case 'primary':
				return 'is-primary-focus';
			case 'success':
				return 'is-success-focus';
			case 'info':
				return 'is-info-focus';
			case 'warning':
				return 'is-warning-focus';
			case 'danger':
				return 'is-danger-focus';
			default: {
				return '';
			}
		}
	};

	const getInputClassOptions = () => {
		if (isRounded) {
			return 'is-rounded';
		} else {
			return '';
		}
	};

	const getControlClassOptions = () => {
		const classes = [];

		hasIcon && classes.push('has-icon');

		isLoading && classes.push('is-loading');

		hasValidation && isSuccess && classes.push('has-validation has-success');

		hasValidation && isError && classes.push('has-validation has-error');

		return classes.join(' ');
	};

	return (
		<div className="field">
			<div className={`control ${getControlClassOptions()}`}>
				<input
					type={type}
					className={`input ${getFocusType()} ${getInputClassOptions()}`}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					{...rest}
				/>

				{/* Icon */}
				{hasIcon && (
					<span className="form-icon">
						<i className={`fas fa-${iconType}`}></i>
					</span>
				)}

				{/* Validation Success */}
				{hasValidation && isSuccess && (
					<div className="validation-icon is-success">
						<i className="fas fa-check"></i>
					</div>
				)}

				{/* Validation Error */}
				{hasValidation && isError && (
					<div className="validation-icon is-error">
						<i className="fas fa-times"></i>
					</div>
				)}

				{/* Helper text */}
				{helpText && (
					<p
						className={`help ${
							isSuccess ? 'success-text' : isError ? 'danger-text' : ''
						}`}
					>
						{helpText}
					</p>
				)}
			</div>
		</div>
	);
};
