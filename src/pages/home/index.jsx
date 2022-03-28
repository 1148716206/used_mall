import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import { Input, Button, Upload, Modal, message,Pagination,Empty   } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as getGoodsInfoActionCreators } from './store';
import axios from '../../utils/request';
// 导航
import logo from '../../assets/home_logo.jpg';
const { Dragger } = Upload;
const Home = (props) => {
	const { goodsInfoFn,searchGoodsFn } = props;

	const [editShow, setEditShow] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [managerInfoModal, setManagerInfoModal] = useState({ avatar: '' });
	const [updateLoading, setUpdateLoading] = useState(false);
	const [goodsList, setGoodsList] = useState([]);
	const [searchInfo, setSearchInfo] = useState('')

	const getGoodsList = async () => {
		const { data } = await goodsInfoFn.getGoodsInfo();
		console.log('data', data);
		setGoodsList(data.data);
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
		const result = axios.post('api/uploadGoodsImg', formData, {
			headers: { 'content-type': 'multipart/form-data' },
		});
		console.log(result);
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

	const onSearchEdit = e => {
		const val = e.target.value.trimStart();
		setSearchInfo(val);
};

const searchGoods = async () => {

	const {data} = await searchGoodsFn.searchGoods({
		goods_name:searchInfo
	});
	if(data.status === 200) {
		setGoodsList(data.data);
	}
}

console.log('goodsList',goodsList);

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
			<div className={styles.search_wrapper}>
				<div className={styles.search}>
					<div className={styles.search_img_box}>
						<a href="http://localhost:3000/">
							<img
								src={logo}
								alt="酷物"
							/>
						</a>
					</div>
					<div className={styles.search_search_box}>
						<div className={styles.block}>
							<input val={searchInfo} onChange={onSearchEdit} />
							<button onClick={searchGoods}>
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
							{goodsList.length !== 0
								? goodsList.map((item, id) => (
										<Link
											target="_blank"
											to={'/detail/' + `${item.goods_id}`}
											key={id}
										>
											<div className={styles.goods}>
												<div>
													<img
														src={item.goods_img}
														alt=""
													/>
												</div>
												<div className={styles.product_info}>
													<p className={styles.product_info__title}>
														{item.goods_name}
													</p>
													<div className={styles.product_info__desc}>
														<p className={styles.quality}>
															{
																item.quality !== 10 ? `${item.quality}成新 ` : '全新 '
															}
												
														</p>
													<p className={styles.product_info__new_price}>
														<span className={styles.price_icon}>
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
											</div>
										</Link>
								  ))
								:
								<div style={{margin:'0 auto'}}>
									 <Empty description="暂无该商品" style={{color:'#ccc'}}/>
								</div> 
								}
						</div>
					</div>
					<div style={{float:"right",marginTop:20}}>
					<Pagination defaultCurrent={1} total={15} />
					</div>
					{/* <Button
						onClick={() => {
							setEditShow(true);
						}}
					>
						上传图片
					</Button> */}
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
									name="avator"
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

const mapStateToProps = (state) => {
	return {
		goodsInfoDate: state.goodsInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		goodsInfoFn: bindActionCreators(getGoodsInfoActionCreators, dispatch),
		searchGoodsFn: bindActionCreators(getGoodsInfoActionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
