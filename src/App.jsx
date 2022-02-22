import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 交易大厅
import Home from './pages/home';
import Personal from './pages/personal';
// 购物车
import Cart from './pages/cart'
// 注册
import Register from './pages/register';
import  Navigator from './pages/navigator';
// 登录
import Login from './pages/login';

import Auth from './utils/auth'


export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			...this.props.store.getState()
		} 
	}
	render() {
		let AuthCart = Auth(<Cart/>)
		return (
			<Router>
        <Navigator/>
				<Routes>
					<Route path="/" data={this.state} exact element={<Home/>} />
					<Route path="/cart" data={this.state} exact element={<Cart/>} />
					<Route path="/personal" data={this.state} exact element={<Personal/>} />
					<Route path="/login" data={this.state} element={<Login/>} />
					<Route path="/register" data={this.state} element={<Register/>} />
				</Routes>
			</Router>
		);
	}
}
