import React, { useState, useEffect, Fragment } from 'react';
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
import InfiniteScroll from 'react-infinite-scroller';
const Detail = () => {
	const [goodsInfo, setGoodsInfo] = useState({
		nickname: '',
		username: '',
		gender: 0,
		email: '',
		address: '',
	});

	const [messageList, setMessageList] = useState([
		{
			nickname:'学不完的前端',
			activityId: '10519233',
			content: '阿萨德',
			createdAt: '2021-10-22T01:13:35.000Z',
			id: 1319,
			questionId: 24334,
			type: 'answer',
			updatedAt: '2021-10-22T01:13:35.000Z'
		},
	]);

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

	return (
		<Fragment>
			<div className={styles.detail_body}>
				<div className={styles.img_box}>
					<img src="" alt="" />
				</div>

				<div className={styles.content_box}>
					<div className={styles.content_box__item}>
						<span className={styles.info_title}>商品名称：</span>
						goods_name
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：
						</span>
						goods_quality
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
						</span>
						goods_price
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
						</span>
						goods_number
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							详&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情：
						</span>
						京东平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
						注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>发布时间：</span>
						goods_pulish_time
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							发&nbsp;&nbsp;布&nbsp;&nbsp;人：
						</span>
						goods_publisher
					</div>
					<div className={styles.goods_operate}>
						<InputNumber
							className={styles.input_number}
							min={1}
							max={10}
							defaultValue={3}
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
						{messageList
							? messageList?.map((item) => (
									<li
										className={
											styles.modal_box_message_user
										}
										key={item.id}
									>
										<img
											src="{item.user.avatar ? item.user.avatar : item.type === 'officialAnswer' ? path : robot}"
											role="presentation"
											alt="头像"
										/>
										<sapn>{item.nickname}</sapn>
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
export default Detail;
