import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import { Input, Button, Upload, Carousel, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators as getGoodsInfoActionCreators } from './store';

// 导航
import Navigator from '../navigator';

const { Dragger } = Upload;
const Home = props => {

	const [editShow, setEditShow] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [managerInfoModal, setManagerInfoModal] = useState({ avatar: '' });
	const [updateLoading, setUpdateLoading] = useState(false);

	const [goodsList, setGoodsList] = useState([]);
	const {goodsInfoFn} = props

	const getGoodsList = async () => {

		const {data} = await goodsInfoFn.getGoodsInfo()
		setGoodsList(data.data)
	};

	useEffect(() => {
		getGoodsList();
	}, []);

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

	return (
		<Fragment>
      <div  className={styles.search_wrapper} >
      <div className={styles.search}>
				<div className={styles.search_img_box}>
					<a href="//bj.meituan.com">
						<img
							src="//s0.meituan.net/bs/fe-web-meituan/87a1b8e/img/logo.png"
							alt="美团"
						/>
					</a>
				</div>
				<div className={styles.search_search_box}>
					<div className={styles.block}>
						<input />
						<button>
							<SearchOutlined />
						</button>
					</div>
				</div>
			</div>
		
      </div>
				<div className={styles.wrapper}>
				<div className={styles.main}>
					<div className={styles.recommend}>
						<div className={styles.recommend__title}>
							<span className={styles.recommend__title__name}>
								猜你喜欢
							</span>
							<span className={styles.recommend__title__desc}>
								为你甄选最合适的
							</span>
						</div>
						<div className={styles.recommend__list}>
							{goodsList
								? goodsList.map((item,id) => (
										<Link
											to={{
												pathname: '/detail',
												query: { key: '123' },
											}}
											key={id}
										>
											<div className={styles.goods}>
												<div>
													<img
														src={item.goods_img}
														alt=""
													/>
												</div>
												<div
													className={
														styles.product_info
													}
												>
													<p
														className={
															styles.product_info__title
														}
													>
														自由港湾，智能自主入住湖景房
													</p>
													<p
														className={
															styles.product_info__new_price
														}
													>
														<span
															className={
																styles.price_icon
															}
														>
															￥
														</span>
														{item.new_price}
														<span
															className={
																styles.product_info__old_price
															}
														>
															<span
																className={
																	styles.price_icon
																}
															>
																￥
															</span>
															{item.old_price}
														</span>
													</p>
												</div>
											</div>
										</Link>
								  ))
								: null}
						</div>
					</div>
					<Button
						onClick={() => {
							setEditShow(true);
						}}
					>
						上传图片
					</Button>
				</div>
				<Modal
					visible={editShow}
					onCancel={() => setEditShow(false)}
					title="添加商品信息"
					width={450}
					footer={null}
				>
					<div className={styles.edit_box}>
						<div className={styles.edit_box_line}>
							<span className={styles.tt}>图片:</span>
							<span className={styles.ct}>
								<Dragger
									name="file"
									// headers={{
									//   'X-Requested-With': null,
									// }}
									beforeUpload={checkPicUpload}
									showUploadList={false}
									onChange={hasPicUpload}
								>
									{managerInfoModal.avatar ? (
										<img
											style={{
												width: 68,
												height: 68,
												position: 'relative',
												top: 3,
												borderRadius: 3,
											}}
											role="presentation"
											src={managerInfoModal.avatar}
										/>
									) : (
										<PlusOutlined />
									)}
								</Dragger>
								<p className={styles.tip}>
									建议上传的尺寸为 68*68 px
									<br />
									支持 jpg/png/gif, 3MB以内
								</p>
							</span>
						</div>
						<div className={styles.line}>
							<span
								className={styles.tt}
								style={{ verticalAlign: 'middle' }}
							>
								描述:
							</span>
							<span className={styles.ct}>
								<Input
									style={{ width: 200, marginRight: 10 }}
									// value={managerInfoModal.nickname}
									// onChange={nicknameChange}
								/>
								<span>2-10 个字符以内</span>
							</span>
						</div>
						<div style={{ textAlign: 'right' }}>
							<Button
								style={{ marginRight: 10 }}
								onClick={() => toggleManagerInfoModal(true)}
							>
								取消
							</Button>
							<Button
								type="primary"
								onClick={() => toggleManagerInfoModal(true)}
							>
								确定
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => {

	return {
		goodsInfoDate: state.goodsInfo
		
	}
}

const mapDispatchToProps = dispatch => {
	return {
		goodsInfoFn: bindActionCreators(getGoodsInfoActionCreators, dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
