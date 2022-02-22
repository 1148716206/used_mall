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

import styles from './index.module.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';
const { confirm } = Modal;
const Personal = (props) => {
	const { getUserDataFn, user, setUserGenderFn } = props;

	const [modalObject, setModalObject] = useState({
		visible: false,
		type: '',
	});
	const [userInfo, setUserInfo] = useState({
		username: '',
		gender: 0,
		email: '',
		address: '',
	});
	const [formObject] = Form.useForm();

	const personData = async () => {
		const { data } = await getUserDataFn.getUserData(user.username);
		// const data = {status:1}
		console.log(data);
		if (data.status === 200) {
			const userInfo = data.data[0];

			setUserInfo({
				id: userInfo.id,
				username: userInfo.username,
				gender: userInfo.gender,
				email: userInfo.email,
				address: userInfo.address,
			});
		}
	};

	useEffect(() => {
		personData();
	}, []);

	  //切换教师 状态  对话框
		function showDeleteConfirm(val) {
			confirm({

				title: '温馨提示',
				content: '是否更改教师状态？',
				okText: '确认',
				okType: 'danger',
				cancelText: '取消',
				onOk() {
					editGender(val)
				},
			});
		}
	

	const editGender = async (userInfo) => {
		if (userInfo.gender == 1) userInfo.gender = 0;
		else userInfo.gender = 1;
		const userData = {
			id: userInfo.id,
			gender: userInfo.gender,
		};
		const {status} = await setUserGenderFn.setUserGender(userData);
		if(status === 200) {
			 personData();
			message.success('切换成功')
		} else {
			message.error('切换失败')
		}

	};



	const modelOnCancel = () => {
		setModalObject({ visible: false });
	};
	const modelOnOk = async () => {};
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
						<div className={styles.title}>用户名</div>
						<div className={styles.name}>{userInfo.username}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										visible: true,
										type: '用户名',
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
				
								<Button
									style={{ borderRadius: 30 }}
									onClick={() => {
										showDeleteConfirm(userInfo);
									}}
								>
									切换
								</Button>
					
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
										visible: true,
										type: '邮箱',
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
						<div className={styles.title}>收货地址</div>
						<div className={styles.name}>{userInfo.address}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										visible: true,
										type: '收货地址',
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
					onOk={modelOnOk}
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
						{modalObject.type === '性别' ? (
							'123'
						) : (
							<Input style={{ width: 200 }} />
						)}
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Personal);
