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
import { indexOf } from 'lodash';

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
	};
	const debounceChange = debounce(numberChange, 500);

	const PayOk = async () => {
		const userData = formObject.getFieldsValue();
		let newData={}
		if(userData.payment == 'offline') {
			newData = {
				...userData,
				status:1
			}
		} else {
			newData = {
				...userData,
				status:0
			}
		}

		const { data } = await addOrderFn.addOrder({goods_list:chooseGoodsList,...newData});
		if (data && data.status === 200) {
			setTimeout(() => {
				if(userData.payment == 'offline'){
					message.success('??????????????????????????????')
				}else {
					message.success('????????????????????????????????????');
				}
			}, 500);
			getUser();
			setPayVisible(false);
		}

	};

	const PayCancel = () => {
		setPayVisible(false);
	};

	useEffect(() => {
		getUser();
	}, [numberStatus]);
	const deleteGoods = async (goods_id) => {
		const {data}  = await deleteCartInfoFn.deleteCartInfo({ 
			goods_id,
			username:user.username
		});
		console.log(data);
		if (data && data.status === 200) {
				message.success(data.msg);
		}
		setTimeout(() => {
			getUser()
		},500)

	};

	const columns = [
		{
			title: '????????????',
			key: 'goods_img',
			dataIndex: 'goods_img',
			width: 150,
			render: (v) => <img src={v} style={{ width: 80, height: 50 }} />,
		},
		{
			title: '????????????',
			key: 'goods_name',
			dataIndex: 'goods_name',
		},

		{
			title: '??????',
			key: 'goods_price',
			dataIndex: 'goods_price',
			render: (v) => `??????${v}`,
		},
		{
			title: '??????',
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
			title: '??????',
			key: 'goods_id',
			dataIndex: 'goods_id',
			render: (goods_id) => (
				<>
					<Popconfirm
						title="????????????????????????"
						onConfirm={() => {
							deleteGoods(goods_id);
						}}
						okText="??????"
						cancelText="??????"
					>
						<Button type="danger" style={{ padding: '4px 8px' }}>
							??????
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
							<span>????????????</span>
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
									??? <span>{chooseGoodsNumber}</span> ?????????????????????
									<span>{chooseGoodsPrice}</span> ???
								</div>
								<Button
									type="primary"
									onClick={() => {
		
										if(chooseGoodsList !== null && chooseGoodsList.length !== 0) {
											setPayVisible(true);
										} else {
											message.error('???????????????')
										}
									}}
								>
									??????
								</Button>
							</div>
						</div>
					</Fragment>
				) : (
					<div className={styles.cart_empty}>
						<div>
							<img src={empty} alt="????????????" />
							<p>?????????????????????~</p>
							<p>???????????????????????????~</p>
							<p className={styles.to_shopping}>?????????`{'>'}` </p>
						</div>
					</div>
				)}
			</div>
			<Modal
				title="????????????"
				visible={payVisible}
				onOk={PayOk}
				onCancel={PayCancel}
				cancelText="??????"
				okText="??????"
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
						label="?????????"
						initialValue={user.username}
						rules={[
							{
								required: true,
								message: '??????????????????!',
							},
						]}
					>
						<Input
							placeholder="??????????????????"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="phone"
						label="???????????????"
						initialValue={user.phone}
						rules={[{required: true, message: '?????????????????????'},
						{min: 11, max: 11, message: '??????????????????????????????'}
					]}
					>
						<Input
							placeholder="????????????????????????"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label="????????????"
						initialValue={user.address}
						rules={[
							{
								required: true,
								message: '????????????!',
							},
						]}
					>
						<Input
							placeholder="?????????????????????"
							className={styles.login_form_input}
						/>
					</Form.Item>
					<Form.Item
						name="payment"
						label="????????????"
						rules={[
							{
								required: true,
								message: '?????????????????????',
							},
						]}
					>
						<Select initialValue="" placeholder="?????????????????????">
							<Option value="online">????????????</Option>
							<Option value="offline">????????????</Option>
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
