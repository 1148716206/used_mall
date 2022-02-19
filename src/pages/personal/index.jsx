import React, { Component } from 'react';
import {List,Typography,Divider,Button, Upload,Switch  } from 'antd'
import styles from './index.module.less';

const Personal = () => {


	return (
		<div class={styles.user_info_box}>
			<div class={styles.user_info}>
				<div class={styles.head_img}>
				
						<img
							src="//s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png"
							alt=""
						/>
				<Upload className={styles.upload}>
					<Button>上传头像</Button>
				</Upload>
				</div>
				<div class={styles.info_list}>
			
					<div className={styles.info_list__item}>
						<div className={styles.title}>
							昵称
						</div>
						<div className={styles.name}>
							学不完的前端
						</div>
						<div className={styles.oprate}>
							<Button style={{borderRadius:30}}>修改</Button>
						</div>
					</div>
					<Divider />
					<div className={styles.info_list__item} style={{padding:0}}>
						<div className={styles.title}>
							性别
						</div>
						<div className={styles.name}>
							男
						</div>
						<div className={styles.oprate}>
							<Button style={{borderRadius:30}}></Button>
						</div>
					</div>
					<Divider />
				
					<div className={styles.info_list__item} style={{padding:0}}>
						<div className={styles.title}>
							密码
						</div>
						<div className={styles.name}>
							********
						</div>
						<div className={styles.oprate}>
							<Button style={{borderRadius:30}}>修改</Button>
						</div>
					</div>
					<Divider />
					<div className={styles.info_list__item} style={{padding:0}}>
						<div className={styles.title}>
							邮箱
						</div>
						<div className={styles.name}>
							1148716206@qq.com
						</div>
						<div className={styles.oprate}>
							<Button style={{borderRadius:30}}>修改</Button>
						</div>
					</div>
					<Divider />
					<div className={styles.info_list__item} style={{padding:0}}>
						<div className={styles.title}>
							收货地址
						</div>
						<div className={styles.name}>
							重庆市XXXX
						</div>
						<div className={styles.oprate}>
							<Button style={{borderRadius:30}}>修改</Button>
						</div>
					</div>
					<Divider />
				</div>
			</div>
		</div>
	);
};
export default Personal;
