import React, { useEffect, useState } from 'react';
import {
	Divider,
	Button,
	Upload,
	Modal,
	Form,
	Input,
	Select,
	Popconfirm,
	message,
} from 'antd';
import decode from 'jwt-decode';
import styles from './index.module.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';

const Personal = (props) => {
	const {
		getUserDataFn,
		user,
		setUserGenderFn,
		setNickNameFn,
		setUserEmailFn,
		setUserAddressFn,
		setUserPhoneFn,
	} = props;

	const [modalObject, setModalObject] = useState({
		id: 0,
		oldValue: '',
		visible: false,
		type: '',
		name: '',
	});
	const [userInfo, setUserInfo] = useState({
		nickname: '',
		username: '',
		gender: 0,
		email: '',
		address: '',
	});
	const [formObject] = Form.useForm();

	const personData = async () => {
		const { data } = await getUserDataFn.getUserData(userInfo.username);
		console.log(data);
		if (data.status === 200) {
			const userInfo = data.data[0];
			setUserInfo({
				id: userInfo.id,
				username: userInfo.username,
				nickname: userInfo.nickname,
				gender: userInfo.gender,
				email: userInfo.email,
				phone: userInfo.phone,
				address: userInfo.address,
			});
		}
	};

	useEffect(() => {
		personData();
	}, []);

	const changeGender = async (userInfo) => {
		if (userInfo.gender == 1) userInfo.gender = 0;
		else userInfo.gender = 1;

		const userData = {
			id: userInfo.id,
			gender: userInfo.gender,
		};

		const { status } = await setUserGenderFn.setUserGender(userData);
		if (status === 200) {
			message.success('更换成功');
			personData();
		} else {
			message.error('更换失败');
		}
	};

	const modelOnCancel = () => {
		setModalObject({ visible: false });
	};
	const modelOnOk = async (modalObject) => {
		const editData = formObject.getFieldsValue();
		const newData = {
			id: userInfo.id,
			...editData,
		};

		let updateStatus = 0;
		if (modalObject.name === 'nickname') {
			const { status } = await setNickNameFn.setNickName(newData);
			updateStatus = status;
		} else if (modalObject.name === 'email') {
			const { status } = await setUserEmailFn.setUserEmail(newData);
			updateStatus = status;
		} else if (modalObject.name === 'address') {
			const { status } = await setUserAddressFn.setUserAddress(newData);
			updateStatus = status;
		} else if (modalObject.name === 'phone') {
			const { status } = await setUserPhoneFn.setUserPhone(newData);
			updateStatus = status;
		}

		console.log('updateStatus', updateStatus);
		setModalObject({ visible: false });
		if (updateStatus === 200) {
			message.success('更换成功');
			setTimeout(() => {
				personData();
				console.log('再次请求');
			}, 1000);
		} else {
			message.error('更换失败');
		}
	};
	return (
		<div className={styles.user_info_box}>
			<div className={styles.user_info}>
				<div className={styles.head_img}>
					<img
						src="//s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png"
						alt=""
					/>
					<Upload className={styles.upload}>
						<Button>上传头像</Button>
					</Upload>
				</div>
				<div className={styles.info_list}>
					<div className={styles.info_list__item}>
						<div className={styles.title}>昵称</div>
						<div className={styles.name}>{userInfo.nickname || '你还没有昵称，赶快填写吧！'}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.nickname,
										visible: true,
										type: '昵称',
										name: 'nickname',
									});
								}}
							>
								修改
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>性别</div>
						<div className={styles.name}>
							{userInfo.gender === 0 ? '男' : '女'}
						</div>
						<div className={styles.oprate}>
							<Popconfirm
								title={`是否更换性别为：${
									userInfo.gender === 0 ? '女' : '男'
								}`}
								onConfirm={() => {
									changeGender(userInfo);
								}}
								okText="确定"
								cancelText="取消"
							>
								<Button style={{ borderRadius: 30 }}>
									更换
								</Button>
							</Popconfirm>
						</div>
					</div>
					<Divider />

					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>密码</div>
						<div className={styles.name}>********</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										visible: true,
										type: '密码',
										name: 'password',
										oldValue: '******',
									});
								}}
							>
								修改
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>邮箱</div>
						<div className={styles.name}>{userInfo.email}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.email,
										visible: true,
										type: '邮箱',
										name: 'email',
									});
								}}
							>
								{userInfo.email ? '修改' : '新增'}
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>电话号码</div>
						<div className={styles.name}>{userInfo.phone}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.phone,
										visible: true,
										type: '电话号码',
										name: 'phone',
									});
								}}
							>
								{userInfo.phone ? '修改' : '新增'}
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>收货地址</div>
						<div className={styles.name}>{userInfo.address}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.address,
										visible: true,
										type: '收货地址',
										name: 'address',
									});
								}}
							>
								{userInfo.address ? '修改' : '新增'}
							</Button>
						</div>
					</div>
					<Divider />
				</div>
				<Modal
					width={400}
					className="modal"
					title={`修改${modalObject.type}`}
					visible={modalObject.visible}
					onCancel={modelOnCancel}
					onOk={() => {
						modelOnOk(modalObject);
					}}
					maskClosable={false}
					centered={true}
					destroyOnClose
					okText="确认"
					cancelText="取消"
				>
					<Form
						className="form"
						name="editForm"
						form={formObject}
						preserve={false}
					>
						<Form.Item name={modalObject.name}>
							<Input
								style={{ width: 200 }}
								defaultValue={modalObject.oldValue}
							/>
						</Form.Item>
					</Form>
				</Modal>
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
		getUserDataFn: bindActionCreators(actionCreators, dispatch),
		setUserGenderFn: bindActionCreators(actionCreators, dispatch),
		setNickNameFn: bindActionCreators(actionCreators, dispatch),
		setUserEmailFn: bindActionCreators(actionCreators, dispatch),
		setUserAddressFn: bindActionCreators(actionCreators, dispatch),
		setUserPhoneFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Personal);
