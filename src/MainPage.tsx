import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import Dashboard from "./Dashboard";
import ClientDashboard from "./ClientDashboard";
import Yagna from "./Yagna";
import TokenERC20Dashboard from "./TokenERC20Dashboard";

function MainPage() {
	return (
		<div className="App">
			<div className="top-header">
				<div className="top-header-title">
					Main page
				</div>
				<div className="top-header-navigation">
					<Link to="/">Main page</Link>
				</div>
			</div>

			<div className="main-content">
				<Routes>
					<Route path="/" element={<div>
						<div>
							Config data:
							{JSON.stringify(configData, null, 2)}
							<TokenERC20Dashboard></TokenERC20Dashboard>
						</div>
					</div>}></Route>
				</Routes>
			</div>

		</div>
	);
}

export default MainPage;
