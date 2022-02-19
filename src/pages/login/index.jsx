import React from 'react';
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators as loginActionCreators } from './store';
import {Input, Space, Button, Tabs, Form, message, notification} from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import styles from './index.module.less'

import decode from "jwt-decode";

const Login = props => {
const {loginFn} = props
  const [formObject] = Form.useForm();
  let navigate = useNavigate()
	const submit = async () => {
		const sendData = await formObject.getFieldsValue();
    const { data } = await loginFn.loginAc(sendData)
    
    if(data.status === 200) {
      // 存储token到本地
      localStorage.setItem('@#@TOKEN', data.token)
      // 1.同步用户状态 和 用户信息到redux
      loginFn.syncInfoAc(decode(data.token))
      message.success('登录成功')
      setTimeout(() => {
        navigate("/");
      }, 2000)
    } else{
      message.error('登录失败')
    }
	};

	return (
		<div className={styles.login_body}>
			<div className={styles.login_content}>
				<div className={styles.login_panel}>
					<h1 className={styles.login_title}>登录</h1>
					<Form
						className={styles.login_form}
						form={formObject}
						onFinish={submit}
					>
						<Form.Item
							name="username"
							rules={[{ required: true, message: '请输入账号!' }]}
						>
							<Input
								placeholder="账号"
								className={styles.login_form_input}
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{ required: true, message: '请输入密码!' }]}
						>
							<Input
								type="password"
								placeholder="密码"
								className={styles.login_form_input}
							/>
						</Form.Item>
						<Space
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<span>
								没有账号？
								<Link to="/register">点击注册</Link>
							</span>
							<Button type="link" >忘记密码？</Button>
						</Space>
						<div style={{ marginTop: 20 }}>
							<Button
								type="primary"
								className={'login-form-button kxy'}
								onClick={submit}
							>
								登录
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
  return {
    loginData: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginFn: bindActionCreators(loginActionCreators, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
