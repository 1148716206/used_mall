import React, {Fragment, useState,useEffect} from 'react'
import {Table, Radio, Divider, List, Avatar, Space} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import styles from './index.module.less'
import empty from '../../assets/empty.png';

import axios from '../../utils/request'

const Cart = () => {
  const [goodsTotal, setGoodsTotal] = useState(1)
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
  const getUser = async() => {
    const {data} = await axios.post('/api/cart')

  }
  useEffect(() => {
    getUser()
  })

  const IconText = (icon, text) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );


  return (
    <div className={styles.cart_body}>
      <div className={styles.cart_content}>

        {
          goodsTotal ? (
            <Fragment>
              <div className={styles.cart_filter_bar}>
                <span>全部商品</span>
                <span className={styles.switch_cart_number}>{goodsTotal}</span>

              </div>
              <div className={styles.cart_thead}>
                <div className={`${styles.column} ${styles.t_checkbox}`}>
                  <div className={styles.cart_checkbox}>
                    <input type="checkbox" name="select-all" className={styles.input_checkbox}/>
                  </div>
                  全选
                </div>
                <div className={`${styles.column} ${styles.t_goods}`}>商品</div>
                <div className={`${styles.column} ${styles.t_props}`}>&nbsp;</div>
                <div className={`${styles.column} ${styles.t_price}`}>单价</div>
                <div className={`${styles.column} ${styles.t_quantity}`}>数量</div>
                <div className={`${styles.column} ${styles.t_sum}`}>小计</div>
                <div className={`${styles.column} ${styles.t_action}`}>操作</div>
              </div>
              <div className={styles.cart_tbody}>
                <div className={styles.item_list}>
                  <div className={styles.item_combine}>

                    <div className={`${styles.item_item} ${styles.item_seleted}`}  data-sku="1599047" data-ts="1644725585366"
                         data-skuuuid="F1H3t4T1049659746777300992">
                      <div className={styles.item_form}>
                        <div className={`${styles.cell} ${styles.p_checkbox}`}>
                          <div className={styles.cart_checkbox}>
                            <input type="checkbox" name="checkItem" className={styles.input_checkbox}/>
                            <span className={styles.line_circle}/>
                          </div>
                        </div>
                        <div className={`${styles.cell} ${styles.p_goods}`}>
                          <div className={styles.goods_item}>
                            <div className={styles.p_img}><a href="//item.jd.com/1599047.html" target="_blank"
                                                       rel="noreferrer"
                                                       title="鲁花 食用油 5S物理压榨 压榨一级 花生油 6.18L（赠品数量有限 随机发放 送完为止）"><img
                              src="//img12.360buyimg.com/n0/s80x80_jfs/t1/214173/31/10141/373216/61d4fef2E9fcf5f91/b1b290bac97af578.jpg.dpg"
                              alt="鲁花 食用油 5S物理压榨 压榨一级 花生油 6.18L（赠品数量有限 随机发放 送完为止）"/></a></div>
                            <div className={styles.p_msg}>
                              <div className={styles.p_name}><a href="//item.jd.com/1599047.html" target="_blank"
                                                         rel="noreferrer"
                                                         title="鲁花 食用油 5S物理压榨 压榨一级 花生油 6.18L（赠品数量有限 随机发放 送完为止）"
                              ><i
                                className="product-icon JD_SUPERMARKET" title=""/>鲁花 食用油 5S物理压榨 压榨一级 花生油 6.18L（赠品数量有限
                                随机发放 送完为止）</a></div>
                              <div className="p-extend p-extend-new"/>
                            </div>
                          </div>
                        </div>
                        <div className={`${styles.cell} ${styles.p_props}`}>
                          <div className={styles.props_txt}>
                            <span className="">花生油6.18L</span>
                          </div>
                        </div>
                        <div className={`${styles.cell} ${styles.p_price}`}>
                          <span className={styles.p_price_cont}>￥193.90</span>
                          <p className="mt5">
                            <span className={`${styles.pro_tiny_tip} ${styles.sales_promotion}`}>促销</span>
                          </p>
                        </div>
                        <div className={`${styles.cell} ${styles.p_quantity}`}>
                          <div className="cart-number quantity ">
                            <button className="cart-number-dec is-disabled">
                              <i className="cart-icon-subt"/></button>
                            <div className="cart-input">
                              <input className="cart-input-o" min="1" max="9999" value="1"/>
                            </div>
                            <button className="cart-number-inc">
                              <i className="cart-icon-add"/>
                            </button>
                          </div>
                          <p className="ac ftx03">有货</p>
                        </div>
                        <div className={`${styles.cell} ${styles.p_sum}`}>
                          <strong>¥193.90</strong>
                        </div>
                        <div className={`${styles.cell} ${styles.p_ops}`}>
                          <a href="#none" className="p-ops-item">删除</a>
                          <a href="#none" className="p-ops-item">移入关注</a>
                        </div>
                      </div>
                      <div className="product-extra mb10"/>
                      <div className="item-line"/>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>

          ) : (
            <div className={styles.cart_empty}>
              <div>
                <img src={empty} alt="暂无商品"/>
                <p>购物车空空如也~</p>
                <p>去看看心仪的商品吧~</p>
                <p className={styles.to_shopping}>去购物`{'>'}` </p>
              </div>
            </div>

          )
        }

      </div>

    </div>
  )
}

export default Cart
