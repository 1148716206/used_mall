import React, { Fragment, useState, useEffect } from 'react';
import { Table, Radio, Divider, List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import empty from '../../assets/empty.png';

import axios from '../../utils/request';

const Cart = () => {
	const [goodsTotal, setGoodsTotal] = useState(1);
	const listData = [];
	for (let i = 0; i < 23; i++) {
		listData.push({
			href: 'https://ant.design',
			title: `ant design part ${i}`,
			avatar: 'https://joeschmoe.io/api/v1/random',
			description:
				'Ant Design, a design language for background applications, is refined by Ant UED Team.',
			content:
				'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
		});
	}
	const getUser = async () => {
		const { data } = await axios.post('/api/cart');
	};
	useEffect(() => {
		getUser();
	});

	const IconText = (icon, text) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	return (
		<div className={styles.cart_body}>
			<div className={styles.cart_content}>
				{goodsTotal ? (
					<Fragment>
						<div className={styles.cart_filter_bar}>
							<span>全部商品</span>
							<span className={styles.switch_cart_number}>
								{goodsTotal}
							</span>
						</div>
						<div className={styles.cart_thead}>
							<div
								className={`${styles.column} ${styles.t_checkbox}`}
							>
								<div className={styles.cart_checkbox}>
									<input
										type="checkbox"
										name="select-all"
										className={styles.input_checkbox}
									/>
								</div>
								全选
							</div>
							<div
								className={`${styles.column} ${styles.t_goods}`}
							>
								商品
							</div>
							<div
								className={`${styles.column} ${styles.t_props}`}
							>
								&nbsp;
							</div>
							<div
								className={`${styles.column} ${styles.t_price}`}
							>
								单价
							</div>
							<div
								className={`${styles.column} ${styles.t_quantity}`}
							>
								数量
							</div>
							<div className={`${styles.column} ${styles.t_sum}`}>
								小计
							</div>
							<div
								className={`${styles.column} ${styles.t_action}`}
							>
								操作
							</div>
						</div>
						<div className={styles.cart_tbody}>
							<div className={styles.item_list}>
								<li className={styles.sing_li}>
									<div className={styles.check}>
										<span>
											<input type="checkbox" readOnly />
										</span>
									</div>
									<div className={styles.goods_img}>
										<div className={styles.left}>
											<img
												src="http://www.cz2000.top/bs/admin/images/ByteDance-cup-1.jpg"
												alt=""
											/>
										</div>
										<div className={styles.right}>
											<p>shop_name</p>
										</div>
									</div>
									<div className={styles.single_price}>
										￥：<span>100</span>元
									</div>
									<div className={styles.number}>数量</div>
									<div className={styles.subtotal}>
										￥：<span>100</span>元
									</div>
									<div className={styles.operate}>
										<Button type="danger">删除</Button>
									</div>
								</li>
							</div>
						</div>
					</Fragment>
				) : (
					<div className={styles.cart_empty}>
						<div>
							<img src={empty} alt="暂无商品" />
							<p>购物车空空如也~</p>
							<p>去看看心仪的商品吧~</p>
							<p className={styles.to_shopping}>去购物`{'>'}` </p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
