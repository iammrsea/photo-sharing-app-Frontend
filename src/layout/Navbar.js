import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
	return (
		<div className="navbar-fixed">
			<nav className="nav-wrapper pink">
				<div className="container">
					<ul>
						<li className="right">
							<NavLink to="/profile">Profile</NavLink>
						</li>
						<li className="right">
							<NavLink to="/">Timeline</NavLink>
						</li>
						<li className="right">
							<NavLink to="/signin">Sign In</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
