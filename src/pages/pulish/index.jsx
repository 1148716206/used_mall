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
const { Dragger } = Upload;


const Pulish = (props) => {
	const { pulishGoodsFn, user } = props;
	const [goodsInfo, setGoodsInfo] = useState({
		nickname: '',
		username: '',
		gender: 0,
		email: '',
		address: '',
	});
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
	const fileList = [
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-2',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-3',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-4',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-xxx',
			percent: 50,
			name: 'image.png',
			status: 'uploading',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
		{
			uid: '-5',
			name: 'image.png',
			status: 'error',
		},
	];

	const pulish = async () => {
		const formData = await formObject.getFieldsValue();
		const data = {
			...formData,
			username: user.username,
		};
		const { status } = await pulishGoodsFn.pulishGoods(data);

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

		// const { data } = await setUserAvatarFn.setUserAvatar(formData);
		// console.log(data);
	};
	const hasPicUpload = ({ file }) => {
		console.log(file)
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


	return (
		<div className={styles.detail_body}>
			<div className={styles.img_box}>
			<Dragger
						style={{ borderRadius: '50%' }}
						name="avator"
						// headers={{
						//   'X-Requested-With': null,
						// }}
						beforeUpload={checkPicUpload}
						showUploadList={false}
						onChange={hasPicUpload}
					>
						<img role="presentation" src={''} alt="" />
					</Dragger>
			</div>
			发布商品发布商品发布商品发布商品发布商品发布商品发布商品发布商品
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
						onClick={pulish}
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
		pulishGoodsFn: bindActionCreators(actionCreators, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pulish);
