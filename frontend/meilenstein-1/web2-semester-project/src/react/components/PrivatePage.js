import React from 'react';

const PrivatePage = () => {
	return (
		<div id='StartPage' style={styles.container}>
			<h1 style={styles.heading}>Welcome to my private page!</h1>
			<p style={styles.paragraph}>This is a simple landing page built with React.js and styled-components.</p>
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

export default PrivatePage;
