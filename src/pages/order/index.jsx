import React, { useState, useEffect } from 'react';
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
const Detail = () => {
	const [goodsInfo, setGoodsInfo] = useState({
		nickname: '',
		username: '',
		gender: 0,
		email: '',
		address: '',
	});
	return (
		<div className={styles.detail_body}>
			<div className={styles.img_box}>
				<img src="" alt="" />
			</div>
订单订单订单订单订单订单订单订单订单订单订单订单订单订单订单订单订单订单
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
					<Button size="large" type="primary" danger className={styles.add_button}>
						加入购物车
					</Button>

				</div>
			</div>
		</div>
	);
};
export default Detail;
