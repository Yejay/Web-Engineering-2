import React from 'react';
import LoginButton from './LoginButton';

const LandingPage = () => {
	return (
		<div id='LandingPage' style={styles.container}>
			<h1 style={styles.heading}>Welcome to my landing page!</h1>
			<p style={styles.paragraph}>This is a simple landing page built with React.js and styled-components.</p>
			<ul style={styles.featuresList}>
				<li style={styles.featureItem}>Feature 1</li>
				<p style={styles.paragraph}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<li style={styles.featureItem}>Feature 2</li>
				<p style={styles.paragraph}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<li style={styles.featureItem}>Feature 3</li>
				<p style={styles.paragraph}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</ul>
			<LoginButton></LoginButton>
		</div>
	);
};

const styles = {
	container: {
		width: '100%',
		margin: '0 auto',
		padding: '1rem',
		textAlign: 'center',
		backgroundColor: 'rgba(28, 28, 28, 0.7)',
		color: '#fff',
		borderRadius: '4px',
	},
	heading: {
		fontSize: '1.5rem',
		marginBottom: '1rem',
		color: '#fff',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	paragraph: {
		fontSize: '1.2rem',
		marginBottom: '1rem',
		lineHeight: '1.5',
		color: '#ccc',
	},
	featuresList: {
		margin: '0',
		padding: '0',
		listStyle: 'none',
	},
	featureItem: {
		fontSize: '1.2rem',
		color: '#fff',
		fontWeight: 'bold',
	},
	LoginButton: {
		display: 'inline-block',
		padding: '0.5rem 1rem',
		fontSize: '1.2rem',
		backgroundColor: '#666',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		transition: 'all 0.2s',
		':hover': {
			backgroundColor: '#999',
		},
	},
};

export default LandingPage;
