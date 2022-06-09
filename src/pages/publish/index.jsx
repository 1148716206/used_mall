import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';
import styles from './index.module.less';
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
	InputNumber,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import store from '../../store';
import decode from 'jwt-decode';
import { syncInfoAc } from '../login/store/actionCreators';
import moment from 'moment';

const { Dragger } = Upload;

const Pulish = (props) => {
	const isLogin = () => {
		const token = localStorage.getItem('@#@TOKEN');
		if (!token) {
			message.error('没有权限，请登录');
			setTimeout(() => {
				window.location.href = '/login';
			}, 1000);
		}
	};

	const { publishGoodsFn, publishGoodsImgFn, user } = props;
	const [goodsInfo, setGoodsInfo] = useState({
		nickname: '',
		username: '',
		gender: 0,
		email: '',
		address: '',
	});
	const [uploadGoodsInfo, setUploadGoodsInfo] = useState({ goods_id: 0 });
	const [uploadGoodsImg, setUploadGoodsImg] = useState(null);
	const [formObject] = Form.useForm();

	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 },
	};
	const uploadButton = () => {
		return (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
	};

	const publish = async () => {
		const formData = await formObject.getFieldsValue();
		const publishData = {
			...formData,
			goods_id:uploadGoodsInfo.goods_id,
			username: user.username,
			create_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
		};

		const { data } = await publishGoodsFn.publishGoods(publishData);
		console.log('data',data);
		if(data.status === 200) {
			setTimeout(() => {
				message.success('发布成功，待审核！');
			}, 500);
			setTimeout(() => {
				window.location.href = '/'
			}, 1500);
		}
	};

	const checkPicUpload = async (file) => {
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

		const data = await publishGoodsImgFn.publishGoodsImg(formData);
		console.log('data', data);

		if (data.status === 200) {
			setUploadGoodsImg(
				'data:image/png;base64,' +
					btoa(
						new Uint8Array(data.data).reduce(
							(data, byte) => data + String.fromCharCode(byte),
							''
						)
					)
			);
			setUploadGoodsInfo({goods_id:parseInt(data.headers.goods_id)})
			setTimeout(() => {
				message.success('上传成功');
			}, 500);
		}
	};
	useEffect(() => {
		isLogin();
	}, []);

	return (
		<div className={styles.detail_body}>
			<div className={styles.img_box}>
				<Dragger
					name="avator"
					// headers={{
					//   'X-Requested-With': null,
					// }}
					beforeUpload={checkPicUpload}
					showUploadList={false}
				>
					{uploadGoodsImg ? (
						<img
							role="presentation"
							src={uploadGoodsImg}
							style={{ width: '381px', height: '381px' }}
							alt=""
						/>
					) : (
						<PlusOutlined />
					)}
				</Dragger>
			</div>
			<div className={styles.content_box}>
				<Form
					{...formItemLayout}
					className={styles.login_form}
					form={formObject}
					size={'middle'}
					labelAlign={'right'}
				>
					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="goods_name"
								label="商品名称"
								rules={[
									{
										required: true,
										message: '请输入商品名称!',
									},
								]}
							>
								<Input
									placeholder="请输入商品名称"
									className={styles.login_form_input}
								/>
							</Form.Item>
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="quality"
								label="成色"
								rules={[
									{
										required: true,
										message: '请输入商品成色!',
									},
								]}
							>
								<InputNumber
									style={{ width: 233 }}
									min={1}
									max={10}
								/>
							</Form.Item>
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="old_price"
								label="旧价格"
								rules={[
									{
										required: true,
										message: '请输入旧价格!',
									},
								]}
							>
								<Input
									placeholder="请输入旧价格"
									className={styles.login_form_input}
								/>
							</Form.Item>
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="new_price"
								label="新价格"
								rules={[
									{
										required: true,
										message: '请输入新价格!',
									},
								]}
							>
								<Input
									placeholder="请输入新价格"
									className={styles.login_form_input}
								/>
							</Form.Item>
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="goods_number"
								label="数量"
								rules={[
									{
										required: true,
										message: '请输入数量!',
									},
								]}
							>
								<Input
									placeholder="请输入数量"
									className={styles.login_form_input}
								/>
							</Form.Item>
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							<Form.Item
								name="goods_desc"
								label="商品说明"
								rules={[
									{
										required: true,
										message: '请输入说明!',
									},
								]}
							>
								<Input.TextArea showCount maxLength={100} />
							</Form.Item>
						</span>
					</div>
				</Form>
				<div className={styles.goods_operate}>
					<Button
						size="large"
						type="primary"
						danger
						className={styles.add_button}
						onClick={publish}
					>
						发布商品
					</Button>
				</div>
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
		publishGoodsFn: bindActionCreators(actionCreators, dispatch),
		publishGoodsImgFn: bindActionCreators(actionCreators, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pulish);
