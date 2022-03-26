import React  from 'react';
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as registerActionCreators } from "./store";
import {Input, Button, Form, message} from 'antd';
import styles from './index.module.less'
import logo from '../../assets/logo.jpg';
const Register = props => {

  const [formObject] = Form.useForm();
const {registerFn} = props
  const register = async () => {
    const sendData =  formObject.getFieldsValue();
    const { data } = await registerFn.registerAc(sendData)
    console.log('data',data)

		if(data.status === 400) {
			switch (data.msg[0]) {
				case 'username':
					 	message.error('请输入账号')
						 return
					case 'email':
						message.error('请输入邮箱')
						return
					case 'password':
						message.error('请输入密码')
						return
				default:
					break;
			}

		}
		if(data.status === 200) {
			return message.success('注册成功')
		}
		if(data.status === 500) {
			switch (data.msg) {
				case '用户名已存在':
					 message.error('用户名已存在')
					 return
					case '注册失败':
						message.error('注册失败')
						return
				default:
					break;
			}
		}
		
  };

	return (
    <div className={styles.login_body}>
      <div className={styles.login_content}>
        <div className={styles.login_panel}>
				<div className={styles.title}>
						<img src={logo} alt="" />
					</div>
          <h1 className={styles.login_title}>快速注册</h1>
      <Form 
				className={styles.login_form} 
				form={formObject}
        onFinish={register}
			>
        <Form.Item 
					name="username"
					rules={[{required: true, message: '请输入账号!'}]}
				>
          <Input placeholder="账号" className={styles.login_form_input}/>
        </Form.Item>
        <Form.Item
					name="email"
					rules={[{required: true, message: '请输入邮箱!'}]}
				>
          <Input type="email" placeholder="邮箱" className={styles.login_form_input}/>
        </Form.Item>
        <Form.Item 
					name="password"
					rules={[{required: true, message: '请输入密码!'}]}
				>
          <Input type="password" placeholder="密码" className={styles.login_form_input}/>
        </Form.Item>
				<Form.Item 
					name="passwordConfirm"
					rules={[{required: true, message: '请输入重复密码!'}]}
				>
          <Input type="password" placeholder="重复密码" className={styles.login_form_input}/>
        </Form.Item>
					<span>
						已有账号？
						<Link to="/login">点击登录</Link>
					</span>
        <Form.Item style={{marginTop: 20}}>
          <Button type="primary"  onClick={register}>注册</Button>
        </Form.Item>
      </Form>
        </div>
				<div className={styles.announce}>
					<p>
						Copyright 酷物二手交易商城 版权所有
						渝ICP备2022000537号(建议使用IE9以上浏览器)
					</p>
				</div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    registerDate: state.register
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerFn: bindActionCreators(registerActionCreators, dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)

// export default Register
