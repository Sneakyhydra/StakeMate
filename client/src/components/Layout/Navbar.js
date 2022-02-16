import React from 'react';
import bank from '../../bank.png';

import './Navbar.css';

const Navbar = ({ accNumber }) => {
	return (
		<nav className='navbar navbar-dark fixed-top shadow p-0 customClass'>
			<a href='!#' className='navbar-brand col-sm-3 col-md-2 mr-0 px-3'>
				<img
					src={bank}
					alt='logo'
					width='50'
					height='30'
					className='d-inline-block align-top'
				/>{' '}
				&nbsp; DAPP Yield Farming (Decentralized Banking)
			</a>
			<ul className='navbar-nav px-3 flex-row ml-md-auto d-none d-md-flex'>
				<li className='text-nowrap nav-item'>
					<small>ACCOUNT NUMBER : {accNumber}</small>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
