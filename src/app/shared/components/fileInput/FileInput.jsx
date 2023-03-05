import React from 'react';

export const FileInput = ({ label, description }) => {
	return (
		<div className="control">
			<div className="file is-boxed is-default">
				<label className="file-label">
					<input className="file-input" type="file" />
					<span className="file-cta">
						<span className="file-icon" style={{ color: '#06d6a0' }}>
							<i className="fas fa-upload"></i>{' '}
							<span className="column is-weight-700">{label}</span>
						</span>
						<span className="file-label m-t-10">
							<p>{description}</p>
						</span>
					</span>
				</label>
			</div>
		</div>
	);
};
