import React, { Fragment, useState, useEffect } from 'react';
import {
	InputNumber,
	Button,
	Table,
	Modal,
	Select,
	Popconfirm,
	message,
	Form,
	Input,
} from 'antd';
import styles from './index.module.less';
import empty from '../../assets/empty.png';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';
import debounce from '../../utils/debounce';

const Cart = (props) => {
	const {
		user,
		getCartInfoFn,
		deleteCartInfoFn,
		updateCartNumberFn,
		addOrderFn,
	} = props;
	const [numberStatus,setNumberStatus] = useState(false)
	const [payVisible, setPayVisible] = useState(false);
	const [cartList, setCartList] = useState([]);
	const [changeItem, setChangeItem] = useState(0);
	const [allGoods, setAllGoods] = useState(0);
	const [chooseGoodsNumber, setChooseGoodsNumber] = useState(0);
	const [chooseGoodsPrice, setChooseGoodsPrice] = useState(0);
	const [chooseGoodsList, setChooseGoodsList] = useState(null);

	const [formObject] = Form.useForm();
	const { Option } = Select;
	const getUser = async () => {
		const { data } = await getCartInfoFn.getCartInfo(user);
		if (data.status === 200) {
			const cartData = data.data.map((item) => ({
				key: item.id,
				goods_id: item.goods_id,
				username: item.username,
				goods_img: item.goods_img,
				goods_price: item.goods_price,
				goods_name: item.goods_name,
				create_time: moment(item.create_time).format(
					'YYYY-MM-DD HH:mm:ss'
				),
				goods_count: item.goods_count,
			}));
			let goods_total = 0;
			let goods_price = 0;
			cartData.map((item) => {
				goods_price += item.goods_price * item.goods_count;
				return (goods_total += item.goods_count);
			});
			setAllGoods(goods_total);
			setCartList(cartData);
		}
	};

	const numberChange = async (e) => {
		const { data } = await updateCartNumberFn.updateCartNumber({
			goods_id: changeItem,
			goods_count: e,
			username:user.username
		});
		setNumberStatus(!numberStatus)
		if (data && data.status === 200) {
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
		}
		//防抖函数
		//判断数量
	};
	const debounceChange = debounce(numberChange, 500);

	const deleteGoods = async (goods_id) => {
		const { data } = await deleteCartInfoFn.deleteCartInfo({ 
			goods_id,
			username:user.username
		});
		if (data && data.status === 200) {
				message.success(data.msg);
		}
	};

	const PayOk = async () => {
		const userData = formObject.getFieldsValue();
		const { data } = await addOrderFn.addOrder({goods_list:chooseGoodsList,...userData});
		if (data && data.status === 200) {
		
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
			setPayVisible(false);
		}

	};

	const PayCancel = () => {
		setPayVisible(false);
	};

	useEffect(() => {
		getUser();
	}, [numberStatus]);

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
			title: '操作',
			key: 'goods_id',
			dataIndex: 'goods_id',
			render: (goods_id) => (
				<>
					<Popconfirm
						title="是否删除该商品？"
						onConfirm={() => {
							deleteGoods(goods_id);
						}}
						okText="确定"
						cancelText="取消"
					>
						<Button type="danger" style={{ padding: '4px 8px' }}>
							删除
						</Button>
					</Popconfirm>
					,
				</>
			),
		},
	];

	
	const calcPrice = (selectedRows) => {
		let sum = 0;

		for (let item of selectedRows) {
			sum += item.goods_count * item.goods_price;
		}
		setChooseGoodsPrice(sum);
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows
			);
			setChooseGoodsNumber(selectedRows.length);
			setChooseGoodsList(selectedRows)
			calcPrice(selectedRows);
		},
	};


	return (
		<div className={styles.cart_body}>
			<div className={styles.cart_content}>
				{cartList ? (
					<Fragment>
						<div className={styles.cart_filter_bar}>
							<span>全部商品</span>
							<span className={styles.switch_cart_number}>
								{cartList.length}
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
									共 <span>{chooseGoodsNumber}</span> 件商品，合计：
									<span>{chooseGoodsPrice}</span> 元
								</div>
								<Button
									type="primary"
									onClick={() => {
										if(chooseGoodsList.length!==0) {
											setPayVisible(true);
										} else {
											message.error('请选择商品')
										}
									}}
								>
									结算
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
			<Modal
				title="购物结算"
				visible={payVisible}
				onOk={PayOk}
				onCancel={PayCancel}
				cancelText="取消"
				okText="确定"
			>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}
					className={styles.login_form}
					form={formObject}
					// onFinish={submit}
				>
					<Form.Item
						name="username"
						label="收货人"
						initialValue={user.username}
						rules={[
							{
								required: true,
								message: '请输入收货人!',
							},
						]}
					>
						<Input
							placeholder="请输入收货人"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="phone"
						label="收货人电话"
						initialValue={user.phone}
						rules={[{required: true, message: '请输入电话号码'},
						{min: 11, max: 11, message: '请输入正确的电话号码'}
					]}
					>
						<Input
							placeholder="请输入收货人电话"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label="收货地址"
						initialValue={user.address}
						rules={[
							{
								required: true,
								message: '收货地址!',
							},
						]}
					>
						<Input
							placeholder="请输入收货地址"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="payment"
						label="支付方式"
						rules={[
							{
								required: true,
								message: '请选择支付方式',
							},
						]}
					>
						<Select initialValue="" placeholder="请选择支付方式">
							<Option value="Alipay">支付宝</Option>
							<Option value="WeChatPay">微信支付</Option>
							<Option value="CMB">招商银行</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
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
		deleteCartInfoFn: bindActionCreators(actionCreators, dispatch),
		updateCartNumberFn: bindActionCreators(actionCreators, dispatch),
		addOrderFn: bindActionCreators(actionCreators, dispatch),
		// getGoodsMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
