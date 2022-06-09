import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 交易大厅
import Home from './pages/home';
import Personal from './pages/personal';
// 购物车
import Cart from './pages/cart'
import Detail from './pages/detail'
import Pulish from './pages/publish'
import Pulished from './pages/published'
// 注册
import Register from './pages/register';
import  Navigator from './pages/navigator';
import  Order from './pages/order';
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
		return (
			<Router>
        <Navigator/>
				<Routes>
					<Route path="/publish" data={this.state} element={<Pulish/>} />
					<Route path="/published" data={this.state} element={<Pulished/>} />
					<Route path="/" data={this.state} exact element={<Home/>} />
					<Route path="/cart" data={this.state} exact element={<Cart/>} />
					<Route path="/personal" data={this.state} exact element={<Personal/>} />
					<Route path="/login" data={this.state} element={<Login/>} />
					<Route path="/register" data={this.state} element={<Register/>} />
					<Route path="/detail/:goods_id" data={this.state} element={<Detail/>} />
					<Route path="/order" data={this.state} element={<Order/>} />
				</Routes>
			</Router>
		);
	}
}
