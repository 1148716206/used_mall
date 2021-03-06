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
import robot from '../../assets/robot.png';

const { Dragger } = Upload;

const Personal = (props) => {
	const {
		user,
		getUserDataFn,
		setUserGenderFn,
		setNickNameFn,
		setUserEmailFn,
		setUserAddressFn,
		setUserPhoneFn,
		setUserAvatarFn,
		getAvatarFn,
	} = props;

	const [managerInfoModal, setManagerInfoModal] = useState({ avatar: '' });
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
	const [avatar, setAvatar] = useState();
	const [formObject] = Form.useForm();

	const personData = async () => {
		const { data } = await getUserDataFn.getUserData(userInfo.username);

		if (data.status === 200) {
			const userInfo = data.data[0];
			if(userInfo.avatar){
				setAvatar(null)
			}
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
	const getAvatar = async () => {
		const {data} = await getAvatarFn.getAvatar(userInfo.username);

			setAvatar(
				'data:image/png;base64,' +
					btoa(
						new Uint8Array(data).reduce(
							(data, byte) => data + String.fromCharCode(byte),
							''
						)
					)
			);
		
		
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
			message.success('????????????');
			personData();
		} else {
			message.error('????????????');
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

		setModalObject({ visible: false });
		if (updateStatus === 200) {
			message.success('????????????');
			setTimeout(() => {
				personData();
				console.log('????????????');
			}, 1000);
		} else {
			message.error('????????????');
		}
	};

	const checkPicUpload = async (file) => {
		if (!~['image/jpg', 'image/png', 'image/gif', 'image/jpeg'].indexOf(file.type)) {
			message.error('????????????????????????');
			return false;
		}

		if (file.size > 4 * 1024 * 1024) {
			message.error('???????????????????????? 4MB');
			return false;
		}
		let formData = new FormData();
		formData.append('images', file);
		const { data } = await setUserAvatarFn.setUserAvatar(formData);
		if(data.status===200) {
			setTimeout(() => {
				message.success(data.msg);
			})
		}
		getAvatar()
	
	};
	const hasPicUpload = ({ file }) => {
		console.log(file)
		if (file.status === 'error') {
			// message.error('??????????????????');
		}
		if (file.status === 'done') {
			message.success('??????????????????');
			// setManagerInfoModal({
			//   avatar: `${formAction.filepath}${file.response.url}`,
			// });
		}
	};
console.log('avatar',avatar);


	return (
		<div className={styles.user_info_box}>
			<div className={styles.user_info}>
				<div className={styles.head_img}>
					<Dragger
						style={{ borderRadius: '50%' }}
						name="avator"
						// headers={{
						//   'X-Requested-With': null,
						// }}
						beforeUpload={checkPicUpload}
						showUploadList={false}
						// onChange={hasPicUpload}
					>
						<img role="presentation" src={user.avatar || avatar || robot} alt="" />
					</Dragger>
				</div>
				<div className={styles.info_list}>
					<div className={styles.info_list__item}>
						<div className={styles.title}>??????</div>
						<div className={styles.name}>
							{userInfo.nickname || '???????????????????????????????????????'}
						</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.nickname,
										visible: true,
										type: '??????',
										name: 'nickname',
									});
								}}
							>
								??????
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>??????</div>
						<div className={styles.name}>
							{userInfo.gender ? '???' : '???'}
						</div>
						<div className={styles.oprate}>
							<Popconfirm
								title={`????????????????????????${
									userInfo.gender ? '???' : '???'
								}`}
								onConfirm={() => {
									changeGender(userInfo);
								}}
								okText="??????"
								cancelText="??????"
							>
								<Button style={{ borderRadius: 30 }}>
									??????
								</Button>
							</Popconfirm>
						</div>
					</div>
					<Divider />

					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>??????</div>
						<div className={styles.name}>********</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										visible: true,
										type: '??????',
										name: 'password',
										oldValue: '******',
									});
								}}
							>
								??????
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>??????</div>
						<div className={styles.name}>{userInfo.email}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.email,
										visible: true,
										type: '??????',
										name: 'email',
									});
								}}
							>
								{userInfo.email ? '??????' : '??????'}
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>????????????</div>
						<div className={styles.name}>{userInfo.phone}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.phone,
										visible: true,
										type: '????????????',
										name: 'phone',
									});
								}}
							>
								{userInfo.phone ? '??????' : '??????'}
							</Button>
						</div>
					</div>
					<Divider />
					<div
						className={styles.info_list__item}
						style={{ padding: 0 }}
					>
						<div className={styles.title}>????????????</div>
						<div className={styles.name}>{userInfo.address}</div>
						<div className={styles.oprate}>
							<Button
								style={{ borderRadius: 30 }}
								onClick={() => {
									setModalObject({
										oldValue: userInfo.address,
										visible: true,
										type: '????????????',
										name: 'address',
									});
								}}
							>
								{userInfo.address ? '??????' : '??????'}
							</Button>
						</div>
					</div>
					<Divider />
				</div>
				<Modal
					width={400}
					className="modal"
					title={`??????${modalObject.type}`}
					visible={modalObject.visible}
					onCancel={modelOnCancel}
					onOk={() => {
						modelOnOk(modalObject);
					}}
					maskClosable={false}
					centered={true}
					destroyOnClose
					okText="??????"
					cancelText="??????"
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
		getAvatarFn: bindActionCreators(actionCreators, dispatch),
		setUserGenderFn: bindActionCreators(actionCreators, dispatch),
		setNickNameFn: bindActionCreators(actionCreators, dispatch),
		setUserEmailFn: bindActionCreators(actionCreators, dispatch),
		setUserAddressFn: bindActionCreators(actionCreators, dispatch),
		setUserPhoneFn: bindActionCreators(actionCreators, dispatch),
		setUserAvatarFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Personal);
