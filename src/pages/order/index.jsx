import React, { Fragment, useState, useEffect } from 'react';
import {
	InputNumber,
	Table,
	Menu,
	Divider,
	Popconfirm,
	List,
	Avatar,
	Space,
	Button,
} from 'antd';
import styles from './index.module.less';
import empty from '../../assets/empty.png';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';

const Order = (props) => {
	const { user, getOrderFn } = props;

	const [cartStatus, setCartStatus] = useState(true);
	const [orderList, setOrderList] = useState([]);
	const [orderDetailList, setOrderDetailList] = useState([]);

	const getOrder = async () => {
		const { data } = await getOrderFn.getOrder({ username: user.username });
		if (data && data.status === 200) {
			// let orderListData = [];
			// data.data.flat(1).map((item) => {
			// 	const data = JSON.parse(item.goods_list);
			// 	data.forEach((item) => {
			// 		item.sum = item.goods_price * item.goods_count;
			// 	});
			// 	orderListData.push(data);
			// });

			// console.log('所有大订单', orderListData.flat(1));
			// setOrderList(orderListData.flat(1));

			const orderListData = data.data.map((item) => {
				const goods = JSON.parse(item.goods_list)[0];
				return {
					...item,
					goods_id: goods.goods_id,
					goods_img: goods.goods_img,
					goods_name: goods.goods_name,
					goods_price: goods.goods_price,
					goods_count: goods.goods_count,
					create_time: goods.create_time,
					sum: goods.goods_price * goods.goods_count,
					goods_list: null, //类似于flat()
				};
			});
			console.log(orderListData);
			setOrderList(orderListData);
		}
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows
			);
		},
	};

	useEffect(() => {
		getOrder();
	}, []);

	const columns = [
		{
			title: '商品图片',
			key: 'goods_img',
			dataIndex: 'goods_img',
			width: 150,
			render: (v) => <img src={v} style={{ width: 80, height: 50 }} />,
		},
		{
			title: '商品名称',
			key: 'goods_name',
			dataIndex: 'goods_name',
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
		},
		{
			title: '合计',

			key: `sum`,
			dataIndex: `sum`,
			render: (v) => `￥：${v}`,
		},
		{
			title: '状态',
			key: `sum`,
			dataIndex: `sum`,
			render: () => `待支付`,
		},
		{
			title: '操作',
			key: 'goods_id',
			dataIndex: 'goods_id',
			align: 'center',
			width: 180,
			render: (goods_id) => (
				<>
					<Button
						type="primary"
						style={{ padding: '4px 8px', marginRight: 20 }}
					>
						支付
					</Button>
					<Popconfirm
						title="是否删除该商品？"
						onConfirm={() => {
							// deleteGoods(goods_id);
						}}
						okText="确定"
						cancelText="取消"
					>
						<Button type="danger" style={{ padding: '4px 8px' }}>
							删除
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<div className={styles.cart_body}>
			<div className={styles.cart_content}>
				{cartStatus ? (
					<Fragment>
						<div className={styles.cart_filter_bar}>
							<Menu
								theme="light"
								mode="horizontal"
								defaultSelectedKeys={['1']}
							>
								<Menu.Item key="1">全部订单</Menu.Item>
								<Menu.Item key="2">待发货</Menu.Item>
								<Menu.Item key="3">待收货</Menu.Item>
								<Menu.Item key="4">待评价</Menu.Item>
							</Menu>
							<span className={styles.switch_cart_number}>
								{cartStatus}
							</span>
						</div>
						<div className={styles.cart_tbody}>
							<div>
								<Table
									rowSelection={{
										...rowSelection,
									}}
									columns={columns}
									dataSource={orderList}
									// pagination={false}
								/>
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
		getOrderFn: bindActionCreators(actionCreators, dispatch),
		// getGoodsMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
