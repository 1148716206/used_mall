import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.less';
import robot from '../../assets/robot.png';
import {
	Button,
	Popconfirm,
	InputNumber,
	Pagination,
	Input,
	message,
	Form,
	Modal,

} from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';
const { TextArea } = Input;

const Detail = (props) => {
	const { user, addCartFn,addMessageFn } = props;
	const pramas = useParams();
	console.log('user',user);
	const [formObject] = Form.useForm();
	const { getGoodsDetailFn, getGoodsMessageFn } = props;
	const [chooseCount, setChooseCount] = useState(1);
	const [questionVisible, setQuestionVisible] = useState(false);
	const [editAnswer, setEditAnswer] = useState('');
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

	const [pagination, setPagination] = useState({
		current: 1,
		total: 1,
		pageSize: 10,
		showSizeChanger: true,
		pageSizeOptions: ['10', '50', '200', '500'],
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

		if (data.status === 200 && data.data) {
			const messageData = data.data.map((message) => ({
				id: message.id,
				username: message.username,
				create_time: moment(message.create_time).format(
					'YYYY-MM-DD HH:mm:ss'
				),
				content: message.content,
			}));
			setGoodsMessaga(messageData);
		}
	};

	const addGoodsToCart = async () => {
		const addData = {
			goods_id: goodsInfo.goods_id,
			goods_img: goodsInfo.goods_img,
			goods_price: goodsInfo.new_price,
			goods_count: chooseCount,
			goods_name: goodsInfo.goods_name,
			username: user.username,
		};
		console.log(addData);
		const { data } = await addCartFn.addCart(addData);
		if (data && data.status === 200) {
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
		}
	};

	const numberChange = (e) => {
		// console.log(changeItem)
		setChooseCount(e);
	};

	useEffect(() => {
		getGoodsDetail();
		getGoodsMessage();
	}, []);

	const questionOk = async () => {
		const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
		console.log('xx',{
			content:editAnswer,
			create_time:time,
			username:user.username,
			goods_id: parseInt(pramas.goods_id)
		});
		
		const {data} = await addMessageFn.addMessage({
			content:editAnswer,
			create_time:time,
			username:user.username,
			goods_id: parseInt(pramas.goods_id)
		});
		console.log('data',data);
		if (data && data.status === 200) {
		
			setTimeout(() => {
				message.success(data.msg);
			}, 500);
			setQuestionVisible(false);
		}

	};

	const questionCancel = () => {
		setQuestionVisible(false);
	};
	const onEditAnswer = e => {
		const val = e.target.value.trimStart();
		setEditAnswer(val);
};


	return (
		<Fragment>
			<div className={styles.detail_body}>
				<div className={styles.img_box}>
					<img src={goodsInfo.goods_img} alt="" />
				</div>

				<div className={styles.content_box}>
					<div className={styles.content_box__item}>
						<span className={styles.info_title}>商品名称：</span>
						<span className={styles.info_item}>
							{goodsInfo.goods_name}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：
						</span>
						<span className={styles.info_item}>
							{goodsInfo.quality}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
						</span>
						<span className={styles.new_price}>
							￥{goodsInfo.new_price}
						</span>
						<span className={styles.old_price}>
							￥{goodsInfo.old_price}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
						</span>
						<span className={styles.info_item}>
							{goodsInfo.goods_number}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							详&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情：
						</span>
						<span className={styles.info_desc}>
							{goodsInfo.goods_desc}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>发布时间：</span>
						<span className={styles.info_item}>
							{goodsInfo.create_time}
						</span>
					</div>

					<div className={styles.content_box__item}>
						<span className={styles.info_title}>
							发&nbsp;&nbsp;布&nbsp;&nbsp;人：
						</span>
						<span className={styles.info_item}>
							{goodsInfo.username}
						</span>
					</div>
					<div className={styles.goods_operate}>
						<InputNumber
							className={styles.input_number}
							min={1}
							max={goodsInfo.goods_number}
							defaultValue={1}
							onChange={numberChange}
						/>
						<Button
							size="large"
							type="primary"
							danger
							className={styles.add_button}
							onClick={addGoodsToCart}
						>
							加入购物车
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.message_body}>
				<div className={styles.message_title}>
					留言：
				</div>
				<Button className={styles.message_button} type="primary" onClick={() => setQuestionVisible(true)}>
					我要留言
				</Button>
				<ul className={styles.modal_box_message}>
					{goodsMessage
						? goodsMessage.map((item) => (
								<li
									className={styles.modal_box_message_user}
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
											// onConfirm={() =>
											// 	deleteAnswer(item.id)
											// }
											okText="确定"
											cancelText="取消"
										>
											{
												user.permission === 2 ?  <Button type="link">删除</Button> : null
											}
											
										</Popconfirm>
									</div>
								</li>
						  ))
						: null}
				</ul>
				<Pagination
					style={{ position: 'absolute', right: 0, bottom: 10 }}
					defaultCurrent={1}
					total={15}
				/>
				{/* <div className={styles.modal_box_answers_content} >
					<TextArea
							style={{ height:200,backgroundColor:'#f7f7f7' }}
							// value={editAnswer}
							// onChange={onEditAnswer}
					/>
				</div> */}
			</div>

			<Modal
				title="留言"
				visible={questionVisible}
				onOk={questionOk}
				onCancel={questionCancel}
				cancelText="取消"
				okText="确定"
			>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}
					className={styles.login_form}
					form={formObject}
					// onFinish={submit}
				>
					<TextArea
						style={{ height: '200px' }}
						value={editAnswer}
						onChange={onEditAnswer}
					/>
				</Form>
			</Modal>
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
		addCartFn: bindActionCreators(actionCreators, dispatch),
		addMessageFn: bindActionCreators(actionCreators, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
