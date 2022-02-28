import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.less';
import robot from '../../assets/robot.png'
import {
	Button,
	Popconfirm,
	InputNumber,
} from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';



const Detail = (props) => {
	const pramas = useParams();

	const { getGoodsDetailFn, getGoodsMessageFn } = props;

	const [goodsInfo, setGoodsInfo] = useState({
		goods_id: '',
		goods_img: '',
		goods_name: '',
		quality: 0,
		new_price: 0,
		old_price: 0,
		goods_number: 0,
		goods_desc: '',
		create_time: '',
		username: '',
	});
	const [goodsMessage, setGoodsMessaga] = useState([]);

	const [messageList, setMessageList] = useState([
		{
			nickname: '学不完的前端',
			activityId: '10519233',
			content: '阿萨德',
			createdAt: '2021-10-22T01:13:35.000Z',
			id: 1319,
			questionId: 24334,
			type: 'answer',
			updatedAt: '2021-10-22T01:13:35.000Z',
		},
	]);

	const getGoodsDetail = async () => {
		const { data } = await getGoodsDetailFn.getGoodsDetail(pramas);
		if (data.status === 200 && data.data) {
			const goodsDetail = data.data[0];
			setGoodsInfo({
				goods_id: goodsDetail.goods_id,
				goods_img: goodsDetail.goods_img,
				goods_name: goodsDetail.goods_name,
				quality: goodsDetail.quality,
				new_price: goodsDetail.new_price,
				old_price: goodsDetail.old_price,
				goods_number: goodsDetail.goods_number,
				goods_desc: goodsDetail.goods_desc,
				create_time: moment(goodsDetail.create_time).format(
					'YYYY-MM-DD HH:mm:ss'
				),
				username: goodsDetail.username,
			});
		}
	};
	const getGoodsMessage = async () => {
		const { data } = await getGoodsMessageFn.getGoodsMessage(pramas);
		console.log('message',data.data)
		if (data.status === 200 && data.data) {
		
			const messageData = data.data.map((message) => ({
				id: message.id,
				username: message.username,
				create_time: moment(message.create_time).format('YYYY-MM-DD HH:mm:ss'),
				content: message.content,
			}));
			setGoodsMessaga(messageData);
		}
	};
	console.log('goods',goodsMessage)

	const handleInfiniteOnLoad = () => {
		// if (pages.page * pages.pageSize >= pages.total && updateLoading) {
		// 		return;
		// }
		// setUpdateLoading(true);
		// getAnswerList(searchQuestionId, pages.page + 1);
	};

	const deleteAnswer = (id) => {
		// new Promise((resolve, reject) =>
		// 		dispatch({
		// 				type: 'DELETE_ANSWER',
		// 				resolve,
		// 				reject,
		// 				answerId: id,
		// 				id: activityId,
		// 		}))
		// 		.then(() => {
		// 				getQuestionList(1, 99);
		// 				getAnswerList(currentQuesIndex);
		// 				message.success('删除成功');
		// 		});
	};
	useEffect(() => {
		getGoodsDetail();
		getGoodsMessage();
	}, []);

	return (
		<Fragment>
			<div className={styles.detail_body}>
				<div className={styles.img_box}>
					<img src={goodsInfo.goods_img} alt="" />
				</div>

				<div className={styles.content_box}>
					<div className={styles.content_box__item}>
						<span className={styles.info_title}>商品名称：</span>
						{goodsInfo.goods_name}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：
						</span>
						{goodsInfo.quality}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
						</span>
						{goodsInfo.new_price}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
						</span>
						{goodsInfo.goods_number}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							详&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情：
						</span>
						{goodsInfo.goods_desc}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>发布时间：</span>
						{goodsInfo.create_time}
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							发&nbsp;&nbsp;布&nbsp;&nbsp;人：
						</span>
						{goodsInfo.username}
					</div>
					<div className={styles.goods_operate}>
						<InputNumber
							className={styles.input_number}
							min={1}
							max={goodsInfo.goods_number}
							defaultValue={1}
						/>
						<Button
							size="large"
							type="primary"
							danger
							className={styles.add_button}
						>
							加入购物车
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.message_body}>
				<div className={styles.message_title}>留言：</div>
				<ul className={styles.modal_box_message}>
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={handleInfiniteOnLoad}
						// hasMore={pages.page * pages.pageSize < pages.total && !updateLoading}
						useWindow={false}
						className={styles.multi_modal_box_list}
					>
						{goodsMessage
							? goodsMessage.map((item) => (
									<li
										className={
											styles.modal_box_message_user
										}
										key={item.id}
									>
										<img
											src={robot}
											role="presentation"
											alt="头像"
										/>
										<sapn>{item.username}</sapn>
										{item.type === 'officialAnswer' ? (
											<span className={styles.official}>
												官方
											</span>
										) : null}
										<span>：</span>
										<div className={styles.content}>
											<p>{item.content}</p>
										</div>
										<div className={styles.time}>
											{/* <span>{moment(item.createdAt).format('MM-DD HH:mm')}</span> */}
											<span>2022-02-15 15:51</span>
											<Popconfirm
												title="确定要删除该留言吗？"
												onConfirm={() =>
													deleteAnswer(item.id)
												}
												okText="确定"
												cancelText="取消"
											>
												<Button type="link">
													删除
												</Button>
											</Popconfirm>
										</div>
									</li>
							  ))
							: null}
					</InfiniteScroll>
				</ul>
			</div>
		</Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.login.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGoodsDetailFn: bindActionCreators(actionCreators, dispatch),
		getGoodsMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
