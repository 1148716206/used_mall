import React, { Fragment, useState, useEffect } from 'react';
import {
	InputNumber,
	Radio,
	Divider,
	List,
	Avatar,
	Space,
	Button,
	Table,
	Tag,
} from 'antd';
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
	const [changeItem, setChangeItem] = useState(0);
	const [goodsTotal, setGoodsTotal] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const getUser = async () => {
		const { data } = await getCartInfoFn.getCartInfo(user);
		console.log('cart', data);
		if (data.status === 200) {
			const cartData = data.data.map((item) => ({
				key: item.id,
				id: item.id,
				username: item.username,
				goods_img: item.goods_img,
				goods_price: item.goods_price,

				create_time: moment(item.create_time).format(
					'YYYY-MM-DD HH:mm:ss'
				),
				goods_count: item.goods_count,
			}));
			let goods_total = 0;
			let goods_price = 0
			cartData.map((item) => {
				goods_price += item.goods_price*item.goods_count
				return goods_total += item.goods_count;
			});
			setGoodsTotal(goods_total);
			setTotalPrice(goods_price);
			setCartList(cartData);
		}
	};

	const getChangerId = (val) => {
		// console.log('id',val)
		setChangeItem(val);
	};
	const numberChange = (e) => {
		// console.log(changeItem)
		console.log(changeItem);
	};

	useEffect(() => {
		getUser();
	}, []);

	const columns = [
		{
			title: '商品名称',
			key: 'goods_name',
			dataIndex: 'goods_name',
			render: (text) => <a>{text}</a>,
		},

		{
			title: '单价',
			key: 'goods_price',
			dataIndex: 'goods_price',
			render: (v) => `￥：${v}`,
		},
		{
			title: '数量',
			key: 'goods_count',
			dataIndex: 'goods_count',
			render: (v, row) => (
				<div
					onClick={() => {
						getChangerId(row.id);
					}}
				>
					<InputNumber
						min={1}
						defaultValue={v}
						onChange={numberChange}
					/>
				</div>
			),
		},
		{
			title: '操作',
			key: 'operate',
			dataIndex: 'operate',
			render: (row) => (
				<>
					<Button type="danger" style={{ padding: '4px 8px' }}>
						刪除
					</Button>
				</>
			),
		},
	];

	const rowSelection = {};

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
						<div>
							<Table
								rowSelection={{
									...rowSelection,
								}}
								columns={columns}
								dataSource={cartList}
								// pagination={false}
							/>
						</div>
						<div className={styles.user_shop_total}>
							<div className={styles.right}>
								<div className={styles.right__total}>
									共 <span>{goodsTotal}</span> 件商品，合计：
									<span>{totalPrice}</span> 元
								</div>
								<Button type="primary" onClick={() => {}}>
									去结算
								</Button>
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
