import React, { Fragment, useState, useEffect } from 'react';
import { InputNumber, Radio, Divider, List, Avatar, Space, Button } from 'antd';
import styles from './index.module.less';
import empty from '../../assets/empty.png';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';

const Cart = (props) => {
	const { user, getCartInfoFn } = props;
	console.log('user', user);
	const [cartStatus, setCartStatus] = useState(true);
	const [cartList, setCartList] = useState([]);

	const getUser = async () => {
		const { data } = await getCartInfoFn.getCartInfo(user);
		console.log('cart', data);
		if (data.status === 200) {
			const cartData = data.data.map((item) => ({
				id: item.id,
				username: item.username,
				goods_img: item.goods_img,
				goods_price: item.goods_price,
				create_time: moment(item.create_time).format(
					'YYYY-MM-DD HH:mm:ss'
				),
				goods_count: item.goods_count,
			}));

			setCartList(cartData);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	const IconText = (icon, text) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	return (
		<div className={styles.cart_body}>
			<div className={styles.cart_content}>
				{cartStatus ? (
					<Fragment>
						<div className={styles.cart_filter_bar}>
							<span>全部商品</span>
							<span className={styles.switch_cart_number}>
								{cartStatus}
							</span>
						</div>
						<div className={styles.cart_thead}>
							<div
								className={`${styles.column} ${styles.t_checkbox}`}
							>
								<div className={styles.cart_checkbox}>
									<input
										type="checkbox"
										name="select-all"
										className={styles.input_checkbox}
									/>
								</div>
								全选
							</div>
							<div
								className={`${styles.column} ${styles.t_goods}`}
							>
								商品
							</div>
							<div
								className={`${styles.column} ${styles.t_props}`}
							>
								&nbsp;
							</div>
							<div
								className={`${styles.column} ${styles.t_price}`}
							>
								单价
							</div>
							<div
								className={`${styles.column} ${styles.t_quantity}`}
							>
								数量
							</div>
							<div className={`${styles.column} ${styles.t_sum}`}>
								小计
							</div>
							<div
								className={`${styles.column} ${styles.t_action}`}
							>
								操作
							</div>
						</div>
						<div className={styles.cart_tbody}>
							<div className={styles.item_list}>
								{cartList
									? cartList.map((item) => (
											<li className={styles.sing_li}>
												<div className={styles.check}>
													<span>
														<input
															type="checkbox"
															readOnly
														/>
													</span>
												</div>
												<div
													className={styles.goods_img}
												>
													<div
														className={styles.left}
													>
														<img
															src="http://www.cz2000.top/bs/admin/images/ByteDance-cup-1.jpg"
															alt=""
														/>
													</div>
													<div
														className={styles.right}
													>
														<p>{`item.name`}</p>
													</div>
												</div>
												<div
													className={
														styles.single_price
													}
												>
													￥：
													<span>
														{item.goods_price}
													</span>
													元
												</div>
												<div className={styles.number}>
													<InputNumber defaultValue={item.goods_count}/>
												</div>
												<div
													className={styles.subtotal}
												>
													￥：
													<span>
														{item.goods_price *
															item.goods_count}
													</span>
													元
												</div>
												<div className={styles.operate}>
													<Button type="danger">
														删除
													</Button>
												</div>
											</li>
									  ))
									: null}
							</div>
						</div>
					</Fragment>
				) : (
					<div className={styles.cart_empty}>
						<div>
							<img src={empty} alt="暂无商品" />
							<p>购物车空空如也~</p>
							<p>去看看心仪的商品吧~</p>
							<p className={styles.to_shopping}>去购物`{'>'}` </p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCartInfoFn: bindActionCreators(actionCreators, dispatch),
		// getGoodsMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
