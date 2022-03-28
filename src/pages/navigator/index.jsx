import React, { useEffect, useState, Fragment } from 'react';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../login/store/actionCreators';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.less';
// import request from '../../utils/http';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, message, Menu, Dropdown, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const Navigator = (props) => {
	
	const { loginData, logout } = props;
	const [editShow, setEditShow] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [logoutVisible, setLogoutVisible] = useState(false);
	const [managerInfoModal, setManagerInfoModal] = useState({ avatar: '' });
	const [updateLoading, setUpdateLoading] = useState(false);

	const [userLogin, setUserLogin] = useState(false);
	const [goodsList, setGoodsList] = useState([]);

	const getGoodsList = async () => {
		// const result = await request.get('api/getGoodsInfo')
		// console.log('result', result.data.data)
		// setGoodsList(result.data.data)
	};
	const getUserInfo = () => {
		const token = localStorage.getItem('@#@TOKEN');
		if (token) setUserLogin(true);
	};

	useEffect(() => {
		getUserInfo();
		getGoodsList();
	}, [loginData.isAuth]);
	let navigate = useNavigate();

	const checkPicUpload = (file) => {
		if (
			!~['image/jpg', 'image/png', 'image/gif', 'image/jpeg'].indexOf(
				file.type
			)
		) {
			message.error('上传图片格式错误');
			return false;
		}

		if (file.size > 4 * 1024 * 1024) {
			message.error('上传图片大小超过 4MB');
			return false;
		}
		console.log('file', file);
		let formData = new FormData();
		formData.append('images', file);
		// const result =  request.post('api/uploadGoodsImg', formData,{ headers: { 'content-type': 'multipart/form-data' } },)
		// console.log(result)
		/*    return new Promise(
      (resolve, reject) => dispatch({
        type: 'GET_UPLOAD_ACTIVITY',
        resolve,
        reject,
        id: activityId,
      })).then(() => {})
      .catch(e => message.error(e));*/
	};

	// @ts-ignore
	const hasPicUpload = ({ file }) => {
		if (file.status === 'error') {
			message.error('图片上传失败');
		}
		if (file.status === 'done') {
			message.success('图片上传成功');
			// setManagerInfoModal({
			//   avatar: `${formAction.filepath}${file.response.url}`,
			// });
		}
	};

	const nicknameChange = (e) => {
		// setManagerInfoModal({
		//   ...managerInfoModal,
		//   nickname: e.target.value,
		// });
	};

	const toggleManagerInfoModal = (val) => {
		if (val) {
			setManagerInfoModal({
				...managerInfoModal,
			});
		} else {
			setManagerInfoModal({
				...managerInfoModal,
				avatar: '',
			});
		}

		setEditShow(false);
	};

	const logoutOk = () => {
		logout()
    setLogoutVisible(false);
  };

  const logoutCancel = () => {
    setLogoutVisible(false);
  };

	const menu = (
		<Menu>
			<Menu.Item key="personal">
				<Link to="personal">个人中心</Link>
			</Menu.Item>
			<Menu.Item key="order">
				<Link to="order">订单详情</Link>
			</Menu.Item>
			<Menu.Item key="logout" onClick={()=>{setLogoutVisible(true)}}>
				退出
				</Menu.Item>
		</Menu>
	);

	return (
		<div className={styles.header}>
			<div className={styles.header_top}>
				<div className={styles.header_top__content}>
					<div className={styles.nav}>
						<Link to="/">交易大厅</Link>
						<Link to="/cart">购物车</Link>
						<Link to="/pulish">发布商品</Link>
					</div>
					<div className={styles.desc}>
						{loginData.isAuth ? (
							<Dropdown overlay={menu} placement="bottomRight">
								<span className={styles.desc__user}>
									{loginData.user.nickname || loginData.user.username}
									<span className={styles.desc__arrow}>
										<DownOutlined />
									</span>
								</span>
							</Dropdown>
						) : (
							<Fragment>
								<span>
									您好，
									<Link to="/login">请登录!</Link>
								</span>
								<span className={styles.desc__register}>
									<Link
										to="/register"
										style={{ color: 'red' }}
									>
										免费注册!
									</Link>
								</span>
							</Fragment>
						)}

						<span>咨询热线：17602382858（9:00-18：00）</span>
					</div>
				</div>
			</div>

			<Modal
				title="提示"
				visible={logoutVisible}
				onOk={logoutOk}
				onCancel={logoutCancel}
				cancelText="取消"
				okText="确定"
			>
				<p>确定退出吗？</p>

			</Modal>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		loginData: state.login,
	};
};

export default connect(mapStateToProps, { logout })(Navigator);
