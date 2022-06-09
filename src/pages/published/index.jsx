import React, { Fragment, useState, useEffect } from 'react';
import {
	InputNumber,
	Button,
	Table,
	Popconfirm,
	message,
} from 'antd';
import styles from './index.module.less';
import empty from '../../assets/empty.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';
import debounce from '../../utils/debounce';

const Pulished = (props) => {
	const {
		user,
		getPublishedGoodsFn,
		deletePublishedGoodsFn,
		updatePublishedGoodsFn,
	} = props;
	const [cartList, setPublishedGoodsList] = useState([]);
	const [changeItem, setChangeItem] = useState(0);
	const [chooseGoodsNumber, setChooseGoodsNumber] = useState(0);

	const publishedGoods = async () => {
		const { data } = await getPublishedGoodsFn.getPublishedGoods(user);
		console.log(data);
		if (data.status === 200) {
			const cartData = data.data.map((item) => ({
				key: item.goods_id,
				goods_id: item.goods_id,
				username: item.username,
				goods_img: item.goods_img,
				new_price: item.new_price,
				goods_number: item.goods_number,
				goods_name: item.goods_name,
				status:item.status
			}));
			setPublishedGoodsList(cartData);
		}
	};


	const numberChange = async (e) => {

		const { data } = await updatePublishedGoodsFn.updatePublishedGoods({
			goods_id: changeItem,
			goods_number: e,
		});
		if (data && data.status === 200) {
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
		}
	};
		//防抖函数
	const debounceChange = debounce(numberChange, 500);

	const deleteGoods = async (goods_id) => {
		const { data } = await deletePublishedGoodsFn.deletePublishedGoods({
			goods_id,
		});
		if (data && data.status === 200) {
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
			publishedGoods()
		}
	};

	useEffect(() => {
		publishedGoods();
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
			key: 'new_price',
			dataIndex: 'new_price',
			render: (v) => `￥：${v}`,
		},
		{
			title: '数量',
			key: 'goods_number',
			dataIndex: 'goods_number',

			render: (v, row) => (
				<div
					onClick={() => {
						setChangeItem(row.goods_id);
					}}
				>
					<InputNumber
						min={1}
						defaultValue={v}
						onChange={debounceChange}
					/>
				</div>
			),
		},
			{
			title: '状态',
			key: 'status',
			dataIndex: 'status',
			render: v => (v ? '已上架' : '待审核'),
		},
		{
			title: '操作',
			key: 'goods_id',
			dataIndex: 'goods_id',
			align:'center',
			render: (goods_id) => (
				<>
					<Popconfirm
						title="是否下架该商品？"
						onConfirm={() => {
							deleteGoods(goods_id);
						}}
						okText="确定"
						cancelText="取消"
					>
						<Button type="danger" style={{ padding: '4px 8px' }}>
							下架
						</Button>
					</Popconfirm>
					,
				</>
			),
		},
	];

	return (
		<div className={styles.cart_body}>
			<div className={styles.cart_content}>
				{cartList ? (
					<Fragment>
						<div className={styles.cart_filter_bar}>
							<span>已发布商品</span>
							<span className={styles.switch_cart_number}>
								{cartList.length}
							</span>
						</div>
						<div>
							<Table
								columns={columns}
								dataSource={cartList}
								// pagination={false}
							/>
						</div>
					</Fragment>
				) : (
					<div className={styles.cart_empty}>
						<div>
							<img src={empty} alt="未发布商品" />
							<p>您还未发布商品~</p>
							<p>去看看心仪的商品吧~</p>
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
		getPublishedGoodsFn: bindActionCreators(actionCreators, dispatch),
		deletePublishedGoodsFn: bindActionCreators(actionCreators, dispatch),
		updatePublishedGoodsFn: bindActionCreators(actionCreators, dispatch),
		addOrderFn: bindActionCreators(actionCreators, dispatch),
		// getGoodsMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Pulished);
