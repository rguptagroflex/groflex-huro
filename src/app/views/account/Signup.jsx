import React, { useMemo, useState } from 'react';
import signupImage from '../../../assets/img/signup_image.jpg';
import groflexLogo from '../../../assets/img/groflex_logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../shared/components/input/Input';
import { Button } from '../../shared/components/button/Button';
import useThemeSwitch from '../../helpers/hooks/useThemeSwitch';
import { Checkbox } from '../../shared/components/checkbox/Checkbox';

export const SignUp = () => {
	const themeSwitch = useThemeSwitch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [receivePromotionalOffers, setReceivePromotionalOffers] =
		useState(false);
	const checkboxLabelStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0.5rem',
	};
	const checkboxValidationSuccess = {
		isSolid: true,
		isSuccess: true,
		checked: true,
	};
	const emailInvalidFormatCheck = email &&
		formSubmitted &&
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && {
			hasValidation: true,
			isError: true,
			helpText: 'Invalid Email Format',
		};
	const validateForm = formSubmitted &&
		!email &&
		!password && {
			email: {
				hasValidation: true,
				isError: true,
				helpText: 'Email Required',
			},
			password: {
				hasValidation: true,
				isError: true,
				helpText: 'Password Required',
			},
		};

	const checkPasswordRequirements = useMemo(() => {
		return {
			hasSpecialChars:
				/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
				checkboxValidationSuccess,
			hasCase:
				/[A-Z]/.test(password) &&
				/[a-z]/.test(password) &&
				checkboxValidationSuccess,
			hasLength: password.length >= 8 && checkboxValidationSuccess,
		};
	}, [password]);
	const handleEmailChange = (event) => {
		setEmail(event.target.value.trim());
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value.trim());
	};
	const handleReceivePromotionalOffers = () => {
		setReceivePromotionalOffers(!receivePromotionalOffers);
	};
	const handleSignup = (event) => {
		event.preventDefault();
		setFormSubmitted(true);
	};

	return (
		<div className="app-wrapper">
			<div className="pageloader is-full"></div>
			<div className="infraloader is-full"></div>

			<div className="auth-wrapper">
				{/* Page Body */}
				{/* Wrapper */}
				<div className="auth-wrapper-inner columns is-gapless">
					{/* Image Section (hidden on mobile) */}
					<div
						className="column login-column is-6 is-hidden-mobile h-hidden-tablet-p"
						style={{ backgroundColor: 'white' }}
					>
						<div className="hero login-hero is-fullheight">
							<Link
								to={'/'}
								style={{ position: 'fixed', top: '20px', left: '5%' }}
							>
								<img
									src={groflexLogo}
									alt="Groflex Logo"
									style={{ width: '158px', height: 'auto' }}
								/>
							</Link>

							<div className="hero-body">
								<div className="columns">
									<div className="column is-9 is-offset-2">
										<img src={signupImage} alt="Signup Image" />
									</div>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<div
									className="hero-footer"
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										width: '80%',
										borderTop: '0.1rem solid lightgray',
										paddingBottom: '0.8rem',
										paddingTop: '0.8rem',
										fontSize: '1.1rem',
									}}
								>
									<h2>
										For more details visit <Link to={'/'}>www.groflex.in</Link>
									</h2>

									<Link to={'/'}>Terms & Conditions</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Form Section */}
					<div
						className="column is-6"
						style={{ backgroundColor: '#E3EFF9', minHeight: '100vh' }}
					>
						<div className="single-form-wrap">
							<div className="inner-wrap" style={{ maxWidth: '500px' }}>
								<div
									className="form-card has-light-shadow"
									style={{
										borderColor: 'white',
									}}
								>
									<div style={{ paddingBottom: '3rem' }}>
										<h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>
											Create your Groflex account
										</h2>
										<p>Please input your details</p>
									</div>

									<form onSubmit={handleSignup}>
										<div className="login-form">
											<Input
												type="email"
												value={email}
												onChange={handleEmailChange}
												placeholder={'Email Address'}
												hasIcon
												iconType={'envelope'}
												{...(email && emailInvalidFormatCheck)}
												{...validateForm.email}
											/>

											<Input
												type="password"
												value={password}
												onChange={handlePasswordChange}
												placeholder={'Password'}
												hasIcon
												iconType={'lock'}
												{...validateForm.password}
											/>

											<div
												style={{
													paddingBottom: '1.3rem',
													paddingTop: '1.3rem',
												}}
											>
												<Checkbox
													label={'At least 8 characters'}
													isCircle
													labelStyle={checkboxLabelStyle}
													{...checkPasswordRequirements.hasLength}
												/>

												<Checkbox
													label={'At least 1 upper and lower case letter'}
													isCircle
													labelStyle={checkboxLabelStyle}
													{...checkPasswordRequirements.hasCase}
												/>

												<Checkbox
													label={'At least 1 number or special character'}
													isCircle
													labelStyle={checkboxLabelStyle}
													{...checkPasswordRequirements.hasSpecialChars}
												/>
											</div>

											<div className="control login">
												<Button
													onClick={handleSignup}
													isPrimary
													isBold
													isRaised
													isFullWidth
												>
													Register
												</Button>
											</div>

											<div
												className="p-t-15"
												style={{ display: 'flex', justifyContent: 'center' }}
											>
												<h2>
													Already registered? <Link to={'/login'}>SIGN IN</Link>
												</h2>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
